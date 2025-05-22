const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

let currentSlide = 0;
let slideInterval;

mobileMenuBtn.addEventListener('click', () => {
    if (nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
});


function initSlider() {
    
    slides[0].classList.add('active');
    dots[0].classList.add('active');
    
    
    startSlideShow();
    
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-index'));
            goToSlide(slideIndex);
        });
    });
}


function prevSlide() {
    resetSlideInterval();
    goToSlide(currentSlide - 1);
}


function nextSlide() {
    resetSlideInterval();
    goToSlide(currentSlide + 1);
}


function goToSlide(slideIndex) {
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    } else if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
    
    
    currentSlide = slideIndex;
}


function startSlideShow() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}


function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideShow();
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
            }
            
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});


function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < windowHeight - 150) {
            section.classList.add('revealed');
        }
    });
}


window.addEventListener('scroll', revealOnScroll);


const style = document.createElement('style');
style.innerHTML = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    revealOnScroll(); 
});


const products = document.querySelectorAll('.product');

products.forEach(product => {
    product.addEventListener('mouseenter', () => {
        const btn = product.querySelector('.btn');
        btn.style.backgroundColor = 'var(--accent-color)';
    });
    
    product.addEventListener('mouseleave', () => {
        const btn = product.querySelector('.btn');
        btn.style.backgroundColor = 'var(--primary-color)';
    });
});

const sloganBar = document.querySelector('.slogan-bar');
let sloganInterval;
const discounts = [
    { text: '17% OFF NodeMcu ESP8266', link: '#products' },
    { text: 'Comming soon!', link: '#products' },
    { text: '17% OFF NEW CUSTOMERS', link: '#order' }
];


function initSloganAnimation() {
    
    sloganBar.innerHTML = `
        <div class="slogan-content active">
            <p class="slogan-text">WELCOME TO HACKBIT PENTEST GEAR</p>
        </div>
    `;

   
    discounts.forEach((discount, index) => {
        const discountElement = document.createElement('div');
        discountElement.className = 'slogan-content';
        discountElement.style.transform = 'translateY(100%)';
        discountElement.innerHTML = `
            <div class="slogan-discount">
                <span class="discount-text">${discount.text}</span>
                <a href="${discount.link}" class="discount-btn">Shop Now</a>
            </div>
        `;
        sloganBar.appendChild(discountElement);
    });

    const sloganContents = document.querySelectorAll('.slogan-content');
    let currentSlogan = 0;

    
    sloganInterval = setInterval(() => {
       
        sloganContents[currentSlogan].style.transform = 'translateY(-100%)';
        
        
        currentSlogan = (currentSlogan + 1) % (discounts.length + 1);
        
        
        sloganContents[currentSlogan].style.transform = 'translateY(0)';
        
        
        const nextIndex = (currentSlogan + 1) % (discounts.length + 1);
        sloganContents[nextIndex].style.transform = 'translateY(100%)';
    }, 4000);
}


function applyDiscounts() {
    const products = document.querySelectorAll('.product');
    
    
    const productDiscounts = {
        'NodeMcu ESP8266 USB Type-C': { original: '৳600', discounted: '৳499', percent: '17%' },
        'EMU8086 - MICROPROCESSOR EMULATOR': { original: '৳2344', discounted: '৳0', percent: '100%' },


    };
    
    products.forEach(product => {
        const title = product.querySelector('h3').textContent;
        const priceElement = product.querySelector('.price');
        
        if (productDiscounts[title]) {
            
            const discountBadge = document.createElement('div');
            discountBadge.className = 'discount-badge';
            discountBadge.textContent = `${productDiscounts[title].percent} OFF`;
            product.querySelector('.product-image').appendChild(discountBadge);
            
            
            const priceContainer = document.createElement('div');
            priceContainer.className = 'price-container';
            
            
            const originalPrice = document.createElement('span');
            originalPrice.className = 'original-price';
            originalPrice.textContent = productDiscounts[title].original;
            
            
            priceElement.textContent = productDiscounts[title].discounted;
            
            
            priceElement.parentNode.insertBefore(priceContainer, priceElement);
            priceContainer.appendChild(originalPrice);
            priceContainer.appendChild(priceElement);
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    revealOnScroll(); 
    initSloganAnimation(); 
    applyDiscounts(); 
});
