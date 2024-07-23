const express = require('express');
const router = express.Router();
const Mood = require('../models/MoodTracker');
const mongoose = require('mongoose');

// Create a new mood entry
router.post('/', async (req, res) => {
  const { userId, date, time, moods, reason } = req.body;

  try {
    const newMood = new Mood({ userId, date, time, moods, reason });
    const savedMood = await newMood.save();
    res.status(201).json(savedMood);
  } catch (error) {
    console.error('Error creating mood entry:', error);
    res.status(500).json({ message: 'Error creating mood entry' });
  }
});

// Get all mood entries for a user, sorted by date and time in descending order
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const moods = await Mood.find({ userId })
      .sort({ date: -1, time: -1 }); // Sorting by date and time in descending order
    res.status(200).json(moods);
  } catch (error) {
    console.error('Error fetching moods:', error);
    res.status(500).json({ message: 'Error fetching moods' });
  }
});

// // Get mood entries for a user between startDate and endDate
// router.get('/user', async (req, res) => {
//   const { userId, startDate, endDate } = req.query;

//   console.log(`Received request with userId: ${userId}, startDate: ${startDate}, endDate: ${endDate}`);

//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     console.log('Invalid userId');
//     return res.status(400).json({ error: 'Invalid userId' });
//   }

//   if (!startDate || !endDate) {
//     console.log('startDate and endDate are required');
//     return res.status(400).json({ error: 'startDate and endDate are required' });
//   }

//   try {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const moods = await Mood.find({
//       userId : objectId, 
//       date : {$gte : start , $lte : end}
//     });

//     console.log(`Found ${moods.length} mood entries`);
//     res.status(200).json(moods);
//   } catch (error) {
//     console.error('Error fetching mood data:', error);
//     res.status(500).json({ error: `${objectId} Error fetching mood data` });
//   }
// });

module.exports = router;
