import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(async () => {
    const config = useRuntimeConfig();


    const BASE_URL = config.public.BASE_URL;
    try {
        // Fetch articles from the backend
        const response = await fetch(`${BASE_URL}/api/news/all`);
        const articles = await response.json();

        // Generate dynamic URLs for each article
        const sitemapUrls: SitemapUrlInput[] = articles.map((article: { id: number, title: string, publishedAt: string }) => {
            return {
                loc: `/articles/${article.id}`, // Dynamic URL
                lastmod: article.publishedAt,    // Last modified date
                priority: 0.7                    // Set priority if needed
            };
        });

        return sitemapUrls;
    } catch (error) {
        console.error('Error fetching articles for sitemap:', error);
        return [];
    }
})
