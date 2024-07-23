const mongoose = require('mongoose');

const ReflectionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ReflectiveQuestion', required: true },
  answer: { type: String, required: true }
});

const Reflection = mongoose.model('Reflection', ReflectionSchema);
module.exports = Reflection;
