
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    parent: {
        type: String
    },
     property_name: {
        type: String,       
    },
    property_desc: {
        type: String,       
    },
    property_img: {
        type: String,       
    },
    form_url:{
        type: String,  
    },
    status: {
        type: String,
        default: "1", // 1=Active, 0=inactive
    },
    propertyClaimOtp:{
        type:String
    }    
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }
);

const Property = mongoose.model('property', propertySchema)

export default Property;