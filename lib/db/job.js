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
  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs;
};

export const updateJobStatusDb = async (jobId, status) =>
  await prisma.job.update({
    where: { id: jobId },
    data: { status },
  });
