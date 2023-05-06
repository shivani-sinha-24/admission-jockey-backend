
import mongoose from 'mongoose';

const announcementModel = new mongoose.Schema({
    title: {
        type: String
    },
    description:{
        type: String
    },
    // image:{
    //     type: String,
    //     allowNull: false
    // },
    property_id:{
        type: String
    },
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

);

const Announcement = mongoose.model('announcement', announcementModel)

export default Announcement;