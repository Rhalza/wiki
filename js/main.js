document.addEventListener('DOMContentLoaded', () => {
    const totalArticlesEl = document.getElementById('stat-total-articles');
    const lastUpdateEl = document.getElementById('stat-last-update');

    fetchArticles().then(articles => {
        if (totalArticlesEl) {
            totalArticlesEl.textContent = articles.length.toLocaleString();
        }

        if (lastUpdateEl && articles.length > 0) {
            const dates = articles.map(a => new Date(a.date));
            const latest = new Date(Math.max.apply(null, dates));
            lastUpdateEl.textContent = formatDate(latest);
        } else if (lastUpdateEl) {
            lastUpdateEl.textContent = 'N/A';
        }
    });
});