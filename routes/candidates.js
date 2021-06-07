const express=require('express');
const router= express.Router();
const candidateController = require('../controllers/candidate');

router.post('/insert',candidateController.insertCandidate);
router.post('/insertMarks',candidateController.insertMarks);
router.get('/averageScore',candidateController.averageScore);
router.get('/highestScore',candidateController.highestScore);
module.exports=router;