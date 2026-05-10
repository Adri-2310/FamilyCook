-- Drop the problematic providerAccountId column
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "providerAccountId";

-- Drop the password column from users (store it in accounts instead)
ALTER TABLE "users" DROP COLUMN IF EXISTS "password";

-- Ensure accounts table has the right structure for Better Auth
-- Add missing columns if they don't exist
ALTER TABLE "accounts" ADD COLUMN IF NOT EXISTS "sessionState" TEXT;