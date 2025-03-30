// const express = require("express")
// const cors = require("cors")
import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
const app = express();
// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON requests (for future use)

// Start the server
const PORT = 5051;

// Routes
app.get("/test", async (req, res) => {

    const user = await client.liveSessions.create({data: {
        sessionId: "eshan",
        people: 123
    }})

    res.send(user)
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
