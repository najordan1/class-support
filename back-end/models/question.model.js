const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    classPeriod: { type: Schema.Types.ObjectId, ref: 'ClassPeriod', required: true },
    question: { type: String, required: true },
    responseType: { type: String, required: true },
    status: { type: String, required: true },
    correctAnswer: { type: String, required: false },
});

schema.index({ classPeriod:1, question:1 }, { unique: true });
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('question', schema);
