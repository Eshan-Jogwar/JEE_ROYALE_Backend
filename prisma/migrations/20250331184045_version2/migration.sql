/*
  Warnings:

  - Added the required column `correct_option` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `liveSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `liveSessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "correct_option" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "liveSessions" ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "liveSessionsQuestions" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "question1" TEXT NOT NULL,
    "question2" TEXT NOT NULL,
    "question3" TEXT NOT NULL,
    "question4" TEXT NOT NULL,
    "question5" TEXT NOT NULL,
    "question6" TEXT NOT NULL,
    "question7" TEXT NOT NULL,
    "question8" TEXT NOT NULL,
    "question9" TEXT NOT NULL,
    "question10" TEXT NOT NULL,

    CONSTRAINT "liveSessionsQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liveQuestionsAnswerTable" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "curr_answers" INTEGER[],

    CONSTRAINT "liveQuestionsAnswerTable_pkey" PRIMARY KEY ("id")
);
