const createHttpError = require("http-errors");
const courseModal = require("../Models/courseModal");
const Student = require("../Models/studentModal");
const User = require("../Models/userModel");

module.exports = {
    register:async(req,res,next)=>{
        try {
            const {name,rollNumber,batch,department}=req.body;
            const student = await Student.findOne({ rollNumber })
            if (student) {
                throw createHttpError.BadRequest("Student already register");
            }
            const saved =await Student.create({
                name,
                rollNumber,
                batch,
                department,
                studentId:req.user.id
            })
            const updateUser=await User.updateOne({
                _id:req.user.id},{
                    $set:{
                        role:"student"
                    }    
            })
            res.status(200).send({
                saved,
                updateUser
            })
            
        } catch (error) {
            next(error)
            
        }

    },
    updateStudent:async(req,res,next)=>{
        try {
            const update=await Student.updateOne({studentId:req.user._id},{$set:req.body})
            res.send("Data updated Succesfully ");

        } catch (error) {
            next(error)
            
        }
    },
    //student
    listAssociatedcourse:async(req,res,next)=>{
        try {
            //list of all course of that student they are joined 
            //for reducing complexity we fill find the that course that through batch then filter which of them they joined 
            const {batch}=await Student.findOne({studentId:req.user._id})
            const course= await courseModal.find({batch:batch})
            
            console.log(batch,course);
            //course ki deatils aa gyi 
            course.filter((item)=>{
                return item.students.includes(`${req.user._id}`);
            })
            res.send(course);
            //assigment ki deatils be ssath me hi bejh denege
            
        } catch (error) {
            next(error)
            
        }
    },
    joincourse:async(req,res,next)=>{
        try {
            
            //user batch must be same as course batch else they cant join 
            const course=await courseModal.findOne({_id: req.params.courseId});
            if(!course) throw createHttpError.BadRequest("Course Not Found ");
            const {batch}=await Student.findOne({studentId:req.user._id});
            if(batch!==course.batch) throw createHttpError.Unauthorized("You are not authorized to join this course");
            //add the user id in course 
            const students=course.students;
            if(students.includes(req.user._id)) throw createHttpError.BadRequest("Student Already registered for that course ")
            await courseModal.updateOne({_id:req.params.courseId},{$set:{
                students:[...students,req.user.id]
            }});
            res.status(200).send("Student Added Successfully");

            
        } catch (error) {
            next(error)
            
        }
    },
    removefromcourse:async(req,res,next)=>{


    },
    



}