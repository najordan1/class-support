const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

router.post('/add', questionController.addQuestion);

module.exports = router;