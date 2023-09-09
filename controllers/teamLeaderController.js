import College from "../models/collegeModel.js";
// import CategoryModal from "../models/categoryModal.js";
// import Validator from "validatorjs";
import reply from '../common/reply.js';
import webList from "../models/websiteListModel.js";
import Query from "../models/queryModel.js";
import User from "../models/userModel.js";
import Universitycourse from "../models/universitycourseModel.js";
import Teamleader from "../models/userteamleaderModel.js";


export default {

    async getTeamListByName(req, res) {
        let request = req?.body;
        const query = await Query.find({ isAssigned: true });
        return res.status(200).json(query);
    },
    
    async getMyTeamList(req, res) {
        const {teamLeader} = req?.params;
        const teams = await Teamleader.find({teamLeader})
        let teamMembers = teams.map(team=>(team.team))
        let members = []
        members = members.concat(teamMembers)
        // Use concat to merge all arrays into one
        const mergedArray = [].concat(...members);
        // Use Set to eliminate duplicates, and then convert it back to an array
        const uniqueArray = [...new Set(mergedArray)];
        
        let membersArray = await Promise.all(
            uniqueArray?.map(async (uni) => {
                    const member = await User.find({ name: uni });
                    return member;
            })
        );
        // Merge all arrays into one
        const mergedMembers = [].concat(...membersArray);
        return res.status(200).send(mergedMembers);

        // const myTeam = await User.find({ role: 3 });
        // return res.status(200).send(myTeam);
    },
    async getTeamList(req, res) {
        const {teamLeader} = req?.params;
        const teams = await Teamleader.find({teamLeader})
        let teamMembers = teams.map(team=>(team.team))
        let members = []
        members = members.concat(teamMembers)
        // Use concat to merge all arrays into one
        const mergedArray = [].concat(...members);
        // Use Set to eliminate duplicates, and then convert it back to an array
        const uniqueArray = [...new Set(mergedArray)];
        
        let membersArray = await Promise.all(
            uniqueArray?.map(async (uni) => {
                    const member = await User.find({ name: uni });
                    return member;
            })
        );
        // Merge all arrays into one
        const mergedMembers = [].concat(...membersArray);
        return res.status(200).send(mergedMembers);
    }


}