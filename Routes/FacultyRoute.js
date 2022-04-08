const express = require('express')
const courseController = require('../Controllers/courseController')
const FacutlyController = require('../Controllers/facultyController')
const { authCheck, adminCheck } = require('../helpers/authHelper')
const { verifyAccessToken } = require('../helpers/jwt_helper')
const router = express.Router()


router.post("/register",verifyAccessToken,authCheck,FacutlyController.register)


//faculty can do create the course delete and update and remove the student  
router.post("/course/create",verifyAccessToken,authCheck,adminCheck, courseController.register)
// router.patch("/course/edit",verifyAccessToken,authCheck,courseController.update)
// router.delete("/course/:id",verifyAccessToken,authCheck,courseController.delete),
// router.

module.exports = router