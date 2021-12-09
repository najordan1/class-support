const mcresponseService = require('../services/mcresponse.service');

module.exports = {
    addMCResponse,
    getMCResponsesforQuestion,
    aggregateMCResponses,
};

// req, res, next follows express.js syntax - lookup for info
function addMCResponse(req, res, next) {
    mcresponseService.addMCResponse(req.body)
        .then((correctAnswer) => res.status(201).send({correctAnswer}))
        .catch((err) => res.status(500).send(err));
};

function aggregateMCResponses(req, res, next) {
    mcresponseService.aggregateMCResponses(req.params.question)
        .then((counts) => res.json(counts))
        .catch((err) => res.status(500).send(err));
};

function getMCResponsesforQuestion(req, res, next) {
    // try query -- if successful then -- else catch and throw error
    mcresponseService.getMCResponsesforQuestion(req.params.question)
        .then((mcresponses) => res.json(mcresponses))
        .catch((err) => res.status(500).send(err));
};
