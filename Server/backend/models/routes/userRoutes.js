const express = require('express');
const router = express.Router();
const User = require('../User');

// Route to create a new user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;