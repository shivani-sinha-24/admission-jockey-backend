
import mongoose from 'mongoose';

const teamleadModel = new mongoose.Schema({
    name: {
        type: String
    },
    designation:{
        type: String
    },
    team_lead_img:{
        type: String,
        allowNull: false
    },
    property_id:{
        type: String
    },
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

);

const Team_lead = mongoose.model('team_lead', teamleadModel)

export default Team_lead;