import Status from "../models/statusModel.js"
import Validator from "validatorjs"
import PropertyType from "../models/propertyTypeModel.js";
import Gallery from "../models/galleryModel.js";
import Team_lead from "../models/teamleadModel.js";
import Placement from "../models/placementModel.js";
import Loan from "../models/LoanModel.js";
import UniversityCourse from "../models/universitycourseModel.js";
import Scholarship from "../models/scholarshipModel.js";
import Admission_process from "../models/admission_processModel.js";
import Announcement from "../models/announcementModel.js";
import Faqs from "../models/Faqs.js";
import Qas from "../models/QA.js";


export default {

    // Create Status
    async createPropertyType(req, res) {

        try {
            let request = req.body;
            //console.log("req",req.file);

            request.property_img = req?.file == undefined ? null : req?.file?.filename != undefined && 'public/uploads/' + req?.file?.filename;

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
    async getPropertyType(req,res) {
        try {
            let PropertyTypeData = await PropertyType.find();
            return res.status(200).json(PropertyTypeData)

        } catch (error) {
            res.status(400).send(error)
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
                console.log(gallery);

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
                        team_lead_img: request.team_lead_img,
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
        console.log(req.file, "please")
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
        console.log(req.file, "please")
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
    // CREATE UNIVERSITY COURSE
    async createUniversityCourse(req, res) {

        let request = req.body;

        try {

            let exist = await UniversityCourse.findOne({ "name": request.name });

            if (exist) {
                return res.status(200).send({ message: 'This name is already exists!' });
            }

            let placement = await UniversityCourse.create(request);

            return res.status(200).send({ status_code: 200, placement: placement, message: "University course created successfully." });

        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },
    async getUniversityCourse(req, res) {
        try {
            let universityCourse = await UniversityCourse.find({})

            return res.status(200).json(universityCourse);

        } catch (error) {
            res.status(400).send(error)
        }
    },
    
}
