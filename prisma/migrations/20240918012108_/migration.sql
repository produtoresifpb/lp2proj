/*
  Warnings:

  - You are about to drop the column `author` on the `Notice` table. All the data in the column will be lost.
  - Added the required column `support` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Made the column `valorFinanciamento` on table `Notice` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "supportType" AS ENUM ('FINANCIAL', 'LOGISTIC');

-- CreateEnum
CREATE TYPE "Subjects" AS ENUM ('informationOutdated', 'informationWrong', 'error', 'other');

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "author",
ADD COLUMN     "support" "supportType" NOT NULL,
ALTER COLUMN "valorFinanciamento" SET NOT NULL;

-- CreateTable
CREATE TABLE "FeedbackNotice" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "problemSubject" "Subjects" NOT NULL,
    "problemDescription" TEXT NOT NULL,
    "noticeID" INTEGER NOT NULL,

    CONSTRAINT "FeedbackNotice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedbackNotice" ADD CONSTRAINT "FeedbackNotice_noticeID_fkey" FOREIGN KEY ("noticeID") REFERENCES "Notice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
