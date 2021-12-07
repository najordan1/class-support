const express = require('express');
const router = express.Router();
const responseController = require('../controllers/response.controller');

router.post('/add', responseController.addResponse);
router.get('/getResponses/:question', responseController.getResponsesforQuestion);

module.exports = router;