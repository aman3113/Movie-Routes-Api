const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  registrationNumber: String,
  studentId: Number,
  studentName: String,
  studentProfilePicURL: String,
  fatherOrGuardian: String,
  standard: String,
  emergencyCall: Number
})

const Student = mongoose.model("Student", studentSchema);
module.exports = Student