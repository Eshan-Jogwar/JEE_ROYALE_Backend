import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function a () {
    console.table(["liveSessions", ...(await client.liveSessions.findMany())])
    console.table(["liveSessionsQuestions", ...(await client.liveSessionsQuestions.findMany())])
}

async function d () {
    console.table(["liveSessions", (await client.liveSessions.deleteMany())])
    console.table(["liveSessionsQuestions", (await client.liveSessionsQuestions.deleteMany())])
}

a()