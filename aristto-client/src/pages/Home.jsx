import React from 'react';
import { Typography, Box, Container, Paper, InputBase, IconButton, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

// Custom styled components
const SearchButton = styled(Button)({
  backgroundColor: '#F8F5F0',
  color: '#A88B76',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#EFE9E4',
  },
});

const QuarterButton = styled(Button)({
  minWidth: '40px',
  padding: '4px 8px',
  border: '1px solid #E0D5CC',
  color: '#666',
  backgroundColor: 'white',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#F6F1ED',
  },
});

const StyledPaper = styled(Paper)({
  backgroundColor: '#F8F5F0',
  padding: '24px',
  borderRadius: '19px',
});

const Home = () => {
  const navigate = useNavigate();
  // const [searchType, setSearchType] = React.useState('question');
  
  // State to track the form inputs
  const [query, setQuery] = React.useState('');
  const [timeRange, setTimeRange] = React.useState({ from: '', to: '' });
  const [journal, setJournal] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [minCitations, setMinCitations] = React.useState('');

  const handleSearch = (searchType) => {

    if (searchType === 'literature') {
      navigate('/literatureReview', {
        state: { query, timeRange, journal, author, minCitations }
      });
    }
    else {
      navigate('/overview', {
        state: { query, timeRange, journal, author, minCitations }
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      {/* Logo */}
      <Box sx={{ textAlign: 'center', mb: 6 }} className="flex flex-col justify-center items-center">
        <img src="/logo.png" alt="Logo" className="h-15 md:h-57" />
        <Typography sx={{ color: '#666', fontSize: '2rem' }} className="text-9xl font-italic">
          Get answers to your research questions
        </Typography>
      </Box>

      {/* Search Type Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 8, mb: 4 }}>
        <SearchButton
          variant="contained"
          onClick={() => handleSearch('question')}
        >
          Ask a Question
        </SearchButton>
        <SearchButton
          variant="contained"
          onClick={() => handleSearch('literature')}
        >
          Literature Review
        </SearchButton>
      </Box>
      {/* Search Form */}
      <StyledPaper elevation={1}>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            backgroundColor: '#F8F5F0',
            boxShadow: 'none',
            borderBottom: '1px solid #E0D5CC',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Phrase"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: '10px' }}>
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* Filters */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          {/* Journal */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Typography variant="caption" sx={{ color: '#836F60', width: '150px', fontSize: '1.25rem' }}>
              Journal
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
                <QuarterButton key={q} variant="outlined" onClick={() => setJournal(q)}>
                  {q}
                </QuarterButton>
              ))}
            </Box>
          </Box>

          {/* Time Range */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Typography variant="caption" sx={{ color: '#836F60', width: '150px', fontSize: '1.25rem' }}>
              Time Range
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="From"
                value={timeRange.from}
                onChange={(e) => setTimeRange({ ...timeRange, from: e.target.value })}
                sx={{ width: '100px', backgroundColor: '#fff' }}
              />
              <TextField
                size="small"
                placeholder="To"
                value={timeRange.to}
                onChange={(e) => setTimeRange({ ...timeRange, to: e.target.value })}
                sx={{ width: '100px', backgroundColor: '#fff' }}
              />
            </Box>
          </Box>

          {/* Author */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Typography variant="caption" sx={{ color: '#836F60', width: '150px', fontSize: '1.25rem' }}>
              Author
            </Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="Author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              sx={{ backgroundColor: '#fff' }}
            />
          </Box>

          {/* Citation Count */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Typography variant="caption" sx={{ color: '#836F60', width: '150px', fontSize: '1.25rem' }}>
              Min Citation count
            </Typography>
            <TextField
              size="small"
              placeholder="Min citations"
              value={minCitations}
              onChange={(e) => setMinCitations(e.target.value)}
              sx={{ backgroundColor: '#fff' }}
            />
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default Home;
