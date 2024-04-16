// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://mongo:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Book schema
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  title: String,
  author: String,
  isbn: String
});
const Book = mongoose.model('Book', bookSchema);

// Route to add a new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, isbn } = req.body;
    // Create a new Book document
    const newBook = new Book({ title, author, isbn });
    // Save the new Book document to the database
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Error adding book' });
  }
});

// Route to get all books
app.get('/api/books', async (req, res) => {
  try {
    // Retrieve all books from the database
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
