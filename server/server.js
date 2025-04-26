const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for specific frontend URL
const corsOptions = {
  origin: 'https://student-management-system-6-ddot.onrender.com', // your deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Middleware for parsing JSON bodies
app.use(express.json());

// Import student routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Use dynamic port from environment variable for production
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
