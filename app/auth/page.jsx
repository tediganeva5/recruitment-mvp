import AuthForm from "@/components/AuthForm/AuthForm";

const AuthPage = async ({ searchParams }) => {
  const { mode } = await searchParams;
  const formMode = mode || "login";

  return <AuthForm mode={formMode} />;
};

export default AuthPage;
