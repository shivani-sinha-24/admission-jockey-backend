import College from "../models/collegeModel.js";
// import CategoryModal from "../models/categoryModal.js";
// import Validator from "validatorjs";
import reply from '../common/reply.js';
import webList from "../models/websiteListModel.js";
import Query from "../models/queryModel.js";
import Universitycourse from "../models/universitycourseModel.js";
import Scholarship from "../models/scholarshipModel.js";
import Hostel from "../models/hostelModel.js";
import Gallery from "../models/galleryModel.js";


export default {
    async createCollegeList(req, res) {
        console.log(req.body);
        let collegeList=webList.find({});
        console.log(collegeList);
    },
    async createQueryList(req,res){
        let request = req?.body;
        const query = await Query.create(request);
        res.status(200).send({query,message:"Query submitted"})
    },

    async getQueryList(req,res){
        let request = req?.body;
        const query = await Query.find({isAssigned:true});
        return res.status(200).json(query);
    },

    async getUniversityCourseWeb(req, res) {
        try {
            let universityCourse = await Universitycourse.find({});
            return res.status(200).json(universityCourse);
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async getCollegesForSelectedCourse(req, res) {
        try {
            const {course} = req?.params;

            const universityCourse = await Universitycourse.find({name:course});

            const universities_with_course = [...new Set (universityCourse?.map(course=>course?.universityID))];

            const university = await College.find({edu_type:'University'})
            const uniDetail =  [...new Set(university?.map(uni=>{return {name:uni.name,id:uni._id}}))];

            const universityNames = [];

            uniDetail.forEach((detail) => {
                universities_with_course.forEach((uni) => {
                    if (detail.id == uni) {
                    universityNames.push(detail.name); 
                    }
                });
            });

            
            const colleges = await College.find({affilite_by: { $in: universityNames }})

            return res.status(200).json(colleges);
          
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async createUniversityList(req, res) {
        try {
            let request = req.body;
            let WebListArray = await webList.find({});
            if (WebListArray[0]?.universityList?.length > 0 || WebListArray[0]?.collegeList?.length > 0 || WebListArray[0]?.universityLogoList?.length > 0 || WebListArray[0]?.collegeLogoList?.length > 0) {
                let FinalList = [...WebListArray[0]?.universityList, ...req?.body?.universityList];
                await webList.findOneAndUpdate(
                    { _id: WebListArray[0]?._id },
                    {
                        $set: {
                            collegeList: WebListArray[0]?.collegeList,
                            universityList: FinalList,
                            collegeLogoList: WebListArray[0]?.collegeLogoList,
                            universityLogoList: WebListArray[0]?.universityLogoList,
                        },
                    },
                    { new: true }
                );
                let WebListResult = await webList.find();
                return res.status(200).send({ status_code: 200, "WebListResult": WebListResult[0].universityList, message: "Universities added successfully." });
            } else {
                let WebListResult = await webList.create(request);
                return res.status(200).send({ status_code: 200, "WebListResult": WebListResult, message: "Universities added successfully." });
            }
        } catch (error) {
            res.status(400).send(error)
        }
    },

    // Get Colleges Category
    async getCollegeWebsiteList(req, res) {
        try {
            let WebListResult = await webList.find();
            return res.status(200).send({ status_code: 200, "WebListResult": WebListResult, message: "College added successfully." });
        } catch (err) {
            console.log(err, "error");
            return res.status(400).send({ message: "Unable to fetch seo datails!" });
        }
    },

    async getCourses(req,res){
        try {
            const universities = (req?.body)
            let uniIdArray = await Promise.all(universities?.map( async uni=>{
                const university = await College.findOne({name:uni})
                return(university?._id);
            }))

            let courses = await Promise.all(uniIdArray.map(async id =>{
                const idString = id?.toString(); // Convert the object to a string
                const course = await Universitycourse.find({universityID:idString})
                return course
            }))

            res.status(200).send(courses);
                
        } catch (error) {
            res.status(400).send(error)
        }
    },
    
    async getWebCompareCollegeList(req, res) {
        try {
            const idArray = req?.body;
            let colleges = await Promise.all(idArray?.map(async id =>{
                const college = await College.findOne({_id:id})
                return college
            }))
                res?.status(200)?.send(colleges)
        } catch (error) {
            res.status(400).send(error)
        }

    },
    async createPrecictQueryList(req,res){
        try {
            let request = req?.body;
            request ={...request,phone_number:request.mobile}
            const query = await Query.create(request);
            res.status(200).send({query,message:"Query submitted"})
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async getScholarship(req,res){
        try {
            let {id} = req?.params
            const scholarship = await Scholarship.findOne({property_id:id})
            res.status(200).send({scholarship,message:"Success"})
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async getHostel(req,res){
        try {
            let {id} = req?.params
            const hostel = await Hostel.find({property_id:id})
            res.status(200).send({hostel,message:"Success"})
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async getGallery(req,res){
        try {
            let images = []
            let {id} = req?.params
            const gallery = await Gallery.find({property_id:id})
            gallery.map(img=>{images = images.concat(img?.gallery_img)})
            images?.length > 0 && res.status(200).send({gallery: images,message:"Success"})
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async getCoursesForCollege(req,res){
        try {
            const {affilite_by} = req?.body;
            console.log(affilite_by)
            let uniIdArray = await Promise.all(affilite_by?.map( async uni=>{
                const university = await College.findOne({name:uni})
                return(university?._id);
            }))

            let courses = await Promise.all(uniIdArray.map(async id =>{
                const idString = id?.toString(); // Convert the object to a string
                const course = await Universitycourse.find({universityID:idString})
                return course
            }))

            // Use the concat method to merge the arrays
            const mergedArray = [].concat(...courses);
            res.status(200).send({courses:mergedArray,message:"Success"})
        } catch (error) {
            res.status(400).send(error)
        }
    },
}