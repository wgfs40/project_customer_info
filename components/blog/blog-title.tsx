import BlogSearchText from "./blog-searh-text";

const BlogTitle = () => {
  return (
    <header className="bg-gray-50 py-16 px-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <span className="text-pink-600 font-bold uppercase tracking-widest text-sm">
          Nuestro Conocimiento
        </span>
        <h1 className="text-4xl md:text-5xl font-black mt-2 mb-4">
          El Blog de Marketing Marisol
        </h1>
        <p className="text-gray-600 text-lg max-w-xl">
          Consejos, noticias y estrategias para emprendedores que quieren
          dominar el entorno digital.
        </p>
      </div>
      <div className="max-w-2xl mx-auto mt-12 relative group">
        <BlogSearchText placeholder="¿Qué estás buscando hoy?" />
      </div>
    </header>
  );
};

export default BlogTitle;
