
import mongoose from 'mongoose';

const teamLeaderSchema = new mongoose.Schema({
    type: {
        type: String
    },
    teamLeader:{
        type:String
    },
    team:{
        type:Array
    }
  
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

);

const Teamleader = mongoose.model('teamLeader', teamLeaderSchema)

export default Teamleader;