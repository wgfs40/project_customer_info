import Logo from "./logo";
import NavLinks from "./links";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-5xl">
        <Logo />
        {/* Navegación principal - Server Component con Client Components internos */}
        <nav className="flex flex-col md:flex-row items-center justify-end flex-grow mt-4 md:mt-0 space-y-3 md:space-y-0 md:space-x-8 text-lg">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
};

export default Header;
