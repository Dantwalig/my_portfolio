// Theme toggle ---------------------------------------------------------
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
        const next = theme === 'dark' ? 'light' : 'dark';
        themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0F1311' : '#F6F7F5');
}

applyTheme(root.getAttribute('data-theme') || 'light');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            // Storage can be blocked; the theme still applies for this visit.
        }
    });
}

// Highlight the nav link for the section in view -------------------------
const navLinks = document.querySelectorAll('.site-nav a');
const linkByHash = new Map();
navLinks.forEach((link) => linkByHash.set(link.getAttribute('href'), link));

const watched = ['projects', 'experience', 'skills', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

if ('IntersectionObserver' in window && watched.length) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const link = linkByHash.get(`#${entry.target.id}`);
                if (!link) return;
                if (entry.isIntersecting) {
                    navLinks.forEach((l) => l.removeAttribute('aria-current'));
                    link.setAttribute('aria-current', 'true');
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );
    watched.forEach((section) => sectionObserver.observe(section));

    // Clear the highlight when the reader is back at the top of the page.
    const hero = document.getElementById('top');
    if (hero) {
        new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    navLinks.forEach((l) => l.removeAttribute('aria-current'));
                }
            },
            { rootMargin: '-40% 0px -40% 0px' }
        ).observe(hero);
    }
}

// Copy email ---------------------------------------------------------------
const copyButton = document.querySelector('.copy-btn');
const copyStatus = document.querySelector('.copy-status');

async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(field);
    if (!ok) throw new Error('Copy failed');
}

if (copyButton && copyStatus) {
    let resetTimer;
    copyButton.addEventListener('click', async () => {
        clearTimeout(resetTimer);
        try {
            await copyText(copyButton.dataset.copy);
            copyStatus.textContent = 'Copied';
        } catch (e) {
            copyStatus.textContent = 'Copy failed. Select the address and copy it manually.';
        }
        resetTimer = setTimeout(() => {
            copyStatus.textContent = '';
        }, 2500);
    });
}

// Footer year ---------------------------------------------------------------
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
