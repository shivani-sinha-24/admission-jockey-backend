import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        allowNull: false

    },
    contact_no: {
        type: String,
        allowNull: false

    },
    alt_contact_no: {
        type: String,
        allowNull: false

    },
    password: {
        type: String
    },
    status: {
        type: String,
        default: "1", // 1=Active, 0=notActive
    },
    image: {
        type: String,
        get(image) {

            return `${process.env.API_HOST}/${image}`
        },
        // default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA1asRMWrlXo4OqYty4xgM5YmoZ6DjhWhEcw&usqp=CAU"

    },
    role: {
        type: String,
        // default: 0 // 0=User
    },
    otp: {
        type: String
    },
    expired_at: {
        type: String
    },
    cafename: {
        type: String,
        default: null
    },
    cafecity: {
        type: String,
        default: null
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    tab_status: {
        type: String,
        default: "0"
    },
    description:{
        type: String,
    }

},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const User = mongoose.model('users', userSchema)

export default User;