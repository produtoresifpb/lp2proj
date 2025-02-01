/*
  Warnings:

  - You are about to drop the column `pdfName` on the `Pdf` table. All the data in the column will be lost.
  - You are about to drop the column `pdfPath` on the `Pdf` table. All the data in the column will be lost.
  - Added the required column `name` to the `Pdf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Pdf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pdf" DROP COLUMN "pdfName",
DROP COLUMN "pdfPath",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
