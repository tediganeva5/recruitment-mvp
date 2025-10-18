import Navbar from "@/components/Navbar/Navbar";

import classes from "./layout.module.scss";

const CandidateLayout = ({ children }) => {
  const href = "/candidate";

  return (
    <div className={classes.container}>
      <Navbar href={href} title="Candidate Dashboard" colorClass="blue" />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default CandidateLayout;
