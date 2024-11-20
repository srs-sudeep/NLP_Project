import React, { useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import { Box, Button, ThemeProvider, Typography, createTheme,Stack ,IconButton} from '@mui/material';
import { useNavigate } from 'react-router-dom';
const theme = createTheme({
  palette: {
    primary: { main: '#050505' },
    secondary: { main: '#B9BAB0' },
    background: { default: '#f9f9f9', paper: '#fff' },
    text: { primary: '#050505', secondary: '#B9BAB0' },
    button:{primary:"#CBE9E9",active:"#0F0B9A"}
  },
});

const SearchResultCard = ({ paper }) => {
  const [buttonList, setButtonList] = useState(["Summary","Abstract", "Limitation", "Result", "References", "Similar Papers"]);
  const [activeButton,setActiveButton] = useState(null)
  const [textContent,setTextContent] = useState(null)
  const navigate = useNavigate();
  const chatWithPaper = ()=>{
    navigate('/chat', { state: { title: paper.title, citations: paper.citations } });
    // make api call to chat with paper.doi
  }
  const buttonClick = (label)=>{
    setActiveButton(label);
    switch (label) {
      case "Summary":
        setTextContent(paper.Summary)
        break;

      case "Abstract":
        setTextContent(paper.Abstract)
        break;

      case "Limitation":
        setTextContent(paper.Limitation)
        break;

      case "Result":
        setTextContent(paper.Result)
        break;

      case "References":
        setTextContent(paper.References)
        break;

      case "Similar Papers":
        setTextContent(paper.SimilarPapers)
        break;

      default:
        setTextContent(`Information on ${label} not found`);
        break;
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.paper",
          minWidth: 600,
          maxWidth:"80vw",
          marginBottom: 2,
          border: 0,
          borderColor: "text.primary",
          padding: 3,
        }}
      >
        <Box sx={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
        {/* Title */}
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          {paper.title}
        </Typography>
        <Typography variant="body" color="text.secondary"><FormatQuoteIcon sx={{ color:"primary.main"}}/>{paper.citations} Citations • {paper.year}</Typography>
        </Box>
        {/* Authors and Journal */}
        <Box sx={{ display: 'flex',justifyContent:"space-between",alignItems: 'center', gap: 1, color: 'text.secondary', mt: 1 }}>
          <Typography><PersonOutlineIcon sx={{ color: 'black' }} />{paper.authors}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 1 }}>
          <Button  onClick={chatWithPaper} variant="outlined" startIcon={<ChatBubbleOutlineIcon />} sx={{ color: 'black', bgcolor:"button.primary",borderRadius:3,weight:4,border:0}}>
            Chat with Paper
          </Button>
        </Box>
        </Box>

        {/* Summary Section */}
        <Typography variant="subtitle1" fontWeight="bold" color="text.secondary" sx={{ mt: 2 }}>
          {activeButton?activeButton:"Summary"}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
          {textContent?textContent:paper.Summary}
        </Typography>

        {/* Button Group for Sections */}
        {/* <ButtonGroup variant="contained" size="sm" sx={{  gap: 2,bgcolor: "background.paper", mt:3 }}> */}
        <Stack
          direction="row"
          spacing={1.2}
          sx={{
            justifyContent:"space-between",
            alignItems:"center",
            // marginTop:5,
            padding:2
          }}
        >
          <Box >
          {buttonList.map((label) => (
            <Button
              key={label}
              sx={{
                borderRadius: 5,
                textTransform: 'none',
                paddingLeft:2,
                paddingRight:2,
                bgcolor: activeButton === label ? "button.active":"button.primary",
                color:activeButton === label?"white":'text.primary',
                marginRight:2
              }}
              onClick={()=>{buttonClick(label)}}
            >
              {label}
            </Button>
            
          ))}
          </Box>
          <Box sx={{display:"flex",flexDirection:"row"}}>
            <IconButton><BookmarkBorderIcon/></IconButton>
            <IconButton><ArrowCircleUpOutlinedIcon/></IconButton></Box>
          </Stack>
        {/* </ButtonGroup> */}
      </Box>
    </ThemeProvider>
  );
};

export default SearchResultCard;
