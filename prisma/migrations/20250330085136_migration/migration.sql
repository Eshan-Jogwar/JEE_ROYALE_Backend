-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('ROOKIE', 'BRONZE', 'SILVER', 'GOLD', 'LEGEND', 'CONQUEROR', 'TOP_1000', 'TOP_500', 'TOP_200', 'TOP_100', 'AIR0');

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "Subject" TEXT NOT NULL,
    "Chapter" TEXT NOT NULL,
    "Topic" TEXT NOT NULL,
    "Options" TEXT[],
    "questionID" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastBattles" (
    "pastBattleId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "subtopic" TEXT NOT NULL,
    "number_of_questions" INTEGER NOT NULL,
    "total_time" INTEGER NOT NULL,
    "Position" INTEGER NOT NULL,
    "answers" INTEGER[],

    CONSTRAINT "PastBattles_pkey" PRIMARY KEY ("pastBattleId")
);

-- CreateTable
CREATE TABLE "UserTable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "victories" INTEGER NOT NULL DEFAULT 0,
    "games_played" INTEGER NOT NULL DEFAULT 0,
    "average_score" INTEGER NOT NULL DEFAULT 0,
    "average_time" INTEGER NOT NULL DEFAULT 0,
    "highest_streak" INTEGER NOT NULL DEFAULT 0,
    "rr" "Rank" NOT NULL DEFAULT 'ROOKIE',

    CONSTRAINT "UserTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liveSessions" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "people" INTEGER NOT NULL,

    CONSTRAINT "liveSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PastBattlesToQuestions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PastBattlesToQuestions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PastBattlesToQuestions_B_index" ON "_PastBattlesToQuestions"("B");

-- AddForeignKey
ALTER TABLE "PastBattles" ADD CONSTRAINT "PastBattles_pastBattleId_fkey" FOREIGN KEY ("pastBattleId") REFERENCES "UserTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PastBattlesToQuestions" ADD CONSTRAINT "_PastBattlesToQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "PastBattles"("pastBattleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PastBattlesToQuestions" ADD CONSTRAINT "_PastBattlesToQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
