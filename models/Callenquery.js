import mongoose from 'mongoose';
const schema=mongoose.Schema;
const Callenqueryschema=new schema({

    name:{
        type:String
    },
  contact_no:{
    type:Number
  },
  city:{
    type:String
  },
  course:{
    type:String
  },
  date:{
    type:Date
  }
},{
    timestamps:true
})
