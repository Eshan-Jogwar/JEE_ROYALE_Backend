// const express = require("express")
// const cors = require("cors")
import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Start the server
const PORT = 142;

// Routes
app.post("/signupuser", async (req, res) => {

    const data = await req.body;
    console.log(data);
    const user = await client.userTable.create({data: { 
        name: data.name, 
        password: data.password,
        email: data.email,
    }})

    if (user) {
        res.json({createdUser: true});
    }
    else{
        res.json({createdUser: false});
    }
});

app.post("/loginuser", async (req, res) => {
    const data = req.body;
    const user = await client.userTable.findFirst({
        where: {email: data.email, name: data.name},
        select: {
            email: true,
            password: true,
            name: true
        }
    })
    if (user) {
        if (user.password == data.password){
            res.status(200).json({
                authentication: true,
                email: user.email,
                name: user.name,
            })
        }
        else{
            res.status(401).json({
                authentication: false
            })
        }
    }
    else{
        res.status(401).json({
            authentication: false,
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
