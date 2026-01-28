const AboutBiography = () => {
  return (
    <>
      {/* Biografía */}
      <div className="flex flex-col md:flex-row items-start md:space-x-8">
        {/* Imagen de Perfil (Placeholder) */}
        <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-full mx-auto md:mx-0 mb-4 md:mb-0 flex items-center justify-center text-gray-500 font-semibold text-xs border-4 border-gray-100 shadow-inner">
          Foto
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3 md:text-left text-center">
            Juan Pérez, Especialista en Dosis
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Soy el fundador de Dosis de Marketing. Mi trayectoria se centra en la intersección de la
            **tecnología, la salud y el marketing digital**. Después de más de una década trabajando
            en agencias de publicidad y el sector farmacéutico, desarrollé una metodología única que
            se enfoca en la precisión, la ética y la medición rigurosa de resultados. Mi objetivo es
            simplificar la complejidad del marketing digital para empresas que operan en mercados
            altamente regulados.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Creo firmemente que la mejor estrategia es aquella que se basa en datos y se entrega en
            la &quot;dosis&quot; justa: sin exageraciones, solo resultados probados.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutBiography;
