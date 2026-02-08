const WIKI_CONFIG = {
    // Helper to get correct path regardless of current depth
    getPath: (path) => {
        const depth = window.location.pathname.split('/').length - 2; 
        const prefix = depth > 0 ? '../'.repeat(depth) : '';
        return prefix + path;
    },
    articlesPath: 'json/articles.json',
    contactEmail: 'rhalza.wiki@gmail.com'
};

/* --- Global Init --- */
document.addEventListener('DOMContentLoaded', () => {
    initFAB();
});

/* --- Floating Action Button Logic --- */
function initFAB() {
    const fabContainer = document.querySelector('.fab-container');
    const fabMain = document.querySelector('.fab-main');
    
    if(!fabContainer || !fabMain) return;

    // Toggle Menu
    fabMain.addEventListener('click', (e) => {
        e.stopPropagation();
        fabContainer.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target)) {
            fabContainer.classList.remove('active');
        }
    });

    // Setup Mail Links
    const btnCorrection = document.getElementById('mail-correction');
    const btnSuggestion = document.getElementById('mail-suggestion');
    const btnSubmission = document.getElementById('mail-submission');

    if(btnCorrection) btnCorrection.addEventListener('click', () => sendMail('correction'));
    if(btnSuggestion) btnSuggestion.addEventListener('click', () => sendMail('suggestion'));
    if(btnSubmission) btnSubmission.addEventListener('click', () => sendMail('submission'));
}

function sendMail(type) {
    let subject = "";
    let body = "";
    
    // Determine Page Name
    const path = window.location.pathname;
    const pageName = path.substring(path.lastIndexOf('/') + 1).replace('.html', '').replace(/_/g, ' ');
    const isArticle = path.includes('/article/');

    switch(type) {
        case 'correction':
            subject = isArticle ? `Correction: ${pageName}` : `Wiki Correction`;
            body = "Please describe the error or missing data:\n\n";
            break;
        case 'suggestion':
            subject = "Article Suggestion";
            body = "Proposed Title:\n\nDescription of topic:\n\n";
            break;
        case 'submission':
            subject = "Article Submission";
            body = "Attached is a concept for a new article.\n\nTopic:\n\n";
            break;
    }

    window.location.href = `mailto:${WIKI_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}