const studentService = require('../services/student.service');

module.exports = {
    addStudent,
};

// req, res, next follows express.js syntax - lookup for info
function addStudent(req, res, next) {
    questionService.addStudent(req.body.name)
        .then(() => res.send({}))
        .catch((err) => res.status(500).send(err));
};