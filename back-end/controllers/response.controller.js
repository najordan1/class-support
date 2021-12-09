const responseService = require('../services/response.service');

module.exports = {
    addResponse,
    getResponsesforQuestion,
};

// req, res, next follows express.js syntax - lookup for info
function addResponse(req, res, next) {
    responseService.addResponse(req.body)
        .then((correctAnswer) => res.status(201).json({answer: correctAnswer}))
        .catch((err) => res.status(500).send(err));
};

function getResponsesforQuestion(req, res, next) {
    // try query -- if successful then -- else catch and throw error
    responseService.getResponsesforQuestion(req.params.question)
        .then((responses) => res.json(responses))
        .catch((err) => res.status(500).send(err));
};
