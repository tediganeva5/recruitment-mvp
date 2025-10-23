import { createClient } from "@/utils/supabase/server";

import ResumeForm from "@/components/ResumeForm/ResumeForm";

import { getCandidateDataDb } from "@/lib/db/candidate";

import classes from "./page.module.scss";

const CandidatePage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const candidateData = await getCandidateDataDb(user.id);

  if (candidateData) {
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>Thank you!</h1>
        <p className={classes.text}>
          You have already submitted your resume. Our recruiters will contact
          you directly if our AI match assistant finds you a good fit for an
          open position.
        </p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Submit Your Resume</h1>
      <ResumeForm />
    </div>
  );
};

export default CandidatePage;
