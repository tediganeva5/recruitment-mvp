// TODO: improve fallback score calculation to match the ATS scoring
// NOTE: this basic version does not provide accurate scoring
export const calculatefallbackScores = (job, candidates) => {
  return candidates.map((candidate) => {
    let score = 0;

    // --- Skills match (max 60 pts) ---
    const jobSkills = job.skills.map((s) => s.toLowerCase());
    const candSkills = (candidate.skills || []).map((s) => s.toLowerCase());
    const matches = candSkills.filter((s) =>
      jobSkills.some((j) => s.includes(j) || j.includes(s))
    );
    const skillScore =
      jobSkills.length > 0 ? (matches.length / jobSkills.length) * 60 : 0;
    score += Math.min(skillScore, 60);

    // --- Education match (max 20 pts) ---
    if (
      candidate.education &&
      candidate.education.toLowerCase().includes(job.education.toLowerCase())
    ) {
      score += 20;
    }

    // --- Experience match (max 20 pts) ---
    const jobExp = Number(job.experience) || 0;
    // NOTE: not implemented yet -> when uploading the resume,
    // the candidate should provide a numeric value for years of experience -> introducing another field
    // const candExp = parseInt(candidate.experience) || 0;
    // if (candExp >= jobExp) score += 20;
    // else if (jobExp > 0) score += (candExp / jobExp) * 20;

    // Clamp to 0–100 and round
    return Math.round(Math.min(score, 100));
  });
};
