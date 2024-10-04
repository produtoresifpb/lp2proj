/*
  Warnings:

  - You are about to drop the column `UsuarioID` on the `Notice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_UsuarioID_fkey";

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "UsuarioID";

-- CreateTable
CREATE TABLE "_NoticeToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NoticeToUser_AB_unique" ON "_NoticeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NoticeToUser_B_index" ON "_NoticeToUser"("B");

-- AddForeignKey
ALTER TABLE "_NoticeToUser" ADD CONSTRAINT "_NoticeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Notice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NoticeToUser" ADD CONSTRAINT "_NoticeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
