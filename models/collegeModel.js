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
    property_address: {
        type: String
    },
    property_state: {
        type: String
    },
    property_district: {
        type: String
    },
    approve_by: {
        type: String
    },
    affilite_by: {
        type: Array
    },
    logo: {
        type: String,
    },
    image: {
        type: String,
        allowNull: false
    },
    propertyManagerId: {
        type: String,
    },
    propertyClaimOtp: {
        type: String
    },
    isClaimed: {
        type: Boolean
    },
    created_by_user_id: {
        type: String
    }
},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const College = mongoose.model('college', collegeSchema)

export default College;