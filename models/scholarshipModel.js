
import mongoose from 'mongoose';

const scholarshipModel = new mongoose.Schema({
    title: {
        type: String
    },
    description:{
        type: String
    },
    scholarship_img:{
        type: String,
        allowNull: false
    },
    property_id:{
        type: String
    },
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

);

const Scholarship = mongoose.model('scholarship', scholarshipModel)

export default Scholarship;