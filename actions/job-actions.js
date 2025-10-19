"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { addJobDb } from "@/lib/db/job";

import { matchCandidates } from "@/lib/matchCandidates";

const mockCandidates = [
  {
    id: "c1",
    name: "Alice Johnson",
    educationLevel: "Bachelor's",
    yearsExperience: 4,
    skills: ["React", "Node.js", "GraphQL"],
  },
  {
    id: "c2",
    name: "Bob Smith",
    educationLevel: "Master's",
    yearsExperience: 1,
    skills: ["Java", "Spring Boot"],
  },
];

export const createJob = async (prevState, formData) => {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const education = formData.get("education")?.toString().trim();
  const experience = Number(formData.get("experience"));
  const technologies = formData
    .get("skills")
    ?.toString()
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  const errors = {};

  if (!title) errors.title = "Job title is required";
  if (!description) errors.description = "Description is required";
  if (!education) errors.education = "Education field is required";
  if (!experience || isNaN(experience))
    errors.experience = "Years of experience must be a number";
  if (!technologies || !technologies.length)
    errors.technologies = "At least one technology is required";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Get recruiter (logged in user)
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Store job in database
  const jobData = {
    title,
    description,
    education,
    experience,
    technologies,
    recruiterId: user.id,
  };

  const job = await addJobDb(jobData);

  // Trigger background matching process (non-blocking)
  triggerCandidateMatching(job);

  // Redirect recruiter to job details page
  redirect(`/recruiter/jobs/${job.id}`);
};

const triggerCandidateMatching = (job) => {
  console.log("Triggering matching for job", job.id);

  if (!job) return;

  // Fire-and-forget async IIFE
  (async () => {
    try {
      const candidates = mockCandidates; // or await prisma.candidate.findMany();

      const results = await matchCandidates(job, candidates);

      // Store matches in DB after parsing all candidates
      // await prisma.match.createMany({
      //   data: results.map((r) => ({
      //     jobId: job.id,
      //     candidateId: candidates.find((c) => c.name === r.name)?.id,
      //     score: r.score,
      //   })),
      // });

      console.log(
        `Matching completed for job ${job.id}, stored ${results.length} matches`
      );
    } catch (err) {
      console.error(`Matching failed for job ${job.id}:`, err);
    }
  })();
};
