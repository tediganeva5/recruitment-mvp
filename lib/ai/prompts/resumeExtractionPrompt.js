export const resumeExtractionPrompt = (resumeText) => `
  You are a professional resume parser.
  Given the resume text below, extract the following fields as JSON.

  Required JSON structure:
  {
    "name": "Candidate full name",
    "email": "email address",
    "education": "brief summary of education background",
    "experience": "short summary of work experience",
    "technologies": ["list", "of", "skills"],
    "summary": "2-3 sentence summary of the candidate profile"
  }

  Resume:
  ---
  ${resumeText}
  ---
  `;
