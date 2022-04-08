const createHttpError = require("http-errors");
const Faculty = require("../Models/facultyModel");
const User = require("../Models/userModel");

module.exports = {
    register:async(req,res,next)=>{
        try {
            const {facultyName,department}=req.body;
            const saved =await Faculty.create({
                facultyName,
                department,
                facultyId:req.user.id
            })
            const updateUser=await User.updateOne({
                _id:req.user.id},{
                    $set:{
                        role:"faculty"
                    }    
            })
            res.status(200).send({
                saved,
                updateUser
            })
            
        } catch (error) {
            next(error)
            
        }

    }

}