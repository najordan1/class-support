const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.post('/add', studentController.addStudent);

module.exports = router;