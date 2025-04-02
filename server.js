// const express = require("express")
// const cors = require("cors")
import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
const app = express();
const MAX_PEOPLE_IN_ONE_GAME = 10
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

app.post("/getprofile", async (req, res) => {
    const data = await client.userTable.findFirst({
        where: {
            name: req.body.name,
            email: req.body.email
        },
        select: {
            name: true,
            victories: true,
            games_played: true,
            average_score: true,
            average_time: true,
            highest_streak: true,
            rr: true
        }
    })

    if (data) {
        res.json({
            signupredirect: false,
            data_body: data
        });
    }
    else{
        res.json({
            signupredirect: true
        })
    }
})

app.post("/getNumPeople", async (req, res) => {
    const people = await client.liveSessions.findFirst({
        select: {
            people: true
        },
        where: {
            sessionId: req.body.sessionId
        }
    })

    res.json({people: people.people})
})
  
app.get("/add-questions", async (req, res) => {
    try {
      const createdQuestions = await client.questions.createMany({
        data: questions,
        skipDuplicates: true, // Avoid inserting duplicates
      });
  
      res.json({
        message: "Questions added successfully!",
        count: createdQuestions.count,
      });
    } catch (error) {
      console.error("Error inserting questions:", error);
      res.status(500).json({ error: "Failed to insert questions" });
    }
  });
app.post("/updateQuestions", async (req, res) => {
    try {
        let questions = await client.$queryRaw`
            SELECT "Question_Body", "Options", "correct_option" 
            FROM "Questions" 
            ORDER BY RANDOM() 
            LIMIT 10
        `;

        let questions_list = [];
        let options_list = [];
        let correct_options_list = [];
        for (let i = 0; i < questions.length; i++) {
            questions_list.push(questions[i].Question_Body);
            questions[i].Options.forEach(element => {
                options_list.push(element);
            });;
            correct_options_list.push(questions[i].correct_option)
        }

        const addedQuestions = await client.liveSessionsQuestions.create({
            data : {
                sessionId: req.body.sessionId,
                questions: questions_list,
                options: options_list
            }
        })

        const addedAnswers = await client.liveQuestionsAnswerTable.create({
            data : {
                sessionId: req.body.sessionId,
                curr_answers: correct_options_list
            }
        })

        res.json({ addedQuestions, addedAnswers });
    } catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}) 


app.post("/endSession", async (req, res) => {
    const temp = await client.liveSessions.delete({
        where: {
            sessionId: req.body.sessionId 
        }
    })
    if (temp) res.json(temp);
})

app.post("/startSession", async (req, res) => {
    const sessions = await client.liveSessions.findFirst({
        select: {
            sessionId: true,
            id: true,
            people: true
        },
        where: {
            people: {lt : MAX_PEOPLE_IN_ONE_GAME},
            subject: req.body.subject,
            topic: req.body.topic
        }
    });
    if (sessions) {
        if (sessions.people == 10){
            await client.liveSessions.delete({
                where: {
                    id: sessions.id
                }
            })
            const newSession = await client.liveSessions.create({
                data: {
                    people: 1,
                    subject: req.body.subject,
                    topic: req.body.topic
                }
            });
            res.json({sessionId: newSession.sessionId, request: req.body});
        }else{
            await client.liveSessions.update({
                where: {
                    id: sessions.id
                },
                data: {
                    people: { increment: 1 } 
                },
                select: {
                    people: true 
                }
            });
            res.json({sessionId: sessions.sessionId, request: req.body});
        }
    }else{
        const newSession = await client.liveSessions.create({
            data: {
                people: 1,
                subject: req.body.subject,
                topic: req.body.topic
            }
        });
        res.json({sessionId: newSession.sessionId, request: req.body});
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
