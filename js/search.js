document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('wiki-search');
    const resultsContainer = document.getElementById('search-results');
    let articles = [];

    fetchArticles().then(data => {
        articles = data;
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        resultsContainer.innerHTML = '';
        
        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        const filtered = articles.filter(article => 
            article.title.toLowerCase().includes(query) || 
            article.tags.some(tag => tag.toLowerCase().includes(query))
        );

        if (filtered.length > 0) {
            filtered.forEach(article => {
                const link = document.createElement('a');
                link.href = `${WIKI_CONFIG.articleRoot}${article.filename}.html`;
                link.className = 'search-result-item';
                
                const titleSpan = document.createElement('div');
                titleSpan.style.fontWeight = '500';
                titleSpan.textContent = article.title;
                
                const metaSpan = document.createElement('div');
                metaSpan.style.fontSize = '0.8rem';
                metaSpan.style.color = '#94a3b8';
                metaSpan.textContent = article.summary.substring(0, 60) + '...';

                link.appendChild(titleSpan);
                link.appendChild(metaSpan);
                resultsContainer.appendChild(link);
            });
            resultsContainer.style.display = 'block';
        } else {
            const noResult = document.createElement('div');
            noResult.className = 'search-result-item';
            noResult.style.color = '#94a3b8';
            noResult.textContent = 'No matching pages found.';
            resultsContainer.appendChild(noResult);
            resultsContainer.style.display = 'block';
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });
});