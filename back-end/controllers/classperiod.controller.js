const classPeriodService = require('../services/classperiod.service');

module.exports = {
    addClassPeriod,
};

// req, res, next follows express.js syntax - lookup for info
function addClassPeriod(req, res, next) {
    classPeriodService.addClassPeriod(req.body.name)
        .then(() => res.send({}))
        .catch((err) => res.status(500).send(err));
};