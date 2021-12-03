const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

router.post('/add', questionController.addQuestion);
router.get('/getQuestions/:classPeriod', questionController.getQuestionsForClassPeriod);

module.exports = router;