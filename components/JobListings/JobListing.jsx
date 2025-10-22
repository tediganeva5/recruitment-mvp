import classes from "./job-listing.module.scss";

const JobListing = ({ title, description }) => {
  return (
    <div className={classes.card}>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.description}>{description}</p>
      <span className={classes.linkHint}>View details →</span>
    </div>
  );
};

export default JobListing;
