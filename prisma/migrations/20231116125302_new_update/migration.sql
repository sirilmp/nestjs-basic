/*
  Warnings:

  - You are about to drop the column `decription` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `userI` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "decription",
DROP COLUMN "userId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "userI" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userI_fkey" FOREIGN KEY ("userI") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
