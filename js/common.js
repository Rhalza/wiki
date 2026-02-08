const WIKI_CONFIG = {
    articlesPath: '../json/articles.json', 
    articleRoot: '../article/',
    homeRoot: '../',
    email: 'rhalza.wiki@gmail.com'
};

const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

if (isHome) {
    WIKI_CONFIG.articlesPath = 'json/articles.json';
    WIKI_CONFIG.articleRoot = 'article/';
    WIKI_CONFIG.homeRoot = '';
}

async function fetchArticles() {
    try {
        const response = await fetch(WIKI_CONFIG.articlesPath);
        if (!response.ok) throw new Error('Response error');
        return await response.json();
    } catch (error) {
        return [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fabBtn = document.getElementById('fab-main');
    const fabMenu = document.getElementById('fab-menu');
    const fabIcon = document.getElementById('fab-icon');
    
    if (fabBtn && fabMenu) {
        fabBtn.addEventListener('click', () => {
            const isActive = fabMenu.classList.contains('active');
            
            if (isActive) {
                fabMenu.classList.remove('active');
                fabIcon.textContent = '✉'; 
            } else {
                fabMenu.classList.add('active');
                fabIcon.textContent = '×'; 
            }
        });

        document.addEventListener('click', (e) => {
            if (!fabBtn.contains(e.target) && !fabMenu.contains(e.target)) {
                fabMenu.classList.remove('active');
                fabIcon.textContent = '✉';
            }
        });

        const articleTitleEl = document.querySelector('.article-title');
        const pageTitle = articleTitleEl ? articleTitleEl.textContent : 'General';

        document.getElementById('opt-correct').addEventListener('click', () => {
            const subject = articleTitleEl 
                ? `Correction Request: ${pageTitle}` 
                : `Correction Request`;
            window.location.href = `mailto:${WIKI_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=Describe the error:`;
        });

        document.getElementById('opt-suggest').addEventListener('click', () => {
            window.location.href = `mailto:${WIKI_CONFIG.email}?subject=Article Suggestion&body=Suggested Topic:`;
        });

        document.getElementById('opt-submit').addEventListener('click', () => {
            window.location.href = `mailto:${WIKI_CONFIG.email}?subject=Article Submission&body=Attached or Inline Concept:`;
        });
    }
});