import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import JobListings from "./pages/JobListings";
import MockInterview from "./pages/MockInterview";
import JobDetails from "./pages/JobDetails";
import Apply from "./pages/Apply";
import LandingPage from "./pages/LandingPage";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#fff", secondary: "#bbb" },
  },
});

// Protected Route Function
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated === "true" ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/resume-analyzer" element={<PrivateRoute><ResumeAnalyzer /></PrivateRoute>} />
          <Route path="/job-listings" element={<PrivateRoute><JobListings /></PrivateRoute>} />
          <Route path="/mock-interview" element={<PrivateRoute><MockInterview /></PrivateRoute>} />
          <Route path="/apply" element={<PrivateRoute><Apply /></PrivateRoute>} />

          {/* Job Details Page */}
          <Route path="/job/:id" element={<PrivateRoute><JobDetails /></PrivateRoute>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
