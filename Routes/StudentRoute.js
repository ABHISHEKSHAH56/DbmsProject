const express = require('express')
const StudentController = require('../Controllers/studentController')
const { authCheck } = require('../helpers/authHelper')
const { verifyAccessToken } = require('../helpers/jwt_helper')
const router = express.Router()


router.post("/register",verifyAccessToken,authCheck,StudentController.register)
router.get("/listAssociatedcourse",verifyAccessToken,authCheck,StudentController.listAssociatedcourse)


//student can join the course by self and remove from course 

router.get("/course/join/:courseId",verifyAccessToken,authCheck,StudentController.joincourse)

module.exports = router