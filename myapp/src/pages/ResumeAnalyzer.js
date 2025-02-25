import React, { useState } from "react";
import { getDocument } from "pdfjs-dist";
import nlp from "compromise";
import { 
  Container, Typography, TextField, Button, Box, List, ListItem, ListItemText 
} from "@mui/material";

function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const pdf = await getDocument(new Uint8Array(reader.result)).promise;
      let extractedText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item) => item.str).join(" ") + "\n";
      }
      setResumeText(extractedText);
    };
  };

  const extractSkills = () => {
    const doc = nlp(resumeText);
    const extractedSkills = doc.nouns().out("array");
    setSkills(extractedSkills.slice(0, 10));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white", mt: 8 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Resume Analyzer
        </Typography>

        {/* File Upload */}
        <Box sx={{ mb: 5 }}>
          <Button variant="contained" component="label">
            Upload Resume (PDF)
            <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
          </Button>
        </Box>

        {/* Resume Text Output */}
        <Typography variant="h6" fontWeight="bold">
          Extracted Resume Text:
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          value={resumeText}
          InputProps={{ readOnly: true }}
          sx={{ mb: 3 }}
        />

        {/* Extract Skills Button */}
        <Button variant="contained" color="primary" onClick={extractSkills}>
          Extract Skills
        </Button>

        {/* Extracted Skills */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Extracted Skills:
          </Typography>
          <List>
            {skills.map((skill, index) => (
              <ListItem key={index}>
                <ListItemText primary={skill} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default ResumeAnalyzer;
