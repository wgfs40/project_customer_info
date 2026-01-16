import { GetLatestServices } from "@/actions/service-action";
import { MonitorDot, TrendingUp, Users } from "lucide-react";
import { IconRenderer } from "../common/icon-map-lucide";
import { IconValidNames } from "@/types/icon-map";

const HomeFeaturedServices = async () => {
  const getServices = await GetLatestServices();
  const services = getServices.services;
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
          {services.map((service) => (
            <article
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-gray-100"
            >
              <div className="h-48 blog-image-placeholder flex items-center justify-center text-gray-400">
                {IconValidNames(service.icon) ? (
                  <>
                    <IconRenderer
                      iconName={service.icon}
                      size={40}
                      className={`mx-auto mb-3 ${service.color}`}
                    />
                  </>
                ) : (
                  <>icono no valido</>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-orange-500/10 text-orange-500 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {service.name}
                  </span>
                  <span className="text-gray-400 text-xs">5 min lectura</span>
                </div>
                <h3 className="text-xl font-bold mb-3 hover:text-magenta cursor-pointer transition">
                  5 Tendencias de Marketing para 2024
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="text-gray-900 font-bold border-b-2 border-yellow hover:border-magenta transition pb-1"
                >
                  Leer más
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturedServices;
