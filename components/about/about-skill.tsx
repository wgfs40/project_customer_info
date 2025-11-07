import { Award, BarChart3, Briefcase, Zap } from "lucide-react";

const AboutSkill = () => {
  // Datos de la biografía y habilidades (estáticos, ideales para SC)
  const skills = [
    { icon: Briefcase, title: "Estrategia de Contenido", color: "TEAL_COLOR" },
    {
      icon: Award,
      title: "SEO Avanzado (Farmacéutico)",
      color: "ORANGE_COLOR",
    },
    { icon: Zap, title: "Automatización de Marketing", color: "TEAL_COLOR" },
    { icon: BarChart3, title: "Visualización de Datos", color: "ORANGE_COLOR" },
  ];
  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <h4 className="text-xl font-bold text-gray-800 mb-4">
        Mi Enfoque y Habilidades Clave
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
          >
            <skill.icon
              className={`w-5 h-5 text-[${skill.color}] flex-shrink-0`}
            />
            <span className="text-gray-700 font-medium">{skill.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSkill;
