const createError = require('http-errors')
const User = require('../Models/userModel')
const  cloudinary =require("cloudinary");
const { signAccessToken, signRefreshToken, getAppCookies, verifyRefreshToken, sendToken } = require('../helpers/jwt_helper');
const blacklistedRefreshTokens = require('../Models/blacklistRefresh');
const jwtDecode = require("jwt-decode");
const sendEmail = require('../helpers/sendEmail');
const crypto= require('crypto')


module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, password,image } = req.body;
      const doesExist = await User.findOne({ email:email })
      if (doesExist)
        throw createError.Conflict(`${email} is already been registered`)
      const user = await User.create({
        name,
        email,
        password,
        avatar: {
          public_id: "abhishek",
          url: "hari",
        },
      });
      
      const accessToken = await signAccessToken(user.id)
      const refreshToken = await signRefreshToken(user.id)
      res.cookie("refresh", refreshToken, { httpOnly: true });
      res.send({
        accessToken: accessToken,
        user
      })
    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw createError.Unauthorized("Please enter password or email")
      }
      const user = await User.findOne({ email }).select("+password");
  
      if (!user) {
        throw createError.Unauthorized("Invalid email or password");
      }
    
      const isPasswordMatched = await user.comparePassword(password);
    
      if (!isPasswordMatched) {
        throw createError.Unauthorized("Invalid email or password");
      }
      const accestoken = await signAccessToken(user._id)
      const RefreshTokenGenerated = await signRefreshToken(user._id)
      res.cookie("refresh", RefreshTokenGenerated, { httpOnly: true });
      res.send({
      accessToken: accestoken,
      user
    })
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'))
      next(error)
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = getAppCookies(req, res)["refresh"];
      console.log(refreshToken);
      if (!refreshToken)
        throw createError.BadRequest("refreshToken Not Found");
      const userId = await verifyRefreshToken(refreshToken);
      console.log(userId);
      if (!userId) throw createError.Unauthorized("jwt expired");
  
      const findInBlacklistedTokens = await blacklistedRefreshTokens.findOne({
        refreshToken,
      });
      console.log("findInBlacklistedTokens", findInBlacklistedTokens);
      if (findInBlacklistedTokens)
        throw createError.Unauthorized("jwt expired or token is invalid");
      else {
        const AccessTokenGenerated = await signAccessToken(userId);
        const RefreshTokenGenerated = await signRefreshToken(userId);
        res.cookie("refresh", RefreshTokenGenerated, { httpOnly: true });
        return res.status(200).json({ accessToken: AccessTokenGenerated });
      }
    } catch (error) {
      next(error)
     
    }
  },

  logout: async (req, res, next) => {
    try {
      const refreshToken = getAppCookies(req, res)["refresh"];
      if (!refreshToken)
        throw createError.BadRequest("refreshToken Not Found");
      const userId = await verifyRefreshToken(refreshToken);
      if (!userId) throw createError.Unauthorized("jwt expired");
      const token = jwtDecode(refreshToken);
      const d = new Date(0);
      d.setUTCSeconds(token.exp);
      const newBlacklistToken = new blacklistedRefreshTokens({
        refreshToken,
        expireAt: new Date(d),
      });
      await newBlacklistToken.save();
    
      res.cookie("refresh", "", { httpOnly: true });
      return res.send({ success: true });
        
    } catch (error) {
      next(error)
    }
  },
  forgotPassword:async(req,res,next)=>{
    try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
    throw createError.NotFound("User not found");
    }

  // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    console.log(resetToken)

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    
    
      res.status(200).json({
          success: true,
          message: `Email sent to ${user.email} successfully`,
      });
      
    } catch (error) {
      // user.resetPasswordToken = undefined;
      // user.resetPasswordExpire = undefined;
  
      // await user.save({ validateBeforeSave: false });
  
      next(error)
      
    }
  },
  resetPassword:async(req,res,next)=>{
    try {
      const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.log(user)
    if (!user) {
      throw createError.BadRequest("Reset Password Token is invalid or has been expired")
    }
    if (req.body.password !== req.body.confirmPassword) {
      throw createError.BadRequest(" Password does not match with password")
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res);
      
    } catch (error) {
      next(error)
      
    }
  }
}
