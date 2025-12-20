import { MonitorDot, TrendingUp, Users } from "lucide-react";

const HomeFeaturedServices = () => {
  return (
    <section id="servicios" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Servicios Destacados
            </h2>
            <div className="h-1 w-20 bg-yellow mt-2"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Post 1 */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-gray-100">
            <div className="h-48 blog-image-placeholder flex items-center justify-center text-gray-400">
              [Imagen de Estrategia de Contenidos]
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-magenta/10 text-magenta text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Estrategia
                </span>
                <span className="text-gray-400 text-xs">5 min lectura</span>
              </div>
              <h3 className="text-xl font-bold mb-3 hover:text-magenta cursor-pointer transition">
                5 Tendencias de Marketing para 2024
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Descubre cómo la IA y el video corto están transformando la
                manera en que las marcas conectan con sus clientes.
              </p>
              <a
                href="#"
                className="text-gray-900 font-bold border-b-2 border-yellow hover:border-magenta transition pb-1"
              >
                Leer más
              </a>
            </div>
          </article>

          {/* Post 2 */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-gray-100">
            <div className="h-48 blog-image-placeholder flex items-center justify-center text-gray-400">
              [Imagen de Branding y Color]
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-yellow/20 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Diseño
                </span>
                <span className="text-gray-400 text-xs">8 min lectura</span>
              </div>
              <h3 className="text-xl font-bold mb-3 hover:text-magenta cursor-pointer transition">
                Psicología del Color en tu Marca
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                ¿Por qué elegimos el Magenta y el Amarillo? El impacto emocional
                de tu paleta de colores en las ventas.
              </p>
              <a
                href="#"
                className="text-gray-900 font-bold border-b-2 border-yellow hover:border-magenta transition pb-1"
              >
                Leer más
              </a>
            </div>
          </article>

          {/* Post 3 */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-gray-100">
            <div className="h-48 blog-image-placeholder flex items-center justify-center text-gray-400">
              [Imagen de Redes Sociales]
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-magenta/10 text-magenta text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Social Media
                </span>
                <span className="text-gray-400 text-xs">4 min lectura</span>
              </div>
              <h3 className="text-xl font-bold mb-3 hover:text-magenta cursor-pointer transition">
                Guía de Instagram Reels para Negocios
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Cómo crear contenido viral sin necesidad de grandes presupuestos
                de producción audiovisual.
              </p>
              <a
                href="#"
                className="text-gray-900 font-bold border-b-2 border-yellow hover:border-magenta transition pb-1"
              >
                Leer más
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturedServices;
