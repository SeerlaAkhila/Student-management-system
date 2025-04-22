const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create
router.post('/', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// Read all
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Read one
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});

// Update
router.put('/:id', async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
