const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}
const hamburgerBtn = document.querySelector('#hamburger-btn');
const nav = document.querySelector('nav');
const darkModeBtn = document.querySelector('#dark-mode-btn');
const navLinks = document.querySelectorAll('nav a');

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