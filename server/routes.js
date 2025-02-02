import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const sitemap = await $fetch('/api/sitemap');
    event.node.res.setHeader('Content-Type', 'application/xml');
    return sitemap;
});
