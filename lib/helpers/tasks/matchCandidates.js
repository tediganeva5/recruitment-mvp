import { jobMatchPrompt } from "../../ai/prompts/jobMatchPrompt";
import promptModel from "../../ai/promptModel";

import { calculatefallbackScores } from "@/lib/helpers/calculateFallbackScores";

export const matchCandidates = async (job, candidates) => {
  const prompt = jobMatchPrompt(job, candidates);
  const { data, error } = await promptModel(prompt);

  if (error) console.log("Match candidates model error", error);

  // Use fallback if AI response is invalid (error)
  const scores =
    !error &&
    data?.response &&
    Array.isArray(data.response) &&
    data.response.length === candidates.length
      ? data.response
      : calculatefallbackScores(job, candidates);

  const matches = candidates.reduce((acc, candidate, index) => {
    const score = scores[index];
    if (score > 5) {
      acc.push({
        jobId: job.id,
        candidateId: candidate.id,
        score,
      });
    }
    return acc;
  }, []);

  return { data: matches };
};
