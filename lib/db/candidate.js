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

export const getMatchedCandidatesForJobDb = async (jobId) => {
  const candidates = await prisma.candidate.findMany({
    where: {
      matches: {
        some: {
          jobId: jobId,
        },
      },
    },
    // select: {
    //   id: true,
    //   name: true,
    //   email: true,
    //   education: true,
    //   experience: true,
    //   skills: true,
    //   summary: true,
    //   cvUrl: true,
    // },
  });

  return candidates;
};
