import React from "react";

interface BlogSecundaryArticleItemsProps {
  title: string;
  description: string;
  date: string;
}
const BlogSecundaryArticleItems = ({
  title,
  description,
  date,
}: BlogSecundaryArticleItemsProps) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <h4 className={`font-bold text-lg text-orange-300 mb-2`}>{title}</h4>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <p className="text-xs text-gray-500">Publicado: {date}</p>
    </div>
  );
};

export default BlogSecundaryArticleItems;
