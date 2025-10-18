import Link from "next/link";

import { logout } from "@/actions/auth-actions";

import classes from "./navbar.module.scss";

const Navbar = ({ href, title, colorClass }) => {
  return (
    <nav className={`${classes.navbar} ${classes[colorClass]}`}>
      <Link href={href} className={classes.link}>
        <div className={classes.title}>{title}</div>
      </Link>
      <form action={logout}>
        <button type="submit" className={classes.logout}>
          Logout
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
