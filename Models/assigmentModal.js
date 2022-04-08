const mongoose = require("mongoose");

const submissionSchema =new mongoose.Schema({
    student:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      require :true  
    },
    assigmentId:{
      type:mongoose.Schema.ObjectId,
      ref:"Assigment",
      require :true
  
    },
    status:{
      type:String,
      enum:["Missing","Assign","Turn Late ","Submitted"],
      default:"Assign"  
    },
    data:{
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      }
  
    },    
    marks:Number
  },{timestamps: true})
  
  
  const assigmentSchema = new mongoose.Schema({
      status:{
        type:String,
        enum:["Publish","Draft"],
        default:"Draft"
      },
      deadline:{
        type: Date,
        required:[true,"Please enter the deadline"]
      },       
      course:{
          type:mongoose.Schema.ObjectId,
          ref:"Course",
          require :true  
      },
      assigmentType:{
        type:String,
        enum:["Assigment","ClassTest","SubjectiveTest","McqTest"],
        default:"Assigment"  
      },
      title:{
        type:String,
        required:[true,"Please enter the title "]
      },
      material:{
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        }
      }, //file
      description:{
        type:String
      },
      submissionDetails:[submissionSchema],
  },{timestamps: true});
  

module.exports = mongoose.model("Assigment", assigmentSchema);