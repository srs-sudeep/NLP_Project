from fastapi import APIRouter, HTTPException
from app.models import SearchRequest
from app.services import create_openalex_url, fetch_relevant_papers

router = APIRouter()

@router.post("/search")
async def search_papers(request: SearchRequest):
    """
    Search for relevant papers using OpenAlex API.
    """
    try:
        # Construct URL
        url = create_openalex_url(
            query=request.query,
            start_year=request.start_year,
            end_year=request.end_year,
            citation_count=request.citation_count,
            published_in=request.published_in,
            published_by_institution=request.published_by_institution,
        )

        # Fetch papers
        papers = fetch_relevant_papers(request.query, url)
        return {"papers": papers}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
