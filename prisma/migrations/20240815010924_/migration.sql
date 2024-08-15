/*
  Warnings:

  - Added the required column `artisticCategory` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criteriosSelecao` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detalhesFinanciamento` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizador` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processoInscricao` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionDeadline` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notice" ADD COLUMN     "artisticCategory" TEXT NOT NULL,
ADD COLUMN     "criteriosSelecao" TEXT NOT NULL,
ADD COLUMN     "dataPublicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "detalhesFinanciamento" TEXT NOT NULL,
ADD COLUMN     "organizador" TEXT NOT NULL,
ADD COLUMN     "processoInscricao" TEXT NOT NULL,
ADD COLUMN     "subscriptionDeadline" TIMESTAMP(3) NOT NULL;
