import Navbar from "@/components/Navbar/Navbar";

import classes from "./layout.module.scss";

const CandidateLayout = ({ children }) => {
  return (
    <div className={classes.container}>
      <Navbar title="Candidate Dashboard" colorClass="blue" />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default CandidateLayout;
