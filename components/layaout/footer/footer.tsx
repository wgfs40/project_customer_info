const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-logo rounded-full flex items-center justify-center  font-bold">
              M
            </div>
            <span className="text-2xl font-bold">
              Dosis de <span className="text-logo">Marketing</span>
            </span>
          </div>
          <p className="text-gray-400">
            Tu aliado estratégico en el mundo digital. Transformamos ideas en
            ventas.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-magenta inline-block pb-1">
            Enlaces
          </h4>
          <ul className="space-y-4 text-gray-400">
            <li>
              <a href="#" className="hover:text-yellow">
                Casos de Éxito
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow">
                Nuestro Equipo
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow">
                Blog de Marketing
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-yellow inline-block pb-1">
            Newsletter
          </h4>
          <div className="flex">
            <input
              type="email"
              placeholder="Tu email"
              className="bg-gray-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-2 focus:ring-magenta outline-none"
            />
            <button className="bg-logo px-4 py-2 rounded-r-lg hover:bg-orange-400">
              OK
            </button>
          </div>
          <div className="flex gap-4 mt-6 text-2xl text-gray-400">
            <a href="#" title="Instagram" className="hover:text-magenta"></a>
            {/* agregar ícono de Instagram */}

            <a href="#" title="LinkedIn" className="hover:text-magenta"></a>
            {/* agregar ícono de LinkedIn */}
            <a href="#" title="WhatsApp" className="hover:text-magenta"></a>
            {/* agregar ícono de WhatsApp */}
          </div>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
        &copy; 2025 Marketing Marisol. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
