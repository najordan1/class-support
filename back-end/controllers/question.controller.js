const questionService = require('../services/question.service');

module.exports = {
    addQuestion,
    getQuestionsForClassPeriod,
};

// req, res, next follows express.js syntax - lookup for info
function addQuestion(req, res, next) {
    questionService.addQuestion(req.body)
        .then(() => res.status(201).send({}))
        .catch((err) => res.status(500).send(err));
};

function getQuestionsForClassPeriod(req, res, next) {
    // try query -- if successful then -- else catch and throw error
    questionService.getQuestionsForClassPeriod(req.params.classPeriod)
        .then((questions) => res.json(questions))
        .catch((err) => res.status(500).send(err));
};
