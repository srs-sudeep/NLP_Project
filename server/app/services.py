import requests
from pyalex import Authors, Institutions, Publishers
from app.config import BASE_OPENALEX_URL, EMAIL, MIN_CITED_BY_COUNT, logger
from app.utils import get_id_list
from app.models import ResearchPaper
from typing import List, Optional
import time

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

def fetch_with_retry(url, retries=3, timeout=20):
    for attempt in range(retries):
        try:
            response = requests.get(url, timeout=timeout)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            if attempt < retries - 1:
                logger.warning(f"Retrying... (Attempt {attempt + 1})")
                time.sleep(2)
            else:
                raise e

def fetch_relevant_papers(query: str, url: str) -> List[ResearchPaper]:
    try:
        data = fetch_with_retry(url, retries=3, timeout=20)
        papers = []
        for work in data.get('results', []):
            # Preprocess work to match expected attributes, if necessary
            papers.append(ResearchPaper(**work))
        return papers
    except Exception as e:
        logger.error(f"Error fetching papers: {str(e)}")
        raise
