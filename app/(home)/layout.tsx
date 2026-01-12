import CookieConsent from "@/components/common/CookieConsent";
import Footer from "@/components/layaout/footer/footer";
import Header from "@/components/layaout/header/header";

const LayoutHome = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <main className="h-screen flex flex-col justify-between">
        {children}
        <Footer />
      </main>
      {/* El componente se puede renderizar en el Layout principal */}
      <CookieConsent />
    </div>
  );
};

export default LayoutHome;
