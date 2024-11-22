import requests
from app.models import SearchRequest
import xml.etree.ElementTree as ET
import sys
import bs4 as bs
import urllib.request
import re
import nltk
from nltk.stem import WordNetLemmatizer
import spacy
from PyPDF2 import PdfReader
import os
from transformers import T5Tokenizer, T5ForConditionalGeneration, AutoTokenizer, AutoModelForQuestionAnswering, pipeline
pdf_dir = "pdfs"
if not os.path.exists(pdf_dir):
    os.makedirs(pdf_dir)

def fetch_relevant_papers(request: SearchRequest):
    base_url = "http://export.arxiv.org/api/query?"

    # Construct search query
    search_query = f"search_query=all:{request.query}"
    if request.author:
        search_query += f"+AND+au:{request.author}"
    
    # Limit number of results
    max_results = request.max_results or 10

    # Combine URL
    url = f"{base_url}{search_query}&max_results={max_results}"

    # Fetch data
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception("Error fetching data from arXiv")

    # Parse XML response
    root = ET.fromstring(response.content)
    papers = []
    
    for entry in root.findall("{http://www.w3.org/2005/Atom}entry"):
        title = entry.find("{http://www.w3.org/2005/Atom}title").text.strip()
        summary = entry.find("{http://www.w3.org/2005/Atom}summary").text.strip()
        published = entry.find("{http://www.w3.org/2005/Atom}published").text
        link = entry.find("{http://www.w3.org/2005/Atom}id").text
        category = entry.find("{http://www.w3.org/2005/Atom}category").attrib['term']
        pdf_link = entry.find("{http://www.w3.org/2005/Atom}link[@type='application/pdf']").attrib['href']
        
        # Extract authors
        authors = [author.find("{http://www.w3.org/2005/Atom}name").text 
                   for author in entry.findall("{http://www.w3.org/2005/Atom}author")]

        # Extract publication year
        year = int(published[:4])
        
        # Filter by start and end year if specified
        if request.start_year and year < request.start_year:
            continue
        if request.end_year and year > request.end_year:
            continue
        
        papers.append({
            "title": title,
            "summary": summary,
            "published": published,
            "year": year,
            "pdf_link": pdf_link,
            "authors": authors,
            "link": link,
            "category": category
        })

    return papers



# Execute this line if you are running this code for the first time
nltk.download('wordnet')
nltk.download('omw-1.4')

nlp = spacy.load('en_core_web_sm')

# Initialize the lemmatizer
lemmatizer = WordNetLemmatizer()

# Initialize Q&A pipeline
qa_tokenizer = AutoTokenizer.from_pretrained("deepset/roberta-base-squad2")
qa_model = AutoModelForQuestionAnswering.from_pretrained("deepset/roberta-base-squad2")
qa_pipeline = pipeline("question-answering", model=qa_model, tokenizer=qa_tokenizer)


def download_pdf(pdf_url, pdf_name):
    """Downloads the PDF from the provided URL and saves it in the pdf_dir."""
    pdf_path = os.path.join(pdf_dir, f"{pdf_name}.pdf")
    
    # Check if the file already exists
    if os.path.exists(pdf_path):
        print(f"PDF already exists: {pdf_path}")
        return pdf_path  # Return the existing file path
    
    print(f"Downloading PDF: {pdf_name}")
    
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    headers = {'User-Agent': user_agent}
    
    try:
        response = requests.get(pdf_url, stream=True, headers=headers)
        response.raise_for_status()  # Raise an error for bad responses (4xx and 5xx)

        # Write the PDF to the specified directory
        with open(pdf_path, 'wb') as pdf_file:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    pdf_file.write(chunk)

        print(f"PDF downloaded successfully: {pdf_path}")
        return pdf_path  # Return the newly downloaded file path
    
    except requests.exceptions.RequestException as e:
        print(f"Failed to download PDF from {pdf_url}: {e}")
        return None

# Function to Read PDF File and return its Text
def pdfReader(pdf_path):
    with open(pdf_path, 'rb') as pdfFileObject:
        pdfReader = PdfReader(pdfFileObject)
        count = len(pdfReader.pages)
        print("\nTotal Pages in pdf = ", count)
        text = ""
        for i in range(0, count):
            page = pdfReader.pages[i]
            text += page.extract_text()

    return text


# Q&A Function
def ask_question(question, context):
    result = qa_pipeline(question=question, context=context)
    return result['answer']


# Step 4. Summarizing the Text

def generate_section_summaries(pdf_url):
    text = pdfReader(pdf_url)
    tokenizer = T5Tokenizer.from_pretrained("t5-base")
    model = T5ForConditionalGeneration.from_pretrained("t5-base")

    def get_summary(input_text, prompt, min_length, max_length):
        preprocess_text = input_text.strip().replace("\n", " ")
        t5_input_text = f"{prompt}: {preprocess_text}"
        tokenized_text = tokenizer.encode(t5_input_text, return_tensors="pt", max_length=512, truncation=True)

        summary_ids = model.generate(
            tokenized_text,
            num_beams=6,
            no_repeat_ngram_size=3,
            min_length=min_length,
            max_length=max_length,
            early_stopping=True
        )

        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

        # Post-processing to clean unwanted characters
        clean_summary = re.sub(r'[^\x00-\x7F]+', '', summary)
        clean_summary = re.sub(r'\s+', ' ', clean_summary).strip()
        return clean_summary

    # Generate summaries for different sections
    abstract = get_summary(text, "summarize in a concise abstract", min_length=100, max_length=150)
    introduction = get_summary(text, "provide the introduction or background", min_length=150, max_length=300)
    methods = get_summary(text, "describe the methods and techniques", min_length=150, max_length=300)
    results = get_summary(text, "summarize the findings and results", min_length=200, max_length=500)
    conclusion = get_summary(text, "summarize the conclusion and insights", min_length=100, max_length=200)

    return {
        "Abstract": abstract,
        "Introduction": introduction,
        "Methods": methods,
        "Results": results,
        "Conclusion": conclusion
    }


# Step 6. Q&A Section
# print("" * 20, "Q&A Section", "" * 20)
# while True:
#     question = input("\nEnter your question (or type 'exit' to quit): ")
#     if question.lower() == 'exit':
#         print("\nExiting Q&A Section. Goodbye!")
#         break
#     answer = ask_question(question, text)
#     print(f"\nAnswer: {answer}")