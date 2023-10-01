from enum import Enum
from dataclasses import dataclass

class BookStatus(str, Enum):
    to_read = "to-read"
    in_progress = "in-progress"
    completed = "completed"

@dataclass
class Book:
    id: int
    title: str
    status: BookStatus = BookStatus.to_read

