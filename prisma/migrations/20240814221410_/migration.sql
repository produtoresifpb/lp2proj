-- CreateEnum
CREATE TYPE "Profile" AS ENUM ('PUBLIC', 'ARTIST', 'MANAGER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile" "Profile" NOT NULL DEFAULT 'PUBLIC',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "EventoID" SERIAL NOT NULL,
    "NomeEvento" TEXT NOT NULL,
    "Descricao" TEXT,
    "DataHora" TIMESTAMP(3) NOT NULL,
    "Localizacao" TEXT NOT NULL,
    "Organizador" TEXT NOT NULL,
    "InfoIngresso" TEXT,
    "ImagemCartaz" TEXT,
    "DataPublicacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("EventoID")
);

-- CreateTable
CREATE TABLE "InscricoesEventos" (
    "InscricaoEventoID" SERIAL NOT NULL,
    "EventoID" INTEGER NOT NULL,
    "UsuarioID" INTEGER NOT NULL,
    "DataInscricao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InscricoesEventos_pkey" PRIMARY KEY ("InscricaoEventoID")
);

-- CreateTable
CREATE TABLE "ProjetosColaborativos" (
    "ProjetoID" SERIAL NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "AreaAtuacaoNecessaria" TEXT NOT NULL,
    "Localizacao" TEXT,
    "TipoColaboracao" TEXT NOT NULL,
    "CriadorID" INTEGER NOT NULL,
    "DataCriacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjetosColaborativos_pkey" PRIMARY KEY ("ProjetoID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Notice_title_key" ON "Notice"("title");

-- AddForeignKey
ALTER TABLE "InscricoesEventos" ADD CONSTRAINT "InscricoesEventos_EventoID_fkey" FOREIGN KEY ("EventoID") REFERENCES "Evento"("EventoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscricoesEventos" ADD CONSTRAINT "InscricoesEventos_UsuarioID_fkey" FOREIGN KEY ("UsuarioID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
