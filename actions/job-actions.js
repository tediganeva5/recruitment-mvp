"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { runBackgroundJob } from "@/lib/helpers/runBackgroundJob";
import { addJobDb } from "@/lib/db/job";
import { getAllCandidatesDb } from "@/lib/db/candidate";
import { addMultipleMatchesDb } from "@/lib/db/match";
import { matchCandidates } from "@/lib/ai/tasks/matchCandidates";

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

  if (Object.keys(errors).length) {
    return { errors };
  }

  let newJobListing;

  try {
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

    newJobListing = await addJobDb(jobData);
  } catch (err) {
    console.error("Job listing creation error:", err);
    return {
      errors: { general: "Failed to create the new job listing. Try again." },
    };
  }

  // Trigger background matching process (non-blocking)
  runBackgroundJob(`MatchCandidates-${newJobListing.id}`, async () => {
    const candidates = await getAllCandidatesDb();
    const { data } = await matchCandidates(newJobListing, candidates);
    await addMultipleMatchesDb(data);
  });

  // Redirect recruiter to job details page
  redirect(`/recruiter/jobs/${newJobListing.id}`);
};
