const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
  studentId:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    require :true
  },
  name:{
    type: String,
    required: [true, "Please Enter Your Name  "]
  },
  rollNumber:{
    type: String,
    required: [true, "Please Enter Your RollNumber "],
    minLength: [13, "Roll Number  should be greater than 13 characters"],
    unique:true
  },
  batch:{
    type: String,
    required: [true, "Please Enter Your Batch "]
  },
  department:{
    type: String,
    required: [true, "Please Enter Your Department "]
  } 
},{timestamps: true});


module.exports = mongoose.model("Student", studentSchema);