import React from 'react';
import { useDispatch } from 'react-redux';
import { moveBook } from '../redux/reducer';

function MoveBook(book:Book) {
  const dispatch = useDispatch();

  const handleMove = () => {
    dispatch(moveBook(book.id));
  };

  return (
    <div className="row flex justify-end mt-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={() => handleMove()}
      >
        {book.status === "to-read"? "To In Progress" : "To Completed"}
      </button>
    </div>
  );
}

export default MoveBook;
