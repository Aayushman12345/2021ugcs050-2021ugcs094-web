import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LibraryManagementSystem.css'; // Import CSS file for styling

function LibraryManagementSystem() {
  // State to store form input values
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  // State to store list of books
  const [books, setBooks] = useState([]);

  // Axios instance with base URL for backend
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Replace with actual backend URL
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend to add new book
      const response = await axiosInstance.post('/api/books', { title, author, isbn });
      // Update list of books with newly added book
      setBooks([...books, response.data.book]);
      // Clear the form fields after successful submission
      setTitle('');
      setAuthor('');
      setIsbn('');
      alert('Book added successfully');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book. Please try again.');
    }
  };

  // Function to fetch list of books from backend on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/api/books');
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [axiosInstance]); // Include axiosInstance in the dependency array to ensure it's recreated when it changes

  return (
    <div className="container">
      <h1 className="heading">Library Management System</h1>
      <div className="add-book">
        <h2 className="sub-heading">Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="input-field" />
          </div>
          <div className="form-group">
            <label>ISBN:</label>
            <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} className="input-field" />
          </div>
          <button type="submit" className="submit-button">Add Book</button>
        </form>
      </div>
      <div className="book-list">
        <h2 className="sub-heading">Added Books</h2>
        <ul>
          {books.map(book => (
            <li key={book._id}>{book.title} by {book.author}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LibraryManagementSystem;
