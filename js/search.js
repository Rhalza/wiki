document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('wiki-search');
    const resultsContainer = document.getElementById('search-results');
    
    // Adjust path based on current location
    const jsonPath = window.location.pathname.includes('/article/') 
        ? '../json/articles.json' 
        : 'json/articles.json';

    let articles = [];

    // Fetch Data
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => { articles = data; })
        .catch(err => console.error("Search index failed to load", err));

    // Input Handler
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
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
                // Adjust link path based on location
                const prefix = window.location.pathname.includes('/article/') ? '' : 'article/';
                link.href = `${prefix}${article.filename}.html`;
                link.className = 'search-result-item';
                link.innerHTML = `
                    ${article.title}
                    <small>${article.summary.substring(0, 60)}...</small>
                `;
                resultsContainer.appendChild(link);
            });
        } else {
            const noResult = document.createElement('div');
            noResult.className = 'search-result-item';
            noResult.style.color = 'var(--text-muted)';
            noResult.textContent = 'No matching pages found.';
            noResult.style.cursor = 'default';
            resultsContainer.appendChild(noResult);
        }
        resultsContainer.style.display = 'block';
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });
});