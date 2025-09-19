import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { getBooks, addBook, updateBook, deleteBook } from '../services/api';
import { BookModal, DeleteModal } from './UI/Modal';
import Toast from './UI/Toast';
import BookSkeleton from './UI/BookSkeleton';
import './BookDashboard.css';

const BookDashboard = () => {
  // State variables
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const itemsPerPage = 10;

  // Load books when component mounts
  useEffect(() => {
    loadBooks();
  }, []);

  // Fetch books from API
  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      showToast('Failed to load books', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Memoize filtered books based on search and filters to optimize performance
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch =
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !genreFilter || book.genre === genreFilter;
      const matchesStatus = !statusFilter || book.status === statusFilter;
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [books, searchTerm, genreFilter, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

  // Extract unique genre and status options for filter dropdowns
  const genres = [...new Set(books.map(book => book.genre))].sort();
  const statuses = [...new Set(books.map(book => book.status))].sort();

  // Reset page number when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genreFilter, statusFilter]);

  // Handle adding a new book (show modal)
  const handleAddBook = () => {
    setEditingBook(null);
    setShowModal(true);
  };

  // Handle editing a book (show modal with book data)
  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowModal(true);
  };

  // Handle deleting a book (show delete confirmation modal)
  const handleDeleteBook = (book) => {
    setDeletingBook(book);
    setShowDeleteModal(true);
  };

  // Handle form submission for add/edit book
  const handleSubmitBook = async (formData) => {
    setModalLoading(true);
    try {
      if (editingBook) {
        await updateBook(editingBook._id, formData);
        setBooks(books.map(book => (book._id === editingBook._id ? { ...formData, _id: editingBook._id } : book)));
        showToast('Book updated successfully!');
      } else {
        const newBook = await addBook(formData);
        setBooks([...books, newBook]);
        showToast('Book added successfully!');
      }
      setShowModal(false);
    } catch {
      showToast('Failed to save book', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  // Handle confirming deletion of a book
  const handleConfirmDelete = async () => {
    setModalLoading(true);
    try {
      await deleteBook(deletingBook._id);
      setBooks(books.filter(book => book._id !== deletingBook._id));
      showToast('Book deleted successfully!');
      setShowDeleteModal(false);
      setDeletingBook(null);
    } catch {
      showToast('Failed to delete book', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  // Render pagination buttons dynamically
  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-2 rounded-lg ${
            currentPage === i ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  // JSX markup
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with title and add book button */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Book Management Dashboard</h1>
          </div>
          <button
            onClick={handleAddBook}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Book
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and filter controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
          >
            <option value="">All Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Showing results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredBooks.length} of {books.length} books
          </div>
        </div>

        {/* Book list table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  [...Array(5)].map((_, i) => <BookSkeleton key={i} />)
                ) : paginatedBooks.length > 0 ? (
                  paginatedBooks.map((book) => (
                    <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {book.genre}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.publishedYear}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {book.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditBook(book)}
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                            title="Edit book"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book)}
                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                            title="Delete book"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium mb-2">No books found</p>
                      <p className="text-sm">Try adjusting your search or filters, or add a new book.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {!loading && filteredBooks.length > 0 && totalPages > 1 && (
            <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBooks.length)} of {filteredBooks.length} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {renderPagination()}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <BookModal isOpen={showModal} onClose={() => setShowModal(false)} book={editingBook} onSubmit={handleSubmitBook} loading={modalLoading} />
      <DeleteModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleConfirmDelete} bookTitle={deletingBook?.title} loading={modalLoading} />

      {/* Toast notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default BookDashboard;
