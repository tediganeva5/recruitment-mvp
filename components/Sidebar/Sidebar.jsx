import NavLink from "@/components/NavLink/NavLink";

import classes from "./sidebar.module.scss";

const Sidebar = ({ href }) => {
  return (
    <aside className={classes.sidebar}>
      <nav className={classes.nav}>
        <NavLink href={`${href}/jobs`}>Browse Jobs</NavLink>
        <NavLink href={`${href}/jobs/new`}>Add New Job</NavLink>
      </nav>

      <footer className={classes.footer}>
        <p>© {new Date().getFullYear()} The TalentMatch Platform</p>
      </footer>
    </aside>
  );
};

export default Sidebar;
