const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  moods: { type: [String], required: true },
  reason: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mood', MoodSchema);

