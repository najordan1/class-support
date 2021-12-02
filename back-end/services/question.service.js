// connects to the database
const db = require('../helpers/database');
const question = db.question;

// Functions that we return
module.exports = {
    addQuestion,
};
// Makes new entry into ClassPeriod
// Controllers call these functions
async function addQuestion(question, responseType, status, correctAnswer) {
    console.log(`adding question: ${question, responseType, status, correctAnswer}`);
    if (await addQuestion.findOne({ question, responseType, status, correctAnswer })) {
        throw `Question: ${question, responseType, status, correctAnswer} already exists`
    }
    const question = new question({ question, responseType, status, correctAnswer });
    await question.save();
};