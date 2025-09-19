const axios = require('axios');

const API_URL = 'https://crudcrud.com/api/0c1c414e4315475c9fbd6566391481fc/books';

const books = [
  { "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction", "publishedYear": 1925, "status": "Available" },
  { "title": "To Kill a Mockingbird", "author": "Harper Lee", "genre": "Fiction", "publishedYear": 1960, "status": "Issued" },
  { "title": "1984", "author": "George Orwell", "genre": "Dystopian", "publishedYear": 1949, "status": "Available" },
  { "title": "Pride and Prejudice", "author": "Jane Austen", "genre": "Romance", "publishedYear": 1813, "status": "Available" },
  { "title": "The Catcher in the Rye", "author": "J.D. Salinger", "genre": "Fiction", "publishedYear": 1951, "status": "Issued" },
  { "title": "Lord of the Flies", "author": "William Golding", "genre": "Adventure", "publishedYear": 1954, "status": "Available" },
  { "title": "The Hobbit", "author": "J.R.R. Tolkien", "genre": "Fantasy", "publishedYear": 1937, "status": "Available" },
  { "title": "Fahrenheit 451", "author": "Ray Bradbury", "genre": "Science Fiction", "publishedYear": 1953, "status": "Issued" },
  { "title": "Jane Eyre", "author": "Charlotte Bronte", "genre": "Romance", "publishedYear": 1847, "status": "Available" },
  { "title": "The Lord of the Rings", "author": "J.R.R. Tolkien", "genre": "Fantasy", "publishedYear": 1954, "status": "Available" },
  { "title": "Brave New World", "author": "Aldous Huxley", "genre": "Science Fiction", "publishedYear": 1932, "status": "Issued" },
  { "title": "Wuthering Heights", "author": "Emily Bronte", "genre": "Romance", "publishedYear": 1847, "status": "Available" },
  { "title": "The Chronicles of Narnia", "author": "C.S. Lewis", "genre": "Fantasy", "publishedYear": 1950, "status": "Available" },
  { "title": "Animal Farm", "author": "George Orwell", "genre": "Political Satire", "publishedYear": 1945, "status": "Issued" },
  { "title": "Of Mice and Men", "author": "John Steinbeck", "genre": "Fiction", "publishedYear": 1937, "status": "Available" },
  { "title": "Moby Dick", "author": "Herman Melville", "genre": "Adventure", "publishedYear": 1851, "status": "Available" },
  { "title": "Great Expectations", "author": "Charles Dickens", "genre": "Fiction", "publishedYear": 1861, "status": "Issued" },
  { "title": "The Odyssey", "author": "Homer", "genre": "Epic", "publishedYear": -800, "status": "Available" },
  { "title": "War and Peace", "author": "Leo Tolstoy", "genre": "Historical", "publishedYear": 1869, "status": "Issued" }
];

(async () => {
  for (const book of books) {
    try {
      const response = await axios.post(API_URL, book, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Added:', response.data.title);
    } catch (error) {
      console.error('Failed to add', book.title, error.message);
    }
  }
})();
