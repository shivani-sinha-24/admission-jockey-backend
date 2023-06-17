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
        type: String

    },
    password: {
        type: String
    },
    status: {
        type: String,
        default: "Active",
    },
    image: {
        type: String,
        // get(image) {

        //     return `${process.env.API_HOST}/${image}`
        // },
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
        type: String
    },
    description:{
        type: String,
    },
    isTeamLeader:{
        type: Boolean,
    },
    underTeam:{
        type: Boolean,
    },
    permissions:{
        type:Object
    }
},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const User = mongoose.model('users', userSchema)

export default User;