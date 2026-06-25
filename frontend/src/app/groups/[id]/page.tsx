"use client";

import { useState } from "react";
import { Box, Typography, Container, Paper, TextField, IconButton, Avatar, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const ChatContainer = styled(Paper)(({ theme }) => ({
  background: "rgba(30, 41, 59, 0.7)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden"
}));

const MessageBubble = styled(Box)<{ isAi?: boolean }>(({ theme, isAi }) => ({
  background: isAi ? "rgba(99, 102, 241, 0.15)" : "rgba(255, 255, 255, 0.05)",
  border: isAi ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid transparent",
  padding: theme.spacing(2),
  borderRadius: "12px",
  maxWidth: "70%",
  alignSelf: isAi ? "flex-start" : "flex-end",
  marginBottom: theme.spacing(2),
  position: "relative"
}));

export default function GroupChatPage() {
  const [message, setMessage] = useState("");
  const [preferredAI, setPreferredAI] = useState("OPENAI");

  // Mock messages
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey guys, did anyone understand the Binary Trees lecture?", sender: "Alice", isAi: false },
    { id: 2, text: "Not really, I'm stuck on AVL trees.", sender: "Bob", isAi: false },
    { id: 3, text: "[GPT-4o] An AVL tree is a self-balancing binary search tree. In an AVL tree, the heights of the two child subtrees of any node differ by at most one.", sender: "LearnLoop AI", isAi: true }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now(), text: message, sender: "You", isAi: false }]);
    setMessage("");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">Data Structures & Algorithms</Typography>
        
        {/* Multi-AI Selector */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="ai-select-label">AI Teacher</InputLabel>
          <Select
            labelId="ai-select-label"
            value={preferredAI}
            label="AI Teacher"
            onChange={(e) => setPreferredAI(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="OPENAI">GPT-4o</MenuItem>
            <MenuItem value="ANTHROPIC">Claude 3.5</MenuItem>
            <MenuItem value="GEMINI">Gemini 1.5 Pro</MenuItem>
            <MenuItem value="LOCAL">Local Llama 3</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ChatContainer elevation={0}>
        {/* Chat Area */}
        <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} isAi={msg.isAi}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                {msg.isAi && <SmartToyIcon fontSize="small" color="primary" />}
                <Typography variant="caption" color="text.secondary" fontWeight="bold">
                  {msg.sender}
                </Typography>
              </Box>
              <Typography variant="body1">{msg.text}</Typography>
            </MessageBubble>
          ))}
        </Box>

        {/* Input Area */}
        <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Message group or type @ai to ask the teacher..."
            variant="outlined"
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                background: "rgba(0,0,0,0.2)"
              }
            }}
          />
          <IconButton color="primary" onClick={handleSend} sx={{ bgcolor: "rgba(99, 102, 241, 0.1)" }}>
            <SendIcon />
          </IconButton>
        </Box>
      </ChatContainer>
    </Container>
  );
}
