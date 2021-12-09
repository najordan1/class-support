const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });

module.exports = {
    ClassPeriod: require('../models/ClassPeriod.model'),
    Question: require('../models/Question.model'),
    Response: require('../models/Response.model'),
    MCResponse: require('../models/MCResponse.model'),
};