export const resumeExtractionPrompt = (resumeText) => `
  You are a professional resume parser.

  Your task: Extract key candidate information **always** using the exact JSON structure below.  
  If any field is missing or unclear, fill it with a reasonable placeholder (e.g. "Not specified" or [] for lists).  
  Do NOT omit any field under any circumstance. Output **only** valid JSON.

  Required JSON structure:
  {
    "name": "Candidate full name",
    "email": "Email address",
    "education": "Brief summary of education background",
    "experience": "Short summary of work experience",
    "skills": ["List", "of", "skills"],
    "summary": "2-3 sentence summary of the candidate profile"
  }

  Resume text:
  ---
  ${resumeText}
  ---
  `;
