export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
        const route = useRoute()
        const noAdsPages = ['/auth/login', '/auth/register', '/articles/new']

        // Remove existing AdSense script if navigating to no-ads pages
        const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]')
        if (existingScript) {
            existingScript.remove()
        }

        // Inject AdSense script only on allowed pages
        if (!noAdsPages.includes(route.path)) {
            const script = document.createElement('script')
            script.async = true
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1638187422634927'
            script.crossOrigin = 'anonymous'
            document.head.appendChild(script)
        }
    })
})
