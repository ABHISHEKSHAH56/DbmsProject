const User = require('../Models/userModel')
const createError = require('http-errors')
module.exports = {        
    authCheck : async (req, res, next) => {
        const user= await User.findOne({ _id: req.payload.aud })
        if(!user)  next(createError.BadRequest("User not found"))
        req.user=user;
        next()
    },  
    adminCheck : async (req, res, next) =>{
        const user= await User.findOne({ _id: req.payload.aud })
        if(!user)
        {
            return next(createError.BadRequest("User not found"))
        }
        if(user.role!="faculty") return next(createError.Unauthorized("Admin resource. Access denied"))
        req.user=user
        next()

    }
}