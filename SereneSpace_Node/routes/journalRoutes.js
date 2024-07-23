const express = require('express');
require('dotenv').config();
const router = express.Router();
const Journal = require('../models/Journal');
const cohere = require('cohere-ai'); // Import Cohere


const cohereClient = new cohere.CohereClient({
    token: process.env.COHERE_API_KEY, // Use your actual API key here
  });
  
  // Define the endpoint for summarizing journal entries

  router.post('/summarize', async (req, res) => {
    const { userId, startDate, endDate } = req.body;
    try {
        // Fetch journal entries based on the provided start and end dates
        const journals = await Journal.find({ userId, createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } });

        // Combine all journal entries into a single text block
        const text = journals.map(journal => journal.content).join('\n');

        // Use Cohere to generate a summary
        const response = await cohereClient.chat({
            message: `Summarize the following text in terms of feelings and mental health:\n\n${text}\n\nOnly output the summary text.`,
        });

        res.json({ summary: response.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error summarizing journal entries' });
    }
});

// Create a new journal entry
router.post('/entries', async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const newEntry = new Journal({ userId, title, content });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all journal entries for a user
router.get('/entries/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const entries = await Journal.find({ userId });
        res.status(200).json(entries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a journal entry by ID
router.delete('/entries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Journal.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Entry deleted successfully' });
        } else {
            res.status(404).json({ error: 'Entry not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
