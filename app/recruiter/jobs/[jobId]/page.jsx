import { getJobByIdDb } from "@/lib/db/job";

import classes from "./page.module.scss";

const JobDetailspage = async ({ params }) => {
  const { jobId } = await params;
  const job = await getJobByIdDb(jobId);

  if (!job) {
    return <p className={classes.error}>Job not found.</p>;
  }

  return (
    <div className={classes.page}>
      <div className={classes.card}>
        <h1 className={classes.title}>{job.title}</h1>
        <p className={classes.description}>{job.description}</p>

        <div className={classes.details}>
          <div className={classes.detailItem}>
            <span className={classes.label}>Education:</span>
            <span className={classes.value}>{job.education}</span>
          </div>

          <div className={classes.detailItem}>
            <span className={classes.label}>Experience:</span>
            <span className={classes.value}>
              {job.experience} year{job.experience > 1 ? "s" : ""}
            </span>
          </div>

          <div className={classes.detailItem}>
            <span className={classes.label}>Technologies:</span>
            <span className={classes.value}>
              {job.technologies?.join(", ")}
            </span>
          </div>
        </div>
      </div>

      <section className={classes.matchesSection}>
        <h2>Matched Candidates</h2>
        <div className={classes.matchContainer}>
          <div className={classes.spinner}></div>
          <p>Matching candidates... please wait</p>
        </div>
      </section>
    </div>
  );
};

export default JobDetailspage;
