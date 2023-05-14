import College from "../models/collegeModel.js";
// import CategoryModal from "../models/categoryModal.js";
// import Validator from "validatorjs";
import reply from '../common/reply.js';
import Status from "../models/statusModel.js";
// import _ from 'lodash';


export default {


    // College Create:
    async collegeCreate(req, res) {
        let request = req.body;
        // request.logo = req?.files == undefined ? null : req?.files?.logo != undefined && 'images/' + req?.files?.logo[0]?.filename;
        request.image = req?.file == undefined ? null : 'images/' + req?.file?.filename;
        // request.featured_img = req?.files == undefined ? null : req?.files?.featured_img != undefined && 'public/uploads/' + req?.files?.featured_img[0]?.filename;
        // request.approve_by = JSON.parse(request.approve_by);
        // request.affilite_by = JSON.parse(request.affilite_by);
        let exist = await College.findOne({ "email": request.email });
        if (exist) {
            return res.status(200).send({ message: 'This email and contact number is already exists!' });
        }
        try {
            let college = await College.create(request);
            return res.status(200).send({ status_code: 200, college: college, message: "College property created successfully." });
        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })

        }
    },

    // Get Colleges
    async getCollege(req, res) {
        try {

            let colleges = await College.find({});
            let tab_status = await Status.find({ status_for: "2" });

            return res.status(200).send({ colleges: colleges, tab_status: tab_status })

        } catch (err) {
            console.log(err, "error");
            return res.status(400).send({ message: "Unable to fetch colleges datails!" })
        }
    },

    // Get Colleges
    async getCollegeAffliateApprove(req, res) {
        try {

            let colleges = await College.find({});
            let uniqueAffiliate = [], uniqueApprove = [];

            colleges?.map((item, i) => {
                item?.approve_by?.map((data, index) => {
                    uniqueApprove?.push(data);
                })
                item?.affilite_by?.map((data, index) => {
                    uniqueAffiliate?.push(data);
                })
            })

            const uniqueAff = [...new Map(uniqueAffiliate.map(item =>
                [item["value"], item])).values()]
            const uniqueApp = [...new Map(uniqueApprove.map(item =>
                [item["value"], item])).values()]

            return res.status(200).send({
                uniqueAff: uniqueAff,
                uniqueApp: uniqueApp
            })

        } catch (err) {
            console.log(err, "error");
            return res.status(400).send({ message: "Unable to fetch colleges datails!" })
        }
    },

    // Update College
    async updateCollege(req, res) {
        try {
            let request = req.body
            // let data = req.file
            // request.image = data?.filename;
            // if (!request) {
            //     return res.status(400).send({ message: "All Input Field Is Required" });
            // }
            // let _id = req.query.id
            // const college = await College.findById(_id);
            // if (!college) {
            //     return res.status(404).send({ message: "College Not Found !!" })
            // }
            // await College.findByIdAndUpdate(_id, request)
            // return res.status(200).send(request)
            // let existMain = exist.find(o => o.title === request.title);
            // if (existMain?.length > 0) {
            //     return res.status(200).send({ message: 'This title is already exists!' });
            // }
            var college = await College.findOneAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        email: request.email,
                        website: request.website,
                        phone_no: request.phone_no,
                        edu_type: request.edu_type,
                        name: request.name,
                        short_name: request.short_name,
                        est_year: request.est_year,
                        approved_by: request.approve_by,
                        affliated_by: request.affilite_by,
                        college_type:"Gov"

                    },
                },
                { new: true }
            );
            console.log(college,"kartikcollege");
            return res.status(200).send({ status_code: 200, "college": college, message: "College updated successfully." });
        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }

    },

    // Delete College:
    async deleteCollege(req, res) {
        try {
            let id = req.query.id;
            const college = await College.findByIdAndRemove(id);
            const collegeList = await College.find();
            if (!college) {
                return res.status(404).send({ cmessage: "College not found" })
            }
            return res.status(200).json({ collegeList: collegeList })
        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }
    },

    // async createCollegeCategory(req, res) {

    //     let request = req.body;
    //     console.log("req :",req.body);
    //     console.log(req.files,"files ajay anuj")
    //     request.logo = req?.files == undefined ? null : req?.files?.logo != undefined && 'public/uploads/' + req?.files?.logo[0]?.filename;
    //     request.image = req?.files == undefined ? null : req?.files?.featured_img != undefined && 'public/uploads/' + req?.files?.featured_img[0]?.filename;

    //     //request.approve_by = JSON.parse(request.approve_by);
    //     //request.affilite_by = JSON.parse(request.affilite_by);

    //     let exist = await CategoryModal.findOne({ "email": request.email });

    //     if (exist) {
    //         return res.status(200).send({ message: 'This email and contact number is already exists!' });
    //     }

    //     try {

    //         let category = await CategoryModal.create(request)
    //         return res.status(200).send({status_code:200,category:category, message:"College category created successfully."});

    //     } catch (err) {
    //         return res.status(400).send({ message: "Something Went Wrong!" })

    //     }
    // },


}