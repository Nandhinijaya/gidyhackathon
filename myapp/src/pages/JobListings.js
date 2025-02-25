import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";

const jobListings = [
    { id: 1, title: "Software Engineer", company: "Google", location: "Mountain View, CA", description: "Develop and optimize Google products." },
    { id: 2, title: "Data Scientist", company: "Microsoft", location: "Redmond, WA", description: "Analyze large datasets to generate insights." },
    { id: 3, title: "Machine Learning Engineer", company: "Amazon", location: "Seattle, WA", description: "Work on AI models for Amazon services." },
    { id: 4, title: "Cybersecurity Analyst", company: "IBM", location: "Austin, TX", description: "Monitor and protect networks from cyber threats." },
    { id: 5, title: "Frontend Developer", company: "Adobe", location: "San Jose, CA", description: "Build interactive UI components." },
    { id: 6, title: "Product Manager", company: "Facebook", location: "Menlo Park, CA", description: "Lead product teams to success." },
    { id: 7, title: "Backend Developer", company: "Netflix", location: "Los Gatos, CA", description: "Develop and scale backend services." },
    { id: 8, title: "Cloud Engineer", company: "Oracle", location: "Seattle, WA", description: "Deploy and manage cloud infrastructures." },
    { id: 9, title: "Blockchain Developer", company: "Coinbase", location: "San Francisco, CA", description: "Build decentralized applications." },
    { id: 10, title: "AI Research Scientist", company: "OpenAI", location: "San Francisco, CA", description: "Advance AI through research." },
    { id: 11, title: "DevOps Engineer", company: "Spotify", location: "New York, NY", description: "Streamline deployment pipelines." },
    { id: 12, title: "Game Developer", company: "Electronic Arts", location: "Los Angeles, CA", description: "Create engaging game experiences." },
    { id: 13, title: "Robotics Engineer", company: "Boston Dynamics", location: "Waltham, MA", description: "Develop cutting-edge robotics." },
    { id: 14, title: "Biomedical Engineer", company: "Medtronic", location: "Minneapolis, MN", description: "Design medical devices." },
    { id: 15, title: "Financial Analyst", company: "Goldman Sachs", location: "New York, NY", description: "Analyze financial markets." },
    { id: 16, title: "UX Designer", company: "Apple", location: "Cupertino, CA", description: "Design user-centric interfaces." },
    { id: 17, title: "Network Engineer", company: "Cisco", location: "San Jose, CA", description: "Maintain and optimize network infrastructure." },
    { id: 18, title: "Digital Marketer", company: "HubSpot", location: "Boston, MA", description: "Create and execute digital marketing strategies." },
    { id: 19, title: "Salesforce Administrator", company: "Salesforce", location: "San Francisco, CA", description: "Manage Salesforce CRM platform." },
    { id: 20, title: "Systems Analyst", company: "Dell", location: "Round Rock, TX", description: "Analyze and improve IT systems." },
    { id: 21, title: "Mobile Developer", company: "Snapchat", location: "Los Angeles, CA", description: "Create and optimize mobile applications." },
    { id: 22, title: "Business Analyst", company: "Accenture", location: "Chicago, IL", description: "Analyze business processes and provide solutions." },
    { id: 23, title: "QA Engineer", company: "Twitter", location: "San Francisco, CA", description: "Ensure software quality through testing." },
    { id: 24, title: "IT Support Specialist", company: "Intel", location: "Santa Clara, CA", description: "Provide technical support for IT systems." },
    { id: 25, title: "HR Manager", company: "Tesla", location: "Palo Alto, CA", description: "Manage human resources operations and policies." },
  
];


const itemsPerPage = 4;

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Filter jobs based on search input
  const filteredJobs = jobListings.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastJob = page * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const pageCount = Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <Container maxWidth="md" style={{ marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>

      <TextField
        label="Search for jobs..."
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1); // Reset to first page when searching
        }}
      />

      {currentJobs.map((job) => (
        <Card key={job.id} variant="outlined" style={{ marginBottom: "18px" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              {job.title}
            </Typography>
            <Typography variant="subtitle1">{job.company}</Typography>
            <Typography variant="body2" color="textSecondary">
              {job.location}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/job/${job.id}`}
              style={{ marginTop: "8px" }}
            >
              View Job
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Pagination Component */}
      <Pagination
        count={pageCount}
        page={page}
        onChange={(event, value) => setPage(value)}
        color="primary"
        style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};

export default JobListings;
