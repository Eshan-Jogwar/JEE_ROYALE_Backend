/*
  Warnings:

  - You are about to drop the `liveQuestionsAnswerTable` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `liveSessionsQuestions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "liveSessionsQuestions" ADD COLUMN     "current_answers" INTEGER[];

-- DropTable
DROP TABLE "liveQuestionsAnswerTable";

-- CreateIndex
CREATE UNIQUE INDEX "liveSessionsQuestions_sessionId_key" ON "liveSessionsQuestions"("sessionId");
