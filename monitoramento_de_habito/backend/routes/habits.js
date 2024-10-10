const express = require('express');
const Habit = require('../models/Habit');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Habit
router.post('/', auth, async (req, res) => {
    const { name, frequency } = req.body;
    const newHabit = new Habit({ userId: req.user.id, name, frequency });
    await newHabit.save();
    res.status(201).json(newHabit);
});


// Get Habits
router.get('/', auth, async (req, res) => {
    const habits = await Habit.find({ userId: req.user.id });
    res.json(habits);
});

// Update Habit
router.put('/:id', auth, async (req, res) => {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(habit);
});

// Delete Habit
router.delete('/:id', auth, async (req, res) => {
    await Habit.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
