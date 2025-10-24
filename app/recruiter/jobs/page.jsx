import JobListings from "@/components/JobListings/JobListings";

import { getAllJobsDb } from "@/lib/db/job";

const JobsPaage = async () => {
  const jobs = await getAllJobsDb();

  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>Job Listings</h1>
      <JobListings jobs={jobs} />
    </div>
  );
};

export default JobsPaage;
