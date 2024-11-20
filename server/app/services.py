import requests
from app.config import BASE_OPENALEX_URL, EMAIL, MIN_CITED_BY_COUNT, logger
from app.utils import get_id_list
from app.models import ResearchPaper
from typing import List, Optional

def create_openalex_url(
    query: str,
    start_year: Optional[int],
    end_year: Optional[int],
    citation_count: Optional[int],
    published_in: Optional[List[str]],
    published_by_institution: Optional[List[str]],
) -> str:
    """Create a URL for querying the OpenAlex API."""
    try:
        cited_by_count = citation_count or MIN_CITED_BY_COUNT
        start_year_final = str(start_year) if start_year else "1800"
        end_year_final = str(end_year) if end_year else "2024"

        # Generate IDs
        publisher_ids = get_id_list(published_in, Publishers)
        institution_ids = get_id_list(published_by_institution, Institutions)

        # Base query
        url = f"{BASE_OPENALEX_URL}?mailto={EMAIL}&search={query}"
        url += f"&filter=cited_by_count:>{cited_by_count},publication_year:>{start_year_final},publication_year:<{end_year_final}"

        if publisher_ids:
            url += f",best_oa_location.source.host_organization:{publisher_ids}"
        if institution_ids:
            url += f",institutions.id:{institution_ids}"

        url += "&sort=relevance_score:desc&per-page=50&page=1"
        return url
    except Exception as e:
        logger.error(f"Error constructing URL: {str(e)}")
        raise

def fetch_relevant_papers(query: str, url: str) -> List[ResearchPaper]:
    """Fetch relevant papers from OpenAlex API."""
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        papers = []
        for work in data.get('results', []):
            paper = ResearchPaper(
                title=work.get("title"),
                authors=[author["display_name"] for author in work.get("authorships", [])],
                publication_year=work.get("publication_year"),
                cited_by_count=work.get("cited_by_count"),
                abstract=work.get("abstract_inverted_index"),
            )
            papers.append(paper)
        return papers
    except Exception as e:
        logger.error(f"Error fetching papers: {str(e)}")
        raise
