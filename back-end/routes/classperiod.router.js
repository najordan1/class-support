const express = require('express');
const router = express.Router();
const classPeriodController = require('../controllers/classperiod.controller');

router.post('/add', classPeriodController.addClassPeriod);
router.get('/getAll', classPeriodController.getAllClassPeriods);
router.delete('/remove/:classPeriod', classPeriodController.removeClassPeriod);

module.exports = router;