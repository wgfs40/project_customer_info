const Hero = () => {
  return (
    <section className="hero-gradient text-white py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Hacemos brillar <br />
            <span className="text-yellow italic">tu marca digital</span>
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Estrategias personalizadas que combinan creatividad magenta y
            energía amarilla para resultados extraordinarios.
          </p>
          <div className="flex gap-4">
            <a
              href="#servicios"
              className="bg-yellow text-gray-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition"
            >
              Ver Servicios
            </a>
            <a
              href="#"
              className="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-magenta transition"
            >
              Nuestro Portfolio
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          {/* SVG Ilustrativo */}
          <svg
            width="400"
            height="300"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="400"
              height="300"
              rx="20"
              fill="white"
              fillOpacity="0.1"
            />
            <circle cx="200" cy="150" r="80" fill="#FFD200" fillOpacity="0.8" />
            <path
              d="M150 150L250 150M200 100L200 200"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
