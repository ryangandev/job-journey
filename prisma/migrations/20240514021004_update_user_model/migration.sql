-- Add the new columns first
ALTER TABLE "users" 
    ADD COLUMN "email_verified" TIMESTAMP(3),
    ADD COLUMN "username" TEXT;

-- Combine `firstName` and `lastName` into `username`
UPDATE "users"
SET "username" = "firstName" || ' ' || "lastName";

-- Rename `avatar` to `avatarImage`
ALTER TABLE "users"
    RENAME COLUMN "avatar" TO "avatarImage";

-- Drop old columns
ALTER TABLE "users"
    DROP COLUMN "firstName",
    DROP COLUMN "lastName";

-- Modify existing columns
ALTER TABLE "users"
    ALTER COLUMN "email" DROP NOT NULL,
    ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
