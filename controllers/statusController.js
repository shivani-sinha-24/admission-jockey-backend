import Status from "../models/statusModel.js"
import Validator from "validatorjs"


export default {

    // Create Status
    async createStatus(req, res) {

        try {
            let request = req.body;

            if (Object.keys(request).length == 0) {
                return res.send("All input is required!");
            }

            let validation = new Validator(request, {
                name: 'required',
                description: 'required',
                color_code: 'required',
                status_for: 'required'
            });

            if (validation.fails()) {
                let err_key = Object.keys(Object.entries(validation.errors)[0][1])[0]
                return res.send(validation.errors.first(err_key))
            }

            let statuses = await Status.create(request)
            return res.status(200).json(statuses)

        } catch (error) {
            res.status(400).send(error)
        }
    },

    // Update Status
    async updateStatus(req, res) {
        try {
            let request = req.body
            if (!request) {
                return res.send("All input is required!");
            }

            let _id = req.query.id
            const status = await Status.findById(_id);
            if (!status) {
                return res.status(400).send({ message: "Status not found" })
            }

            await Status.findByIdAndUpdate(_id, request)
            return res.status(200).send({ message: "Status updated successfully" })

        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }
    },

    // Delete Status:
    async deleteStatus(req, res) {
        try {
            let id = req.query.id
            const status = await Status.findByIdAndRemove(id)

            if (!status) {
                return res.status(404).send({ message: "Status not found" })
            }
            return res.status(200).send({ message: "Status deleted successfully" })
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    // Get Status
    async getStatus(req, res) {

        let request = req.query
        try {
            let Condition = {};

            if (request.name) {
                Condition.name = request.name
            }
            if (request.color_code) {
                Condition.color_code = request.color_code
            }
            if (request.status_for) {
                Condition.status_for = request.status_for
            }
            console.log(Condition, "Condition")

            let page = parseInt(request.page);
            let limit = parseInt(request.limit)
            // const page = request.page ? parseInt(request.page) : 1;
            // const limit = request.limit ? parseInt(request.limit) : 5;

            let total = await Status.find(Condition).count()

            let pages = Math.ceil(total / limit);

            let previousPage = (page <= 1) ? null : (page - 1);
            let nextPage = (page >= pages) ? null : (page + 1);

            let statuses = await Status.find(Condition).skip((page - 1) * limit).limit(limit)

            return res.status(200).send({ total: total, statuses, page: page, per_page: limit, previousPage: previousPage, nextPage: nextPage })

        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }
    },

    // Create Status_For
    async createStatusFor(req, res) {
        try {
            let request = req.body
            let statuses = await Status.create(request)
            return res.status(200).send(statuses)

        } catch (err) {
            return res.status(400).send(err)
        }
    }
}