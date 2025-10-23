import { resumeExtractionPrompt } from "@/lib/ai/prompts/resumeExtractionPrompt";
import promptModel from "@/lib/ai/promptModel";

export const extractCandidateData = async (resumeText) => {
  const prompt = resumeExtractionPrompt(resumeText);
  const { data, error } = await promptModel(prompt, 10000); // 10 seconds timeout

  if (error) throw error;

  // Validation
  if (
    !data.name ||
    !data.email ||
    !data.education ||
    !data.experience ||
    !data.skills ||
    !data.summary
  )
    throw new Error("Essential fields missing from AI output");

  return { data };
};
