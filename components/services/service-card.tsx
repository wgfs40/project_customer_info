interface ServiceCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: string;
}
const ServiceCard = ({
  icon: Icon,
  title,
  description,
  color,
}: ServiceCardProps) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg text-center hover:shadow-xl transition duration-300">
      <Icon className={`w-10 h-10 text-[${color}] mx-auto mb-3`} />
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ServiceCard;
