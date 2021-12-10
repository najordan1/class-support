// connects to the database
const db = require('../helpers/database');
const MCResponse = db.MCResponse;
const Question = db.Question;

// Functions that we return
module.exports = {
    addMCResponse,
    getMCResponsesforQuestion,
    aggregateMCResponses,
};
// Makes new entry into MCResponse
// Controllers call these functions
async function addMCResponse(newMCResponse) {
    console.log(`adding MCResponse: ${newMCResponse.answer}`);
    // Validate request
    if (!(newMCResponse.question && newMCResponse.answer)) {
        throw 'Missing at least one field'
    }

    // We need to find the question id for the given question
    let question, questionObject;
    try {
        questionObject = await Question.findOne({ _id: newMCResponse.question })
        question = questionObject._id;
    } catch {
        throw `Could not find question ${newMCResponse.question}`
    }

    if (!question) throw `Could not find question ${newMCResponse.question}`;
    
    const mcresponse = { ...newMCResponse };
    const dbMCResponse = new MCResponse(mcresponse);
    
    try {
        await dbMCResponse.save();
    } catch {
        throw `Could not save response`
    }

    return questionObject.correctAnswer ? questionObject.correctAnswer : "";
    
};

async function getMCResponsesforQuestion(question) {

    console.log(`getting MCResponses for: ${question}`);

    // We need to find the class period id for the given class name
    let q;
    try {
        const questionObject = await Question.findOne({ _id: question })
        q = questionObject._id;
    } catch {
        throw `Could not find question ${question}`
    }

    return await MCResponse.find({ question: q });
};

async function aggregateMCResponses(question) {

    console.log(`aggregating responses for: ${question}`);

    const responses = await getMCResponsesforQuestion(question);

    var counts = responses.reduce((p, c) => {
        var answer = c.answer;

        answer.forEach(a => {
            if (!p.hasOwnProperty(a)) {
                p[a] = 0;
              }
      
              p[a]++;
        });
        return p;
    }, {});

    return counts;
};