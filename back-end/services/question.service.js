// connects to the database
const db = require('../helpers/database');
const Question = db.Question;
const ClassPeriod = db.ClassPeriod;
const Response = db.Response;
const MCResponse = db.MCResponse;

// Functions that we return
module.exports = {
    addQuestion,
    getQuestionsForClassPeriod,
    removeQuestion,
    updateQStatus,
    updateQTitle,
};
// Makes new entry into Question
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

async function removeQuestion(questionID) {
    console.log(`removing question with id: ${questionID}`);

    await Response.deleteMany({question: questionID});
    await MCResponse.deleteMany({question: questionID});
    
    return await Question.deleteOne({ _id: questionID });
    
};

async function updateQStatus(questionID, status) {
    console.log(`updating question status with id: ${questionID}`);

    const update = { status: status };
    
    return await Question.findByIdAndUpdate(questionID, update);
    
};

async function updateQTitle(questionID, title) {
    console.log(`updating question title with id: ${questionID}`);

    const update = { question: title };
    
    return await Question.findByIdAndUpdate(questionID, update);
    
};

async function getQuestionsForClassPeriod(classPeriodName) {

    console.log(`getting questions for: ${classPeriodName}`);

    // We need to find the class period id for the given class name
    let classPeriod;
    try {
        const classPeriodObject = await ClassPeriod.findOne({ name: classPeriodName })
        classPeriod = classPeriodObject._id;
    } catch {
        throw `Could not find class period ${classPeriodName}`
    }

    return await Question.find({ classPeriod: classPeriod }).select('-correctAnswer');
};
