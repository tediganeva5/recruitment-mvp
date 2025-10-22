import Link from "next/link";

import JobListing from "./JobListing";

import { getAllJobsDb } from "@/lib/db/job";

import classes from "./job-listings.module.scss";

const JobListings = async () => {
  const jobs = await getAllJobsDb();

  if (!jobs || !jobs.length) {
    return <p className={classes.empty}>No job listings available.</p>;
  }

  return (
    <div className={classes.container}>
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/recruiter/jobs/${job.id}`}
          className={classes.link}
        >
          <JobListing title={job.title} description={job.description} />
        </Link>
      ))}
    </div>
  );
};

export default JobListings;
