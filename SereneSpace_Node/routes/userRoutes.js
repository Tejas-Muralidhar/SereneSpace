const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).send({ success: true });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ success: false, message: 'Error creating user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      res.send({ userId: user._id });
    } else {
      res.status(401).send({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
