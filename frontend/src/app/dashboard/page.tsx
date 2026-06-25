"use client";

import { Box, Typography, Container, Grid, Paper, LinearProgress, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const DashboardCard = styled(Paper)(({ theme }) => ({
  background: "rgba(30, 41, 59, 0.7)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  padding: theme.spacing(3),
}));

export default function DashboardPage() {
  const user = {
    name: "Rohith",
    level: 12,
    xp: 3450,
    nextLevelXp: 4000,
    streak: 5,
    coins: 150
  };

  const xpProgress = (user.xp / user.nextLevelXp) * 100;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Welcome back, {user.name}!
      </Typography>

      <Grid container spacing={3}>
        {/* Gamification Stats */}
        <Grid item xs={12} md={8}>
          <DashboardCard elevation={0}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem' }}>
                {user.name.charAt(0)}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" fontWeight="bold">Level {user.level} Scholar</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">{user.xp} XP</Typography>
                  <Typography variant="body2" color="text.secondary">{user.nextLevelXp} XP</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={xpProgress} 
                  sx={{ 
                    mt: 1, 
                    height: 10, 
                    borderRadius: 5,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundImage: 'linear-gradient(45deg, #818cf8, #ec4899)'
                    }
                  }} 
                />
              </Box>
            </Box>
          </DashboardCard>
        </Grid>

        {/* Streaks & Coins */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DashboardCard elevation={0} sx={{ textAlign: 'center', py: 4 }}>
                <LocalFireDepartmentIcon sx={{ fontSize: 40, color: '#f97316', mb: 1 }} />
                <Typography variant="h4" fontWeight="bold">{user.streak}</Typography>
                <Typography variant="body2" color="text.secondary">Day Streak</Typography>
              </DashboardCard>
            </Grid>
            <Grid item xs={6}>
              <DashboardCard elevation={0} sx={{ textAlign: 'center', py: 4 }}>
                <EmojiEventsIcon sx={{ fontSize: 40, color: '#eab308', mb: 1 }} />
                <Typography variant="h4" fontWeight="bold">{user.coins}</Typography>
                <Typography variant="body2" color="text.secondary">Coins</Typography>
              </DashboardCard>
            </Grid>
          </Grid>
        </Grid>

        {/* Daily Challenges */}
        <Grid item xs={12}>
          <DashboardCard elevation={0}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutoGraphIcon color="primary" /> Daily Challenges
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { title: "Ask the AI Teacher 3 questions", progress: 1, target: 3, reward: 50 },
                { title: "Participate in a Group Chat", progress: 1, target: 1, reward: 20 },
                { title: "Upload a Study Resource", progress: 0, target: 1, reward: 100 },
              ].map((challenge, idx) => (
                <Box key={idx} sx={{ p: 2, border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{challenge.title}</Typography>
                    <Typography color="secondary.main" fontWeight="bold">+{challenge.reward} XP</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={(challenge.progress / challenge.target) * 100} />
                </Box>
              ))}
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </Container>
  );
}
