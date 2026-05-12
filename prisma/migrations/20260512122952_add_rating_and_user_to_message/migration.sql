-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "messages_userId_idx" ON "messages"("userId");

-- CreateIndex
CREATE INDEX "recipes_rating_idx" ON "recipes"("rating");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
