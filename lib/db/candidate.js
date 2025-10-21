import prisma from "@/lib/db/prisma";

export const addCandidateDb = async (data, resumeUrl) => {
  const candidate = await prisma.candidate.create({
    data: {
      name: data.name,
      email: data.email,
      education: data.education,
      experience: data.experience,
      technologies: data.technologies,
      // summary: data.summary,
      cvUrl: resumeUrl,
      // ...data
    },
  });

  return candidate;
};

export const getAllCandidatesDb = async () => {
  const candidates = await prisma.candidate.findMany();

  return candidates;
};
