import React from "react";
// Importamos los tipos y el mapa
import { IconMap, IconName } from "@/types/icon-map";

// Definimos las propiedades del componente
interface IconRendererProps {
  iconName: IconName; // Solo acepta strings válidos de tu mapa
  size?: number;
  color?: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({
  iconName,
  size = 24,
  color = "currentColor",
  className,
}) => {
  // Accede al componente de Lucide usando la clave (el string)
  const LucideIcon = IconMap[iconName];

  // Renderiza el componente con las propiedades de Lucide
  return <LucideIcon size={size} color={color} className={className} />;
};
