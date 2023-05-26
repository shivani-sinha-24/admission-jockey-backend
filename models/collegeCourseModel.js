import mongoose from 'mongoose';


const collegeCourseSchema = new mongoose.Schema({


    name: {
        type: String,
        allowNull: false
    },
    full_name: {
        type: String,
        allowNull: false
    },
    duration: {
        type: Number,
        allowNull: false
    },
    type: {
        type: String,
        allowNull: false
    },
    fees: {
        type: Number,
        allowNull: false
    },
    category: {
        type: String,
        allowNull: false
    },
    sub_category: {
        type: String,
        allowNull: false
    },
    stream: {
        type: String,
        allowNull: false

    },
    CollegeID: {
        type: String,
        allowNull: false
    },
    lateral_entry: {
        type: String
    },
    eligibilty: {
        type: String
    },
    description: {
        type: String,
        allowNull: false
    },
},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const Collegecourse = mongoose.model('collegecourse', collegeCourseSchema)

export default Collegecourse;