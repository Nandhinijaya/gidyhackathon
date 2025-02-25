import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.email.includes("@") || formData.password.length < 6) {
      setError("Enter a valid email and a password with at least 6 characters.");
      return;
    }
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/login");
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
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="#8A2BE2">
                Sign Up
              </Typography>
            </motion.div>
            
            {error && <Typography color="error">{error}</Typography>}
            
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSignup}
            >
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ bgcolor: "white", borderRadius: 1 }}
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
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#8A2BE2" }}>
                  Sign Up
                </Button>
              </motion.div>
            </motion.form>

            <Typography mt={2}>
              Already have an account?{" "}
              <Button variant="text" sx={{ color: "#8A2BE2", fontWeight: "bold" }} onClick={() => navigate("/login")}>
                Login
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Signup;
