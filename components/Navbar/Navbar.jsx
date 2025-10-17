import { logout } from "@/actions/auth-actions";

import classes from "./navbar.module.scss";

const Navbar = ({ title, colorClass }) => {
  return (
    <nav className={`${classes.navbar} ${classes[colorClass]}`}>
      <div className={classes.title}>{title}</div>
      <form action={logout}>
        <button type="submit" className={classes.logout}>
          Logout
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
