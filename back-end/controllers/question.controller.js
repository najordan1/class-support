const questionService = require('../services/question.service');

module.exports = {
    addQuestion,
    getAllQuestions,
};

// req, res, next follows express.js syntax - lookup for info
function addQuestion(req, res, next) {
    questionService.addQuestion(req.body)
        .then(() => res.status(201).send({}))
        .catch((err) => res.status(500).send(err));
};

function getAllQuestions(req, res, next) {
    // try query -- if successful then -- else catch and throw error
    questionService.getAllQuestions()
        .then((questions) => res.json(questions))
        .catch((err) => res.status(500).send(err));
};
