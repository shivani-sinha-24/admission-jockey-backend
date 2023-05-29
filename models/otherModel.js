import mongoose from "mongoose";

const othersSchema = new mongoose.Schema({
    naac:{
        type:String,
    },
    nirf:{
        type:String,
    },
    nba:{
        type:String,
    },
    bengalCreditCard:{
        // type:Boolean,
        type:String,
    },
    cuet:{
        // type:Boolean,
        type:String,
    },
    aj_ranking:{
        type:String,
    },
    property_id:{
        type: String
    },
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

)


const Others = mongoose.model('other', othersSchema);

export default Others;