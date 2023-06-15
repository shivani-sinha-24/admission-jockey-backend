
import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String,       
    },
     color_code: {
        type: String,       
    },
    status_for: {
        type: String,       
    },
    created_by_user_id:{
        type: String
    }
  
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

);

const Status = mongoose.model('status', statusSchema)

export default Status;