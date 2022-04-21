const express = require('express')
const assigmentController = require('../Controllers/assigmentController')
const StudentController = require('../Controllers/studentController')
const { authCheck } = require('../helpers/authHelper')
const { verifyAccessToken } = require('../helpers/jwt_helper')
const router = express.Router()


router.post("/register",verifyAccessToken,authCheck,StudentController.register)
router.patch("/:studentId",verifyAccessToken,authCheck,StudentController.updateStudent)
router.get("/listAssociatedcourse",verifyAccessToken,authCheck,StudentController.listAssociatedcourse)


//student can join the course by self and remove from course 

router.get("/course/all",verifyAccessToken,authCheck,StudentController.ALLcourse)
router.get("/course/join/:courseId",verifyAccessToken,authCheck,StudentController.joincourse)
router.get("/course/:courseId",verifyAccessToken,authCheck,StudentController.getdeatilsofcourse)
router.post("/assigment/submission/:assigmentId",verifyAccessToken,authCheck,assigmentController.submittheAssigment)
module.exports = router