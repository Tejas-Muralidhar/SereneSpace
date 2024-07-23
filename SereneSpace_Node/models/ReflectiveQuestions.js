const mongoose = require('mongoose');

const ReflectiveQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true }
});

const ReflectiveQuestion = mongoose.model('ReflectiveQuestion', ReflectiveQuestionSchema);
module.exports = ReflectiveQuestion;
