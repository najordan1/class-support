const classPeriodService = require('../services/classperiod.service');

module.exports = {
    addClassPeriod,
    getAllClassPeriods,
    removeClassPeriod,
};

// req, res, next follows express.js syntax - lookup for info
function addClassPeriod(req, res, next) {
    classPeriodService.addClassPeriod(req.body)
        .then(() => res.status(201).send({}))
        .catch((err) => res.status(500).send(err));
};

function removeClassPeriod(req, res, next) {
    classPeriodService.removeClassPeriod(req.params.className)
        .then(() => res.status(204).send({}))
        .catch((err) => res.status(500).send(err));
};

function getAllClassPeriods(req, res, next) {
    // try query -- if successful then -- else catch and throw error
    classPeriodService.getAllClassPeriods()
        .then((classPeriods) => res.json(classPeriods)) // Waits for the query to happen
        .catch((err) => res.status(500).send(err));

    // try {
    //     const classPeriods = await classPeriodService.getAllClassPeriods();
    //     res.json(classPeriods);
    // } catch (error) {
    //     res.status(500).send(error);
    // }
};