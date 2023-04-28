
import mongoose from 'mongoose';

const aminitiesSchema = new mongoose.Schema({

    parent: {
        type: String
    },
     child_name: {
        type: String,       
    },
    
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }
);

const Aminity = mongoose.model('aminities', aminitiesSchema)

export default Property;