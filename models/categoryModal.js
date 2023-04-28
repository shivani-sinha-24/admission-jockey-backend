import mongoose from 'mongoose';


const collegeCategorySchema = new mongoose.Schema({
 
    parent_id: {
        type: String,
        allowNull: false
    },
    logo: {
        type: String,
        allowNull: false
    },
    featured_img:{
        type: String,
        allowNull: false
    },
    description: {
        type: String,
        allowNull: false
    },
    tab_status: {
        type: String,
        default: "2"
    },
    status: {
        type: String,
        default: "1", // 1=Active, 0=inactive
    },
},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const CategoryModal = mongoose.model('category', collegeCategorySchema);

export default CategoryModal;