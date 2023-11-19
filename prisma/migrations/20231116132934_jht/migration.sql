/*
  Warnings:

  - You are about to drop the column `userI` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userI_fkey";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "userI",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
