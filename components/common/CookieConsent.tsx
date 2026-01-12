"use client";

import { Check, Cookie, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Comprobar si el usuario ya ha dado su consentimiento anteriormente
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Pequeño retraso para mejorar la experiencia de usuario (UX)
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
    // Aquí puedes inicializar scripts de seguimiento como Google Analytics
    console.log("Cookies aceptadas por el usuario");
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
    console.log("Cookies rechazadas por el usuario");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center p-6 gap-6">
          {/* Icono y Título */}
          <div className="flex-shrink-0 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-full">
            <Cookie className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>

          {/* Contenido de Texto */}
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Valoramos tu privacidad
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Utilizamos cookies propias y de terceros para mejorar tu
              experiencia, analizar el tráfico y mostrar anuncios
              personalizados. Al hacer clic en "Aceptar", consientes el uso de
              todas las cookies.
            </p>
          </div>

          {/* Acciones/Botones */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-6 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              Declinar todo
            </button>
            <button
              onClick={handleAccept}
              className="flex items-center justify-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95"
            >
              <Check className="w-4 h-4" />
              Aceptar todo
            </button>
          </div>

          {/* Botón de cerrar (esquina superior derecha en móvil) */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Enlace a política de privacidad */}
        <div className="bg-slate-50 dark:bg-slate-950/50 px-6 py-2 border-t border-slate-100 dark:border-slate-800 flex justify-center md:justify-start">
          <a
            href="/politica-cookies"
            className="text-[10px] uppercase tracking-wider font-bold text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-1"
          >
            <ShieldCheck className="w-3 h-3" />
            Leer nuestra política de cookies
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
