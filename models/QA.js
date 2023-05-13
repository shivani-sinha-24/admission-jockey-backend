
import mongoose from 'mongoose';

const qasModel = new mongoose.Schema({
    ques: {
        type: String
    },
    answer:{
        type: String
    },
    property_id:{
        type: String
    },
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

);

const Qas = mongoose.model('qas', qasModel)

export default Qas;