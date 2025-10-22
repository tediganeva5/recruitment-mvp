export const jobMatchPrompt = (job, candidates) => `
    You are a professional candidate scorer.

    Given the following job and candidates, rate how well each candidate fits the job.
    Return ONLY valid JSON in the following format:
    {
    "response": [85, 70, 92] // array of numeric scores in the same order as candidates
    }

    Do NOT include candidate names or IDs, only numeric scores.
    Ensure the JSON is properly formatted and parsable.

    Job:
    Title: ${job.title}
    Description: ${job.description}
    Skills: ${job.skills.join(", ")}
    Education: ${job.education}
    Experience: ${job.experience}

    Candidates:
    ${candidates
      .map(
        (c, i) =>
          `${i + 1}. Skills: ${c.skills.join(", ")}, Education: ${
            c.education
          }, Experience: ${c.experience}`
      )
      .join("\n")}
`;
