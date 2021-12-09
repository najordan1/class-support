// connects to the database
const db = require('../helpers/database');
const Response = db.Response;
const Question = db.Question;

// Functions that we return
module.exports = {
    addResponse,
    getResponsesforQuestion,
};
// Makes new entry into Response
// Controllers call these functions
async function addResponse(newResponse) {
    console.log(`adding response: ${newResponse.answer}`);
    // Validate request
    if (!(newResponse.question && newResponse.answer)) {
        throw 'Missing at least one field'
    }

    // We need to find the question id for the given question
    let question, questionObject;
    try {
        questionObject = await Question.findOne({ _id: newResponse.question })
        question = questionObject._id;
    } catch {
        throw `Could not find question ${newResponse.question}`
    }

    console.log(question);

    if (!question) throw `Could not find question ${newResponse.question}`;
    
    const response = { ...newResponse };
    const dbresponse = new Response(response);
    
    try {
        await dbresponse.save();
    } catch {
        throw `Could not save response`
    }

    return questionObject.correctAnswer ? questionObject.correctAnswer : "";
    
};

async function getResponsesforQuestion(question) {

    console.log(`getting responses for: ${question}`);

    // We need to find the class period id for the given class name
    let q;
    try {
        const questionObject = await Question.findOne({ _id: question })
        q = questionObject._id;
    } catch {
        throw `Could not find question ${question}`
    }

    return await Response.find({ question: q });
};
