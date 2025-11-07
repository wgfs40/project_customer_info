const BlogSecundaryArticle = () => {
  const articleTestData = [
    {
      title: "Micro-Dosis de Contenido: El futuro del TikTok",
      description: "Descubre por qué la brevedad domina la atención en 2025.",
      date: "25 de septiembre de 2025",
    },
    {
      title: "La Receta del Éxito: CRM para Farmacéuticas",
      description: "Estrategias de gestión de clientes para el sector salud.",
      date: "15 de septiembre de 2025",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articleTestData.map((article, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
        >
          <h4 className={`font-bold text-lg text-action-text mb-2`}>
            {article.title}
          </h4>
          <p className="text-gray-600 text-sm mb-3">{article.description}</p>
          <p className="text-xs text-gray-500">Publicado: {article.date}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogSecundaryArticle;
