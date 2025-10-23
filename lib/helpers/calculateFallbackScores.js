export const calculatefallbackScores = (job, candidates) => {
  return candidates.map((candidate) => {
    let score = 0;

    const skillMatchCount = candidate.skills.filter((skill) =>
      job.skills.includes(skill)
    ).length;
    score += skillMatchCount * 10;

    if (candidate.education && candidate.education === job.education) {
      score += 10;
    }

    if (
      candidate.experience &&
      Number(candidate.experience) >= Number(job.experience)
    ) {
      score += 10;
    }

    return Math.min(score, 100); // clamp to 0–100
  });
};
