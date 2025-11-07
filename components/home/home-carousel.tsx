"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const HomeCarousel = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const slides = [
    "Marketing Digital",
    "Estrategia Farmacéutica",
    "Análisis de Datos",
  ];
  const nextSlide = () => setSliderIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setSliderIndex((prev) => (prev - 1 + slides.length) % slides.length);
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
      <div className="h-64 md:h-96 flex items-center justify-center bg-gray-300 transition-all duration-500">
        <p className="text-2xl font-semibold text-gray-600">
          Imagen en Slider ({slides[sliderIndex]})
        </p>
      </div>
      {/* Controles del Slider */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-3 bg-white/70 rounded-full ml-4 shadow-md hover:bg-white transition duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-white/70 rounded-full mr-4 shadow-md hover:bg-white transition duration-200"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
};

export default HomeCarousel;
