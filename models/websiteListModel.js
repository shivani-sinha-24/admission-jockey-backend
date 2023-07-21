
import mongoose from 'mongoose';

const webuniversitylistSchema = new mongoose.Schema({
    collegeList: {
        type: Array,
    },
    universityList: {
        type: Array,
    },
    collegeLogoList: {
        type: Array,
    },
    universityLogoList: {
        type: Array,
    }
},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const WebUniversityList = mongoose.model('webuniversitylist', webuniversitylistSchema)

export default WebUniversityList;