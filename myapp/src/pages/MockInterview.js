import React, { useState } from "react";
import { Button, TextField, Typography, Container, Box, CircularProgress } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import axios from "axios";

// Interview Questions List
const interviewQuestions = [
  "Tell me about yourself.",
  "What are your strengths?",
  "What is your biggest weakness?",
  "Why should we hire you?",
  "Where do you see yourself in five years?",
];

// Load API key from environment variables
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
console.log("API Key Loaded:", apiKey ? "Yes" : "No"); // Check if API key is loaded

const MockInterview = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  let recognition = null;

  // Initialize Speech Recognition
  if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      setResponse(event.results[0][0].transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Speech recognition error. Try again!");
    };
  }

  // Start Speech Recognition
  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    } else {
      alert("Speech Recognition not supported in your browser.");
    }
  };

  // Stop Speech Recognition
  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  // Handle Next Question
  const handleNextQuestion = () => {
    if (questionIndex < interviewQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setResponse(""); // Clear previous response
      setFeedback(""); // Clear feedback
    } else {
      alert("You have completed the interview!");
    }
  };

  const evaluateAnswer = async (retryCount = 0) => {
    if (!response.trim()) {
      alert("Please provide a response before evaluating.");
      return;
    }
  
    setLoadingFeedback(true); // Show loader while AI processes
  
    const prompt = `
      Evaluate the following interview response for clarity, confidence, and relevance:
      ---
      **Question**: ${interviewQuestions[questionIndex]}
      **Response**: ${response}
      ---
      Provide structured feedback in this format:
      - **Clarity**: [Score 1-10] - Explanation
      - **Confidence**: [Score 1-10] - Explanation
      - **Relevance**: [Score 1-10] - Explanation
    `;
  
    try {
      console.log("Sending request to OpenAI...");

      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Ensure correct model is used
          messages: [
            { role: "system", content: "You are an AI interviewer providing feedback on interview answers." },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response received:", res.data);

      setFeedback(res.data.choices[0]?.message?.content || "No feedback received.");
    } catch (error) {
      console.error("Error fetching AI feedback:", error);
      setFeedback("Error generating feedback. Try again.");
    } finally {
      setLoadingFeedback(false);
    }
  };
  
  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={4}>
        <Typography variant="h4" gutterBottom>
          Mock Interview
        </Typography>
        <Typography variant="h6">{interviewQuestions[questionIndex]}</Typography>
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="Your response here..."
        value={response}
        onChange={(e) => setResponse(e.target.value)}
      />

      <Box display="flex" justifyContent="space-between" my={2}>
        {/* 🎤 Microphone Button */}
        <Button
          variant="contained"
          color={isListening ? "secondary" : "primary"}
          startIcon={<MicIcon />}
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? "Listening..." : "Use Microphone"}
        </Button>

        {/* ✅ Evaluate Answer */}
        <Button variant="contained" color="success" onClick={evaluateAnswer}>
          Evaluate Answer
        </Button>

        {/* ➡️ Next Question */}
        <Button variant="contained" color="secondary" onClick={handleNextQuestion}>
          Next Question
        </Button>
      </Box>

      {/* Loading Indicator for AI Feedback */}
      {loadingFeedback && (
        <Box my={2} textAlign="center">
          <CircularProgress />
        </Box>
      )}

      {/* 🎯 AI Feedback Section */}
      {feedback && (
        <Box my={3} p={2} border={1} borderRadius={2} borderColor="grey.400">
          <Typography variant="h6">AI Feedback:</Typography>
          <Typography>{feedback}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default MockInterview;
