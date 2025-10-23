"use server";

import { getUnmatchedCandidatesDb } from "@/lib/db/candidate";
import { addMultipleMatchesDb } from "@/lib/db/match";
import { matchCandidates } from "@/lib/helpers/tasks/matchCandidates";

import { updateJobStatusDb } from "@/lib/db/job";
import { notifyJobStatusChange } from "@/utils/supabase/notifyJobUpdate";

export const triggerBackgroundMatching = async (job) => {
  // Fire-and-forget
  setImmediate(async () => {
    console.log(`Starting background matching`);
    try {
      await updateJobStatusDb(job.id, "in_progress");
      await notifyJobStatusChange(job.id, "in_progress");
      // Could add additional param to obtain all candidates or candidates with no matches
      const candidates = await getUnmatchedCandidatesDb(job.id);
      if (!candidates || !candidates.length) {
        await updateJobStatusDb(job.id, "completed");
        await notifyJobStatusChange(job.id, "completed");
        return;
      }

      const { data } = await matchCandidates(job, candidates);
      await addMultipleMatchesDb(data);

      await updateJobStatusDb(job.id, "completed");
      await notifyJobStatusChange(job.id, "completed");
    } catch (err) {
      await updateJobStatusDb(job.id, "error");
      await notifyJobStatusChange(job.id, "error");
    } finally {
      console.log(`Completed background matching`);
    }
  });
};
