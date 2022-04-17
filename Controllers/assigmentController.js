const Assigment = require("../Models/assigmentModal")

module.exports = {

    register:async(req,res,next)=>{
        try {
            //create the assigment
            const {assigmentType,title,description}=req.body;
            //deadline nhi hai esa man lliya hai 
            
            const material={
                public_id:"xxxxxx",
                url:"xxxxxxxxxxx"
            }
            console.log(new Date())
            const saved= await Assigment.create({
                deadline:new Date(),
                courseId:req.params.courseId,
                assigmentType,
                title,
                material,
                description,
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
    }

}