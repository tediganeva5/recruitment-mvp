import CandidateCard from "./CandidateCard";

import classes from "./candidates-list.module.scss";

const CandidateList = ({ candidates }) => {
  if (!candidates || !candidates.length) return null;

  return (
    <>
      <div className={classes.title}>Matched Candidates</div>
      <ul className={classes.list}>
        {candidates.map((c) => (
          <CandidateCard key={c.id} candidate={c} />
        ))}
      </ul>
    </>
  );
};

export default CandidateList;
