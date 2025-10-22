import prisma from "@/lib/db/prisma";

export const addCandidateDb = async (candidateData) => {
  const candidate = await prisma.candidate.create({
    data: candidateData,
  });

  return candidate;
};

export const getAllCandidatesDb = async () => {
  const candidates = await prisma.candidate.findMany();

  return candidates;
};
