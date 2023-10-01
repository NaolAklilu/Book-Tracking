import React from "react"
import MoveBook from "./move_book"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { deleteBook } from "@/redux/reducer";

function BookItem(book:Book) {
    const dispatch = useDispatch();

  const handleDeleteBook = () => {
    dispatch(deleteBook(book.id));
  };


    return <div className="rounded-md p-5 m-4 bg-gray-900">
        <div className="grid grid-cols-6 mb-4">
            <h1 className="col-span-5 text-lg font-serif">{book.title}</h1>
            <div className="flex row justify-end"><FontAwesomeIcon onClick={handleDeleteBook} className="text-red-500 md:text-xl text-md justify-end" icon={faTrash} /></div>
        </div>
        {book.status === 'completed' ? <div></div> : <MoveBook id={book.id} title={book.title} status={book.status} />}
    </div>
}

export default BookItem