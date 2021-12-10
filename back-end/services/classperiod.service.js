// connects to the database
const db = require('../helpers/database');
const ClassPeriod = db.ClassPeriod;
const Question = db.Question;
const Response = db.Response;
const MCResponse = db.MCResponse;

// Functions that we return
module.exports = {
    addClassPeriod,
    getAllClassPeriods,
    removeClassPeriod,
};

// Makes new entry into ClassPeriod
// Controllers call these functions
async function addClassPeriod(param) {
    console.log(`adding name: ${param.name}`);
    if (await ClassPeriod.findOne({ name:param.name })) {
        throw `Class period with name ${param.name} already exists`
    }
    if (param.date) {
        const classPeriod = new ClassPeriod({ name:param.name, date:param.date });
        await classPeriod.save();
    } else {
        const classPeriod = new ClassPeriod({ name:param.name });
        await classPeriod.save();
    }
};

// Removes entry from ClassPeriod by ID
async function removeClassPeriod(className) {
    console.log(`removing class period: ${className}`);
    const classObject = await ClassPeriod.findOne({ name: className });
    const classPeriod = classObject._id;

    console.log(classPeriod);

    const questions = await Question.find({ classPeriod });

    qs = questions.map(item => item._id);

    qs.forEach(async (q) => {
        await Response.deleteMany({question: q});
        await MCResponse.deleteMany({question: q});
        await Question.deleteOne({_id: q});
    });

    return await ClassPeriod.deleteOne({ _id: classPeriod });
};

// Gets all class periods
async function getAllClassPeriods() {
    console.log('getting all class periods');
    return await ClassPeriod.find();
};
