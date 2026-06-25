"use client";

import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "rgba(15, 23, 42, 0.8)",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  boxShadow: "none",
}));

export default function Navbar() {
  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }} component={Link} href="/">
          <SchoolIcon sx={{ mr: 1, color: "#818cf8" }} />
          <Typography variant="h6" noWrap sx={{ fontWeight: 700, letterSpacing: "-0.5px" }}>
            LearnLoop
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button color="inherit" component={Link} href="/dashboard" sx={{ display: { xs: "none", sm: "block" } }}>
            Dashboard
          </Button>
          <Button color="inherit" component={Link} href="/groups" sx={{ display: { xs: "none", sm: "block" } }}>
            Groups
          </Button>
          <Button variant="contained" color="primary" sx={{ borderRadius: "20px", px: 3 }}>
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
