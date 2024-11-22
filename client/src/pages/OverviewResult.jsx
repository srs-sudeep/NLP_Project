import React, { useEffect,useState} from 'react';
import { useLocation } from 'react-router-dom';
import SearchResultCard from 'components/SearchResultCard/SearchResultCard';
import { Card, CardContent, Box, Button, ThemeProvider, Typography, createTheme, Stack, IconButton } from '@mui/material';
import axios from 'axios';
const OverviewResultPage = () => {
  const location = useLocation();
  const [result,setResult] = useState([]);
  const query = location.state.query;
  const timeRange = {
    from: location.state.start_year ?? '',
    to: location.state.end_year ?? '',
  };
  const author = location.state.author ?? '';
  const searchPapers = async () => {
    const requestBody = {
      query: query,
      // start_year: timeRange.from,
      // end_year: timeRange.to,
      // citation_count: minCitations,
      // author: [author],
      // published_in: [journal],
      // published_by_institution: [],
    };

    try {
      const response = await axios.post('http://localhost:8000/search', requestBody);
      console.log(response.data.papers);
      setResult(response.data.papers);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    searchPapers();
  }, []);

  return (
    <div>
      {/* Response to query */}
      <Card className="min-h-[100%] mb-14" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: '#D7EBF3', borderRadius: 8, padding: '16px' }}>
        <CardContent >
          {/* Replace with text from props when funcitonal */}
          <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#1976d2' }}>
            {query}
          </Typography>
        </CardContent>
      </Card>
      {result.map((result) => <SearchResultCard key={result.link} paper={result} query={query} />)}
    </div>
  );
};

export default OverviewResultPage;
