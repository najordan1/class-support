const responseService = require('../services/response.service');

module.exports = {
    addResponse,
    getResponsesforQuestion,
    aggregateResponses,
};

// req, res, next follows express.js syntax - lookup for info
function addResponse(req, res, next) {
    responseService.addResponse(req.body)
        .then(() => res.status(201).send({}))
        .catch((err) => res.status(500).send(err));
};

function aggregateResponses(req, res, next) {
    responseService.aggregateResponses(req.params.question)
        .then((counts) => res.json(counts))
        .catch((err) => res.status(500).send(err));
};

function getResponsesforQuestion(req, res, next) {
    // try query -- if successful then -- else catch and throw error
    responseService.getResponsesforQuestion(req.params.question)
        .then((responses) => res.json(responses))
        .catch((err) => res.status(500).send(err));
};
