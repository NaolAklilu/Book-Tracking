"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/reducer';
import BookItem from './book_item';

function BookList() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.data);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  useEffect(() =>  {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className='flex justify-center align-center'>
      <div className='bg-red-900 rounded-md p-6 m-4 text-white'>{error}</div>;
    </div>
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 p-4">
        <h1 className='font-serif font-bold tracking-tight text-xl text-center'>To Read</h1>
        <div>
          {books
            .filter((book:Book) => book.status === 'to-read')
            .map((book:Book) => (
              <BookItem id={book.id} title={book.title} status={book.status} />
            ))}
        </div>
      </div>
      <div className="col-span-1 p-4">
        <h1 className='font-serif font-bold tracking-tight text-xl text-center'>In Progress</h1>
        <div>
          {books
            .filter((book:Book) => book.status === 'in-progress')
            .map((book:Book) => (
              <BookItem id={book.id} title={book.title} status={book.status} />
            ))}
        </div>
      </div>
      <div className="col-span-1 p-4">
        <h1 className='font-serif font-bold tracking-tight text-xl text-center'>Completed</h1>
        <div>
          {books
            .filter((book:Book) => book.status === 'completed')
            .map((book:Book) => (
              <BookItem id={book.id} title={book.title} status={book.status} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default BookList;





              // <div key={book.id} className="mb-2">
              //   {book.title}
              //   <MoveBook id={book.id} title={book.title} status={book.status} />
              // </div>












// import BookItem from "./book_item"

// function BookList() {
//     return (
//         <div className="p-10">
//             <div className="row flex justify-end align-center md-mr-10 mr-6">
//                 <button className="p-4 rounded-md bg-blue-300">Add Book</button>
//             </div>
//             <div className="grid grid-cols-3 p-10">
//         <div>
//             <h1 className="text-xl text-center ">To Read</h1>
//             <BookItem title={"Book 1"}/>
//             <BookItem title={"Book 2"}/>
//             <BookItem title={"Book 3"}/>
//         </div>
//         <div>
//             <h1 className="text-xl text-center">In Progress</h1>
//             <BookItem title={"Book 4"}/>
//             <BookItem title={"Book 5"}/>
//             <BookItem title={"Book 6"}/>
//         </div>
//         <div>
//             <h1 className="text-xl text-center ">Completed</h1>
//             <BookItem title={"Book 7"}/>
//             <BookItem title={"Book 8"}/>
//             <BookItem title={"Book 9"}/>
//         </div>
//     </div>
//         </div>
//     )
// }

// export default BookList