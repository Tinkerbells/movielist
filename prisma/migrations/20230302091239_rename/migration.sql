/*
  Warnings:

  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropTable
DROP TABLE "Favorite";

-- CreateTable
CREATE TABLE "LikedMovie" (
    "id" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "posterPath" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "LikedMovie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikedMovie" ADD CONSTRAINT "LikedMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
