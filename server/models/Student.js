const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  branch: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  department: { type: String, required: true },
  enrollmentYear: { type: Number, required: true },
  isActive: { type: Boolean, required: true }
});
module.exports = mongoose.model('Student', studentSchema);
