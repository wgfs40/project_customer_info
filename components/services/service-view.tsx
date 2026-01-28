import Search from "../common/search";
import ServiceCard from "./service-card";
import { GetServices } from "@/actions/service-action";

const ServiceView = async () => {
  const serviceData = await GetServices();
  return (
    <section className="space-y-10">
      <h2 className="text-3xl font-extrabold mb-8 text-principal-text text-center border-b pb-2">
        Nuestros Servicios
      </h2>
      {/* Barra de Búsqueda de Servicios */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      {/* Cuadrícula de Servicios (3x2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceData?.services.map((service) => (
          // ServiceCard es un SC (Server Safe)
          <ServiceCard key={service.id} {...service} />
        ))}

        {serviceData?.services.length === 0 && (
          <p className="text-center col-span-full text-gray-500">{serviceData.message}</p>
        )}
      </div>
    </section>
  );
};

export default ServiceView;
