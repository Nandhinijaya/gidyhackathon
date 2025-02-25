import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";

const Apply = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    coverLetter: "",
    portfolio: "",
    resume: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "120px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Job Application Form {id}
          </Typography>
          {submitted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Application submitted successfully!
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="LinkedIn Profile"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="GitHub Profile"
              name="github"
              value={formData.github}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Cover Letter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Portfolio (Optional)"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              margin="normal"
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{ marginTop: "10px", display: "block" }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                mt: 3,
                width: "30%",
                display: "block",
                mx: "auto",
              }}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Apply;
