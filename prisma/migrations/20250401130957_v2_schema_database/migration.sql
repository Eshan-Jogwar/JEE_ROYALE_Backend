/*
  Warnings:

  - You are about to drop the column `question1` on the `liveSessionsQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `question10` on the `liveSessionsQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `question2` on the `liveSessionsQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `question3` on the `liveSessionsQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `question4` on the `liveSessionsQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `question5` on the `liveSessionsQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `question6` on the `liveSessionsQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `question7` on the `liveSessionsQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `question8` on the `liveSessionsQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `question9` on the `liveSessionsQuestions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "liveSessionsQuestions" DROP COLUMN "question1",
DROP COLUMN "question10",
DROP COLUMN "question2",
DROP COLUMN "question3",
DROP COLUMN "question4",
DROP COLUMN "question5",
DROP COLUMN "question6",
DROP COLUMN "question7",
DROP COLUMN "question8",
DROP COLUMN "question9",
ADD COLUMN     "questions" TEXT[];
