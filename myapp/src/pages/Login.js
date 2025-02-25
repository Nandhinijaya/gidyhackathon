import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import logo from "../assets/logo1.jpg"; // Ensure correct path

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#1e1e30">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card sx={{ width: 350, padding: 3, boxShadow: 3, borderRadius: 3, textAlign: "center", background: "#2c2c54", color: "white" }}>
          <CardContent>
            {/* Logo and Title with Violet Text */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                <img 
                  src={logo} 
                  alt="Logo" 
                  style={{ width: "30px", height: "30px", marginRight: "10px", borderRadius: "5px", verticalAlign: "middle" }} 
                />
                <span style={{ color: "#8A2BE2" }}>TalentSync</span> {/* Violet color */}
              </Typography>
            </motion.div>

            {error && <Typography color="error">{error}</Typography>}

            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onSubmit={handleLogin}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#6a5acd" }}>
                  Login
                </Button>
              </motion.div>
            </motion.form>

            <Typography mt={2}>
              New user?{" "}
              <Button variant="text" sx={{ color: "#8A2BE2", fontWeight: "bold" }} onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;
