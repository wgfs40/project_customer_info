import Header from "@/components/layaout/header/header";

const LayoutHome = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 font-sans">
      <Header />
      <main className="container mx-auto px-4 max-w-5xl">{children}</main>
    </div>
  );
};

export default LayoutHome;
