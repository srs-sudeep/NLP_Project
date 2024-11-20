from app.config import logger
from typing import List
import requests

def create_filter_string(filter_list: List[str]) -> str:
    """Generate filter strings for OpenAlex API."""
    return "|".join(filter_list) if filter_list else ""

def fetch_ids_directly(api_url, query, timeout=10):
    """Fetch IDs directly from OpenAlex API."""
    try:
        response = requests.get(f"{api_url}?search={query}", timeout=timeout)
        response.raise_for_status()
        data = response.json()
        return "|".join(item['id'].split(".org/")[1] for item in data.get('results', []))
    except Exception as e:
        logger.error(f"Error fetching IDs: {str(e)}")
        return ""

def get_id_list(search_list: List[str], search_func) -> str:
    """Fetch IDs for authors, institutions, or publishers."""
    if not search_list:
        return ""
    try:
        search_client = search_func()
        search_results = search_client.search(create_filter_string(search_list)).get()
        return "|".join(item['id'].split(".org/")[1] for item in search_results)
    except Exception as e:
        logger.error(f"Error fetching IDs: {str(e)}")
        return ""
