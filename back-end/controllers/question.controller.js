const questionService = require('../services/question.service');

module.exports = {
    addQuestion,
    getQuestionsForClassPeriod,
    removeQuestion,
    updateQStatus,
    updateQTitle,
};

// req, res, next follows express.js syntax - lookup for info
function addQuestion(req, res, next) {
    questionService.addQuestion(req.body)
        .then(() => res.status(201).send({}))
        .catch((err) => res.status(500).send(err));
};

function removeQuestion(req, res, next) {
    questionService.removeQuestion(req.params.qID)
        .then(() => res.status(204).send({}))
        .catch((err) => res.status(500).send(err));
};

function updateQStatus(req, res, next) {
    questionService.updateQStatus(req.params.qID, req.params.status)
        .then(() => res.status(206).send({}))
        .catch((err) => res.status(500).send(err));
};

function updateQTitle(req, res, next) {
    questionService.updateQTitle(req.params.qID, req.params.title)
        .then(() => res.status(206).send({}))
        .catch((err) => res.status(500).send(err));
};

function getQuestionsForClassPeriod(req, res, next) {
    // try query -- if successful then -- else catch and throw error
    questionService.getQuestionsForClassPeriod(req.params.classPeriod)
        .then((questions) => res.json(questions))
        .catch((err) => res.status(500).send(err));
};