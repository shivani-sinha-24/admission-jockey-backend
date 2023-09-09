import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone_number: {
        type: String
    },
    course: {
        type: String
    },
    isAssigned: {
        type: Boolean,
        default: false
    },
    assignedName: {
        type: String
    },
    budget:{
        type: String
    },
    city:{
        type: String
    },degree:{
        type:String
    },
    dob:{
        type:String
    },
    emi:{
        type:String
    },
    gender:{
        type:String
    },
    hours:{
        type:String
    },
    priority:{
        type:String
    },
    qualification:{
        type:String
    },
    reason:{
        type:String
    },
    score:{
        type:String
    },
    state:{
        type:String
    },
    working:{
        type:String
    },
    status:{
        type:String
    }

},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)
const Query = mongoose.model('query', querySchema)

export default Query;