/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `liveSessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "liveSessions_sessionId_key" ON "liveSessions"("sessionId");
