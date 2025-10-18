"use client";

import { useActionState } from "react";

import { createJob } from "@/actions/job-actions";

import classes from "./job-form.module.scss";

const JobForm = () => {
  const [formState, formAction] = useActionState(createJob, {});

  return (
    <form className={classes.form} action={formAction}>
      <div className={classes.field}>
        <label htmlFor="title">Job Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Frontend Developer"
          required
        />
      </div>

      <div className={classes.field}>
        <label htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          placeholder="Describe the key responsibilities, expectations, and company culture..."
          required
        />
      </div>

      <div className={classes.row}>
        <div className={classes.field}>
          <label htmlFor="education">Minimum Education</label>
          <select id="education" name="education">
            <option value="">Select...</option>
            <option value="High School">High School</option>
            <option value="Bachelor">Bachelor’s Degree</option>
            <option value="Master">Master’s Degree</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        <div className={classes.field}>
          <label htmlFor="experience">Years of Experience</label>
          <input
            id="experience"
            name="experience"
            type="number"
            min="0"
            placeholder="e.g. 3"
          />
        </div>
      </div>

      <div className={classes.field}>
        <label htmlFor="skills">Required Technologies / Skills</label>
        <input
          id="skills"
          name="skills"
          type="text"
          placeholder="e.g. React, Node.js, TypeScript"
        />
      </div>

      <div className={classes.field}>
        <label htmlFor="location">Preferred Location</label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="e.g. Remote or London"
        />
      </div>

      {formState.errors && (
        <ul>
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}

      <button type="submit" className={classes.submit}>
        Create Job Position
      </button>
    </form>
  );
};

export default JobForm;
