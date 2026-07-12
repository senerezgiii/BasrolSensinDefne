let currentPage = 0;
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;
const navBar = document.getElementById('nav-bar');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');

function updateNav() {
    if (currentPage === 0) {
        navBar.classList.remove('visible');
    } else {
        navBar.classList.add('visible');
        pageIndicator.innerText = `${currentPage} / ${totalPages - 1}`;
    }

    prevBtn.disabled = (currentPage === 1); 
    nextBtn.style.visibility = (currentPage === totalPages - 1) ? 'hidden' : 'visible';
}

function nextPage() {
    if (currentPage < totalPages - 1) {
        pages[currentPage].classList.remove('initial');
        pages[currentPage].classList.add('turned');
        currentPage++;
        
        pages[currentPage].scrollTo(0, 0);
        updateNav();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        pages[currentPage].classList.remove('turned');
        updateNav();
    }
}

// ANA SAYFAYA DÖN FONKSİYONU
function goHome() {
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove('turned');
    }
    currentPage = 0;
    updateNav();
}

// KLAVYE YÖN TUŞLARI
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextPage();
    } else if (e.key === 'ArrowLeft') {
        prevPage();
    }
});

// MOBİL PARMAK KAYDIRMA (SWIPE)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; 
    if (touchEndX < touchStartX - swipeThreshold) {
        nextPage(); 
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        prevPage(); 
    }
}

updateNav();