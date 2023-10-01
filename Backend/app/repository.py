import psycopg2
from psycopg2.extras import DictCursor
from configparser import ConfigParser
from app.models import Book

config = ConfigParser()
config.read('config.ini')

dbname = config['database']['dbname']
user = config['database']['user']
password = config['database']['password']
host = config['database']['host']
port = config['database']['port']

class BookRepository:
    def __init__(self):
        self.conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port,
        )
        self.cursor = self.conn.cursor(cursor_factory=DictCursor)

    def create_book(self, title:str, status:str):
        self.cursor.execute('INSERT INTO books (title, status) VALUES (%s, %s) RETURNING id', (title, status))
        self.conn.commit()
        book_id = self.cursor.fetchone()['id']
        if self.cursor.rowcount > 0:
            return self.get_book_by_id(book_id)
        return None

    def get_books(self):
        self.cursor.execute('SELECT id, title, status FROM books')
        rows = self.cursor.fetchall()
        books = [Book(id=row['id'], title=row['title'], status=row['status']) for row in rows]
        return books

    def get_book_by_id(self, book_id: int):
        self.cursor.execute('SELECT id, title, status FROM books WHERE id = %s', (book_id,))
        row = self.cursor.fetchone()
        if row:
            return Book(id=row['id'], title=row['title'], status=row['status'])
        return None

    def update_book_status(self, book_id: int, new_status: str):
        self.cursor.execute('UPDATE books SET status = %s WHERE id = %s RETURNING id', (new_status, book_id))
        self.conn.commit()
        if self.cursor.rowcount > 0:
            return self.get_book_by_id(book_id)
        return None

    def delete_book(self, book_id: int):
        self.cursor.execute('DELETE FROM books WHERE id = %s RETURNING id', (book_id,))
        self.conn.commit()
        if self.cursor.rowcount > 0:
            return book_id
        return None