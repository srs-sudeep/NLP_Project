from pydantic import BaseModel
from typing import List, Optional

class SearchRequest(BaseModel):
    query: str
    start_year: Optional[int] = None
    end_year: Optional[int] = None
    max_results: Optional[int] = 10
    author: Optional[str] = None

