const mongoose = require("mongoose");
const Joi = require("joi");
const { flashcardSchema } = require("./flashcard");

const deckSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2, maxlength: 255 },
  cards: [flashcardSchema]
});

const Deck = mongoose.model("Deck", deckSchema);

function validateDeck(deck) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    cards: Joi.array()
  });
  return schema.validate(deck);
}
exports.Deck = Deck;
exports.validateDeck = validateDeck;
exports.deckSchema = deckSchema;
