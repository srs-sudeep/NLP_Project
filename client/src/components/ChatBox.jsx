import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';

const ChatBox = () => {
  const theme = createTheme({
    palette: {
      primary: { main: '#1976d2' },
      background: { default: '#f9f9f9', paper: '#fff' },
      text: { primary: '#050505' },
    },
  });

  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add user's question to the chat history
    const newChatHistory = [...chatHistory, { role: 'user', content: question }];
    setChatHistory(newChatHistory);
    
    try {
      // Send question to the backend
    //   const response = await axios.post('http://localhost:8000/ask', { question });
      
      // Add response to chat history
      setChatHistory([...newChatHistory, { role: 'bot', content: response.data.answer }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory([...newChatHistory, { role: 'bot', content: 'Sorry, something went wrong!' }]);
    }

    // Clear the question input
    setQuestion('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          p: 4,
          minHeight: '400px',
          maxHeight: '600px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <Box sx={{ flexGrow: 1, mb: 2, overflowY: 'auto' }}>
          {chatHistory.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  bgcolor: message.role === 'user' ? '#1976d2' : '#e0e0e0',
                  color: message.role === 'user' ? '#fff' : '#000',
                  borderRadius: 2,
                  p: 1,
                  maxWidth: '80%',
                  wordBreak: 'break-word',
                }}
              >
                {message.content}
              </Typography>
            </Box>
          ))}
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex' }}>
            <TextField
              variant="outlined"
              fullWidth
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
            />
            <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
              Send
            </Button>
          </Box>
        </form>
      </Paper>
    </ThemeProvider>
  );
};

export default ChatBox;
