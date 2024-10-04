-- AlterTable
ALTER TABLE "Notice" ADD COLUMN     "UsuarioID" INTEGER;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_UsuarioID_fkey" FOREIGN KEY ("UsuarioID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
