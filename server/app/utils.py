from app.config import logger
from pyalex import Authors, Institutions, Publishers
from typing import List

def create_filter_string(filter_list: List[str]) -> str:
    """Generate filter strings for OpenAlex API."""
    return "|".join(filter_list) if filter_list else ""

def get_id_list(search_list: List[str], search_func) -> str:
    """Fetch IDs for authors, institutions, or publishers."""
    if not search_list:
        return ""
    try:
        search_results = search_func().search(create_filter_string(search_list)).get()
        return "|".join(item['id'].split(".org/")[1] for item in search_results)
    except Exception as e:
        logger.error(f"Error fetching IDs: {str(e)}")
        return ""
