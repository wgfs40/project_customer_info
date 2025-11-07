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

const ServiceView = () => {
  // prueba de datos de servicios
  const services = [
    {
      icon: BarChart3,
      title: "Análisis de Datos",
      description: "Transformamos datos brutos en estrategias accionables.",
      color: "ORANGE_COLOR",
    },
    {
      icon: Palette,
      title: "Diseño Creativo",
      description: "Identidad de marca y contenido visual impactante.",
      color: "TEAL_COLOR",
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Campañas de correo electrónico que generan lealtad.",
      color: "ORANGE_COLOR",
    },
    {
      icon: Globe,
      title: "Desarrollo Web",
      description: "Páginas rápidas, seguras y optimizadas para conversión.",
      color: "TEAL_COLOR",
    },
    {
      icon: ShieldCheck,
      title: "Reputación Online",
      description: "Manejo de crisis y construcción de credibilidad digital.",
      color: "ORANGE_COLOR",
    },
    {
      icon: Megaphone,
      title: "Relaciones Públicas",
      description: "Visibilidad en medios y alianzas estratégicas.",
      color: "TEAL_COLOR",
    },
  ];
  return (
    <section className="space-y-10">
      <h2 className="text-3xl font-extrabold mb-8 text-center border-b pb-2">
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
        {services.map((service, index) => (
          // ServiceCard es un SC (Server Safe)
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServiceView;
