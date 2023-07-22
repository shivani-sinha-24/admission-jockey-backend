import College from "../models/collegeModel.js";
// import CategoryModal from "../models/categoryModal.js";
// import Validator from "validatorjs";
import reply from '../common/reply.js';
import webList from "../models/websiteListModel.js";
import Query from "../models/queryModel.js";
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

}