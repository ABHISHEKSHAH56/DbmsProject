const express=require("express")
const app=express();
const bodyParser=require("body-parser")
const cors=require("cors")
const fileUpload=require("express-fileupload")
const cookieParser=require("cookie-parser")
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const cloudinary = require("cloudinary").v2;
const authRoute=require("./Routes/authRoute");
const studentRoute=require("./Routes/StudentRoute");
const facultyRoute=require("./Routes/FacultyRoute")
const commonRoute= require("./Routes/commonRoute")
const { verifyAccessToken } = require("./helpers/jwt_helper");
const { authCheck, adminCheck } = require("./helpers/authHelper");
cloudinary.config({ 
  cloud_name: 'shahbasket', 
  api_key: '456545845563234', 
  api_secret: '_hlOWNSv8H2PFOtSm1p6e4ZMieE' 
});

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))
//routes 
app.use("/auth",authRoute)
app.use("/student",studentRoute)
app.use("/faculty",facultyRoute)
app.use("/all",commonRoute)
app.get("/",verifyAccessToken,authCheck,adminCheck,(req,res,next)=>{
  try {
    res.status(200).send("hello world")
    
  } catch (error) {
    next(error)
    
  }

})
app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})



process.on("uncaughtException",err=>{
  console.log(`Error:${err.message}`)
  console.log(`Shuting the server due to uncaught exception`);
  server.close(()=>{
      process.exit(1);
  })
  
})
const server=app.listen(process.env.PORT,()=>{
  console.log(`server running at the ${process.env.PORT}`)
})


//unhandle promise rejection 
//we need to close the server asap
process.on("unhandledRejection",err=>{
  console.log(`Error :${err.message}`)
  console.log(`Shuting the server due to unhandle Promise rejection`);
  server.close(()=>{
      process.exit(1);
  })
})


