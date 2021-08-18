const mongoose = require("mongoose");
const Joi = require("joi");

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true, minlength: 2, maxlength: 255 },
  answer: { type: String, required: true },
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

function validateFlashcard(flashcard) {
  const schema = Joi.object({
    question: Joi.string().min(2).max(255).required(),
    answer: Joi.string().required(),
  });
  return schema.validate(flashcard);
}
exports.Flashcard = Flashcard;
exports.validateFlashcard = validateFlashcard;
exports.flashcardSchema = flashcardSchema;


