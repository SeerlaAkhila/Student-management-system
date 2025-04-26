const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,  // First name must have a minimum of 2 characters
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,  // Last name must have a minimum of 2 characters
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,  // Roll number must be unique
    match: /^[A-Za-z0-9]+$/,  // Roll number must be alphanumeric
  },
  branch: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // Valid email format
  },
  dob: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  enrollmentYear: {
    type: Number,
    required: true,
    min: 2000,  // Enrollment year should be between 2000 and the current year
    max: new Date().getFullYear()  // Current year
  },
  isActive: {
    type: Boolean,
    default: true,  // Default value is true
    required: false  // Optional field
  }
});

module.exports = mongoose.model('Student', studentSchema);
