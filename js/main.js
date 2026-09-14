const hamburgerBtn = document.querySelector('#hamburger-btn');
const nav = document.querySelector('nav');
const darkModeBtn = document.querySelector('#dark-mode-btn');

hamburgerBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

darkModeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
    }
});
