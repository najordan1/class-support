// connects to the database
const db = require('../helpers/database');
const ClassPeriod = db.ClassPeriod;

// Functions that we return
module.exports = {
    addClassPeriod,
    getAllClassPeriods,
};
// Makes new entry into ClassPeriod
// Controllers call these functions
async function addClassPeriod(name) {
    console.log(`adding name: ${name}`);
    if (await ClassPeriod.findOne({ name })) {
        throw `Class period with name ${name} already exists`
    }
    const classPeriod = new ClassPeriod({ name });
    await classPeriod.save();
};


async function getAllClassPeriods() {
    console.log('getting all class periods');
    return await ClassPeriod.find();
};
