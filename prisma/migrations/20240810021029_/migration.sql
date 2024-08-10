/*
  Warnings:

  - Added the required column `author` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Notice" ("id", "title") SELECT "id", "title" FROM "Notice";
DROP TABLE "Notice";
ALTER TABLE "new_Notice" RENAME TO "Notice";
CREATE UNIQUE INDEX "Notice_title_key" ON "Notice"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
