export default defineEventHandler(async () => {
    const BASE_URL = 'https://dowur-news.shop';

    try {
        const response = await fetch(`${BASE_URL}/api/news/all`);
        const articles = await response.json();

        return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${articles.map(article => `
          <url>
            <loc>${BASE_URL}/articles/${article.id}</loc>
            <lastmod>${article.publishedAt}</lastmod>
            <priority>0.7</priority>
          </url>
        `).join('')}
      </urlset>`;
    } catch (error) {
        console.error('Failed to fetch articles for sitemap:', error);
        return 'Error generating sitemap';
    }
});
