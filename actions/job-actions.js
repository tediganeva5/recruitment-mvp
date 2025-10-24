"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { addJobDb } from "@/lib/db/job";

import { getMatchedCandidatesForJobDb } from "@/lib/db/candidate";

import { triggerBackgroundMatching } from "@/actions/background-actions";
import { revalidatePath } from "next/cache";

export const createJob = async (prevState, formData) => {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const education = formData.get("education")?.toString().trim();
  const experience = Number(formData.get("experience"));
  const skills = formData
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
  if (!skills || !skills.length)
    errors.skills = "At least one technology is required";

  if (Object.keys(errors).length) {
    return { errors };
  }

  let newJobListing;

  try {
    // TODO: Extract in a helper function
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
      skills,
      userId: user.id,
    };

    newJobListing = await addJobDb(jobData);
    revalidatePath("/recruiter/jobs");
  } catch (err) {
    console.error("Job listing creation error:", err);
    return {
      errors: { general: "Failed to create the new job listing. Try again." },
    };
  }

  // Trigger background matching process (non-blocking)
  triggerBackgroundMatching(newJobListing);

  // Redirect recruiter to job details page
  redirect(`/recruiter/jobs/${newJobListing.id}`);
};

export const fetchMatchedCandidates = async (jobId) => {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const candidates = await getMatchedCandidatesForJobDb(jobId);

    return candidates;
  } catch (err) {
    console.error(err);
  }
};
