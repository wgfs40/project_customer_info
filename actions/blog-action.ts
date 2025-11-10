"use server";

export async function fetchBlogPosts(page: number, limit: number) {
    // Simula la obtención de publicaciones de un blog desde una base de datos o API
    const totalPosts = 50; // Ejemplo: total de publicaciones disponibles
    const posts = Array.from({ length: limit }, (_, index) => ({
        id: (page - 1) * limit + index + 1,
        title: `Publicación de Blog ${(page - 1) * limit + index + 1}`,
        summary: `Resumen de la publicación de blog ${(page - 1) * limit + index + 1}`,
        createdAt: new Date().toISOString(),
    }));
    return { totalPosts, posts };
}