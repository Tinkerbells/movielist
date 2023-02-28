/*
  Warnings:

  - You are about to drop the column `poster_path` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `vote` on the `Favorite` table. All the data in the column will be lost.
  - Added the required column `overview` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "poster_path",
DROP COLUMN "vote",
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "posterPath" TEXT NOT NULL,
ADD COLUMN     "releaseDate" TEXT NOT NULL;
