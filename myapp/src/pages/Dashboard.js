import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Grid, Container, Typography } from "@mui/material";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth={false} sx={{ minHeight: "100vh", backgroundColor: "#121212", color: "#fff", paddingTop: 8 }}>
      <Typography variant="h3" align="center" sx={{ my: 8, fontWeight: "bold", color: "#fff" }}>
        Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Manually Adding Cards */}
        <Grid item>
          <Card
            onClick={() => navigate("/mock-interview")}
            sx={{
              width: 480,
              height: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              backgroundColor: "#1e1e1e",
              color: "#fff",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 10px rgba(255,255,255,0.2)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="inherit">
                Mock Interviews
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#ccc" }}>
                Practice with AI-driven interview sessions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card
            onClick={() => navigate("/job-listings")}
            sx={{
              width: 480,
              height: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              backgroundColor: "#1e1e1e",
              color: "#fff",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 10px rgba(255,255,255,0.2)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="inherit">
                Job Listings
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#ccc" }}>
                Find the latest job openings in your field.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card
            onClick={() => navigate("/resume-analyzer")}
            sx={{
              width: 480,
              height: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              backgroundColor: "#1e1e1e",
              color: "#fff",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 10px rgba(255,255,255,0.2)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="inherit">
                Resume Analyzer
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#ccc" }}>
                Get AI-driven insights on your resume.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
