import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Box, Button, ThemeProvider, Typography, createTheme, Skeleton } from '@mui/material';
import axios from 'axios';
import ChatBox from 'components/ChatBox';

const Paper = () => {
  const theme = createTheme({
    palette: {
      primary: { main: '#050505' },
      secondary: { main: '#B9BAB0' },
      background: { default: '#f9f9f9', paper: '#fff' },
      text: { primary: '#050505', secondary: '#16325B' },
      button: { primary: "#CBE9E9", active: "#0F0B9A" }
    },
  });

  const { state } = useLocation();
  const { paper, query } = state || {};

  const [selectedSection, setSelectedSection] = useState('Abstract');
  const [paperDetails, setPaperDetails] = useState(null); // Initialize as null for loading check
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch paper details
  const fetchPaperDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/paper?pdf_name=${paper.title}&paper_url=${paper.pdf_link}`);
      setPaperDetails(response.data.paper);
    } catch (error) {
      console.error("Error fetching paper details:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchPaperDetails();
  }, []);

  // Function to render the content based on selected section
  const renderContent = () => {
    if (loading) {
      // Display Skeleton loader while data is being fetched
      return (
        <>
          <Skeleton variant="text" width="80%" height={30} />
          <Skeleton variant="rectangular" width="100%" height={40} className='my-4' />
          <Skeleton variant="rectangular" width="100%" height={40} className='my-4' />
          <Skeleton variant="rectangular" width="100%" height={40} className='my-4' />
        </>
      );
    }
    return paperDetails[selectedSection] || "Content not available";
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.paper",
          minWidth: 600,
          maxWidth: "80vw",
          marginBottom: 2,
          padding: 3,
        }}
      >
        <Card style={{ backgroundColor: '#D7EBF3', borderRadius: 8, padding: '16px' }}>
          <CardContent>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#1976d2' }}>
              {query}
            </Typography>
          </CardContent>
        </Card>

        <div className="flex">
          <div className="w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4">{paper.title}</h2>
            <div className="flex space-x-4 mb-4">
              {/* Section buttons */}
              {['Abstract', 'Introduction', 'Methods', 'Results', 'Conclusion'].map(section => (
                <Button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  variant={selectedSection === section ? "contained" : "outlined"}
                  sx={{
                    py: 2,
                    px: 4,
                    bgcolor: selectedSection === section ? "#CBE9E9" : "gray.300",
                    color: selectedSection === section ? '#1976d2' : "inherit",
                    '&:hover': {
                      bgcolor: selectedSection === section ? "#B0D4D4" : "gray.400", 
                    },
                  }}
                >
                  {section}
                </Button>
              ))}
            </div>
            <div className="bg-gray-100 p-6">
              <div className="bg-white shadow-md rounded p-4">
                <Typography variant="body1">
                  {renderContent()}
                </Typography>
              </div>
            </div>
          </div>
          <div className="w-1/2 my-4 shadow-md rounded p-4">
            <div className="bg-grey">
              {loading ? (
                <>
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton variant="rectangular" width="100%" height={40} className="my-4" />
                  <Skeleton variant="rectangular" width="100%" height={40} className="my-4" />
                  <Skeleton variant="rectangular" width="100%" height={40} className="my-4" />
                </>
              ) : (
                <>
                  <Typography variant="h5" fontWeight="bold" color="text.primary">
                    Chat with paper
                  </Typography>
                  <ChatBox />
                </>
              )}
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Paper;
