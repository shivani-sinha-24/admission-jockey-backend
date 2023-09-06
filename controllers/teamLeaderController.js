import College from "../models/collegeModel.js";
// import CategoryModal from "../models/categoryModal.js";
// import Validator from "validatorjs";
import reply from '../common/reply.js';
import webList from "../models/websiteListModel.js";
import Query from "../models/queryModel.js";
import User from "../models/userModel.js";
import Universitycourse from "../models/universitycourseModel.js";


export default {

    async getTeamListByName(req, res) {
        let request = req?.body;
        const query = await Query.find({ isAssigned: true });
        return res.status(200).json(query);
    },
    
    async getMyTeamList(req, res) {
        const myTeam = await User.find({ role: 3 });
        return res.status(200).json(myTeam);
    }

}