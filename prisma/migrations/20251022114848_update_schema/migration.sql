/*
  Warnings:

  - You are about to drop the column `technologies` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `recruiterId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `Job` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_jobId_fkey";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "technologies",
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "recruiterId",
DROP COLUMN "technologies",
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'in_progress',
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
