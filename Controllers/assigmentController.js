const Assigment = require("../Models/assigmentModal")
const cloudinary=require("cloudinary");
const studentModal = require("../Models/studentModal");
const createHttpError = require("http-errors");

module.exports = {

    register:async(req,res,next)=>{
        try {
            let images = [];
            console.log(req.params.courseId)
            if (typeof req.body.material === "string") {
              images.push(req.body.material);
            } else {
              images = req.body.material;
            }
          
            const imagesLinks = [];
          
            for (let i = 0; i < images.length; i++) {
              const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
              });
          
              imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
              });
            }
            const {material,...data}=req.body;

            console.log(new Date(),data,imagesLinks)
            const saved= await Assigment.create({
                courseId:req.params.courseId,
                material:imagesLinks,
                status: req.body.status,
                deadline: req.body.deadline===null?new Date():req.body.deadline,
                assigmentType: req.body.assigmentType,
                title: req.body.title,
                description: req.body.description,
                submissionDetails:[],
                createdBy:req.user._id
            })
            res.send(saved)

            
        } catch (error) {
            next(error)
            
        }
    },
    update:async(req,res,next)=>{
        try {
            //create the assigment 
            
        } catch (error) {
            next(error)
            
        }
    },
    delete:async(req,res,next)=>{
        try {
            //create the assigment 
            
        } catch (error) {
            next(error)
            
        }
    },
    detailsofoneAssigment:async(req,res,next)=>{
        try {
            const data=await Assigment.findById(req.params.assigmentId).populate({
              path: 'submissionDetails',
              populate:{
               path: 'student',
               model: 'Student'
              }
            })
            console.log(data)
            res.send(data)
            
        } catch (error) {
            next(error)
            
        }
    },
    submittheAssigment:async(req,res,next)=>{
        try {
            let images = [];            
            if (typeof req.body.material === "string") {
              images.push(req.body.material);
            } else {
              images = req.body.material;
            }
          
            const imagesLinks = [];
          
            for (let i = 0; i < images.length; i++) {
              const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "Students",
              });
          
              imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
              });
            }
            const assigment =await Assigment.findById(req.params.assigmentId);
            if(!assigment) throw createHttpError.BadRequest("Assigment Does Not Exist")
            const student=await studentModal.findOne({studentId:req.user._id}) 
            if(!student) throw createHttpError.BadRequest("Please register as a student")
           
            const submissionNow=assigment.submissionDetails
            const submissiondata={
                data:imagesLinks,
                student:student._id,
                marks:-1            
            }
            //this is need to done ..for duplication error  
            const data=submissionNow.filter((item)=>item.student.toString() !== student._id.toString())
            console.log(data)
            await Assigment.updateOne({_id:req.params.assigmentId},{$set:{
                submissionDetails:[...data,submissiondata]
            }});

            res.send("Submitted Successfully");

            
        } catch (error) {
            next(error)
            
        }
    }

}