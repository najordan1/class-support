const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    PIN: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('student', schema);
