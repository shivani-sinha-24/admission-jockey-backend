import SEO from "../models/seoModel.js";


export default {

    //SEO create
    async createSEO(req, res) {
        let request = req.body;
        let exist = await SEO.findOne({ "title": request.title });
        if (exist) {
            return res.status(200).send({ message: 'This title is already exists!' });
        }
        try {
            let seo = await SEO.create(request);
            return res.status(200).send({ status_code: 200, seo: seo, message: "SEO created successfully." });
        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })
        }
    },


    // Get Colleges Category
    async getSEO(req, res) {
        try {
            let news = await SEO.find();
            return res.status(200).json(news);
        } catch (err) {
            console.log(err, "error");
            return res.status(400).send({ message: "Unable to fetch seo datails!" })
        }
    },


    // Delete College:
    async deleteSeo(req, res) {
        try {
            let id = req.query.id;
            const news = await SEO.findByIdAndRemove(id);
            if (!news) {
                return res.status(404).send({ message: "Seo not found" })
            }
            return res.status(200).send({ status_code: 200, id: id, message: "Seo deleted successfully." })
        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }
    },

    // Update User
    async updateSeo(req, res) {
        try {
            let request = req.body;
            if (!request) {
                return res.json(reply.failed("All input is required"));
            }
            const seoMain = await SEO.findById({ _id: req.body.id });
            if (!seoMain) {
                return res.json(reply.failed("Seo not found!!"))
            }
            var seo = await SEO.findOneAndUpdate(
                { _id: req.body.id },
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                        url:req.body.url,
                        focus_keyword:req.body.focus_keyword
                    },
                }
            );
            if (seo) {
                return res.status(200).send({ status_code: 200, "seo": seo, message: "Seo updated successfully." });
            }
        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }
    },


}