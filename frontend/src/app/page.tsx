"use client";

import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import GroupIcon from "@mui/icons-material/Group";

const GlassCard = styled(Paper)(({ theme }) => ({
  background: "rgba(30, 41, 59, 0.7)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  padding: theme.spacing(4),
  textAlign: "center",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(99, 102, 241, 0.2)",
  },
}));

const HeroText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #818cf8 30%, #ec4899 90%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
}));

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: "100vh", pt: 10, pb: 6, position: "relative", overflow: "hidden" }}>
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0) 70%)",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(15,23,42,0) 70%)",
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 10, mt: 8 }}>
          <HeroText variant="h1" sx={{ fontSize: { xs: "3rem", md: "5rem" }, mb: 2 }}>
            LearnLoop AI
          </HeroText>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}>
            The Knowledge-First Collaborative Learning Platform. Turn every chat, PDF, and voice note into a searchable AI "Second Brain" for your study group.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button variant="contained" color="primary" size="large" sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}>
              Get Started for Free
            </Button>
            <Button variant="outlined" color="secondary" size="large" sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}>
              Explore Features
            </Button>
          </Box>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <GlassCard elevation={0}>
              <AutoAwesomeIcon sx={{ fontSize: 60, color: "#818cf8", mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                AI Memory
              </Typography>
              <Typography color="text.secondary">
                Never lose a doubt again. Ask the AI teacher questions based on your group's chat history, uploaded notes, and whiteboards.
              </Typography>
            </GlassCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <GlassCard elevation={0}>
              <GroupIcon sx={{ fontSize: 60, color: "#a78bfa", mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Smart Study Groups
              </Typography>
              <Typography color="text.secondary">
                Collaborate in real-time. Share code, images, and voice notes. The AI automatically generates summaries and roadmaps for the group.
              </Typography>
            </GlassCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <GlassCard elevation={0}>
              <SchoolIcon sx={{ fontSize: 60, color: "#ec4899", mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Personalized Learning
              </Typography>
              <Typography color="text.secondary">
                Track your progress, earn badges, and get AI-generated quizzes to reinforce your learning streak every day.
              </Typography>
            </GlassCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
