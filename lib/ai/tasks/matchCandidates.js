import { jobMatchPrompt } from "../prompts/jobMatchPrompt";
import promptModel from "../promptModel";

export const matchCandidates = async (job, candidates) => {
  const prompt = jobMatchPrompt(job, candidates);
  const data = await promptModel(prompt);

  // Validation
  if (
    !data?.response ||
    !Array.isArray(data.response) ||
    data.response.length !== candidates.length
  ) {
    throw new Error("AI returned invalid response");
  }

  const matches = candidates.map((candidate, index) => {
    return {
      jobId: job.id,
      candidateId: candidate.id,
      score: data.response[index],
    };
  });

  console.log("Parsed matches:", matches);

  return { data: matches };
};
