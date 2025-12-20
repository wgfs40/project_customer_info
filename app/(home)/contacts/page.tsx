import ContactForm from "@/components/contact/contact-form";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";


const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white animate-in slide-in-from-right-4 duration-500">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Columna Info */}
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl font-black mb-6">
              Pongámonos en <span className="text-pink-600">Contacto</span>
            </h1>
            <p className="text-xl text-gray-600">
              ¿Tienes un proyecto en mente? Nos encantaría escucharte y ver cómo
              podemos colaborar para hacerlo realidad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-pink-600 text-white flex items-center justify-center">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-lg">Escríbenos</h3>
              <p className="text-gray-500 text-sm">hola@marketingmarisol.com</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-400 text-gray-900 flex items-center justify-center">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-lg">Llámanos</h3>
              <p className="text-gray-500 text-sm">+1 234 567 890</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl border-2 border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
              <MapPin size={32} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">
                Nuestra Oficina
              </h3>
              <p className="text-gray-500">
                Calle Innovación 45, Distrito Creativo
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Linkedin, label: "LinkedIn" },
            ].map(({ Icon, label }, i) => (
              <button
                key={i}
                title={label}
                aria-label={label}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all"
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>
        {/* Columna Formulario */}
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
