import mongoose from 'mongoose';

const otherModel = new mongoose.Schema({
    naac: {
        type: String
    },
    nirf:{
        type: String
    },
    nba:{
        type: String
    },
    bangal_credit_card:{
        type: String
    },
    cuet:{
        type: String
    },
    aj_ranking:{
        type: String
    },
    property_id:{
        type: String
    },
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

);

const Other = mongoose.model('other', otherModel)

export default Other;