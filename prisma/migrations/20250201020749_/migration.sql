-- CreateTable
CREATE TABLE "Pdf" (
    "id" SERIAL NOT NULL,
    "pdfName" TEXT NOT NULL,
    "pdfPath" TEXT NOT NULL,
    "noticeID" INTEGER NOT NULL,

    CONSTRAINT "Pdf_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pdf_noticeID_key" ON "Pdf"("noticeID");

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_noticeID_fkey" FOREIGN KEY ("noticeID") REFERENCES "Notice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
