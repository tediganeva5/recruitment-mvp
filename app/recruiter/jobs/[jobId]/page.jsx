import { getJobByIdDb } from "@/lib/db/job";

import JobCard from "@/components/Job/JobCard";
import JobMatches from "@/components/Job/JobMatches";

import { getMatchedCandidatesForJobDb } from "@/lib/db/candidate";

import classes from "./page.module.scss";

const JobDetailspage = async ({ params }) => {
  const { jobId } = await params;
  const job = await getJobByIdDb(jobId);

  if (!job) {
    return <p className={classes.error}>Job not found.</p>; // TODO: add notFound page
  }

  const matchedCandidates = await getMatchedCandidatesForJobDb(jobId);

  return (
    <div className={classes.page}>
      <JobCard job={job} />
      <JobMatches job={job} matchedCandidates={matchedCandidates} />
    </div>
  );
};

export default JobDetailspage;
