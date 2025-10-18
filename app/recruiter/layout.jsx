import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

import classes from "./layout.module.scss";

const RecruiterLayout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Navbar title="Recruiter Dashboard" colorClass="orange" />
      <div className={classes.body}>
        <Sidebar />
        <main className={classes.main}>{children}</main>
      </div>
    </div>
  );
};

export default RecruiterLayout;
