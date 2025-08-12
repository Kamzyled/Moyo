// server.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/questions', (req, res) => {
  res.json([
    {
      id: 1,
      question: "What's my favorite color?",
      choices: ["Red", "Blue", "Green", "Purple"],
      answer: "Purple",
    },
    {
      id: 2,
      question: "Where did we first meet?",
      choices: ["Park", "Cafe", "School", "Library"],
      answer: "Cafe",
    },
    {
      id: 3,
      question: "What’s my favorite movie genre?",
      choices: ["Comedy", "Horror", "Sci-Fi", "Romance"],
      answer: "Sci-Fi",
    },
    {
      id: 4,
      question: "Which song reminds me of us?",
      choices: ["Song A", "Song B", "Song C", "Song D"],
      answer: "Song C",
    },
    {
      id: 5,
      question: "What’s my dream vacation spot?",
      choices: ["Beach", "Mountains", "City", "Countryside"],
      answer: "Beach",
    },
  ]);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
