"use client";

import { useActionState } from "react";

import { uploadResume } from "@/actions/resume-actions";

import classes from "./resume-form.module.scss";

const ResumeForm = () => {
  const [formState, formAction, isPending] = useActionState(uploadResume, {});

  const handleSubmitResumeForm = (formData) => {
    formState.error = null;
    formAction(formData);
  };

  return (
    <div className={classes.container}>
      <form action={handleSubmitResumeForm} className={classes.form}>
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
        {isPending && <p>Processing resume — this may take a few seconds...</p>}
        {formState.error && <p className={classes.error}>{formState.error}</p>}
      </div>
    </div>
  );
};

export default ResumeForm;
