// routes/questions.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Questions'); // Adjust path as needed

// Get a random set of questions for the trivia game
router.get('/trivia', async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 10 } }]); // Adjust size as needed
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions' });
    }
});

module.exports = router;
