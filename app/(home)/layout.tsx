import { getUserSession } from "@/actions/service-auth";
import Footer from "@/components/layaout/footer/footer";
import Header from "@/components/layaout/header/header";
import { redirect } from "next/navigation";

const LayoutHome = async ({ children }: { children: React.ReactNode }) => {
  const userSession = await getUserSession();
  const session = userSession.session || null;
  if (!session) {
    // si el usuario no está autenticado, redirigir a la página de inicio de sesión
    redirect("/auth/login");
  }
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 font-sans">
      <Header />
      <main className="container mx-auto px-4 max-w-5xl">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutHome;
