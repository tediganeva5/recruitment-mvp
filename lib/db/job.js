import prisma from "@/lib/db/prisma";

export const addJobDb = async (jobData) => {
  const job = await prisma.job.create({
    data: jobData,
  });

  return job;
};

export const getJobByIdDb = async (jobId) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  return job;
};

export const getAllJobsDb = async () => {
  const jobs = await prisma.job.findMany();

  return jobs;
};
