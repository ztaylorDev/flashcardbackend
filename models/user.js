const mongoose = require("mongoose");
const Joi = require("joi");
const { flashcardSchema } = require("./flashcard");


const userSchema = new mongoose.Schema({
  question: { type: String, required: true },
  flashcardCollection: { type: [flashcardSchema], default: [] },
});


const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(user);
}


exports.User = User;
exports.validate = validateUser;
