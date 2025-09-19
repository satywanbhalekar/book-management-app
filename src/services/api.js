import axios from 'axios';

// Your unique CrudCrud endpoint
const BASE_URL = process.env.REACT_APP_CRUDCRUD_BASE_URL;

export const getBooks = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addBook = async (book) => {
  const res = await axios.post(BASE_URL, book);
  return res.data;
};

export const updateBook = async (id, book) => {
  const { _id, ...bookData } = book; // exclude _id from payload
  const res = await axios.put(`${BASE_URL}/${id}`, bookData);
  return res.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};


