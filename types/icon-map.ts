import {
  ChartBar,
  Globe,
  Mail,
  Megaphone,
  Palette,
  ShieldCheck,
} from "lucide-react";

export const IconMap = {
  // Aquí mapeas el string que te llega a su Componente de Lucide
  BarChart3: ChartBar, // Si tu 'BarChart3' es un gráfico de barras general
  Palette: Palette,
  Mail: Mail,
  Globe: Globe,
  ShieldCheck: ShieldCheck,
  Megaphone: Megaphone,
  Dashboard: ChartBar,
  Users: Globe,
  Settings: ShieldCheck,
  Blog: Megaphone,
  // ... añade más íconos si los necesitas
} as const;

// Tipo de utilidad para obtener las claves (los strings válidos)
export type IconName = keyof typeof IconMap;

export const IconValidNames = (name: string): name is IconName => {
  // Comprueba si el string existe como clave en tu IconMap
  return name in IconMap;
};
