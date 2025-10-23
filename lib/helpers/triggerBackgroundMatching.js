"use server";

import {
  // getAllCandidatesDb,
  getUnmatchedCandidatesDb,
} from "@/lib/db/candidate";
import { addMultipleMatchesDb } from "@/lib/db/match";
import { matchCandidates } from "@/lib/helpers/tasks/matchCandidates";

import { updateJobStatusDb } from "@/lib/db/job";
import { notifyJobStatusChange } from "@/utils/supabase/notifyJobUpdate";

export const triggerBackgroundMatching = async (newJobListing) => {
  // Fire-and-forget
  setImmediate(async () => {
    console.log(`Starting background matching`);
    try {
      // Could add additional param to obtain all candidates or candidates with no matches
      const candidates = await getUnmatchedCandidatesDb(newJobListing.id);
      if (!candidates || !candidates.length) {
        await updateJobStatusDb(newJobListing.id, "completed");
        await notifyJobStatusChange(newJobListing.id, "completed");
        return;
      }

      const { data } = await matchCandidates(newJobListing, candidates);
      await addMultipleMatchesDb(data);

      await updateJobStatusDb(newJobListing.id, "completed");
      await notifyJobStatusChange(newJobListing.id, "completed");
    } catch (err) {
      await updateJobStatusDb(newJobListing.id, "error");
      await notifyJobStatusChange(newJobListing.id, "error");
    } finally {
      console.log(`Completed background matching`);
    }
  });
};
