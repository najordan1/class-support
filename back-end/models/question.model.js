const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    question: { type: String, required: true },
    responseType: { type: String, required: true },
    status: { type: String, required: true },
    correctAnswer: { type: String, required: false },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('question', schema);
