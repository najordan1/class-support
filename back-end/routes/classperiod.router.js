const express = require('express');
const router = express.Router();
const classPeriodController = require('../controllers/classperiod.controller');

router.post('/add', classPeriodController.addClassPeriod);

module.exports = router;