import mongoose from 'mongoose';


const seoSchema = new mongoose.Schema({

    title: {
        type: String,
        allowNull: false
    },
    description: {
        type: String,
        allowNull: false
    },
    url: {
        type: String,
        allowNull: false
    },
    focus_keyword: {
        type: Array
    }
},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const SEOModal = mongoose.model('seo', seoSchema);

export default SEOModal;