"use client";

import Link from "next/link";
import { useActionState } from "react";

import { auth } from "@/actions/auth-actions";

import classes from "./auth-form.module.scss";

const AuthForm = ({ mode }) => {
  const [formState, formAction] = useActionState(auth.bind(null, mode), {});

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} action={formAction}>
        <h2>{mode === "signup" ? "Sign up" : "Login"}</h2>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required />
        </label>

        {mode === "signup" && (
          <div className={classes.role}>
            <label>
              <input type="radio" name="role" value="1" defaultChecked />{" "}
              Recruiter
            </label>
            <label>
              <input type="radio" name="role" value="2" /> Candidate
            </label>
          </div>
        )}

        {formState.errors && (
          <ul>
            {Object.keys(formState.errors).map((error) => (
              <li key={error}>{formState.errors[error]}</li>
            ))}
          </ul>
        )}

        <button type="submit">
          {mode === "login" ? "Login" : "Create account"}
        </button>

        <p className={classes.toggle}>
          {mode === "signup"
            ? "Already have an account?"
            : "Don’t have an account?"}{" "}
          {mode === "login" && <Link href={"?mode=signup"}>SignUp</Link>}
          {mode === "signup" && <Link href={"?mode=login"}>Login</Link>}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
