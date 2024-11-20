from pydantic import BaseModel
from typing import List, Optional

class SearchRequest(BaseModel):
    query: str
    start_year: Optional[int] = None
    end_year: Optional[int] = None
    citation_count: Optional[int] = None
    author: Optional[List[str]] = None
    published_in: Optional[List[str]] = None
    published_by_institution: Optional[List[str]] = None

class ResearchPaper(BaseModel):
    title: str
    authors: List[str]
    publication_year: int
    cited_by_count: int
    abstract: Optional[str] = None
