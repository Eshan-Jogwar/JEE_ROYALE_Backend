/*
  Warnings:

  - Added the required column `Question_Body` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "Question_Body" TEXT NOT NULL;
