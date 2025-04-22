const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  rollNumber:{
    type:String,
    unique:true
  },
  branch: String,
  email: String,
  dob:Date,
  department:String,
  enrollmentYear:Number,
  isActive:Boolean

});
module.exports = mongoose.model('Student', studentSchema);
