from fastapi import APIRouter, HTTPException
from app.models import SearchRequest,ChatRequest
from app.services import fetch_relevant_papers,download_pdf,generate_section_summaries,ask

router = APIRouter()

@router.post("/search")
async def search_papers(request: SearchRequest):
    """
    Search for relevant papers.
    """
    try:
        # Fetch papers
        papers = fetch_relevant_papers(request)
        return {"papers": papers}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/paper")
async def get_paper(paper_url: str,pdf_name:str):
    """
    Get the full text of a paper.
    """
    try:
        # Fetch paper
        pdf_path = download_pdf(paper_url,pdf_name)
        paper = generate_section_summaries(pdf_path)
        return {"paper": paper }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/chat")
async def get_chat(request: ChatRequest):
    """
    Get the chatbot response.
    """
    try:
        answer = ask(request.question)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))