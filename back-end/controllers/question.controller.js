const questionService = require('../services/question.service');

module.exports = {
    addQuestion,
};

// req, res, next follows express.js syntax - lookup for info
function addQuestion(req, res, next) {
    questionService.addQuestion(req.body.name)
        .then(() => res.send({}))
        .catch((err) => res.status(500).send(err));
};