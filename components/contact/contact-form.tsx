const ContactForm = () => {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl border-t-8 border-orange-500">
      <h2 className="text-3xl font-extrabold mb-6 text-center">Contactanos</h2>
      <form>
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="block text-gray-700 font-medium mb-2"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            required
            className={`w-full p-3 border border-gray-300 rounded-xl  focus:ring-1  transition duration-200`}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="correo"
            className="block text-gray-700 font-medium mb-2"
          >
            Correo
          </label>
          <input
            type="email"
            id="correo"
            required
            className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-1 transition duration-200`}
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="mensaje"
            className="block text-gray-700 font-medium mb-2"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            rows={6}
            required
            className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-1 transition duration-200 resize-none`}
          ></textarea>
        </div>

        {/* Botón de Envío usa ORANGE_COLOR como color de acción */}
        <div className="text-center">
          <button
            type="submit"
            className={`w-full md:w-auto px-10 py-3 bg-orange-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-orange-700 transition duration-300 transform hover:scale-105`}
          >
            Registro
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
