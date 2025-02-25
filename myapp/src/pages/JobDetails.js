import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Typography, Card, CardContent, Button, TextField } from "@mui/material";

// Sample job data (Replace with API call if needed)
const jobListings = [
  { id: 1, title: "Software Engineer", company: "Google", location: "Mountain View, CA", description: "Develop and optimize Google products.", salary: "$120,000 - $150,000", jobType: "Full-time", requirements: ["Experience with JavaScript and React", "Strong problem-solving skills", "Knowledge of cloud platforms"], benefits: ["Health Insurance", "401(k) Matching", "Remote Work Options"] },
  { id: 2, title: "Data Scientist", company: "Microsoft", location: "Redmond, WA", description: "Analyze large datasets to generate insights.", salary: "$110,000 - $140,000", jobType: "Full-time", requirements: ["Experience with Python and SQL", "Machine Learning knowledge", "Ability to visualize data insights"], benefits: ["Stock Options", "Flexible Work Hours", "Gym Membership"] },
  { id: 3, title: "Machine Learning Engineer", company: "Amazon", location: "Seattle, WA", description: "Work on AI models for Amazon services.", salary: "$130,000 - $160,000", jobType: "Full-time", requirements: ["Deep Learning expertise", "Experience with TensorFlow or PyTorch", "Ability to optimize ML models"], benefits: ["Remote Work", "Bonuses", "Paid Time Off"] },
  { id: 4, title: "Cybersecurity Analyst", company: "IBM", location: "Austin, TX", description: "Monitor and protect networks from cyber threats.", salary: "$90,000 - $120,000", jobType: "Full-time", requirements: ["Security protocols knowledge", "Experience with SIEM tools", "Risk assessment skills"], benefits: ["401(k) Plan", "Medical Coverage", "Work-from-home Flexibility"] },
  { id: 5, title: "Frontend Developer", company: "Adobe", location: "San Jose, CA", description: "Build interactive UI components.", salary: "$100,000 - $130,000", jobType: "Full-time", requirements: ["Proficiency in JavaScript, HTML, CSS", "Experience with React or Angular", "Strong UI/UX sense"], benefits: ["Stock Grants", "Flexible Schedule", "Wellness Program"] },
  { id: 6, title: "Product Manager", company: "Facebook", location: "Menlo Park, CA", description: "Lead product teams to success.", salary: "$140,000 - $170,000", jobType: "Full-time", requirements: ["Leadership experience", "Data-driven decision making", "Technical knowledge"], benefits: ["Annual Bonuses", "Free Meals", "Gym Membership"] },
  { id: 7, title: "Backend Developer", company: "Netflix", location: "Los Gatos, CA", description: "Develop and scale backend services.", salary: "$120,000 - $150,000", jobType: "Full-time", requirements: ["Proficiency in Node.js or Python", "Database management", "Cloud deployment skills"], benefits: ["Paid Parental Leave", "401(k) Contributions", "Remote Flexibility"] },
  { id: 8, title: "Cloud Engineer", company: "Oracle", location: "Seattle, WA", description: "Deploy and manage cloud infrastructures.", salary: "$110,000 - $145,000", jobType: "Full-time", requirements: ["AWS, GCP, or Azure expertise", "Containerization with Docker", "Infrastructure automation"], benefits: ["Healthcare", "Stock Options", "Annual Retreats"] },
  { id: 9, title: "Blockchain Developer", company: "Coinbase", location: "San Francisco, CA", description: "Build decentralized applications.", salary: "$130,000 - $160,000", jobType: "Full-time", requirements: ["Experience with Solidity & Ethereum", "Smart contract development", "Understanding of cryptography"], benefits: ["Remote Work", "Crypto Bonuses", "Flexible Work Hours"] },
  { id: 10, title: "AI Research Scientist", company: "OpenAI", location: "San Francisco, CA", description: "Advance AI through research.", salary: "$150,000 - $200,000", jobType: "Full-time", requirements: ["Deep Learning expertise", "Strong publication record", "Experience with reinforcement learning"], benefits: ["Stock Options", "Flexible PTO", "Hybrid Work Model"] },
  { id: 11, title: "DevOps Engineer", company: "Spotify", location: "New York, NY", description: "Streamline deployment pipelines.", salary: "$110,000 - $140,000", jobType: "Full-time", requirements: ["Experience with CI/CD", "Infrastructure automation", "Scripting proficiency"], benefits: ["Paid Leave", "Wellness Benefits", "Flexible Work"] },
  { id: 12, title: "Game Developer", company: "Electronic Arts", location: "Los Angeles, CA", description: "Create engaging game experiences.", salary: "$100,000 - $130,000", jobType: "Full-time", requirements: ["C++/C# proficiency", "Experience with Unity or Unreal", "Strong storytelling ability"], benefits: ["Discounted Games", "Health Insurance", "Remote Work"] },
  { id: 13, title: "Robotics Engineer", company: "Boston Dynamics", location: "Waltham, MA", description: "Develop cutting-edge robotics.", salary: "$120,000 - $160,000", jobType: "Full-time", requirements: ["Mechanical engineering background", "Programming experience in C++/Python", "AI and control systems knowledge"], benefits: ["Stock Options", "401(k)", "On-site Gym"] },
  { id: 14, title: "Biomedical Engineer", company: "Medtronic", location: "Minneapolis, MN", description: "Design medical devices.", salary: "$90,000 - $120,000", jobType: "Full-time", requirements: ["Biomedical engineering expertise", "FDA regulations knowledge", "Proficiency in CAD software"], benefits: ["Healthcare", "Annual Bonus", "Paid Time Off"] },
  { id: 15, title: "Financial Analyst", company: "Goldman Sachs", location: "New York, NY", description: "Analyze financial markets.", salary: "$85,000 - $115,000", jobType: "Full-time", requirements: ["Financial modeling skills", "Excel and SQL proficiency", "Strong analytical skills"], benefits: ["Stock Plans", "Health Benefits", "Employee Discounts"] },
  { id: 16, title: "UX Designer", company: "Apple", location: "Cupertino, CA", description: "Design user-centric interfaces.", salary: "$110,000 - $140,000", jobType: "Full-time", requirements: ["Experience with Sketch/Figma", "Strong portfolio of design projects", "Understanding of UX principles"], benefits: ["Health Insurance", "Stock Options", "Flexible Work Hours"] },
  { id: 17, title: "Network Engineer", company: "Cisco", location: "San Jose, CA", description: "Maintain and optimize network infrastructure.", salary: "$95,000 - $125,000", jobType: "Full-time", requirements: ["Experience with routers and switches", "CCNA certification", "Strong troubleshooting skills"], benefits: ["Healthcare", "401(k)", "Paid Time Off"] },
  { id: 18, title: "Digital Marketer", company: "HubSpot", location: "Boston, MA", description: "Create and execute digital marketing strategies.", salary: "$80,000 - $110,000", jobType: "Full-time", requirements: ["Experience with SEO/SEM", "Proficiency in Google Analytics", "Strong communication skills"], benefits: ["Health Insurance", "Stock Options", "Flexible Schedule"] },
  { id: 19, title: "Salesforce Administrator", company: "Salesforce", location: "San Francisco, CA", description: "Manage Salesforce CRM platform.", salary: "$90,000 - $120,000", jobType: "Full-time", requirements: ["Salesforce Administrator certification", "Experience with CRM systems", "Strong problem-solving skills"], benefits: ["Healthcare", "Annual Bonuses", "Remote Work Options"] },
  { id: 20, title: "Systems Analyst", company: "Dell", location: "Round Rock, TX", description: "Analyze and improve IT systems.", salary: "$85,000 - $115,000", jobType: "Full-time", requirements: ["Experience with system analysis", "Strong analytical skills", "Knowledge of IT infrastructure"], benefits: ["Health Insurance", "401(k)", "Paid Leave"] },
  { id: 21, title: "Mobile Developer", company: "Snapchat", location: "Los Angeles, CA", description: "Create and optimize mobile applications.", salary: "$105,000 - $135,000", jobType: "Full-time", requirements: ["Experience with iOS/Android development", "Proficiency in Swift/Kotlin", "Strong UI/UX skills"], benefits: ["Health Insurance", "Stock Options", "Flexible Work Hours"] },
  { id: 22, title: "Business Analyst", company: "Accenture", location: "Chicago, IL", description: "Analyze business processes and provide solutions.", salary: "$85,000 - $115,000", jobType: "Full-time", requirements: ["Strong analytical skills", "Experience with business process modeling", "Proficiency in Excel and SQL"], benefits: ["Healthcare", "401(k)", "Paid Time Off"] },
  { id: 23, title: "QA Engineer", company: "Twitter", location: "San Francisco, CA", description: "Ensure software quality through testing.", salary: "$95,000 - $125,000", jobType: "Full-time", requirements: ["Experience with automated testing", "Strong problem-solving skills", "Proficiency in Selenium or similar tools"], benefits: ["Health Insurance", "Stock Options", "Remote Work Options"] },
  { id: 24, title: "IT Support Specialist", company: "Intel", location: "Santa Clara, CA", description: "Provide technical support for IT systems.", salary: "$75,000 - $105,000", jobType: "Full-time", requirements: ["Experience in IT support", "Proficiency with Windows/Linux systems", "Strong troubleshooting skills"], benefits: ["Healthcare", "401(k)", "Flexible Schedule"] },
  { id: 25, title: "HR Manager", company: "Tesla", location: "Palo Alto, CA", description: "Manage human resources operations and policies.", salary: "$100,000 - $130,000", jobType: "Full-time", requirements: ["Experience in HR management", "Strong interpersonal skills", "Knowledge of HR software"], benefits: ["Health Insurance", "Stock Options", "Paid Time Off"] }
];



const JobDetails = () => {
  const { id } = useParams();
  const job = jobListings.find((job) => job.id === parseInt(id));

  if (!job) {
    return (
      <Container maxWidth="sm" style={{ marginTop: "20px", textAlign: "center" }}>
        <Typography variant="h5" color="error">Job Not Found</Typography>
        <Button variant="contained" color="primary" component={Link} to="/job-listings" style={{ marginTop: "16px" }}>
          Back to Listings
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>{job.title}</Typography>
          <Typography variant="h6" color="textSecondary">{job.company}</Typography>
          <Typography variant="body1" color="textSecondary">{job.location}</Typography>
          <Typography variant="body1" style={{ marginTop: "16px" }}>{job.description}</Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}><b>Salary:</b> {job.salary}</Typography>
          <Typography variant="body1" style={{ marginTop: "5px" }}><b>Job Type:</b> {job.jobType}</Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}><b>Requirements:</b></Typography>
          <ul>{job.requirements.map((req, index) => (<li key={index}>{req}</li>))}</ul>
          <Typography variant="body1" style={{ marginTop: "10px" }}><b>Benefits:</b></Typography>
          <ul>{job.benefits.map((benefit, index) => (<li key={index}>{benefit}</li>))}</ul>
          <Button variant="contained" color="success" component={Link} to="/apply" style={{ marginTop: "16px" }}>
            Apply Now
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/job-listings" style={{ marginLeft: "10px", marginTop: "16px" }}>
            Back to Listings
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export const Apply = () => {
  const [formData, setFormData] = useState({ name: "", email: "", resume: "" });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application Submitted!");
  };
  
  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>Apply for Job</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} required />
        <TextField label="Email" name="email" type="email" fullWidth margin="normal" onChange={handleChange} required />
        <TextField label="Resume (Link)" name="resume" fullWidth margin="normal" onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "16px" }}>
          Submit 
        </Button>
      </form>
    </Container>
  );
};

export default JobDetails;
