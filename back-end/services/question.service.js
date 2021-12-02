// connects to the database
const db = require('../helpers/database');
const Question = db.Question;
const ClassPeriod = db.ClassPeriod;

// Functions that we return
module.exports = {
    addQuestion,
    getAllQuestions,
};
// Makes new entry into ClassPeriod
// Controllers call these functions
async function addQuestion(newQuestion) {
    console.log(`adding question: ${newQuestion.question}`);
    // Validate request
    if (!(newQuestion.question && newQuestion.responseType && newQuestion.status && newQuestion.className)) {
        throw 'Missing at least one field'
    } 

    // We need to find the class period id for the given class name
    let classPeriod;
    try {
        const classPeriodObject = await ClassPeriod.findOne({ name: newQuestion.className })
        classPeriod = classPeriodObject._id;
    } catch {
        throw `Could not find class period ${newQuestion.className}`
    }

    if (!classPeriod) throw `Could not find class period ${newQuestion.className}`;

    if (await Question.findOne({ classPeriod, question: newQuestion.question })) {
        throw `Question: ${newQuestion.question} for class ${newQuestion.className} already exists`
    } 
    
    const question = { ...newQuestion, classPeriod };
    delete question.className; //def a better way than deleting this property
    const dbquestion = new Question(question);
    
    return await dbquestion.save();
    
};

async function getAllQuestions() {
    return await Question.find().populate('classPeriod');
};
