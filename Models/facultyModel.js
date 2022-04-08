const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    facultyName:{
      type:String,
      required:[true,"Please enter your Name"]
    },
    facultyId:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      require :true
    },
    department:[{
      name:String,
      course:{
        type:mongoose.Schema.ObjectId,
        ref:"Course",
        require :true
      }
    }],
  
    
  },{timestamps: true});


module.exports = mongoose.model("Faculty", facultySchema);
  