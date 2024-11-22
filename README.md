# Project Name: Research Paper Explorer

## Overview

Research Paper Explorer is a web application designed to fetch, process, and summarize academic research papers from **arXiv**. Users can search for relevant papers, download PDFs, extract key sections, and perform question-answering tasks based on the extracted text. The project has two main components: the **Frontend** and the **Backend**.

---

## Features

- **Search and Fetch Papers**: Query arXiv for research papers based on keywords, authors, and publication years.
- **PDF Download**: Automatically download PDFs of research papers.
- **PDF Text Extraction**: Extract text from PDFs for processing.
- **Summarization**: Generate summaries for sections like abstract, introduction, methods, results, and conclusions.
- **Question Answering**: Use natural language processing to answer questions based on the paper's content.

---

## Frontend

The **Frontend** is hosted in the `client` directory and is built using modern web development tools.

### Setup and Run Commands

1. **Install Dependencies**:
   ```bash
   bun i
   ```

2. **Start Development Server**:
   ```bash
   bun rev dev
   ```

---

## Backend

The **Backend** is hosted in the `server` directory and provides APIs for interacting with the application. It uses Python with FastAPI and requires a virtual environment for setup.

### Setup Instructions

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
│   │   ├── models.py      # Models for search requests
│   │   ├── main.py        # Entry point for the FastAPI server
│   ├── requirements.txt   # Backend dependencies
│
├── pdfs/                  # Directory for storing downloaded PDFs
│
└── README.md              # Project documentation
```

---

## Technologies Used

### Frontend
- Modern JavaScript framework
- `bun` for package management and development server

### Backend
- **FastAPI**: For building APIs
- **PyPDF2**: For PDF text extraction
- **spaCy**: For NLP tasks
- **Transformers**: For summarization and question-answering
- **arXiv API**: For fetching research papers

---

## How It Works

1. **Search for Papers**: The user provides a query (e.g., topic, author, year) to fetch relevant research papers.
2. **Download PDFs**: The system downloads the PDF files of selected papers.
3. **Extract Text**: Extracts the content of the downloaded PDF for processing.
4. **Generate Summaries**: Summarizes the paper into sections like abstract, methods, and conclusions.
5. **Ask Questions**: Users can pose questions, and the system will return contextually accurate answers based on the extracted text.

---

## Notes

- Ensure you have a stable internet connection for downloading PDFs and interacting with APIs.
- The `en_core_web_sm` NLP model from spaCy must be downloaded for backend functionality.
- Use the global `text` variable cautiously, as it holds the context for summarization and Q&A tasks.

--- 
