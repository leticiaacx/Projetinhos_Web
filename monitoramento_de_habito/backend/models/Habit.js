const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    frequency: { type: String, required: true }, // Ex: Daily, Weekly
    progress: [{ date: Date, completed: Boolean }]
});

module.exports = mongoose.model('Habit', HabitSchema);
