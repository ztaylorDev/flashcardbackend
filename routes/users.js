const { User } = require('../models/user');
const { Flashcard, validate } = require('../models/flashcard'); 
const express = require('express');
const router = express.Router();


router.post('/:userId/flashcardCollection/:flashcardId', async (req, res) => { 
try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);

const flashcard = await Flashcard.findById(req.params.flashcardId);
if (!flashcard) return res.status(400).send(`The flashcard with id "${req.params.flashcardId}" does not exist.`);
   
    user.flaschcardCollection.push(flashcard);
    await user.save();
    return res.send(user.flaschcardCollection);
} catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`); }
});

router.put('/:userId/flashcardCollection/:flashcardId', async (req, res) => { 
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error);

      const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);
      
    const flaschard = user.flaschcardCollection.id(req.params.flashcardId);
    if (!flashcard) return res.status(400).send(`The product with id "${req.params.flashcardId}" does not exist in the users flashcard collection.`);
     flashcard.question = req.body.question;
     flashcard.answer = req.body.answer;
     flashcard.dateModified = Date.now(); 

     await user.save();
        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`); }
});

router.delete('/:userId/flashcardCollection/:flashcardId', async (req, res) => { 
    try {

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);

        let flashcard = user.flashcardCollection.id(req.params.flashcardId);
        if (!flashcard) return res.status(400).send(`The flashcard with id "${req.params.flashcardId}" does not exist in the users flashcard collection.`);

        flashcard = await flashcard.remove();


        await user.save();
        return res.send(flashcard);



    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    } 
});















module.exports = router;