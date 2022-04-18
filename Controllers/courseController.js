const createHttpError = require("http-errors");
const Faculty = require("../Models/facultyModel");
const User = require("../Models/userModel");
const Course=require("../Models/courseModal")

module.exports = {
    //teacher will create thier course own 
    register:async(req,res,next)=>{
        try {
            const {courseName,department,batch,courseDescription}=req.body;
            const data=await Faculty.findOne({facultyId:req.user._id})
            console.log(data)
            const saved =await Course.create({
                facultyId:data._id,
                batch,
                courseName,
                department,
                courseDescription,
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
    getCourseDetails:async(req,res,next)=>{
        try {
            
            //we need to render who is student name and teacher name  course and assigment list associated with
            
        } catch (error) {
            
        }
    },
    fetchcoursebyfaculty:async(req,res,next)=>{
        try {
            const course=await Course.find({createdBy:req.user._id}).populate({ path: 'facultyId', select: 'facultyName' });
            res.send(course);
            
        } catch (error) {
            next(error)
            
        }
    },
    DeleteCourse:async(req,res,next)=>{
        try {
            const {courseId}=req.params
            const iscourse=await Course.findById(courseId);
            if(!iscourse) throw createHttpError.BadRequest("course already deleted")
            const data= await Course.deleteOne({_id:courseId});
            res.send("Course deleted successfully ");
            
        } catch (error) {
            next(error)
            
        }
    },
    updateCourse:async(req,res,next)=>{
        try {
            const {courseId}=req.params
            const iscourse=await Course.findById(courseId);
            if(!iscourse) throw createHttpError.BadRequest("course Not found")
            const save=await Course.updateOne({_id:courseId},{$set:req.body});
            res.send(save);
            
        } catch (error) {
            next(error)
            
        }
    }

}