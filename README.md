# Project Name: Research Paper Explorer

## Overview

**Research Paper Explorer** is a web-based platform that enables users to search, download, and summarize academic research papers from **arXiv**, as well as perform natural language question-answering tasks on extracted paper content. The project includes a **Frontend** for user interaction and a **Backend** API that handles data processing and functionality.

---

## Features

### Key Capabilities

1. **Search for Papers**:
   - Query **arXiv** for research papers by keywords, authors, and publication year.
2. **Download PDFs**:
   - Fetch and store PDFs of selected papers.
3. **Text Extraction**:
   - Extract text from PDF documents for further analysis.
4. **Summarization**:
   - Summarize sections like abstract, introduction, methods, results, and conclusions using state-of-the-art NLP models.
5. **Question Answering**:
   - Answer user queries using a fine-tuned QA pipeline on extracted text.

### API Features

- **Search Papers**: Fetch research papers based on a query.
- **Get Paper Summary**: Download a paper's PDF and generate detailed section-wise summaries.
- **Chatbot**: Ask contextual questions about a research paper.

---

## API Documentation

### Endpoints

1. **Search Papers**
   - **URL**: `/search`
   - **Method**: `POST`
   - **Description**: Searches for relevant papers on **arXiv**.
   - **Request Body**:
     ```json
     {
       "query": "quantum computing",
       "author": "John Doe",
       "max_results": 5,
       "start_year": 2020,
       "end_year": 2024
     }
     ```
   - **Response**:
     ```json
     {
       "papers": [
         {
           "title": "Title of the Paper",
           "summary": "Short description of the paper",
           "published": "2023-10-01",
           "year": 2023,
           "pdf_link": "https://arxiv.org/pdf/12345.pdf",
           "authors": ["Author1", "Author2"],
           "link": "https://arxiv.org/abs/12345",
           "category": "cs.AI"
         }
       ]
     }
     ```

2. **Get Paper Summary**
   - **URL**: `/paper`
   - **Method**: `GET`
   - **Description**: Downloads the specified PDF and generates a detailed summary.
   - **Query Parameters**:
     - `paper_url`: The URL of the paper's PDF.
     - `pdf_name`: A name for storing the downloaded PDF.
   - **Response**:
     ```json
     {
       "paper": {
         "Abstract": "Summarized abstract.",
         "Introduction": "Summarized introduction.",
         "Methods": "Summarized methods.",
         "Results": "Summarized results.",
         "Conclusion": "Summarized conclusion."
       }
     }
     ```

3. **Chatbot Interaction**
   - **URL**: `/chat`
   - **Method**: `POST`
   - **Description**: Answers questions based on the content of the last processed paper.
   - **Request Body**:
     ```json
     {
       "question": "What are the key findings of the paper?"
     }
     ```
   - **Response**:
     ```json
     {
       "answer": "The key findings include..."
     }
     ```

---

## Frontend Setup

The **Frontend** is hosted in the `client` directory and enables users to interact with the system.

### Frontend Commands

1. **Install Dependencies**:
   ```bash
   bun i
   ```

2. **Start Development Server**:
   ```bash
   bun rev dev
   ```

---

## Backend Setup

The **Backend** is hosted in the `server` directory and provides API endpoints for all functionalities.

### Backend Commands

1. **Create Virtual Environment**:
   ```bash
   python -m venv .venv
   ```

2. **Activate Virtual Environment**:
   - **Linux/macOS**:
     ```bash
     source .venv/bin/activate
     ```
   - **Windows**:
     ```bash
     .venv\Scripts\activate
     ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Download NLP Model**:
   ```bash
   python -m spacy download en_core_web_sm
   ```

5. **Start the Server**:
   ```bash
   uvicorn app.main:app --reload
   ```

---

## Directory Structure

```
project-root/
│
├── client/                # Frontend code
│   ├── ...
│
├── server/                # Backend code
│   ├── app/
│   │   ├── models.py      # Models for search and chat requests
│   │   ├── main.py        # Entry point for the FastAPI server
│   │   ├── services.py    # Service functions for processing
│   ├── requirements.txt   # Backend dependencies
│
├── pdfs/                  # Directory for storing downloaded PDFs
│
└── README.md              # Project documentation
```

---

## How It Works

1. **Search for Papers**: Submit a search query to fetch relevant research papers from **arXiv**.
2. **Download PDFs**: Download PDFs of selected papers via the backend.
3. **Generate Summaries**: Use state-of-the-art NLP models to create concise summaries of key sections in the paper.
4. **Question Answering**: Pose questions to a chatbot powered by a fine-tuned QA pipeline to gain insights from the paper.

---

## Notes

- Ensure a stable internet connection for interacting with APIs and downloading PDFs.
- Use the global `text` variable cautiously, as it holds the context for summarization and Q&A tasks.
- Dependencies like `spaCy` and `transformers` must be installed for backend functionalities.

---

## Technologies Used

### Frontend
- Modern JavaScript Framework
- `bun` for package management and development

### Backend
- **FastAPI**: For building APIs
- **PyPDF2**: For PDF text extraction
- **spaCy**: For NLP tasks
- **Transformers**: For summarization and question-answering
- **arXiv API**: For fetching research papers

---

## Future Enhancements

- **Authentication**: Add user authentication for personalized services.
- **Pagination**: Improve paper fetching to handle large result sets.
- **Integration**: Add support for other research databases.

---
