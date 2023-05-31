import mongoose from 'mongoose';


const universityCourseSchema = new mongoose.Schema({


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
    universityID: {
        type: String,
        allowNull: false
    },
    lateral_entry: {
        type: String
    },
    eligibilty: {
        type: String
    },
    propertyId: {
        type: String
    },
    description: {
        type: String,
        allowNull: false
    },
    collegeList: {
        type: Array
    }
    // status: {
    //     type: String,
    //     default: "1", // 1=Active, 0=inactive
    // },
},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const Universitycourse = mongoose.model('universitycourse', universityCourseSchema)

export default Universitycourse;