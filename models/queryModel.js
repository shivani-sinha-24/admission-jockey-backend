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
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)
const Query = mongoose.model('query', querySchema)

export default Query;