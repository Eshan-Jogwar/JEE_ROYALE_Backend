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

app.get("/test", async (req, res) => {
    res.json({test: "string"})
})

const questions = [
    {
      Subject: "mathematics",
      Chapter: "Algebra",
      Topic: "1-1",
      Options: ["2", "3", "4", "5"],
      Question_Body: "What is 2 + 2?",
      correct_option: 2,
    },
    {
      Subject: "mathematics",
      Chapter: "Geometry",
      Topic: "1-1",
      Options: ["90 degrees", "180 degrees", "360 degrees", "45 degrees"],
      Question_Body: "What is the sum of the interior angles of a triangle?",
      correct_option: 1,
    },
    {
      Subject: "mathematics",
      Chapter: "Calculus",
      Topic: "1-1",
      Options: ["Derivative", "Integral", "Limit", "Function"],
      Question_Body: "Which mathematical concept represents the rate of change of a function?",
      correct_option: 0,
    },
    {
      Subject: "mathematics",
      Chapter: "Probability",
      Topic: "1-1",
      Options: ["1/2", "1/3", "1/4", "1/6"],
      Question_Body: "If a fair coin is flipped, what is the probability of getting heads?",
      correct_option: 0,
    },
    {
      Subject: "mathematics",
      Chapter: "Trigonometry",
      Topic: "1-1",
      Options: ["sin", "cos", "tan", "cot"],
      Question_Body: "Which trigonometric function is equal to the opposite side divided by the hypotenuse?",
      correct_option: 0,
    },
    {
      Subject: "mathematics",
      Chapter: "Algebra",
      Topic: "1-1",
      Options: ["x", "x^2", "x^3", "x^4"],
      Question_Body: "What is x multiplied by itself?",
      correct_option: 1,
    },
    {
      Subject: "mathematics",
      Chapter: "Geometry",
      Topic: "1-1",
      Options: ["Rectangle", "Circle", "Triangle", "Pentagon"],
      Question_Body: "Which shape has three sides?",
      correct_option: 2,
    },
    {
      Subject: "mathematics",
      Chapter: "Trigonometry",
      Topic: "1-1",
      Options: ["Sine Rule", "Cosine Rule", "Pythagoras' Theorem", "Tangent Rule"],
      Question_Body: "Which theorem states that a² + b² = c²?",
      correct_option: 2,
    },
    {
      Subject: "mathematics",
      Chapter: "Probability",
      Topic: "1-1",
      Options: ["Independent", "Dependent", "Mutually Exclusive", "Conditional"],
      Question_Body: "What type of probability describes events that do not affect each other?",
      correct_option: 0,
    },
    {
      Subject: "mathematics",
      Chapter: "Statistics",
      Topic: "1-1",
      Options: ["Mean", "Median", "Mode", "Range"],
      Question_Body: "Which measure of central tendency is the middle value in an ordered dataset?",
      correct_option: 1,
    },
    {
      Subject: "mathematics",
      Chapter: "Calculus",
      Topic: "1-1",
      Options: ["Limit", "Differentiation", "Integration", "Summation"],
      Question_Body: "What is the process of finding the derivative of a function?",
      correct_option: 1,
    },
    {
      Subject: "mathematics",
      Chapter: "Number Theory",
      Topic: "1-1",
      Options: ["Even", "Odd", "Prime", "Composite"],
      Question_Body: "A number that has exactly two divisors is called?",
      correct_option: 2,
    },
    {
      Subject: "mathematics",
      Chapter: "Sets",
      Topic: "1-1",
      Options: ["Union", "Intersection", "Difference", "Complement"],
      Question_Body: "Which operation on sets includes only common elements?",
      correct_option: 1,
    },
    {
      Subject: "mathematics",
      Chapter: "Algebra",
      Topic: "1-1",
      Options: ["Linear Equation", "Quadratic Equation", "Cubic Equation", "Exponential Equation"],
      Question_Body: "Which type of equation has the highest exponent of 2?",
      correct_option: 1,
    },
    {
      Subject: "mathematics",
      Chapter: "Geometry",
      Topic: "1-1",
      Options: ["Scalene", "Isosceles", "Equilateral", "Right-angled"],
      Question_Body: "A triangle with all sides equal is called?",
      correct_option: 2,
    },
    {
      Subject: "mathematics",
      Chapter: "Algebra",
      Topic: "1-1",
      Options: ["Addition", "Multiplication", "Exponentiation", "Logarithm"],
      Question_Body: "What operation is the inverse of exponentiation?",
      correct_option: 3,
    },
    {
      Subject: "mathematics",
      Chapter: "Statistics",
      Topic: "1-1",
      Options: ["Histogram", "Pie Chart", "Bar Graph", "Line Graph"],
      Question_Body: "Which type of graph is used to show frequency distribution?",
      correct_option: 0,
    },
    {
      Subject: "mathematics",
      Chapter: "Trigonometry",
      Topic: "1-1",
      Options: ["0", "1", "Infinity", "-1"],
      Question_Body: "What is the value of sin(90°)?",
      correct_option: 1,
    },
    {
      Subject: "mathematics",
      Chapter: "Probability",
      Topic: "1-1",
      Options: ["Sample Space", "Event", "Outcome", "Experiment"],
      Question_Body: "What is the set of all possible outcomes in probability?",
      correct_option: 0,
    }
];

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

        const addQuestionsData = {
            sessionId: req.body.sessionId,
            questions: questions_list,
            options: options_list,
            current_answers: correct_options_list
        }

        const qeus = await client.liveSessionsQuestions.findFirst({
            where : {
                sessionId: req.body.sessionId
            }
        })

        if (qeus) {
            res.json({addedQuestions: qeus});
        }else{
            const addedQuestions = await client.liveSessionsQuestions.create({
                data: addQuestionsData
            })
            res.json({addedQuestions: addedQuestions});
        }

        
    } catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}) 

app.post("/getQuestions", async (req, res) => {
    const questions = await client.liveSessionsQuestions.findFirst({
        where: {
            sessionId: req.body.sessionId
        }
    })
    res.json({ questions });
})

app.post("/endSession", async (req, res) => {
    const temp = await client.liveSessions.delete({
        where: {
            sessionId: req.body.sessionId 
        }
    })
    const deleteLiveSessionsQuestions = await client.liveSessionsQuestions.delete({
        where : {
            sessionId: req.body.sessionId
        }
    })
    res.json({temp , deleteLiveSessionsQuestions});
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
