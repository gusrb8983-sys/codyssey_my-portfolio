const savedTheme = localStorage.getItem('theme');
const hamburgerBtn = document.querySelector('#hamburger-btn');
const nav = document.querySelector('nav');
const darkModeBtn = document.querySelector('#dark-mode-btn');
const navLinks = document.querySelectorAll('nav a');
const header = document.querySelector('header');
const scrollTopBtn = document.querySelector('#scroll-top-btn');

if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

hamburgerBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

darkModeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    let newTheme;

    if (currentTheme === 'dark') {
        newTheme = 'light';
    } else {
        newTheme = 'dark';
    }

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
    }

    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

const sections = document.querySelectorAll('main section');

sections.forEach((section) => {
    observer.observe(section);
});