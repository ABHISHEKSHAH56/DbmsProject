const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    facultyId:{
     type:mongoose.Schema.ObjectId,
     ref:"Faculty",
     require :true
    },
    students:[
      {
       type:mongoose.Schema.ObjectId,
       ref:"Student"
     }],
     courseName:{
       type:String,
       required:[true,"Please enter the course name"]
     },
     department:{
      type:String,
      required:[true,"Please enter the department name"]

     },
     batch:{
      type:String,
      required:[true,"Please enter the batch name"]
     },
     courseDescription:{
      type:String,
      required:[true,"Please enter the courseDescription"]
     },
     createdBy:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      require :true

     }
 },{timestamps: true});
 

module.exports = mongoose.model("Course", courseSchema);