import React, { useEffect, useState } from 'react';
import './LiteratureReview.css';
import { X } from 'lucide-react';
import { PersonOutlined, MenuBookOutlined } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf'; 
import { Share2, Bookmark, Download } from 'lucide-react';
const mockData = {
  introduction: "This comprehensive literature review examines the current state of research across multiple domains, synthesizing key findings and identifying areas for future investigation. The review spans theoretical frameworks, empirical studies, and methodological approaches.",
  themes: [
    {
      id: 1,
      name: "Machine Learning Applications in Healthcare",
      sections: {
        majorContributions: [
          { text: "I've updated the component to use inline styles that exactly match the CSS you provided. The styles are now applied directly to each element instead of using a separate CSS file. The functionality and visual appearance remain exactly the same, but now the styling is contained within the component itself.", citation: 1 },
          { text: "Predictive models for patient outcomes using electronic health records", citation: 2 },
          { text: "Integration of genomic data with clinical decision support systems", citation: 3 }
        ],
        methodologies: [
          { text: "Cross-validation techniques for medical datasets", citation: 4 },
          { text: "Transfer learning approaches for limited medical data", citation: 5 }
        ],
        contradictions: [
          { text: "Varying model performance across different demographic groups", citation: 6 }
        ],
        datasets: [
          { text: "Large-scale medical imaging datasets from multiple institutions", citation: 7 }
        ],
        limitations: [
          { text: "Data privacy concerns in healthcare applications", citation: 8 }
        ],
        results: [
          { text: "Improved diagnostic accuracy compared to traditional methods", citation: 9 }
        ],
        openQuestions: [
          { text: "How to ensure model fairness across diverse patient populations?", citation: 10 }
        ]
      }
    },
    {
      id: 2,
      name: "Natural Language Processing Advances",
      sections: {
        majorContributions: [
          { text: "Transformer-based architectures for language understanding", citation: 11 },
          { text: "Few-shot learning in language tasks", citation: 12 }
        ],
        methodologies: [
          { text: "Self-supervised pre-training methods", citation: 13 },
          { text: "Multi-lingual model training approaches", citation: 14 }
        ],
        contradictions: [
          { text: "Inconsistencies in cross-lingual transfer performance", citation: 15 }
        ],
        datasets: [
          { text: "Multilingual parallel corpora for model training", citation: 16 }
        ],
        limitations: [
          { text: "Computational requirements for large language models", citation: 17 }
        ],
        results: [
          { text: "State-of-the-art performance on multiple language tasks", citation: 18 }
        ],
        openQuestions: [
          { text: "How to reduce model size while maintaining performance?", citation: 19 }
        ]
      }
    },
    {
      id: 3,
      name: "Sustainable Computing",
      sections: {
        majorContributions: [
          { text: "Energy-efficient computing architectures", citation: 20 },
          { text: "Green data center design principles", citation: 21 }
        ],
        methodologies: [
          { text: "Carbon footprint measurement techniques", citation: 22 },
          { text: "Renewable energy integration strategies", citation: 23 }
        ],
        contradictions: [
          { text: "Trade-offs between performance and energy efficiency", citation: 24 }
        ],
        datasets: [
          { text: "Power consumption data from global data centers", citation: 25 }
        ],
        limitations: [
          { text: "Limited standardization in energy metrics", citation: 26 }
        ],
        results: [
          { text: "Significant reduction in operational energy costs", citation: 27 }
        ],
        openQuestions: [
          { text: "How to scale sustainable practices to edge computing?", citation: 28 }
        ]
      }
    }
  ],
  citations: [
    { number: 1, title: "Deep Learning in Medical Imaging", author: "Smith et al.", paperName: "Advanced Medical Image Analysis", details: "Nature Medicine, 2023" },
    { number: 2, title: "Predictive Healthcare Analytics", author: "Johnson et al.", paperName: "Clinical Outcome Prediction", details: "JAMA, 2023" },
    { number: 3, title: "Genomic Integration in Healthcare", author: "Williams et al.", paperName: "Modern Genomic Analysis", details: "Genome Research, 2023" },
    { number: 4, title: "Medical Data Validation", author: "Brown et al.", paperName: "Validation Techniques", details: "BMC Medical Research, 2023" },
    { number: 5, title: "Transfer Learning in Medicine", author: "Davis et al.", paperName: "Medical Transfer Learning", details: "Medical AI Journal, 2023" },
    { number: 6, title: "Model Bias in Healthcare", author: "Miller et al.", paperName: "Fairness in Medical AI", details: "Ethics in AI, 2023" },
    { number: 7, title: "Medical Imaging Datasets", author: "Wilson et al.", paperName: "Dataset Collection", details: "Radiology, 2023" },
    { number: 8, title: "Healthcare Data Privacy", author: "Taylor et al.", paperName: "Privacy Concerns", details: "Health Informatics, 2023" },
    { number: 9, title: "AI Diagnostics", author: "Anderson et al.", paperName: "Diagnostic Accuracy", details: "Medical AI Review, 2023" },
    { number: 10, title: "Fair Medical AI", author: "Thomas et al.", paperName: "Model Fairness", details: "AI Ethics, 2023" },
    { number: 11, title: "Transformer Architecture", author: "Lee et al.", paperName: "Language Models", details: "ACL, 2023" },
    { number: 12, title: "Few-shot Learning", author: "Garcia et al.", paperName: "Language Learning", details: "EMNLP, 2023" },
    { number: 13, title: "Self-supervised NLP", author: "Martinez et al.", paperName: "Pre-training Methods", details: "NAACL, 2023" },
    { number: 14, title: "Multilingual Models", author: "Kim et al.", paperName: "Cross-lingual Learning", details: "ICLR, 2023" },
    { number: 15, title: "Cross-lingual Challenges", author: "Wong et al.", paperName: "Transfer Learning Issues", details: "ACL, 2023" },
    { number: 16, title: "Parallel Corpora", author: "Rodriguez et al.", paperName: "Data Collection", details: "LREC, 2023" },
    { number: 17, title: "Model Efficiency", author: "Chen et al.", paperName: "Computational Costs", details: "NeurIPS, 2023" },
    { number: 18, title: "Language Model Performance", author: "Patel et al.", paperName: "Benchmark Results", details: "EMNLP, 2023" },
    { number: 19, title: "Model Compression", author: "Kumar et al.", paperName: "Size Reduction", details: "ICLR, 2023" },
    { number: 20, title: "Energy-efficient Computing", author: "Zhang et al.", paperName: "Green Computing", details: "IEEE Green Computing, 2023" },
    { number: 21, title: "Green Data Centers", author: "Liu et al.", paperName: "Sustainable Design", details: "Data Center Dynamics, 2023" },
    { number: 22, title: "Carbon Footprint", author: "Hassan et al.", paperName: "Measurement Methods", details: "Sustainable Computing, 2023" },
    { number: 23, title: "Renewable Integration", author: "Ahmed et al.", paperName: "Energy Strategy", details: "Green Tech Review, 2023" },
    { number: 24, title: "Performance Trade-offs", author: "Gupta et al.", paperName: "Efficiency Analysis", details: "IEEE Computing, 2023" },
    { number: 25, title: "Data Center Analytics", author: "Singh et al.", paperName: "Power Analysis", details: "Energy Research, 2023" },
    { number: 26, title: "Energy Metrics", author: "Cohen et al.", paperName: "Standardization", details: "Green Computing, 2023" },
    { number: 27, title: "Operational Efficiency", author: "Zhao et al.", paperName: "Cost Reduction", details: "Sustainable Tech, 2023" },
    { number: 28, title: "Edge Computing", author: "Thompson et al.", paperName: "Sustainability Challenges", details: "Edge Computing Review, 2023" }
  ]
};

const LiteratureReview = () => {
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(mockData.themes[0].id);
  const location = useLocation();
  const { query, timeRange, journal, author, minCitations } = location.state || {};
  const handleSave = async () => {
    try {
      // Make the API call (replace with your actual API URL and body)
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Add necessary request body parameters
          query: 'Your query or data here',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      const data = await response.json();
      // Handle the response, such as showing a success message
      console.log('Saved successfully:', data);
    } catch (error) {
      console.error('Error saving:', error);
      // Handle the error, such as showing an error message
    }
  };
  const handleCitationClick = (citationNumber, event) => {
    const citation = mockData.citations.find(c => c.number === citationNumber);
    setSelectedCitation(citation);

  };
  useEffect(() => {
    const fetchLiteratureData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/literature-review');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setLiteratureData(data); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching literature data:', error);
      }
    };

    fetchLiteratureData(); // Call the function when component mounts
    //call the api for lieterature review mocked it for now
  }, []);
  

  const closeCitationPanel = () => {
    setSelectedCitation(null);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont('Arial', 'normal');
    doc.text('Literature Review', 10, 10);
    doc.text(mockData.introduction, 10, 20);

    // Add more sections to PDF (themes, citations, etc.)
    mockData.themes.forEach((theme, index) => {
      doc.text(`${index + 1}. ${theme.name}`, 10, 30 + (index * 10));
      theme.sections.majorContributions.forEach((item, i) => {
        doc.text(`  - ${item.text}`, 15, 40 + (i + index * 5) * 10);
      });
    });

    doc.save('literature-review.pdf'); // Download the PDF
  };

  const currentTheme = mockData.themes.find(theme => theme.id === selectedTheme);

  return (
    <div className="literature-review" style={{
      display: 'flex',
      flexDirection: 'column',
      margin: '20px',
    }}>

      <div className="flex items-center justify-between">
        <p className='font-lato font-bold text-[64px] text-[#456787]'>Literature Review</p>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center text-center">
          <button
            className="text-[#B39984] hover:text-[#e4e0de]"
            onClick={handleSave}
          >
            <Bookmark size={28} />
            <p>Save</p>
          </button>
          <button
            className="text-[#B39984] hover:text-[#e4e0de]"
            onClick={handleDownload} 
          >
            <Download size={28} />
            <p>Download</p>
          </button>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h2 className='text-black text-[28px] font-semibold' style={{
          fontFamily: 'Poppins, sans-serif',
          marginTop: '20px'
        }}>Introduction</h2>
        <p className='font-noto text-[16px] leading-8'>{mockData.introduction}</p>
      </div>
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {mockData.themes.map(theme => (
          <button
            key={theme.id}
            onClick={() => setSelectedTheme(theme.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: selectedTheme === theme.id ? '#456787' : '#C7DFE9',
              color: selectedTheme === theme.id ? '#C7DFE9' : '#313131',
              cursor: 'pointer',
              fontSize: '0.9em',
              height: '50px',
              transition: 'all 0.3s ease',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: selectedTheme === theme.id ? 'Bold' : 'Regular',
              fontSize: selectedTheme === theme.id ? '18px' : '16px',
            }}
          >
            {theme.name}
          </button>
        ))}
      </div>


      <div className="theme">
        {Object.keys(currentTheme.sections).map(sectionKey => (
          <div key={sectionKey} className="section">
            <h1 className='text-black text-[28px] font-semibold' style={{
              fontFamily: 'Poppins, sans-serif',
              marginTop: '20px'
            }}>{sectionKey.replace(/([A-Z])/g, ' $1').trim()}</h1>
            <ul style={{
              listStyle: 'none',
              padding: 0
            }}>
              {currentTheme.sections[sectionKey].map((item, index) => (
                <li key={index} style={{
                  margin: '5px 0',
                  position: 'relative'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    position: 'relative'
                  }}>
                    <span
                      onClick={(e) => handleCitationClick(item.citation, e)}
                      style={{
                        cursor: 'pointer',
                        marginRight: selectedCitation?.number === item.citation ? '35vw' : '0',
                        transition: 'margin-right 0.3s ease',
                      }}>
                      {item.text}
                      <span style={{
                        fontSize: '1rem',
                        color: 'black',
                        backgroundColor: '#E0D4C7',
                        width: '25px',
                        height: '25px',
                        borderRadius: '8px',
                        display: 'inline-block',
                        textAlign: 'center',
                        margin: '0 10px',
                      }}>
                        {item.citation}
                      </span>
                    </span>

                    {selectedCitation?.number === item.citation && (
                      <div style={{
                        width: '30vw',
                        backgroundColor: '#D7EBF3',
                        borderRadius: '8px',
                        padding: '35px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        position: 'absolute',
                        right: '-20px',
                        top: '-100px',
                        minHeight: '30vh',
                        overflowY: 'auto'
                      }}>

                        <button
                          onClick={closeCitationPanel}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '15px',
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            padding: '5px 0',
                          }}
                        >
                          <X size={20} color="#00796b" />
                        </button>
                        <p style={{
                          marginTop: 0,
                          color: '#456787',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          marginBottom: '10px'
                        }}>
                          <span style={{
                            fontSize: '1rem',
                            color: 'black',
                            backgroundColor: '#A2C3E1',
                            width: '25px',
                            height: '25px',
                            borderRadius: '8px',
                            display: 'inline-block',
                            textAlign: 'center',
                            marginRight: '10px',
                          }}>
                            {item.citation}
                          </span>
                          {selectedCitation.title}</p>
                        <div className='mt-5'>
                          <p style={{
                            margin: '5px 0',
                            fontSize: '1em',
                            fontStyle: 'italic',
                            fontWeight: 'lighter'
                          }}><PersonOutlined className='mr-2 text-[12px] italic' /> {selectedCitation.author}</p>
                          <p style={{
                            margin: '5px 0',
                            fontSize: '1em',
                            fontStyle: 'italic',
                            fontWeight: 'lighter'
                          }}><MenuBookOutlined className='mr-2' /> {selectedCitation.paperName}</p>
                        </div>
                        <div

                        >

                          <p style={{
                            margin: '6px 0',
                            fontSize: '1.3em',
                            fontWeight: 'regular'
                          }}>{selectedCitation.details}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiteratureReview;