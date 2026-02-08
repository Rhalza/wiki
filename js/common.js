const WIKI_CONFIG = {
    articlesPath: 'json/articles.json',
    articleRoot: 'article/'
};

async function fetchArticles() {
    try {
        const response = await fetch(WIKI_CONFIG.articlesPath);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Failed to load articles:', error);
        return [];
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}