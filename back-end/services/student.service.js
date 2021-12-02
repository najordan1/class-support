// connects to the database
const db = require('../helpers/database');
const student = db.student;

// Functions that we return
module.exports = {
    addStudent,
};
// Makes new entry into ClassPeriod
// Controllers call these functions
async function addStudent(firstName, lastName, PIN) {
    console.log(`adding student: ${firstName, lastName, PIN}`);
    if (await addStudent.findOne({ firstName, lastName, PIN })) {
        throw `student: ${firstName, lastName, PIN} already exists`
    }
    const student = new student({ firstName, lastName, PIN });
    await student.save();
};