import { getUserSession } from "@/actions/service-auth";
import LoginForm from "./login-form";
import { redirect } from "next/navigation";

const LoginContentForm = async () => {
  const userSession = await getUserSession();
  const session = userSession.session || null;
  if (session) {
    // si el usuario no está autenticado, redirigir a la página de inicio de sesión
    redirect("/");
  }

  return <LoginForm user={session} />;
};

export default LoginContentForm;
