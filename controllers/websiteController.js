import College from "../models/collegeModel.js";
// import CategoryModal from "../models/categoryModal.js";
// import Validator from "validatorjs";
import reply from '../common/reply.js';
import WebList from "../models/websiteListModel.js";
// import _ from 'lodash';


export default {
    async createCollegeList(req, res) {
        try {
            let request = req.body;
            let WebListArray = await WebList.find({});
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async createUniversityList(req, res) {
        try {
            let request = req.body;
            let WebListArray = await WebList.find({});
            if (WebListArray[0]?.universityList?.length > 0 || WebListArray[0]?.collegeList?.length > 0 || WebListArray[0]?.universityLogoList?.length > 0 || WebListArray[0]?.collegeLogoList?.length > 0) {
                let FinalList = [...WebListArray[0]?.universityList, ...req?.body?.universityList];
                await WebList.findOneAndUpdate(
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
                let WebListResult = await WebList.find();
                return res.status(200).send({ status_code: 200, "WebListResult": WebListResult[0].universityList, message: "Universities added successfully." });
            } else {
                let WebListResult = await WebList.create(request);
                return res.status(200).send({ status_code: 200, "WebListResult": WebListResult, message: "Universities added successfully." });
            }
        } catch (error) {
            res.status(400).send(error)
        }
    },


    // Get Colleges Category
    async getCollegeWebsiteList(req, res) {
        try {
            let WebListResult = await WebList.find();
            return res.status(200).send({ status_code: 200, "WebListResult": WebListResult, message: "College added successfully." });
        } catch (err) {
            console.log(err, "error");
            return res.status(400).send({ message: "Unable to fetch seo datails!" })
        }
    },

}