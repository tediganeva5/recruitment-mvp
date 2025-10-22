import classes from "./job-card.module.scss";

const JobCard = ({ job }) => {
  const { title, description, education, experience, skills } = job;

  return (
    <div className={classes.card}>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.description}>{description}</p>
      <div className={classes.details}>
        <div className={classes.detailItem}>
          <span className={classes.label}>Education:</span>
          <span className={classes.value}>{education}</span>
        </div>
        <div className={classes.detailItem}>
          <span className={classes.label}>Experience:</span>
          <span className={classes.value}>{experience}</span>
        </div>
        <div className={classes.detailItem}>
          <span className={classes.label}>Skills:</span>
          <span className={classes.value}>{skills.join(", ")}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
