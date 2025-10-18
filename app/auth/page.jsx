import AuthForm from "@/components/AuthForm/AuthForm";

import classes from "./page.module.scss";

const AuthPage = async ({ searchParams }) => {
  const { mode } = await searchParams;
  const formMode = mode || "login";

  return (
    <div className={classes.wrapper}>
      <AuthForm mode={formMode} />
    </div>
  );
};

export default AuthPage;
