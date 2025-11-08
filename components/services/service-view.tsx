import {
  BarChart3,
  Globe,
  Mail,
  Megaphone,
  Palette,
  ShieldCheck,
} from "lucide-react";
import Search from "../common/search";
import ServiceCard from "./service-card";
import { Service } from "@/types/service";
import { GetServices } from "@/actions/service-action";
import { IconValidNames } from "@/types/icon-map";

const ServiceView = async () => {
  // prueba de datos de servicios
  const services: Service[] = [
    {
      id: "1",
      icon: BarChart3,
      name: "Análisis de Datos",
      description: "Transformamos datos brutos en estrategias accionables.",
      color: "text-principal-text",
    },
    {
      id: "2",
      icon: Palette,
      name: "Diseño Creativo",
      description: "Identidad de marca y contenido visual impactante.",
      color: "text-accent-text",
    },
    {
      id: "3",
      icon: Mail,
      name: "Email Marketing",
      description: "Campañas de correo electrónico que generan lealtad.",
      color: "text-action-text",
    },
    {
      id: "4",
      icon: Globe,
      name: "Desarrollo Web",
      description: "Páginas rápidas, seguras y optimizadas para conversión.",
      color: "text-accent-text",
    },
    {
      id: "5",
      icon: ShieldCheck,
      name: "Reputación Online",
      description: "Manejo de crisis y construcción de credibilidad digital.",
      color: "text-action-text",
    },
    {
      id: "6",
      icon: Megaphone,
      name: "Relaciones Públicas",
      description: "Visibilidad en medios y alianzas estratégicas.",
      color: "text-accent-text",
    },
  ];

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
          <p className="text-center col-span-full text-gray-500">
            {serviceWithMessage.message}
          </p>
        )}
      </div>
    </section>
  );
};

export default ServiceView;
