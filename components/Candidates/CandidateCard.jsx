import classes from "./candidate-card.module.scss";

const CandidateCard = ({ candidate }) => {
  return (
    <li className={classes.card}>
      <div className={classes.header}>
        <h3 className={classes.name} title={candidate.name}>
          {candidate.name}
        </h3>
        <span className={classes.score}>{candidate.score}/100</span>
      </div>
      {candidate.education && (
        <p className={classes.text} title={candidate.education}>
          {candidate.education}
        </p>
      )}
      {candidate.experience && (
        <p className={classes.text} title={candidate.experience}>
          {candidate.experience}
        </p>
      )}
      {candidate.skills && candidate.skills.length > 0 && (
        <p className={classes.skills} title={candidate.skills.join(", ")}>
          Skills: {candidate.skills.join(", ")}
        </p>
      )}
    </li>
  );
};

export default CandidateCard;
