import JobForm from "@/components/JobForm/JobForm";

import classes from "./page.module.scss";

const NewJobPage = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Add a New Job Position</h1>
      <p className={classes.subtitle}>
        Fill out the form below to create a new job listing. The system will
        automatically match candidates based on your listed criteria.
      </p>
      <JobForm />
    </div>
  );
};

export default NewJobPage;
