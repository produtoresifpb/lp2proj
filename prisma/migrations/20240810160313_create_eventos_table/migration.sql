-- CreateTable
CREATE TABLE "Evento" (
    "EventoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NomeEvento" TEXT NOT NULL,
    "Descricao" TEXT,
    "DataHora" DATETIME NOT NULL,
    "Localizacao" TEXT NOT NULL,
    "Organizador" TEXT NOT NULL,
    "InfoIngresso" TEXT,
    "ImagemCartaz" TEXT,
    "DataPublicacao" DATETIME NOT NULL
);
