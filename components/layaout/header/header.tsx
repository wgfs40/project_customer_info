import Logo from "./logo";
import NavLinks from "./links";
import UserActions from "./user-actions";
import ShoppingCartAction from "./shopping-cart-actions";
import MobileMenu from "./mobile-menu";
import { getUserSession } from "@/actions/service-auth";

const Header = async () => {
  const userSession = await getUserSession(); // Implementa esta función para obtener la sesión del usuario
  const session = userSession?.session || null;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Logo />
          {/* Navegación principal - Server Component con Client Components internos */}
          <nav className="hidden md:block">
            <NavLinks />
          </nav>
          <MobileMenu userSession={session} />

          {/* Botones de accion para el carrito de compra y perfil de usuario */}
          <div className="hidden md:flex items-center pl-5 space-x-5">
            <ShoppingCartAction userSession={session} />
            <UserActions userSession={session} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
