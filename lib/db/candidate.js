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

export const getUnmatchedCandidatesDb = async (jobId) => {
  const candidates = await prisma.candidate.findMany({
    where: {
      matches: {
        none: { jobId: jobId },
      },
    },
  });

  return candidates;
};

export const getMatchedCandidatesForJobDb = async (jobId) => {
  const matches = await prisma.match.findMany({
    where: { jobId },
    orderBy: { score: "desc" },
    include: {
      candidate: {
        select: {
          id: true,
          name: true,
          email: true,
          education: true,
          experience: true,
          skills: true,
          summary: true,
          cvUrl: true,
        },
      },
    },
  });

  return matches.map(({ score, candidate }) => ({
    ...candidate,
    score,
  }));
};
