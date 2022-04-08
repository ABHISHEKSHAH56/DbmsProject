const express = require('express')
const router = express.Router()
const commonController = require('../Controllers/commonController')


//list 
router.get("/user",commonController.allUser);
router.get("/student",commonController.allStudent);
router.get("/course",commonController.allCourse);
router.get("/faculty",commonController.allfaculty);
router.get("/assigment",commonController.allAssigment)

module.exports = router
