import mongoose from 'mongoose';


const collegeCourseSchema = new mongoose.Schema({

    fees: {
        type: Number,
        allowNull: false
    },
    CollegeID: {
        type: String,
        allowNull: false
    },
    UniversityID: {
        type: String,
        allowNull: false
    },
    UniversityCourseID: {
        type: String,
    },
},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const Collegecourse = mongoose.model('collegecourse', collegeCourseSchema)

export default Collegecourse;