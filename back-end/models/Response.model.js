const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    answer: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('response', schema);
