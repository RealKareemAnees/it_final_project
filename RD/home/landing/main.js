// Carousel Data — prefer local images inside `slide-1-images`
const localFiles = [
    'aston-martin.jpg',
    'audi.avif',
    'porsche.jpg'
];

const quotes = [
    'Luxurious car can you<br>buy from our shop',
    'Performance meets elegance<br>in every curve',
    'Precision engineering<br>for the elite',
    'Drive beyond limits<br>with luxury',
    'Timeless design meets<br>modern innovation',
    'Your dreams deserve<br>the best vehicle',
    'Experience the road<br>like never before',
    'Crafted for those who<br>demand perfection'
];

let slides = [];
if (localFiles.length) {
    slides = localFiles.map((file, i) => ({
        image: `slide-1-images/${file}`,
        quote: quotes[i % quotes.length],
        position: 'center 55%'
    }));
} else {
    // fallback slides (remote images)
    slides = [
        { image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2069', quote: quotes[0], position: 'center 70%' },
        { image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2069', quote: quotes[1], position: 'center 50%' }
    ];
}

let currentSlide = 0;

// DOM Elements
const appContainer = document.querySelector('.app-container');
const headline = document.querySelector('.hero-headline');
const currentSlideSpan = document.querySelector('.current-slide');
const totalSlideSpan = document.querySelector('.total-slides');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

function applySlide(index, options = {}) {
    if (!appContainer || !headline || !currentSlideSpan) {
        return;
    }

    const slide = slides[index];
    const newBg = `linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%), url('${slide.image}')`;

    currentSlideSpan.textContent = String(index + 1).padStart(2, '0');
    if (totalSlideSpan) {
        totalSlideSpan.textContent = String(slides.length).padStart(2, '0');
    }

    if (options.instant) {
        appContainer.style.setProperty('--hero-image', newBg);
        appContainer.style.setProperty('--hero-position', slide.position);
        headline.innerHTML = slide.quote;
        headline.classList.remove('fade-out', 'fade-in');
        return;
    }

    appContainer.classList.add('is-fading');
    headline.classList.remove('fade-in');
    headline.classList.add('fade-out');

    window.setTimeout(() => {
        appContainer.style.setProperty('--hero-image', newBg);
        appContainer.style.setProperty('--hero-position', slide.position);
        headline.innerHTML = slide.quote;
        headline.classList.remove('fade-out');
        headline.classList.add('fade-in');
        appContainer.classList.remove('is-fading');
    }, 250);
}

function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    applySlide(currentSlide);
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    }
    if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

function closeMenu() {
    if (!mobileNav) return;
    mobileNav.classList.remove('active');
    if (mobileMenuBtn) {
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

if (mobileMenuBtn && mobileNav) {
    // Toggle menu on hamburger click
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileNav.classList.toggle('active');

        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on nav links
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
        }
    });
}

applySlide(currentSlide, { instant: true });
