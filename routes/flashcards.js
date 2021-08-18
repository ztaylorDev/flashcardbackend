const { Flashcard, validateFlashcard } = require("../models/flashcard");
const { Deck, validateDeck} = require("../models/deck") 
const express = require("express");
const router = express.Router();

// deck routes

router.get('/', async (req, res) => {
  try {
    const decks = await Deck.find();
    return res.send(decks);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`); 

  }
});




router.get("/:deckid", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.deckid);

    if (!deck)
      return res.status(400).send(`The deck with id "${req.params.deckid}" 
      does not exist.`);

    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});





router.post("/", async (req, res) => {
  try {
    const { error } = validateDeck(req.body);
    if (error) return res.status(400).send(error);

    const deck = new Deck({
      title: req.body.title,
      cards: req.body.cards,
    });

    await deck.save();

    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:deckid", async (req, res) => {
  try {
    const { error } = validateDeck(req.body);
    if (error) return res.status(400).send(error);

    const deck = await Deck.findByIdAndUpdate(
      req.params.deckid,
      {
        title: req.body.title,
        cards: req.body.cards,
      },
      { new: true }
    );
    if (!deck)
      return res.status(400).send(`The deck with id "${req.params.id}" 
      does not exist.`);

    await deck.save();

    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});




router.delete("/:deckid", async (req, res) => {
  try {

    const deck = await Deck.findByIdAndRemove(req.params.deckid);
    
    if (!deck)
      return res.status(400).send(`The deck with id "${req.params.deckid}" 
      does not exist.`);

    return res.send(deck);

  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});









// flashcard routes

router.get('/:decksid/flashcards/:flashcardid', async (req, res) => {
  try {
    // const decks = await Deck.findById(req.params.deckId)
    const flashcards = await Flashcard.findById(req.params.flashcardid);
    return res.send(flashcards);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`); 

  }
});





router.get('/:decksid/flashcards', async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    return res.send(flashcards);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`); 

  }
});






router.post("/:decksid/flashcards", async (req, res) => {
  try {
    const { error } = validateFlashcard(req.params.body);
    if (error) return res.status(400).send(error);

    const flashcard = new Flashcard({
      question: req.body.question,
      answer: req.body.answer,
    });

    await flashcard.save();

    return res.send(flashcard);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.put("/:decksid/flashcards/:flashcardid", async (req, res) => {
  try {
    const { error } = validateFlashcard(req.params.body);
    if (error) return res.status(400).send(error);

    const flashcard = await Flashcard.findByIdAndUpdate(
      req.params.flashcardid,
      {
        question: req.body.question,
        answer: req.body.answer,
      },
      { new: true }
    );
    if (!flashcard)
      return res.status(400).send(`The flashcard with id "${req.params.flashcardid}" 
      does not exist.`);

    await flashcard.save();

    return res.send(flashcard);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.delete("/:decksid/flashcards/:flashcardid", async (req, res) => {
  try {

    const flashcard = await Flashcard.findByIdAndRemove(req.params.flashcardid);
    
    if (!flashcard)
      return res.status(400).send(`The flashcard with id "${req.params.flashcardid}" 
      does not exist.`);

    return res.send(flashcard);

  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});





module.exports = router;
