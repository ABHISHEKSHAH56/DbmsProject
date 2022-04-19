const Assigment = require("../Models/assigmentModal");
const courseModal = require("../Models/courseModal");
const facultyModel = require("../Models/facultyModel");
const studentModal = require("../Models/studentModal");
const userModel = require("../Models/userModel");

module.exports = {
    allStudent:async(req,res,next) =>{
        try {
            const saved=await studentModal.find();
            res.send(saved);
        } catch (error) {
            next(error);
            
        }

    },
    allCourse:async(req,res,next) =>{
        try {
            const saved=await courseModal.find();
            res.send(saved);
        } catch (error) {
            next(error);
            
        }

    },
    allfaculty:async(req,res,next) =>{
        try {
            const saved=await facultyModel.find();
            res.send(saved);
        } catch (error) {
            next(error);
            
        }

    },
    allAssigment:async(req,res,next) =>{
        try {
            const saved=await Assigment.find();
            res.send(saved);
        } catch (error) {
            next(error);
            
        }

    },
    allUser:async(req,res,next) =>{
        try {
            const saved=await userModel.find();
            res.send(saved);
        } catch (error) {
            next(error);
            
        }

    },
    ListOfcourseAssigment:async(req,res,next)=>{
        try {
            const data=await Assigment.find({courseId:req.params.courseId});
            res.send({assigmentData:data})
        } catch (error) {
            next(error)
        }
    }
    


}