const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');
const morgan=require('morgan')
const helmet=require('helmet')
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// Use morgan for request logging
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
const secretKey = 'TestEVoTech'; // Change this with a strong secret key in production
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

// Event handler for successful connection
db.once('open', () => {
  console.log('Connected to the database');
});

// Event handler for connection errors
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
// Define MongoDB schema and model for survey submissions
const surveySchema = new mongoose.Schema({
  name: String,
  gender: String,
  nationality: String,
  email:{
    type: String,
    unique: true, // Enforce unique constraint on the email field
    required: true, // Make the email field required
  },
  phoneNumber: {
    type: String,
    unique: true, // Enforce unique constraint on the email field
    required: true, // Make the email field required
  },
  address: String,
  message: String,
});

const Survey = mongoose.model('Survey', surveySchema);

// Define API endpoints
app.post('/api/submit-survey', async (req, res) => {
  try {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(201).send('Survey submitted successfully!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, // Enforce unique constraint on the email field
    required: true, // Make the email field required
  },
  password:{
    type: String, // Enforce unique constraint on the email field
    required: true, // Make the email field required
  },
});

const User = mongoose.model('user', userSchema);

app.post('/api/login', async(req, res) => {
  const user =await  User.find(req.body);
  if (user.length==1) {
    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });

    req.user = user;
    next();
  });
}
app.get('/api/get-surveys',authenticateToken, async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
const server=app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Handle shutdown gracefully
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown() {
  console.log('Received shutdown signal. Shutting down gracefully...');

  // Close the server to stop accepting new connections
  server.close((err) => {
    if (err) {
      console.error('Error during server close:', err);
      process.exit(1);
    }

    // Perform any cleanup tasks here
    mongoose.connection.close(
    ).then(()=>
    {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
    });
    console.log('Server closed. Exiting process.');
    
  });
}