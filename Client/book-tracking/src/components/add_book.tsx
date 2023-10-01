"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBook } from '../redux/reducer';

function AddBook() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const handleAddBook = () => {
    dispatch(createBook(title));
    setTitle('');
  };

  return (
      <div className="flex flex-col p-4 m-4 w-full">
        <div className="flex">
          <input
            type="text"
            placeholder="Book Title"
            className="text-black rounded py-1 px-2 mr-2 w-1/4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="border-2 border-blue-700 hover:bg-blue-700 text-white font-medium text-lg tracking-tight py-2 px-4 rounded"
            onClick={handleAddBook}
          >
            Add New Book
          </button>
        </div>
      </div>
  );
}

export default AddBook;
