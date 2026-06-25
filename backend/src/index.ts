import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { gamificationService } from "./services/gamification.service";
import { aiService } from "./services/ai.service";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // MVP: allow all
    methods: ["GET", "POST"]
  }
});
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Basic API route for health check
app.get("/health", (req, res) => {
  res.json({ status: "LearnLoop AI Backend is running." });
});

// Real-Time Chat & Gamification Hooks
io.on("connection", (socket) => {
  console.log(`[Socket] User connected: ${socket.id}`);

  socket.on("join_group", (groupId) => {
    socket.join(groupId);
    console.log(`[Socket] User joined group ${groupId}`);
  });

  socket.on("send_message", async (data) => {
    // data: { groupId, senderId, content, preferredAI }
    console.log(`[Socket] Message in group ${data.groupId}: ${data.content}`);
    
    // 1. Broadcast message to group
    io.to(data.groupId).emit("receive_message", { ...data, timestamp: new Date() });

    // 2. Award Gamification XP for participating
    if (data.senderId) {
      await gamificationService.awardXP(data.senderId, 10, "Sent a message");
      await gamificationService.updateStreak(data.senderId);
    }

    // 3. AI Teacher Trigger
    // If the message contains "@ai" or starts with "Ask AI:"
    if (data.content.toLowerCase().includes("@ai")) {
      io.to(data.groupId).emit("ai_typing", { isTyping: true });
      
      try {
        const response = await aiService.askQuestion(
          data.content, 
          data.preferredAI || "OPENAI", 
          ["Mock context from previous group messages..."]
        );

        io.to(data.groupId).emit("receive_message", {
          groupId: data.groupId,
          senderId: "system_ai",
          content: response,
          isAiResponse: true,
          timestamp: new Date()
        });
      } catch (error) {
        console.error("[AI Router] Error processing AI query", error);
      } finally {
        io.to(data.groupId).emit("ai_typing", { isTyping: false });
      }
    }
  });

  socket.on("disconnect", () => {
    console.log(`[Socket] User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
