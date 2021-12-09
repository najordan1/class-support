const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

router.post('/add', questionController.addQuestion);
router.get('/getQuestions/:classPeriod', questionController.getQuestionsForClassPeriod);
router.delete('/remove/:qID', questionController.removeQuestion);
router.patch('/updateStatus/:qID/:status', questionController.updateQStatus);
router.patch('/updateTitle/:qID/:title', questionController.updateQTitle);

module.exports = router;