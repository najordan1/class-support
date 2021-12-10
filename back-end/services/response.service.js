// connects to the database
const db = require('../helpers/database');
const Response = db.Response;
const Question = db.Question;

// Functions that we return
module.exports = {
    addResponse,
    getResponsesforQuestion,
    aggregateResponses,
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
    let question;
    try {
        const questionObject = await Question.findOne({ _id: newResponse.question })
        question = questionObject._id;
    } catch {
        throw `Could not find question ${newResponse.question}`
    }

    console.log(question);

    if (!question) throw `Could not find question ${newResponse.question}`;
    
    const response = { ...newResponse };
    const dbresponse = new Response(response);
    
    return await dbresponse.save();
    
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

async function aggregateResponses(question) {

    console.log(`aggregating responses for: ${question}`);

    const responses = await getResponsesforQuestion(question);

    var counts = responses.reduce((p, c) => {
        var answer = c.answer;

        if (!p.hasOwnProperty(answer)) {
          p[answer] = 0;
        }

        p[answer]++;
        
        return p;
    }, {});

    let choices;
    try {
        const questionObject = await Question.findOne({ _id: question })
        choices = questionObject.choices;
    } catch {
        throw `Could not find question ${question}`
    }

    if (!choices.length == 0) {
        choices.forEach(choice => {
            if (!counts.hasOwnProperty(choice)) {
                counts[choice] = 0;
            }
        });
    }

    return counts;
};