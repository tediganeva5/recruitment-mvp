import NavLink from "@/components/NavLink/NavLink";

import classes from "./sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={classes.sidebar}>
      <nav className={classes.nav}>
        <NavLink href="/recruiter/jobs">Browse Jobs</NavLink>
        <NavLink href="/recruiter/jobs/new">Add New Job</NavLink>
      </nav>

      <footer className={classes.footer}>
        <p>© {new Date().getFullYear()} The TalentMatch Platform</p>
      </footer>
    </aside>
  );
};

export default Sidebar;
