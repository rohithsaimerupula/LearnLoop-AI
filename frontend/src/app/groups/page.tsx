"use client";

import { Box, Typography, Container, Grid, Paper, Button, Avatar, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const GroupCard = styled(Paper)(({ theme }) => ({
  background: "rgba(30, 41, 59, 0.7)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  transition: "transform 0.2s",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-4px)",
    borderColor: theme.palette.primary.main,
  },
}));

const mockGroups = [
  { id: 1, name: "Data Structures & Algorithms", members: 120, tags: ["Computer Science", "Placement"] },
  { id: 2, name: "Machine Learning Study Group", members: 45, tags: ["AI", "Research"] },
  { id: 3, name: "Web Development Bootcamp", members: 89, tags: ["Frontend", "React"] },
];

export default function GroupsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Study Groups
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Create Group
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockGroups.map((group) => (
          <Grid item xs={12} sm={6} md={4} key={group.id}>
            <GroupCard elevation={0}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                  {group.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" noWrap sx={{ maxWidth: 200 }}>
                    {group.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {group.members} members
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                {group.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ color: "text.secondary", borderColor: "rgba(255,255,255,0.1)" }} />
                ))}
              </Box>
            </GroupCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
