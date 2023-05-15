import Category from "../models/categoryModal.js";
// import Validator from "validatorjs";
import reply from '../common/reply.js';
import Status from "../models/statusModel.js";
// import _ from 'lodash';


export default {

    //College Category create
    async createCategory(req, res) {
        let request = req.body;
        request.image = 'images/' + req?.files['image'][0]?.filename;
        request.logo = 'images/' + req?.files['logo'][0]?.filename;
        let exist = await Category.findOne({ "name": request.name });
        if (exist) {
            return res.status(200).send({ message: 'This name is already exists!' });
        }
        try {
            let category = await Category.create(request);
            return res.status(200).send({ status_code: 200, category: category, message: "Category created successfully." });
        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })
        }
    },


    // Get Colleges Category
    async getCollegeCategory(req, res) {
        try {

            let categories = await CategoryModal.find({});
            let tab_status = await Status.find({ status_for: "2" });

            return res.status(200).send({ categories: categories, tab_status: tab_status })

        } catch (err) {
            console.log(err, "error");
            return res.status(400).send({ message: "Unable to fetch colleges category datails!" })
        }
    },


    // Update College
    async updateCollegeCategory(req, res) {
        try {
            let request = req.body
            //console.log(req.body);

            let data = req.files
            //console.log("data",data);
            // request.logo = data.logo[0]?.filename;
            // request.featured_img = data.featured_img[0]?.filename;
            //console.log(data.logo[0].fieldname);

            request.logo = req?.files == undefined ? null : req?.files?.logo != undefined && 'public/uploads/' + req?.files?.logo[0]?.filename;
            request.featured_img = req?.files == undefined ? null : req?.files?.featured_img != undefined && 'public/uploads/' + req?.files?.featured_img[0]?.filename;

            if (!request) {
                return res.status(400).send({ message: "All Input Field Is Required" });
            }

            let _id = req.body.id
            const category = await CategoryModal.findById(_id);
            if (!category) {
                return res.status(404).send({ message: "Category Not Found !!" })
            }

            await CategoryModal.findByIdAndUpdate(_id, request)
            //console.log("request",request);
            return res.status(200).send({ status_code: 200, category: request, message: "College category updated successfully." })

        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }

    },


    // Delete College:
    async deleteCollegeCategory(req, res) {
        try {
            let id = req.query.id
            const category = await CategoryModal.findByIdAndRemove(id)

            if (!category) {
                return res.status(404).send({ message: "Category not found" })
            }
            return res.status(200).send({ message: "Category deleted successfully" })
        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }
    },



}