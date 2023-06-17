import mongoose from 'mongoose';


const collegeSchema = new mongoose.Schema({

    email: {
        type: String,
        allowNull: false

    },
    phone: {
        type: String,
        allowNull: false

    },
    website: {
        type: String,
        allowNull: false

    },
    edu_type: {
        type: String,
        allowNull: false

    },
    college_type: {
        type: String,
        allowNull: false
    },
    name: {
        type: String,
        allowNull: false

    },
    short_name: {
        type: String,
        allowNull: false

    },
    est_year: {
        type: String,
        allowNull: false

    },
    approve_by: {
        type: String
    },
    affilite_by: {
        type: Array
    },
    image: {
        type: String,
        allowNull: false
    },
    propertymanagerId: {
        type: String,
    },
    propertyClaimOtp:{
        type:String
    },
    // featured_img:[{
    //     type: String,
    //     allowNull: false
    // }],
    // broucher: {
    //     type: String,
    //     allowNull: false

    // },
    // broucher: {
    //     type: String,
    //     allowNull: false

    // },
    // info_video_link:{
    //     type: String,
    //     allowNull: false
    // },
    // application_link:{
    //     type: String,
    //     allowNull: false
    // },
    // podcast_hindi:{
    //     type: String,
    //     allowNull: false
    // },
    // podcast_eng:{
    //     type: String,
    //     allowNull: false
    // },
    // tab_status: {
    //     type: String,
    //     default: "2"
    // },
    // status: {
    //     type: String,
    //     default: "1", // 1=Active, 0=inactive
    // },
    created_by_user_id: {
        type: String
    }
},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const College = mongoose.model('college', collegeSchema)

export default College;