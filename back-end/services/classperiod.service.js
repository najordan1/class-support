// connects to the database
const db = require('../helpers/database');
const ClassPeriod = db.ClassPeriod;

// Functions that we return
module.exports = {
    addClassPeriod,
};
// Makes new entry into ClassPeriod
// Controllers call these functions
async function addClassPeriod(name) {
    console.log(`adding name: ${name}`);
    const classPeriod = new ClassPeriod({ name });
    await classPeriod.save();
};