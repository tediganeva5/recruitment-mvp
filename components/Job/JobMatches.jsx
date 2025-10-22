"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

import { fetchMatchedCandidates } from "@/actions/job-actions";

import classes from "./job-matches.module.scss";

const JobMatches = ({ job, matchedCandidates }) => {
  const [status, setStatus] = useState(job.status);
  const [candidates, setCandidates] = useState(matchedCandidates ?? []);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel("job-status");

    // Listening for status updates
    channel
      .on("broadcast", { event: "status-changed" }, async (payload) => {
        console.log(payload);
        const { payload: jobPayload } = payload;
        if (jobPayload.jobId === job.id) {
          console.log(`📢 Job ${job.id} status updated:`, payload.status);
          setStatus(jobPayload.status);

          if (payload.status === "completed") {
            console.log("✅ Job completed - fetch matched candidates here");
            const candidates = await fetchMatchedCandidates(job.id);
            setCandidates(candidates);
          }
        }
      })
      .subscribe((status) =>
        console.log("🧩 Broadcast channel status:", status)
      );

    return () => {
      supabase.removeChannel(channel);
    };
  }, [job.id]);

  if (status === "in_progress") {
    return (
      <section className={classes.matchesSection}>
        <h2>Matched Candidates</h2>
        <div className={classes.matchContainer}>
          <div className={classes.spinner}></div>
          <p>Matching candidates... please wait</p>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className={classes.matchesSection}>
        <h2>Matched Candidates</h2>
        <p className={classes.error}>Matching failed. Please retry later.</p>
      </section>
    );
  }

  if (status === "completed" && !candidates.length) {
    return (
      <section className={classes.matchesSection}>
        <h2>Matched Candidates</h2>
        <p>No matches found.</p>
      </section>
    );
  }

  return (
    <section className={classes.matchesSection}>
      <h2>Matched Candidates</h2>
      <ul className={classes.candidateList}>
        {candidates.map((c) => (
          <li key={c.id} className={classes.candidateCard}>
            <h3>{c.name}</h3>
            {c.education && <p>{c.education}</p>}
            {c.experience && <p>{c.experience}</p>}
            <p>Skills: {c.skills.join(", ")}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default JobMatches;
