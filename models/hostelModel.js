import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description:{
        type: String
    },
    fees:{
        type: String,
        allowNull: false
    },
    property_id:{
        type: String
    },
    type_of_hostel:{
        type: String
    }
},
{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }
)

const Hostel = mongoose.model('Hostel',hostelSchema)

export default Hostel