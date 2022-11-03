const express=require("express");

const router=express.Router();

const resumeController=require('../controllers/resume');

router.post('/userDetail',resumeController.userDetail);

router.post('/education',resumeController.education);

router.post('/experience',resumeController.experience);

router.post('/projects',resumeController.projects);

router.post('/portfolio',resumeController.portfolio);

router.get('/getUserById',resumeController.getUserById);

module.exports=router;