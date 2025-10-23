"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

import { fetchMatchedCandidates } from "@/actions/job-actions";

import { triggerBackgroundMatching } from "@/actions/triggerBackgroundMatching";

import CandidatesList from "../Candidates/CandidatesList";

import classes from "./job-matches.module.scss";

const JobMatches = ({ job, matchedCandidates }) => {
  const [status, setStatus] = useState(job.status);
  const [candidates, setCandidates] = useState(matchedCandidates);

  const handleFindCandidates = () => {
    triggerBackgroundMatching(job);
  };

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel("job-status");

    // Listening for status updates
    channel
      .on("broadcast", { event: "status-changed" }, async (payload) => {
        const {
          payload: { jobId, status },
        } = payload;
        if (jobId === job.id) {
          setStatus(status);
          if (status === "completed") {
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

      <div className={classes.matchContainer}>
        {status === "in_progress" && (
          <>
            <div className={classes.spinner}></div>
            <p>Matching candidates... please wait</p>
          </>
        )}
      </div>

      {status === "error" && (
        <p className={classes.error}>Matching failed. Please retry later.</p>
      )}

      {/* Condition when status results in not_found (not added yet) */}

      <CandidatesList candidates={candidates} />
    </section>
  );
};

export default JobMatches;
