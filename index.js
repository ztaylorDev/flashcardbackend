const connectDB = require("./startup/db");
const express = require("express");
const cors = require("cors");
const app = express();

const flashcards = require('./routes/flashcards');



connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/decks', flashcards);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});


