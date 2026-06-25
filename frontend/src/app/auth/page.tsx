"use client";

import { useState } from "react";
import { Box, Typography, Container, Paper, TextField, Button, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { supabase } from "@/utils/supabase";

const AuthCard = styled(Paper)(({ theme }) => ({
  background: "rgba(30, 41, 59, 0.7)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  padding: theme.spacing(4),
  marginTop: theme.spacing(10),
  maxWidth: 400,
  margin: "auto"
}));

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for the login link!");
    setLoading(false);
  };

  const handleOAuth = async (provider: 'google' | 'azure') => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <Container maxWidth="sm">
      <AuthCard elevation={0}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Sign in to LearnLoop AI
        </Typography>

        <form onSubmit={handleMagicLink}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button 
            fullWidth 
            variant="contained" 
            type="submit" 
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Box display="flex" flexDirection="column" gap={2}>
          <Button 
            variant="outlined" 
            onClick={() => handleOAuth('google')}
            sx={{ py: 1.5, borderColor: 'rgba(255,255,255,0.2)' }}
          >
            Continue with Google
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => handleOAuth('azure')}
            sx={{ py: 1.5, borderColor: 'rgba(255,255,255,0.2)' }}
          >
            Continue with Microsoft
          </Button>
        </Box>
      </AuthCard>
    </Container>
  );
}
