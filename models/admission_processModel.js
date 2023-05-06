
import mongoose from 'mongoose';

const admission_processModel = new mongoose.Schema({
    title: {
        type: String
    },
    description:{
        type: String
    },
    // admission_process_img:{
    //     type: String,
    //     allowNull: false
    // },
    property_id:{
        type: String
    },
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

);

const Admission_process = mongoose.model('admission_process', admission_processModel)

export default Admission_process;