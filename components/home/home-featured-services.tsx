import { MonitorDot, TrendingUp, Users } from "lucide-react";

const HomeFeaturedServices = () => {
  return (
    <div>
      <h3
        className={`text-2xl font-bold text-gray-800 mb-6 border-b-2 border-teal-500 inline-block pb-1`}
      >
        Servicios Destacados
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-teal-500`}
        >
          <TrendingUp className={`w-8 h-8 text-teal-500 mb-3`} />
          <h4 className="font-semibold text-lg mb-2">Estrategia SEO</h4>
          <p className="text-gray-600 text-sm">
            Aseguramos que tu marca lidere las búsquedas orgánicas.
          </p>
        </div>
        <div
          className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-orange-500`}
        >
          <MonitorDot className={`w-8 h-8 text-orange-500 mb-3`} />
          <h4 className="font-semibold text-lg mb-2">Publicidad Digital</h4>
          <p className="text-gray-600 text-sm">
            Campañas PPC optimizadas para el máximo retorno de inversión.
          </p>
        </div>
        <div
          className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-teal-500`}
        >
          <Users className={`w-8 h-8 text-teal-500 mb-3`} />
          <h4 className="font-semibold text-lg mb-2">Gestión de Redes</h4>
          <p className="text-gray-600 text-sm">
            Creamos comunidades y contenido de alto valor en plataformas clave.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeFeaturedServices;
