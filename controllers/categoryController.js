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
            let parentExit = await Category.findOne({ "name": request.parent });
            if (parentExit) {
                request.parentCount = parentExit?.parentCount+1;
                request.branch = [parentExit?.name,...parentExit?.branch];
            } else {
                request.parentCount = 0;
                request.branch = [];
            }
            let category = await Category.create(request);
            return res.status(200).send({ status_code: 200, category: category, message: "Category created successfully." });
        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })
        }
    },


    // Get Colleges Category
    async getCategory(req, res) {
        try {

            let categories = await Category.find();
            let tab_status = await Status.find({ status_for: "2" });
            // return res.status(200).send({ categories: categories, tab_status: tab_status })
            return res.status(200).json(categories);

        } catch (err) {
            console.log(err, "error");
            return res.status(400).send({ message: "Unable to fetch colleges category datails!" })
        }
    },


    // Update College
    async updateCategory(req, res) {
        try {
            let request = req.body;
            if (req?.files['image'][0]?.filename || req?.files['logo'] == undefined) {
                request.image = 'images/' + req?.files['image'][0]?.filename;
            }
            if (req?.files['logo'][0]?.filename || req?.files['image'] == undefined) {
                request.logo = 'images/' + req?.files['logo'][0]?.filename;
            }
            if (req?.files['image'][0]?.filename && req?.files['logo'][0]?.filename) {
                request.image = 'images/' + req?.files['image'][0]?.filename;
                request.logo = 'images/' + req?.files['logo'][0]?.filename;
            }
            if (!request) {
                return res.status(400).send({ message: "All Input Field Is Required" });
            }
            let _id = req.body.id;
            const category = await Category.findById(_id);
            if (!category) {
                return res.status(404).send({ message: "Category Not Found !!" })
            }
            await Category.findByIdAndUpdate(_id, request)
            return res.status(200).send({ status_code: 200, category: request, message: "Category updated successfully." })

        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }

    },


    // Delete College:
    async deleteCategory(req, res) {
        try {
            let id = req.query.id
            const category = await Category.findByIdAndRemove(id)
            if (!category) {
                return res.status(404).send({ message: "Category not found" })
            }
            return res.status(200).send({ status_code: 200, id: id, message: "Category deleted successfully." })
        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }
    },



}