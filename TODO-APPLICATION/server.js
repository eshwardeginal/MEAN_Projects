const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Define a port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(bodyParser.json())
  console.log(`Server running on port ${PORT}`);
});
