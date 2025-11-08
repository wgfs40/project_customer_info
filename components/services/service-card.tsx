import { IconValidNames } from "@/types/icon-map";
import { IconRenderer } from "../common/icon-map-lucide";

interface ServiceCardProps {
  icon: string;
  name: string;
  description: string;
  color: string;
}
const ServiceCard = ({
  icon: Icon,
  name,
  description,
  color,
}: ServiceCardProps) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg text-center hover:shadow-xl transition duration-300">
      {IconValidNames(Icon) ? (
        <>
          <IconRenderer
            iconName={Icon}
            size={40}
            className={`mx-auto mb-3 ${color}`}
          />
        </>
      ) : (
        <>icono no valido</>
      )}
      <h4 className="font-bold text-lg mb-1">{name}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ServiceCard;
