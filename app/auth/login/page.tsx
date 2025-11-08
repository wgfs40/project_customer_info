import LoginContentForm from "@/components/auth/login/login-content-form";
import LoginTitle from "@/components/auth/login/login-title";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <LoginTitle />
      <LoginContentForm />
    </div>
  );
};

export default page;
