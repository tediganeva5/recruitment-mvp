import openai from "@/lib/openai";

export async function matchCandidates(job, candidates) {
  const prompt = `
You are a strict candidate scorer.

Given a job and multiple candidates, rate each candidate from 0 to 100.
Return ONLY the results in this format, one candidate per line:

Name | Score

Job:
Title: ${job.title}
Description: ${job.description}
Skills: ${job.technologies.join(", ")}
Education: ${job.education}
Experience: ${job.experience}

Candidates:
${candidates
  .map(
    (c) => `
Name: ${c.name}
Skills: ${c.skills.join(", ")}
Education: ${c.education}
Experience: ${c.experience}
`
  )
  .join("\n")}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-distill-llama-70b:free",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message?.content || "";

    // Parse structured lines safely
    const results = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, scoreStr] = line.split("|").map((s) => s.trim());
        return { name, score: Number(scoreStr) || 0 };
      });

    console.log("Matching results:", results);

    return results;
  } catch (error) {
    console.error("Error during candidate matching:", error);
    return [];
  }
}
