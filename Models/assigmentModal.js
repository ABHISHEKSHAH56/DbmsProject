const mongoose = require("mongoose");

const submissionSchema =new mongoose.Schema({
    student:{
      type:mongoose.Schema.ObjectId,
      ref:"Student",
      require :true  
    },
    status:{
      type:String,
      enum:["Missing","Assign","Turn Late ","Submitted"],
      default:"Submitted"  
    },
    data:[{
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      }
  
    }],    
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
      courseId:{
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
      material:[
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          }
        }

      ],
        
       //file
      description:{
        type:String
      },
      submissionDetails:[submissionSchema],
      createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        require :true 
      }
  },{timestamps: true});
  
const Assigment=mongoose.model("Assigment", assigmentSchema);
module.exports = Assigment