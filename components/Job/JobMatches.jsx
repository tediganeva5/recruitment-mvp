"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

import { fetchMatchedCandidates } from "@/actions/job-actions";

import { triggerBackgroundMatching } from "@/lib/helpers/triggerBackgroundMatching";

import classes from "./job-matches.module.scss";

const JobMatches = ({ job, matchedCandidates }) => {
  const [status, setStatus] = useState(job.status);
  const [candidates, setCandidates] = useState(matchedCandidates ?? []);

  const handleFindCandidates = () => {
    triggerBackgroundMatching(job);
  };

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel("job-status");

    // Listening for status updates
    channel
      .on("broadcast", { event: "status-changed" }, async (payload) => {
        const { payload: jobPayload } = payload;
        if (jobPayload.jobId === job.id) {
          console.log(`📢 Job ${job.id} status updated:`, jobPayload.status);
          setStatus(jobPayload.status);

          if (jobPayload.status === "completed") {
            console.log("✅ Job completed - fetch matched candidates here");
            const candidates = await fetchMatchedCandidates(job.id);
            setCandidates(candidates);
          }
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [job.id]);

  return (
    <section className={classes.matchesSection}>
      <button
        className={classes.button}
        onClick={handleFindCandidates}
        disabled={status === "in_progress"}
      >
        {status === "in_progress" ? "Matching..." : "Find Candidates"}
      </button>

      <h2>Matched Candidates</h2>

      {status === "in_progress" && (
        <div className={classes.matchContainer}>
          <div className={classes.spinner}></div>
          <p>Matching candidates... please wait</p>
        </div>
      )}

      {status === "error" && (
        <p className={classes.error}>Matching failed. Please retry later.</p>
      )}

      {status === "completed" && !candidates.length && <p>No matches found.</p>}

      {status === "completed" && candidates.length > 0 && (
        <ul className={classes.candidateList}>
          {candidates.map((c) => (
            <li key={c.id} className={classes.candidateCard}>
              <h3>{c.name}</h3>
              <h4>{c.score}</h4>
              {c.education && <p>{c.education}</p>}
              {c.experience && <p>{c.experience}</p>}
              <p>Skills: {c.skills.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default JobMatches;
