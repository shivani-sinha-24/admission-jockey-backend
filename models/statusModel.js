
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
  
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

);

const Status = mongoose.model('status', statusSchema)

export default Status;