const savedTheme = localStorage.getItem('theme');
const hamburgerBtn = document.querySelector('#hamburger-btn');
const nav = document.querySelector('nav');
const darkModeBtn = document.querySelector('#dark-mode-btn');
const navLinks = document.querySelectorAll('nav a');
const header = document.querySelector('header');
const scrollTopBtn = document.querySelector('#scroll-top-btn');
const form = document.querySelector('form')

if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        nav.classList.remove('active');
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

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const nameError = document.querySelector('#name-error');
const emailError = document.querySelector('#email-error');
const messageError = document.querySelector('#message-error');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const formSuccess = document.querySelector('#form-success')

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isVaild = true;

    if (nameInput.value === '') {
        nameError.textContent = ' 이름을 입력해주세요';
        isVaild = false;
    }

    if (emailInput.value === '') {
        emailError.textContent = 'email을 입력해주세요';
    } else if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = '올바른 이메일 형식이 아닙니다';
        isVaild = false;
    }

    if (messageInput.value === '') {
        messageError.textContent = '메시지를 입력해주세요';
        isVaild = false;
    }

    if (isVaild) {
        formSuccess.textContent = '폼 제출 성공!';
    }
})

async function loadProjects() {
    const projectList = document.querySelector('#project-list');
    projectList.innerHTML = '<p>로딩 중...</p>';

    try {
        const response = await fetch('https://api.github.com/users/gusrb8983-sys/repos');
        const data = await response.json();
        if (data.length === 0) {
            projectList.innerHTML = '<p>표시할 프로젝트가 없습니다.</p>'
        } else {
            const cardsHTML = data.map((repo) => {
                const { name, description, html_url } = repo;
                
                let descriptionText = description;
                if (!description) {
                    descriptionText = '설명이 없습니다.';
                }

                return `<article class="project-card">
                            <h3>${name}</h3>
                            <p>${descriptionText}</p>
                            <a href="${html_url}" target="_blank">GitHub에서 보기</a>
                        </article>`;
            }).join('');
            projectList.innerHTML = cardsHTML;
        }
    } catch (error) {
        projectList.innerHTML = '<p>프로젝트를 불러올 수 없습니다.</p>';
    }
}

loadProjects();