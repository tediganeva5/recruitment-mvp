import Navbar from "@/components/Navbar/Navbar";

import classes from "./layout.module.scss";

const RecruiterLayout = ({ children }) => {
  return (
    <div className={classes.container}>
      <Navbar title="Recruiter Dashboard" colorClass="orange" />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default RecruiterLayout;
