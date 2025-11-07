import AboutContent from "@/components/about/about-content";
import AboutTitle from "@/components/about/about-title";
import React from "react";

const AboutPage = () => {
  return (
    <section className="space-y-10">
      <AboutTitle />
      {/* Aquí puedes agregar más componentes o contenido relacionado con la página "Acerca de Mí" */}
      <AboutContent />
    </section>
  );
};

export default AboutPage;
