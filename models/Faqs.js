
import mongoose from 'mongoose';

const faqsModel = new mongoose.Schema({
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

const Faqs = mongoose.model('faqs', faqsModel)

export default Faqs;