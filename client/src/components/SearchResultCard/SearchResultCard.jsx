import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LinkIcon from '@mui/icons-material/Link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Button, ThemeProvider, Typography, createTheme, Stack, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DownloadOutlined } from '@mui/icons-material';
const theme = createTheme({
  palette: {
    primary: { main: '#050505' },
    secondary: { main: '#B9BAB0' },
    background: { default: '#f9f9f9', paper: '#fff' },
    text: { primary: '#050505', secondary: '#16325B' },
    button: { primary: "#CBE9E9", active: "#0F0B9A" }
  },
});

const SearchResultCard = ({ paper,query }) => {
  const navigate = useNavigate();
  const chatWithPaper = () => {
    navigate('/chat', { state: { paper,query  } });
  }
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.paper",
          minWidth: 600,
          maxWidth: "80vw",
          marginBottom: 2,
          border: 0,
          borderColor: "text.primary",
          padding: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Title */}
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            {paper.title}
          </Typography>
          <Box sx={{ border: '1px solid #ccc', padding: 1, borderRadius: 2, backgroundColor: '#f7f7f7' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{paper.category}</Typography>
          </Box>
        </Box>
        {/* Authors and Journal */}
        <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', gap: 1, color: 'text.secondary', mt: 1 }}>
          <Typography><PersonOutlineIcon sx={{ color: 'black' }} />{paper.authors}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 1 }}>
            <Button onClick={chatWithPaper} variant="outlined" startIcon={<ChatBubbleOutlineIcon />} sx={{ color: 'black', bgcolor: "button.primary", borderRadius: 3, weight: 4, border: 0 }}>
              Go to paper
            </Button>
          </Box>
        </Box>

        {/* Summary Section */}
        <Typography variant="subtitle1" fontWeight="bold" color="text.secondary" sx={{ mt: 2 }}>
          {"Summary"}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
          {paper.summary}
        </Typography>

        <Stack
          direction="row"
          spacing={1.2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography><AccessTimeIcon sx={{ color: 'black', marginRight: 1 }} />{paper.year}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <IconButton href={paper.pdf_link} target="_blank">
              <DownloadOutlined />
            </IconButton>
            <IconButton href={paper.link} target="_blank">
              <LinkIcon />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default SearchResultCard;
