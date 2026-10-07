/* =========================================
   MineHost — Интерактивность
   Задания 1, 2, 3 из методички
   ========================================= */

(function () {
    'use strict';

    /* =========================================
       ЗАДАНИЕ 1: ТЁМНАЯ ТЕМА
       ========================================= */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const root = document.documentElement;

    function getInitialTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return 'light';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // Инициализация темы при загрузке
    applyTheme(getInitialTheme());

    // Переключение по клику
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const current = root.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    /* =========================================
       ЗАДАНИЕ 2: МОБИЛЬНОЕ МЕНЮ-БУРГЕР
       ========================================= */
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

    function openMenu() {
        if (!burgerBtn || !mobileMenu) return;
        burgerBtn.classList.add('is-open');
        burgerBtn.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('is-open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!burgerBtn || !mobileMenu) return;
        burgerBtn.classList.remove('is-open');
        burgerBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (burgerBtn) {
        burgerBtn.addEventListener('click', function () {
            const isOpen = burgerBtn.classList.contains('is-open');
            isOpen ? closeMenu() : openMenu();
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }

    // Закрытие при клике на ссылку
    mobileMenuLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
            closeMenu();
        }
    });

    /* =========================================
       ЗАДАНИЕ 3: АНИМАЦИИ ПРИ СКРОЛЛЕ
       ========================================= */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        animatedElements.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    /* =========================================
       ЗАДАНИЕ 3: ПРОГРЕСС-БАР ПРОКРУТКИ
       ========================================= */
    const scrollProgress = document.querySelector('.scroll-progress');

    if (scrollProgress && !prefersReducedMotion) {
        function updateScrollProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgress.style.width = scrollPercent + '%';
        }

        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        updateScrollProgress();
    }

    /* =========================================
       ЗАДАНИЕ 3: ПАРАЛЛАКС ДЛЯ HERO
       ========================================= */
    const parallaxBg = document.querySelector('.hero__parallax-bg');

    if (parallaxBg && !prefersReducedMotion) {
        let ticking = false;

        function updateParallax() {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero') ? document.querySelector('.hero').offsetHeight : 600;

            if (scrollY < heroHeight) {
                parallaxBg.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
            }
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

})();