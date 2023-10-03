from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import Book
from app.repository import BookRepository
from initialize_db import initialize_database

app = FastAPI()
initialize_database()
repository = BookRepository()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/books/', response_model=Book)
def create_book(title: str):
    book = repository.create_book(title, 'to-read')
    return book

@app.get('/books/', response_model=list[Book])
def get_books():
    return repository.get_books()

@app.get('/books/{book_id}', response_model=Book)
def get_book(book_id: int):
    book = repository.get_book_by_id(book_id)
    if book:
        return book
    raise HTTPException(status_code=404, detail="Book not found")

@app.put('/books/{book_id}/status/', response_model=Book)
def update_book_status(book_id: int):
    book = repository.get_book_by_id(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    if book.status == 'to-read':
        new_status = "in-progress"
    elif book.status == "in-progress":
        new_status = "completed"
    else:
        new_status = "completed"

    updated_book = repository.update_book_status(book_id, new_status)
    if updated_book:
        return updated_book
    raise HTTPException(status_code=400, detail="Failed to update book status")

@app.delete('/books/{book_id}', response_model=int)
def delete_book(book_id: int):
    book = repository.get_book_by_id(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    deleted_book_id = repository.delete_book(book_id)
    if deleted_book_id:
        return deleted_book_id
    raise HTTPException(status_code=400, detail="Failed to delete book")
