const express = require('express')
const assigmentController = require('../Controllers/assigmentController')
const courseController = require('../Controllers/courseController')
const FacutlyController = require('../Controllers/facultyController')
const studentController = require('../Controllers/studentController')
const { authCheck, adminCheck } = require('../helpers/authHelper')
const { verifyAccessToken } = require('../helpers/jwt_helper')
const router = express.Router()

//faculty registeration
router.post("/register",verifyAccessToken,authCheck,FacutlyController.register)


//course 
router.get("/course/fetch",verifyAccessToken,authCheck,adminCheck,courseController.fetchcoursebyfaculty)
router.post("/course/create",verifyAccessToken,authCheck,adminCheck, courseController.register)
router.delete("/course/:courseId",verifyAccessToken,authCheck,adminCheck,courseController.DeleteCourse)
router.get("/course/:courseId",verifyAccessToken,authCheck,studentController.getdeatilsofcourse);
router.patch("/course/:courseId",verifyAccessToken,authCheck,adminCheck,courseController.updateCourse)

//faculty can create the assigment and update the assigment 
router.post("/assigment/create/:courseId",verifyAccessToken,authCheck,adminCheck,assigmentController.register)
router.patch("/assigment/update/:assigmentId",verifyAccessToken,authCheck,adminCheck,assigmentController.update)
router.delete("/assigment/delete/:assigmentId",verifyAccessToken,authCheck,adminCheck,assigmentController.delete)
//faculty can create Assigment

//router.get("/assigment/fetch",verifyAccessToken,authCheck,adminCheck,assigmentController.fetchassigmentbyfaculty)
router.post("/:courseId/assigment/create",verifyAccessToken,authCheck,adminCheck, assigmentController.register)
router.get("/assigment/details/:assigmentId",verifyAccessToken,authCheck,assigmentController.detailsofoneAssigment)
// router.delete("/assigment/:assigmentId",verifyAccessToken,authCheck,adminCheck,assigmentController.Deleteassigment)
// router.get("/assigment/:assigmentId",verifyAccessToken,authCheck,adminCheck,studentController.getdeatilsofassigment);
// router.patch("/assigment/:assigmentId",verifyAccessToken,authCheck,adminCheck,assigmentController.updateassigment)

module.exports = router