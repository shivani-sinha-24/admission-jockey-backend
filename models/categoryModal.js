import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
 
    parent: {
        type: String,
        allowNull: false
    },
    // logo: {
    //     type: String,
    //     allowNull: false
    // },
    image: {
        type: String,
        allowNull: false
    },
    // featured_img:{
    //     type: String,
    //     allowNull: false
    // },
    description: {
        type: String,
        allowNull: false
    },
    name:{
        type:String,
    }
    // tab_status: {
    //     type: String,
    //     default: "2"
    // },
    // status: {
    //     type: String,
    //     default: "1", // 1=Active, 0=inactive
    // },
},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const CategoryModal = mongoose.model('category', categorySchema);

export default CategoryModal;