/*
  Warnings:

  - Added the required column `authorId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userImage` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "postId" TEXT NOT NULL,
ADD COLUMN     "userImage" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
