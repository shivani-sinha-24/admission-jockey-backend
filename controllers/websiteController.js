import College from "../models/collegeModel.js";
// import CategoryModal from "../models/categoryModal.js";
// import Validator from "validatorjs";
import reply from '../common/reply.js';
import webList from "../models/websiteListModel.js";
// import _ from 'lodash';


export default {
    async createCollegeList(req, res) {
        console.log(req.body);
        let collegeList=webList.find({});
        console.log(collegeList);
    }

}