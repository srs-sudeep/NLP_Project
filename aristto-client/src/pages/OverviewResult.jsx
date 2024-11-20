import React, { useState } from 'react';
import SearchResultCard from 'components/SearchResultCard/SearchResultCard';
import { Card, CardContent, Box, Button, ThemeProvider, Typography, createTheme, Stack, IconButton } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'; import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
const OverviewResultPage = (data) => {
  const resultsData = [
    {
      doi: "12312",
      title: "Understanding Artificial Intelligence",
      citations: 156,
      year: 2023,
      authors: "John Doe, Jane Smith, Bob Brown",
      Summary: "This paper explores the impact of AI on various technology sectors.",
      Abstract: "An overview of artificial intelligence developments and applications.",
      Limitation: "Current limitations and challenges in AI research.",
      Result: "Key findings from recent AI studies, with insights into technology adoption.",
      References: "List of key academic references in AI studies.",
      SimilarPapers: "Papers related to this research topic for further reading."
    },
    {
      doi: "12312",
      title: "Advancements in Quantum Computing",
      citations: 89,
      year: 2022,
      authors: "Alice Walker, Tom Ford, Rachel Lee",
      Summary: "Explores recent advancements in quantum computing technologies.",
      Abstract: "Overview of quantum computing concepts and state-of-the-art developments.",
      Limitation: "Current challenges in scaling and error correction for quantum computers.",
      Result: "Results of experiments in quantum algorithms and speed improvements.",
      References: "Notable references on quantum computing theories and practices.",
      SimilarPapers: "Papers related to quantum cryptography and quantum supremacy."
    },
    {
      doi: "12312",
      title: "Blockchain in Financial Services",
      citations: 245,
      year: 2021,
      authors: "Chris Johnson, Emma Clark",
      Summary: "Analyzes blockchain's transformative potential in financial services.",
      Abstract: "Introduction to blockchain applications in the financial sector.",
      Limitation: "Challenges of security, scalability, and regulatory compliance.",
      Result: "Case studies on successful blockchain implementations in banking.",
      References: "Seminal papers on blockchain technology and fintech applications.",
      SimilarPapers: "Studies on blockchain in supply chain and healthcare."
    },
    {
      doi: "12312",
      title: "Machine Learning for Healthcare",
      citations: 302,
      year: 2020,
      authors: "Michael Chen, Sara Patel",
      Summary: "Discusses machine learning applications in diagnosis and treatment.",
      Abstract: "Review of machine learning techniques in healthcare settings.",
      Limitation: "Issues of data privacy and model interpretability in healthcare.",
      Result: "Results from clinical trials using machine learning for early diagnosis.",
      References: "Key papers on machine learning models and health data privacy.",
      SimilarPapers: "Studies on deep learning for medical image analysis."
    },
    {
      doi: "12312",
      title: "Autonomous Vehicles and Safety",
      citations: 178,
      year: 2024,
      authors: "Robert Turner, Lucy Adams, Mark White",
      Summary: "Examines safety improvements in autonomous vehicle technology.",
      Abstract: "Overview of autonomous vehicle development and safety protocols.",
      Limitation: "Limitations of sensors and environment detection in extreme conditions.",
      Result: "Key findings on safety improvements from field tests.",
      References: "Foundational papers on autonomous vehicles and AI.",
      SimilarPapers: "Studies on autonomous drones and traffic management."
    }
  ];
  // Props should have answer to the query 
  const copyToClipBoard = () => {
    // DUmmy text, remove when props is working
    const textToCopy = "this is being copied"
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Text Copied to Clipboard")
    })
  }
  return (
    <div>
      {/* Response to query */}
      <Card className="min-h-[100%] mb-14" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: '#D7EBF3', borderRadius: 8, padding: '16px' }}>
        <CardContent >
          {/* Replace with text from props when funcitonal */}
          <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#1976d2' }}>
            The input searched question that will be answered in a paragraph below or a list of statements?
          </Typography>
          {/* Replace with text from props when funcitonal */}
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </CardContent>
        <Box display="flex" justifyContent="end" padding="8px 16px">
          <IconButton size="small" color="grey">
            <ContentCopyOutlinedIcon fontSize="small" onClick={copyToClipBoard} />
          </IconButton>
          <IconButton size="small" color="grey">
            <BookmarkBorderOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="grey">
            <DownloadOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Card>
      {resultsData.map((result) => <SearchResultCard key={result.doi} paper={result} />)}
    </div>
  );
};

export default OverviewResultPage;
