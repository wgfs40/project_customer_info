import AboutBiography from "./about-biography";
import AboutSkill from "./about-skill";

const AboutContent = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border-b-8 border-blue-500">
      {/* Aquí puedes agregar más componentes o contenido relacionado con la página "Acerca de Mí" */}
      <AboutBiography />
      {/* Habilidades */}
      <AboutSkill />
    </div>
  );
};

export default AboutContent;
