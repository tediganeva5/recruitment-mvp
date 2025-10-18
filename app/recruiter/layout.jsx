import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

import classes from "./layout.module.scss";

const RecruiterLayout = ({ children }) => {
  const href = "/recruiter";

  return (
    <div className={classes.layout}>
      <Navbar href={href} title="Recruiter Dashboard" colorClass="orange" />
      <div className={classes.body}>
        <Sidebar href={href} />
        <main className={classes.main}>{children}</main>
      </div>
    </div>
  );
};

export default RecruiterLayout;
