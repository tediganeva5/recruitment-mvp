"use server";

import { getUnmatchedCandidatesDb } from "@/lib/db/candidate";
import { addMultipleMatchesDb } from "@/lib/db/match";
import { matchCandidates } from "@/lib/helpers/tasks/matchCandidates";

import { updateJobStatusDb } from "@/lib/db/job";
import { notifyJobStatusChange } from "@/utils/supabase/notifyJobUpdate";

const setJobStatus = async (jobId, status) => {
  await updateJobStatusDb(jobId, status);
  await notifyJobStatusChange(jobId, status);
};

export const triggerBackgroundMatching = async (job) => {
  // Fire-and-forget
  (async () => {
    console.log(`Starting background matching`);
    let status = "in_progress";

    try {
      await setJobStatus(job.id, status);
      // Could add additional param to obtain all candidates or candidates with no matches
      const candidates = await getUnmatchedCandidatesDb(job.id);
      if (!candidates || !candidates.length) {
        status = "completed"; // "not_found"
        return;
      }

      const { data } = await matchCandidates(job, candidates);
      if (!data.length) {
        status = "completed"; // "not_found"
        return;
      }

      await addMultipleMatchesDb(data);

      status = "completed";
    } catch (err) {
      status = "error";
    } finally {
      await setJobStatus(job.id, status);
      console.log(`Completed background matching`);
    }
  })();
};
