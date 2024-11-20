import logging

# OpenAlex API configuration
BASE_OPENALEX_URL = "https://api.openalex.org/works"
EMAIL = "monaalsanghvi1998@gmail.com"
MIN_CITED_BY_COUNT = 20

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
