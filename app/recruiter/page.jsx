import classes from "./page.module.scss";

const RecruiterPage = () => {
  return (
    <div className={classes.container}>
      <h1>Welcome to Your Recruiter Dashboard</h1>
      <p>
        Use this dashboard to manage your job listings and discover the best
        candidates automatically matched to your open positions.
      </p>

      <div className={classes.cards}>
        <div className={classes.card}>
          <h2>Browse Job Positions</h2>
          <p>
            View and manage all your posted job positions. Each job
            automatically lists candidates ranked by compatibility.
          </p>
        </div>

        <div className={classes.card}>
          <h2>Add a New Job</h2>
          <p>
            Create a new job posting by specifying the title, description, and
            required skills. Our AI will do the matching for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;
