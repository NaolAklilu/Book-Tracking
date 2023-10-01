from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_book():
    response = client.post('/books/', json={"title": "Test Book", "status": "to-read"})
    assert response.status_code == 200
    assert response.json() == 1
def test_get_books():
    response = client.get('/books/')