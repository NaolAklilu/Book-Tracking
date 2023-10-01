import psycopg2
from configparser import ConfigParser

def initialize_database():
    config = ConfigParser()
    config.read('config.ini')

    dbname = config['database']['dbname']
    user = config['database']['user']
    password = config['database']['password']
    host = config['database']['host']
    port = config['database']['port']

    # create books table
    create_books_table = """
    CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        status TEXT NOT NULL
    );
    """

    try:
        # Connect to the database
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port,
        )
        
        cursor = conn.cursor()
        cursor.execute(create_books_table)
        conn.commit()
        cursor.close()
        conn.close()

        print("Database tables initialized successfully.")

    except psycopg2.Error as e:
        print(f"Error: {e}")