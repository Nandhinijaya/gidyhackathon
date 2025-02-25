import React from "react";
import { AppBar, Toolbar, Button, Container, Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Facebook, Instagram, YouTube, X } from "@mui/icons-material";

const LandingPage = () => {
  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1e1e1e" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">TalentSync</Typography>
        </Toolbar>
      </AppBar>

      {/* Spacer to prevent content from hiding under navbar */}
      <Toolbar />

      {/* Hero Section */}
      <Container sx={{ textAlign: "center", py: 12, flexGrow: 1 }}>
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Unlock Your Dream Career with AI
          </Typography>
          <Typography variant="h6" gutterBottom>
            Personalized job matching, resume analysis, and mock interviews – all in one place.
          </Typography>
          <Button variant="contained" color="primary" size="large" component={Link} to="/login" sx={{ mt: 3 }}>
            Get Started
          </Button>
        </motion.div>
      </Container>

      {/* Scroll Down Content to Push Footer */}
      <Container sx={{ py: 12 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Ready to Land Your Dream Job?  
            </Typography>
            <Typography textAlign="center" maxWidth="800px" margin="auto">
                We make job hunting effortless! With AI-driven resume feedback, tailored job recommendations, and interactive mock interviews, TalentSync gives you the edge to succeed. Let’s make your next move count!
            </Typography>
</Container>


      {/* Footer */}
      <Box component="footer" sx={{ backgroundColor: "#1e1e1e", py: 4, mt: "auto", fontSize: "14px" }}>
        <Container>
          <Grid container spacing={3} justifyContent="center" textAlign="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">TalentSync</Typography>
              <Typography variant="body2">Bridging the gap between education and employment.</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Explore</Typography>
              <Typography variant="body2">Career Guidance</Typography>
              <Typography variant="body2">Resume Analyzer</Typography>
              <Typography variant="body2">Mock Interviews</Typography>
              <Typography variant="body2">Job Listings</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Follow Us</Typography>
              <Box display="flex" justifyContent="center" gap={1}>
                <Facebook sx={{ cursor: "pointer" }} />
                <Instagram sx={{ cursor: "pointer" }} />
                <YouTube sx={{ cursor: "pointer" }} />
                <X sx={{ cursor: "pointer" }} />
              </Box>
            </Grid>
          </Grid>
          <Typography variant="body2" textAlign="center" sx={{ mt: 3, fontSize: "12px" }}>
            © 2025 TalentSync. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;
