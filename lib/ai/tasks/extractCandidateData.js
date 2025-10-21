import { resumeExtractionPrompt } from "@/lib/ai/prompts/resumeExtractionPrompt";
import promptModel from "@/lib/ai/promptModel";

export const extractCandidateData = async (resumeText) => {
  const prompt = resumeExtractionPrompt(resumeText);
  const data = await promptModel(prompt, 10000); // 10 seconds timeout
  console.log(data);

  // Validation
  if (!data.name || !data.email)
    throw new Error("Essential fields missing from AI output");

  return { data };
};
