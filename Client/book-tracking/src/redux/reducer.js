import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/books/';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
});

export const createBook = createAsyncThunk('books/createBook', async (title) => {
  const response = await axios.post(`${BASE_URL}?title=${title}`);
  return response.data;
});

export const moveBook = createAsyncThunk('books/moveBook', async ( id ) => {
  const response = await axios.put(`${BASE_URL}${id}/status`);
  console.log(response.data)
  return response.data;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  await axios.delete(`${BASE_URL}${id}`);
  return id;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("created", action.payload)
        state.data.push(action.payload);
      })
      .addCase(moveBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedBook = action.payload;
        const index = state.data.findIndex((book) => book.id === updatedBook.id);
        if (index !== -1) {
          state.data[index] = updatedBook;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((book) => book.id !== action.payload);
      });
  },
});

export default bookSlice.reducer;
