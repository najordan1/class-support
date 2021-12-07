const express = require('express');
const router = express.Router();
const mcresponseController = require('../controllers/mcresponse.controller');

router.post('/add', mcresponseController.addMCResponse);
router.get('/getMCResponses/:question', mcresponseController.getMCResponsesforQuestion);

module.exports = router;