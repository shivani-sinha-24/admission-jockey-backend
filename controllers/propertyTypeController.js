import Status from "../models/statusModel.js"
import Validator from "validatorjs"
import PropertyType from "../models/propertyTypeModel.js";
import Gallery from "../models/galleryModel.js";
import Team_lead from "../models/teamleadModel.js";
import Placement from "../models/placementModel.js";
import Loan from "../models/LoanModel.js";
import UniversityCourse from "../models/universitycourseModel.js";
import CollegeCourse from "../models/collegeCourseModel.js";
import Scholarship from "../models/scholarshipModel.js";
import Admission_process from "../models/admission_processModel.js";
import Announcement from "../models/announcementModel.js";
import Faqs from "../models/Faqs.js";
import Qas from "../models/QA.js";
// import Other from "../models/OthersModal.js";
// import Other from "../models/OtherModel.js";
import OthersModal from "../models/otherModel.js";
import Hostel from "../models/hostelModel.js";


export default {

    // Create Status
    async createPropertyType(req, res) {
        try {
            let request = req.body;
            //console.log("req",req.file);

            request.property_img = req?.file == undefined ? null : req?.file?.filename != undefined && req?.file?.filename;
            let propertyExsist = await PropertyType.findOne({ property_name: request.property_name })
            if (propertyExsist) {
                return res.status(200).json({ status_code: 300, "message": "This PropertyType already exsist!" })
            }
            let propertyCreated = await PropertyType.create(request)
            return res.status(200).json({
                status_code: 200,
                message: "PropertyType created successfully",
                propertyCreated: propertyCreated
            })

        } catch (error) {
            res.status(400).send(error)
        }
    },

    // Create Status
    async getPropertyType(req, res) {
        try {
            let PropertyTypeData = await PropertyType.find();
            return res.status(200).json(PropertyTypeData)

        } catch (error) {
            res.status(400).send(error)
        }
    },

    //Update propertyType
    async updatePropertyType(req, res) {
        try {
            let request = req.body;
            if (!request) {
                return res.send("All input is required!");
            }
            let image = req.file?.filename
            let _id = req.query.id;
            const property = await PropertyType.findById(_id);
            if (!property) {
                return res.status(400).send({ message: "Property not found" });
            }

            if (image) {
                await PropertyType.findByIdAndUpdate(_id, {
                    request,
                    property_img: image
                })
            } else {
                await PropertyType.findByIdAndUpdate(_id, request);
            }
            const property1 = await PropertyType.find();
            //console.log("property1", property1);
            return res
                .status(200)
                .send({
                    status_code: 200,
                    property: property1,
                    message: "Property updated successfully",
                });
        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    },

    // Delete proprtyType
    async deletePropertyType(req, res) {
        try {
            console.log("delcontroller");
            let id = req.query.id;
            const property = await PropertyType.findByIdAndRemove(id);

            if (!property) {
                return res.status(404).send({ message: "Property not found" });
            }
            return res
                .status(200)
                .send({
                    status_code: 200,
                    property: property,
                    message: "Property deleted successfully",
                });
        } catch (err) {
            return res.status(400).send(err);
        }
    },


    // GET Gallery 
    async getGallery(req, res) {

        try {
            let gallery = await Gallery.find({})

            return res.status(200).json(gallery);

        } catch (error) {
            res.status(400).send(error)
        }
    },




    // Gallery create
    async createGallery(req, res) {

        let request = req.body, gallery_img = [];

        // request.logo = req?.files == undefined ? null : req?.files?.logo != undefined && 'public/uploads/' + req?.files?.logo[0]?.filename;
        if (req?.files != undefined && req?.files?.gallery_img?.length > 0) {
            for (let i = 0; i < req?.files?.gallery_img?.length; i++) {
                gallery_img?.push('images/' + req?.files?.gallery_img[i]?.filename)
            }
            request.gallery_img = gallery_img;
            //console.log(request.gallery_img);
        }

        try {

            if (req.body.type != "edit") {
                let exist = await Gallery.findOne({ "title": request.title });

                if (exist) {
                    return res.status(200).send({ message: 'This title is already exists!' });
                }

                let gallery = await Gallery.create(request);

                return res.status(200).send({ status_code: 200, gallery: gallery, message: "Gallery created successfully." });

            } else {
                // let exist = await Gallery.find({ _id: { $ne: request.id } });
                // let existMain = exist.find(o => o.title === request.title);

                // if (existMain?.length > 0) {
                //     return res.status(200).send({ message: 'This title is already exists!' });
                // }

                var gallery = await Gallery.findOneAndUpdate(
                    { _id: req.body.id },
                    {
                        $set: {
                            title: request.title,
                            gallery_img: request.gallery_img
                        },
                    },
                    { new: true }
                );
                return res.status(200).send({ status_code: 200, "gallery": gallery, message: "Gallery updated successfully." });
            }
        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },


    //DELETE GALLERY IMAGE
    async   deleteGalleryImg(req,res){
        // try{
        //     const {id,image} = req.body;
        //     const exist = Gallery.findById(id)
        //     if(exist){
        //         console.log("gallery document found");
        //         const udatedGallery = await Gallery.updateOne({_id:id},{
        //             $pull: {
        //                 gallery_img: image,
        //             },
        //         })
                
        //         const gallery = await Gallery.find({})
        //         return res.status(200).send({ status_code: 200, "gallery": gallery, message: "Image deleted successfully." });
        //     }
        // }catch(error){
        //     return res.status(400).send({ message: "Something Went Wrong!" })
        // }
        // console.log(req.body);

        try {
            const galleryImgToDelete = req?.body;
            const deleteImages = galleryImgToDelete.map(({image, id, index}) => (
                Gallery.findOneAndUpdate({ _id:id }, {'$pull': {  gallery_img: image, } })
            )) 
            Promise.all(deleteImages)
            .then(console.log('deleted successful'))
            .catch(console.error('err in delete img'))
            const gallery = await Gallery.find({})
            return res.status(200).send({ status_code: 200, "gallery": gallery, message: "Image deleted successfully." });
        }catch(error){
            return res.status(400).send({ message: "Something Went Wrong!" })
        }    
    },

    async replaceGalleryImg(req,res){
        try {
            const {id,image,index} = req.body;
            const gallery_img = 'images/' +req.file.filename;
            const exist = await Gallery.findOne({_id:id})
            if(exist){
                const exist_gallery_img = exist.gallery_img
                exist_gallery_img.splice(index,1,gallery_img)
                const updatedGallery = await Gallery.findByIdAndUpdate({_id:id},{
                    "$set": { 
                        "gallery_img": exist_gallery_img},
                },
                {new:true}
                )
                return res.status(200).send({ status_code: 200, "gallery": updatedGallery, message: "Image updated successfully." });
            }
        } catch (error) {
            return res.status(400).send({ message: "Something Went Wrong!" })
        }
    },

    async editGalleryImage(req,res) {       
        try {
            const {id,property_id,title,galleryImgToDelete}= req.body;
            let gallery_img = [];
            let exist_gallery_img;

            if (req?.files != undefined && req?.files?.gallery_img?.length > 0) {
                for (let i = 0; i < req?.files?.gallery_img?.length; i++) {
                    gallery_img?.push('images/' + req?.files?.gallery_img[i]?.filename)
                }
                // request.gallery_img = gallery_img;
            }

            const exist = await Gallery.findOne({_id:id})
            if(exist){
                exist_gallery_img = exist.gallery_img
                if(gallery_img.length>0){
                    exist_gallery_img = exist_gallery_img.concat(gallery_img)
                }
                const updatedGallery = await Gallery.findByIdAndUpdate({_id:id},{
                    "$set": { 
                        "title": title,
                        "gallery_img": exist_gallery_img
                    },
                },
                {new:true}
                )
                return res.status(200).send({ status_code: 200, "gallery": updatedGallery, message: "Gallery updated successfully." });
            }
            
        } catch (error) {
            return res.status(400).send({ message: "Something Went Wrong!" })
            
        }
    },
    

    // GET Team lead 
    async getTeamLead(req, res) {

        try {
            let team_lead = await Team_lead.find({})

            return res.status(200).json(team_lead);

        } catch (error) {
            res.status(400).send(error)
        }
    },

    // TEAM LEADER create
    async createTeamLeader(req, res) {

        let request = req.body;
        request.image = req?.file == undefined ? null : 'images/' + req?.file?.filename;

        try {
            let exist = await Team_lead.findOne({ "name": request.name });
            if (exist) {
                return res.status(200).send({ message: 'This name is already exists!' });
            }
            let team_lead = await Team_lead.create(request);
            return res.status(200).send({ status_code: 200, team_lead: team_lead, message: "Team leader created successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    async updateTeamLeader(req, res) {

        let request = req.body;
        //console.log(request);
        let image = req.file && req.file.filename;
        if (image) {
            request.image = 'images/' + image;
        }

        if (request.team_lead_img?.includes("public")) {
            request.team_lead_img = request.team_lead_img
        } else {
            request.team_lead_img = req?.file == undefined ? null : 'public/uploads/' + req?.file?.filename;
        }

        try {

            let exist = await Team_lead.find({ _id: { $ne: request.id } });
            //console.log(exist);
            let existMain = exist.find(o => o.name === request.name);

            if (existMain?.length > 0) {
                return res.status(200).send({ message: 'This name is already exists!' });
            }

            var team_lead = await Team_lead.findOneAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        name: request.name,
                        image: request.image,
                        designation: request.designation
                    },
                },
                { new: true }
            );
            return res.status(200).send({ status_code: 200, "team_lead": team_lead, message: "Team leader updated successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    // GET PLACEMENT
    async getPlacement(req, res) {

        try {
            let placement = await Placement.find({})

            return res.status(200).json(placement);

        } catch (error) {
            res.status(400).send(error)
        }
    },

    // CREATE PALACEMENT
    async createPlacement(req, res) {

        let request = req.body;
        //  console.log(req.body, "files gallery")
        // console.log(req.file, "please")
        // request.logo = req?.files == undefined ? null : req?.files?.logo != undefined && 'public/uploads/' + req?.files?.logo[0]?.filename;
        request.placement_img = req?.file == undefined ? null : 'public/uploads/' + req?.file?.filename;

        try {

            let exist = await Placement.findOne({ "title": request.title });

            if (exist) {
                return res.status(200).send({ message: 'This title is already exists!' });
            }

            let placement = await Placement.create(request);

            return res.status(200).send({ status_code: 200, placement: placement, message: "Placement created successfully." });



        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    async updatePlacement(req, res) {

        let request = req.body;

        if (request.placement_img?.includes("public")) {
            request.placement_img = request.placement_img
        } else {
            request.placement_img = req?.file == undefined ? null : 'public/uploads/' + req?.file?.filename;
        }

        try {

            let exist = await Placement.find({ _id: { $ne: request.id } });
            let existMain = exist.find(o => o.title === request.title);

            if (existMain?.length > 0) {
                return res.status(200).send({ message: 'This title is already exists!' });
            }

            var placement = await Placement.findOneAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        title: request.title,
                        placement_img: request.placement_img,
                        description: request.description
                    },
                },
                { new: true }
            );
            return res.status(200).send({ status_code: 200, "placement": placement, message: "Placement updated successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    // GET Loan
    async getLoan(req, res) {

        try {
            let loan = await Loan.find({})

            return res.status(200).json(loan);

        } catch (error) {
            res.status(400).send(error)
        }
    },

    // CREATE LOAN
    async createLoan(req, res) {

        let request = req.body;
        //  console.log(req.body, "files gallery")
        // console.log(req.file, "please")
        // request.logo = req?.files == undefined ? null : req?.files?.logo != undefined && 'public/uploads/' + req?.files?.logo[0]?.filename;
        request.loan_img = req?.file == undefined ? null : 'public/uploads/' + req?.file?.filename;

        try {

            let exist = await Loan.findOne({ "title": request.title });

            if (exist) {
                return res.status(200).send({ message: 'This title is already exists!' });
            }

            let loan = await Loan.create(request);

            return res.status(200).send({ status_code: 200, loan: loan, message: "Loan created successfully." });



        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    async updateLoan(req, res) {

        let request = req.body;

        if (request.loan_img?.includes("public")) {
            request.loan_img = request.loan_img
        } else {
            request.loan_img = req?.file == undefined ? null : 'public/uploads/' + req?.file?.filename;
        }

        try {

            let exist = await Loan.find({ _id: { $ne: request.id } });
            let existMain = exist.find(o => o.title === request.title);

            if (existMain?.length > 0) {
                return res.status(200).send({ message: 'This title is already exists!' });
            }

            var loan = await Loan.findOneAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        title: request.title,
                        loan_img: request.loan_img,
                        description: request.description
                    },
                },
                { new: true }
            );
            return res.status(200).send({ status_code: 200, "loan": loan, message: "Loan updated successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    // GET Scholarship
    async getScholarship(req, res) {

        try {
            let scholarship = await Scholarship.find({})

            return res.status(200).json(scholarship);

        } catch (error) {
            res.status(400).send(error)
        }
    },

    // CREATE SCHOLARSHIP
    async createScholarship(req, res) {

        let request = req.body;
        //  console.log(req.body, "files gallery")
        // console.log(req.file, "please")
        // request.logo = req?.files == undefined ? null : req?.files?.logo != undefined && 'public/uploads/' + req?.files?.logo[0]?.filename;
        // request.scholarship_img = req?.file == undefined ? null : 'public/uploads/' + req?.file?.filename;

        try {

            let exist = await Scholarship.findOne({ "property_id": request.property_id });

            if (exist) {
                return res.status(200).send({ message: 'ScholarShip is already exists!' });
            }

            let scholarship = await Scholarship.create(request);
            let scholarship_list = await Scholarship.find();

            return res.status(200).send({ status_code: 200, scholarship: scholarship_list, message: "Scholarship created successfully." });



        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    async updateScholarship(req, res) {

        let request = req.body;

        // if (request.scholarship_img?.includes("public")) {
        //     request.scholarship_img = request.scholarship_img
        // } else {
        //     request.scholarship_img = req?.file == undefined ? null : 'public/uploads/' + req?.file?.filename;
        // }

        try {

            let exist = await Scholarship.find({ _id: { $ne: request.id } });
            let existMain = exist.find(o => o.title === request.title);

            if (existMain?.length > 0) {
                return res.status(200).send({ message: 'This title is already exists!' });
            }

            var scholarship = await Scholarship.findOneAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        title: request.title,
                        // scholarship_img: request.scholarship_img,
                        description: request.description
                    },
                },
                { new: true }
            );
            return res.status(200).send({ status_code: 200, "scholarship": scholarship, message: "Scholarship updated successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    // GET Admission_process
    async getAdmission_process(req, res) {
        try {
            let admission_process = await Admission_process.find({})
            return res.status(200).json(admission_process);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    // CREATE Admission_process
    async createAdmission_process(req, res) {
        let request = req.body;
        //  console.log(req.body, "files gallery")
        // request.logo = req?.files == undefined ? null : req?.files?.logo != undefined && 'public/uploads/' + req?.files?.logo[0]?.filename;
        // request.admission_process_img = req?.file == undefined ? null : 'public/uploads/' + req?.file?.filename;
        try {
            let exist = await Admission_process.findOne({ "property_id": request.property_id });
            if (exist) {
                return res.status(200).send({ message: 'Admission Process is already exists!' });
            }
            let admission_process = await Admission_process.create(request);
            let admission_process_list = await Admission_process.find();
            return res.status(200).send({ status_code: 200, admission_process: admission_process_list, message: "Admission Process created successfully." });
        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })
        }
    },

    async updateAdmission_process(req, res) {
        let request = req.body;
        // if (request.admission_process_img?.includes("public")) {
        //     request.admission_process_img = request.admission_process_img
        // } else {
        //     request.admission_process_img = req?.file == undefined ? null : 'public/uploads/' + req?.file?.filename;
        // }
        try {

            // let exist = await Admission_process.find({ _id: { $ne: request.id } });
            // let existMain = exist.find(o => o.title === request.title);

            // if (existMain?.length > 0) {
            //     return res.status(200).send({ message: 'This title is already exists!' });
            // }

            var admission_process = await Admission_process.findOneAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        title: request.title,
                        // admission_process_img: request.admission_process_img,
                        description: request.description
                    },
                },
                { new: true }
            );
            return res.status(200).send({ status_code: 200, "admission_process": admission_process, message: "Admission_process updated successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    // GET Announcement
    async getAnnouncement(req, res) {

        try {
            let announcement = await Announcement.find({})

            return res.status(200).json(announcement);

        } catch (error) {
            res.status(400).send(error)
        }
    },

    // CREATE Announcement
    async createAnnouncement(req, res) {

        let request = req.body;
        //  console.log(req.body, "files gallery")
        // console.log(req.file, "please")
        // request.logo = req?.files == undefined ? null : req?.files?.logo != undefined && 'public/uploads/' + req?.files?.logo[0]?.filename;
        // request.announcement_img = req?.file == undefined ? null : 'public/uploads/' + req?.file?.filename;

        try {

            let exist = await Announcement.findOne({ "property_id": request.property_id });

            if (exist) {
                return res.status(200).send({ message: 'Anouncement is already exists!' });
            }

            let announcement = await Announcement.create(request);
            let announcement_list = await Announcement.find();

            return res.status(200).send({ status_code: 200, announcement: announcement_list, message: "Announcement created successfully." });



        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    async updateAnnouncement(req, res) {

        let request = req.body;
        // console.log("req",request);

        // if (request.image?.includes("public")) {
        //     request.announcement_img = request.image
        // } else {
        //     request.announcement_img = req?.file == undefined ? null : 'public/uploads/' + req?.file?.filename;
        // }

        try {

            // let exist = await Announcement.find({ _id: { $ne: request.id } });
            // let existMain = exist.find(o => o.title === request.title);

            // if (existMain?.length > 0) {
            //     return res.status(200).send({ message: 'This title is already exists!' });
            // }

            var announcement = await Announcement.findOneAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        title: request.title,
                        // announcement_img: request.image,
                        description: request.description
                    },
                },
                { new: true }
            );
            return res.status(200).send({ status_code: 200, "announcement": announcement, message: "Announcement updated successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    // GET FAQS
    async getFaqs(req, res) {

        try {
            let faqs = await Faqs.find({})

            return res.status(200).json(faqs);

        } catch (error) {
            res.status(400).send(error)
        }
    },


    // GET QAS
    async getQas(req, res) {
        try {
            let qas = await Qas.find({})

            return res.status(200).json(qas);

        } catch (error) {
            res.status(400).send(error)
        }
    },

    // CREATE Faqs
    async createFaqs(req, res) {

        let request = req.body;
        //console.log(request);

        try {

            let exist = await Faqs.findOne({ "ques": request.ques });

            if (exist) {
                return res.status(200).send({ message: 'This question is already exists!' });
            }

            let faqs = await Faqs.create(request);

            return res.status(200).send({ status_code: 200, faqs: faqs, message: "Faqs created successfully." });



        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    async updateFaqs(req, res) {

        let request = req.body;

        try {

            let exist = await Faqs.find({ _id: { $ne: request.id } });
            let existMain = exist.find(o => o.ques === request.ques);

            if (existMain?.length > 0) {
                return res.status(200).send({ message: 'This ques is already exists!' });
            }

            var faqs = await Faqs.findOneAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        ques: request.ques,
                        answer: request.answer,
                    },
                },
                { new: true }
            );
            return res.status(200).send({ status_code: 200, "faqs": faqs, message: "Faqs updated successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    // CREATE Other
    async createOther(req, res) {

        let request = req.body;
        // console.log(request);

        try {

            let exist = await OthersModal.findOne({ "property_id": request.property_id });
            // console.log("exist", exist);

            if (exist) {
                return res.status(200).send({ message: 'This section is already exists!' });
            }

            let other = await OthersModal.create(request);
            // console.log("others", other);

            let others = await OthersModal.find({})

            return res.status(200).send({ status_code: 200, others, message: "Other created successfully." });
        }
        catch (err) {
            return res.status(400).send(err);
        }
    },
    // CREATE UNIVERSITY COURSE
    async createUniversityCourse(req, res) {

        let request = req.body;

        try {

            let exist = await UniversityCourse.findOne({ "name": request.name });

            if (exist) {
                return res.status(200).send({ message: 'This name is already exists!' });
            }

            let universityCourse = await UniversityCourse.create(request);

            return res.status(200).send({ status_code: 200, universityCourse: universityCourse, message: "University course created successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    //update other
    async updateOther(req, res) {

        let request = req.body;

        // console.log(request);

        try {

            // let exist = await Other.find({ property_id : request.property_id });

            // if (!exist) {
            //     return res.status(200).send({ message: "Other not Found !" });
            // }

            const other = await OthersModal.findOneAndUpdate(
                { property_id: request.property_id },
                {
                    $set: {
                        naac: request.naac,
                        nirf: request.nirf,
                        nba: request.nba,
                        bengalCreditCard: request.bengalCreditCard,
                        cuet: request.cuet,
                        aj_ranking: request.aj_ranking,
                    },
                },
                { new: true }
            );

            if (other) {
                // console.log("other updated: ", other);
                const others = await OthersModal.find({})
                return res.status(200).send({ status_code: 200, others, message: "Other updated successfully." });
            }

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    // Delete Other
    async deleteOther(req, res) {
        try {
            let id = req.query.id;
            const other = await OthersModal.findByIdAndRemove(id);

            if (!other) {
                return res.status(404).send({ message: "Other not found" });
            }
            return res
                .status(200)
                .send({
                    status_code: 200,
                    Other: other,
                    message: "Other deleted successfully",
                });
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    // GET Other
    async getOther(req, res) {
        try {
            let others = await OthersModal.find({})
            if (others) {
                return res.status(200).send({ status_code: 200, others: others, message: 'others found successfully' })
            }
        } catch (error) {
            return res.status(400).send(err);
        }
    },

    async getUniversityCourse(req, res) {
        try {
            let universityCourse = await UniversityCourse.find({});
            return res.status(200).json(universityCourse);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    // Delete College:
    async deleteUniversityCourse(req, res) {
        try {
            let id = req.query.id
            const course = await UniversityCourse.findByIdAndRemove(id)
            if (!course) {
                return res.status(404).send({ message: "Course not found" })
            }
            return res.status(200).send({ status_code: 200, id: id, message: "Course deleted successfully." })
        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }
    },

    async updateUniversityCourse(req, res) {
        try {
            let request = req.body;
            if (!request) {
                return res.status(400).send({ message: "All Input Field Is Required" });
            }
            let _id = req.body.id;
            const course = await UniversityCourse.findById(_id);
            if (!course) {
                return res.status(404).send({ message: "Course Not Found !!" });
            }
            let test=await UniversityCourse.findByIdAndUpdate(_id, request);
            return res.status(200).send({ status_code: 200, course: request, message: "Course updated successfully." })

        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }

    },


    async createCollegeCourse(req, res) {

        let request = req.body;
        try {
            const UniversityCourseList = await UniversityCourse.findById(request.UniversityID);
            if (!UniversityCourseList) {
                return res.status(404).send({ message: "Course Not Found !!" });
            }
            UniversityCourseList?.collegeList.map((universityCourseCheck) => {
                if (universityCourseCheck == CollegeID) {
                    return res.status(404).send({ message: "Course Already Exist" });
                }
            });
            let UniversityCourseCollegeList = [...UniversityCourseList?.collegeList, request.CollegeID];
            await UniversityCourse.update(
                { _id: { $in: [request.UniversityID] } },
                { $set: { collegeList: UniversityCourseCollegeList } },
                { multi: true }
            );
            let collegeCourse = await CollegeCourse.create(request);

            return res.status(200).send({ status_code: 200, collegeCourse: collegeCourse, message: "College course created successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },


    async getCollegeCourse(req, res) {
        try {
            let collegeCourse = await CollegeCourse.find({});
            let universityCourse = await UniversityCourse.find({});
            let courseList = [];
            collegeCourse.map((clg_cors) => {
                universityCourse.map((unv_cors) => {
                    if (clg_cors.UniversityCourseID == unv_cors._id) {
                        let data = {
                            _id: clg_cors._id,
                            name: unv_cors.name,
                            full_name: unv_cors.full_name,
                            duration: unv_cors.duration,
                            type: unv_cors.type,
                            fees: clg_cors.fees,
                            category: unv_cors.category,
                            sub_category: unv_cors.sub_category,
                            stream: unv_cors.stream,
                            universityID: clg_cors.UniversityID,
                            lateral_entry: unv_cors.lateral_entry,
                            eligibilty: unv_cors.eligibilty,
                            description: unv_cors.description,
                            CollegeID: clg_cors.CollegeID,
                            created_at: clg_cors.created_at,
                            updated_at: clg_cors.updated_at,
                        }
                        courseList.push(data);
                    }
                })
            })
            return res.status(200).json(courseList);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async updateCollegeCourse(req, res) {
        try {
            let request = req.body;
            if (!request) {
                return res.status(400).send({ message: "All Input Field Is Required" });
            }
            let _id = req.body.id;
            const course = await CollegeCourse.findById(_id);
            if (!course) {
                return res.status(404).send({ message: "Course Not Found !!" });
            }
            await CollegeCourse.findByIdAndUpdate(_id, request);
            return res.status(200).send({ status_code: 200, course: request, message: "Course updated successfully." })
        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }

    },

    // Delete College:
    async deleteCollegeCourse(req, res) {
        try {
            let id = req.query.id;
            const courseDetail = await CollegeCourse.findById(id);
            const universityCourseDetail = await UniversityCourse.findById(courseDetail.UniversityCourseID);
            let updatedCollegeList = universityCourseDetail.collegeList.filter(item=>item!=courseDetail.CollegeID);
            await UniversityCourse.update(
                { _id: { $in: [courseDetail.UniversityCourseID] } },
                { $set: { collegeList: updatedCollegeList} },
                { multi: true }
            );
            const course = await CollegeCourse.findByIdAndRemove(id);
            if (!course) {
                return res.status(404).send({ message: "Course not found" });
            }
            return res.status(200).send({ status_code: 200, id: id, message: "College Course deleted successfully." });
        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }
    },

    //University courses for the college
    async getUniversityCourseForCollege(req, res) {
        let universityCourse = await UniversityCourse.find({ universityID: req.body.universityData });
        if (!universityCourse) {
            return res.status(404).send({ message: "Course not found" });
        }
        let filterlist = [];
        universityCourse.map((uncrs) => {
            if (uncrs?.collegeList == 0) {
                filterlist.push(uncrs);
            }
            uncrs?.collegeList.map((clgList) => {
                if (clgList !== req.body.collegeId) {
                    filterlist.push(uncrs);
                }
            });
        });
        return res.status(200).send({ status_code: 200, data: filterlist, message: "Course deleted successfully." })
    },

    // GET Hostel
    async getHostel(req, res) {
        try {
            let hostel = await Hostel.find({})
            console.log(hostel);
            return res.status(200).json(hostel);
        } catch (error) {
            res.status(400).send(error)
        }
    },


    //ADD Hostel
    async createHostel(req,res){
        const request = req.body;
        try {
            try {
                let hostel = await Hostel.create(request);
                let hostel_list = await Hostel.find();
                return res.status(200).send({ status_code: 200, hostel: hostel_list, message: "Hostel created successfully." });
            } catch (err) {
                return res.status(400).send({ message: "Something Went Wrong!" })
            }
        } catch (error) {
            res.status(400).send(error)
            
        }
    },


    //UPDATE Hostel
    async updateHostel(req,res){
        let request = req.body;
        try {
            var hostel = await Hostel.findOneAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        title: request.title,
                        fees:request.fees,
                        description: request.description
                    },
                },
                { new: true }
            );
            return res.status(200).send({ status_code: 200, "hostel": hostel, message: "hostel updated successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

}

