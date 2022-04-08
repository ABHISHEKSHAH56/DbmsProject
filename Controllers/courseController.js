const createHttpError = require("http-errors");
const Faculty = require("../Models/facultyModel");
const User = require("../Models/userModel");
const Course=require("../Models/courseModal")

module.exports = {
    //teacher will create thier course own 
    register:async(req,res,next)=>{
        try {
            const {courseName,department,batch}=req.body;
            const saved =await Course.create({
                facultyId:req.user._id,
                batch,
                courseName,
                department,
                createdBy:req.user._id
            })    
            res.status(200).send({
                saved
            })
            
        } catch (error) {
            next(error)
            
        }

    },
    //of particular course 
    detailsofcourse:async(req,res,next)=>{
        try {


            //we need to render who is student name and teacher name  course and assigment list associated with
            
        } catch (error) {
            
        }
    }

}