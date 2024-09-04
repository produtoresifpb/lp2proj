/*
  Warnings:

  - Changed the type of `artisticCategory` on the `Notice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "artisticCategory" AS ENUM ('MUSIC', 'THEATER', 'DANCE', 'ARTS');

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "artisticCategory",
ADD COLUMN     "artisticCategory" "artisticCategory" NOT NULL;
