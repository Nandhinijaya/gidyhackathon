import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { motion } from "framer-motion";
import logo from "../assets/logo1.jpg"; // Ensure correct path

function Navbar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1e1e1e", padding: "5px 0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
        {/* Animated Logo */}
        <motion.img
          src={logo}
          alt="TalentSync Logo"
          style={{ width: "40px", height: "40px", borderRadius: "5px", marginRight: "10px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Brand Name */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff" }}>
          TalentSync
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 