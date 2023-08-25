import College from "../models/collegeModel.js";
// import CategoryModal from "../models/categoryModal.js";
// import Validator from "validatorjs";
import reply from '../common/reply.js';
import webList from "../models/websiteListModel.js";
import Query from "../models/queryModel.js";
import Universitycourse from "../models/universitycourseModel.js";
// import _ from 'lodash';


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


}