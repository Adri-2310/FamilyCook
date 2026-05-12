/*
  Warnings:

  - You are about to drop the column `sessionState` on the `accounts` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('BUG', 'FEEDBACK', 'QUESTION');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('PENDING', 'RESOLVED');

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "sessionState";

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "ContactType" NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'PENDING',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "messages_status_idx" ON "messages"("status");

-- CreateIndex
CREATE INDEX "messages_type_idx" ON "messages"("type");

-- CreateIndex
CREATE INDEX "messages_createdAt_idx" ON "messages"("createdAt");

-- CreateIndex
CREATE INDEX "recipes_isDraft_idx" ON "recipes"("isDraft");
