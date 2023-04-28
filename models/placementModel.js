
import mongoose from 'mongoose';

const placementModel = new mongoose.Schema({
    title: {
        type: String
    },
    description:{
        type: String
    },
    placement_img:{
        type: String,
        allowNull: false
    },
    property_id:{
        type: String
    },
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

);

const Placement = mongoose.model('placement', placementModel)

export default Placement;