
import mongoose from 'mongoose';

const loanModel = new mongoose.Schema({
    title: {
        type: String
    },
    description:{
        type: String
    },
    loan_img:{
        type: String,
        allowNull: false
    },
    property_id:{
        type: String
    },
},

{ timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'} }

);

const Loan = mongoose.model('loan', loanModel)

export default Loan;