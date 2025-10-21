"use client";

import { useActionState } from "react";

import { uploadResume } from "@/actions/resume-actions";

import classes from "./resume-form.module.scss";

const ResumeForm = () => {
  const [formState, formAction, isPending] = useActionState(uploadResume, {});
  const { success, error, text } = formState;

  return (
    <>
      <div className={classes.container}>
        <form action={formAction} className={classes.form}>
          <label className={classes.label}>
            Upload your resume (PDF)
            <input
              className={classes.input}
              type="file"
              name="resume"
              accept="application/pdf"
              required
              disabled={isPending}
            />
          </label>

          <button type="submit" className={classes.button} disabled={isPending}>
            {isPending ? "Uploading…" : "Upload Resume"}
          </button>
        </form>

        <div className={classes.message}>
          {isPending && (
            <p>Processing resume — this may take a few seconds...</p>
          )}
          {success && (
            <p className={classes.success}>
              ✅ Resume parsed successfully. Candidate data saved.
            </p>
          )}
          {error && <p className={classes.error}>❌ {error}</p>}
        </div>
      </div>
      {text && <div>{text}</div>}
    </>
  );
};

export default ResumeForm;
