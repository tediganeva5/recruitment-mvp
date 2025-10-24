import { resumeExtractionPrompt } from "@/lib/ai/prompts/resumeExtractionPrompt";
import promptModel from "@/lib/ai/promptModel";

export const extractCandidateData = async (resumeText) => {
  // TODO: Pre-screening of extracted text before providing it to the model
  const prompt = resumeExtractionPrompt(resumeText);
  const { data, error } = await promptModel(prompt, 6 * 10000); // Could add timeout

  if (error) throw error;
  // TODO: To add fallback custom extraction of data if model throws an error (e.g. rate limit exceeded)
  // Or change flow -> user uploads a resume, ai model tries to extract data and populates form fileds
  // if models fails or validation checks for key data is missing -> user is required to provide the
  // missing data manually before storing the resume data in the db

  // Validation (to improve)
  if (
    !data.name ||
    !data.email ||
    !data.education ||
    !data.experience ||
    !data.skills
    // !data.summary
  )
    throw new Error("Essential fields missing from AI output");

  return { data };
};
