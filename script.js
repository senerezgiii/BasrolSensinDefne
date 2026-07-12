let currentPage = 0;
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;
const slider = document.getElementById('book-slider');
const navBar = document.getElementById('nav-bar');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');

function updateSlider() {
    // Kaydırıcıyı ilgili sayfaya it
    slider.style.transform = `translateX(-${currentPage * 100}vw)`;

    // Okunacak bölüm sayfasındaysak navigasyon çubuğunu göster, kapaktaysak gizle
    if (currentPage === 0) {
        navBar.classList.remove('visible');
    } else {
        navBar.classList.add('visible');
        pageIndicator.innerText = `${currentPage} / ${totalPages - 1}`;
    }

    // Geri ve İleri butonlarının durumunu güncelle
    prevBtn.disabled = (currentPage === 1); // 1. bölümde geri tuşunu pasifleştir (kapak sayfasına nav-bardam dönülmesin istersen)
    
    if (currentPage === 0) {
        prevBtn.disabled = false; // Kapaktayken zaten bar gizli
    }

    if (currentPage === totalPages - 1) {
        nextBtn.style.visibility = 'hidden'; // Son sayfada ileri tuşunu gizle
    } else {
        nextBtn.style.visibility = 'visible';
    }
    
    // Geçilen sayfanın kaydırma çubuğunu en başa al
    pages[currentPage].scrollTo(0, 0);
}

function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateSlider();
    }
}

function prevPage() {
    // Sadece bölümler arası geri gitmeye izin ver, kapak sayfasına dönmesin
    if (currentPage > 1) {
        currentPage--;
        updateSlider();
    }
}

// KLAVYE YÖN TUŞLARI DESTEĞİ (Bilgisayardan bakanlar için)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextPage();
    } else if (e.key === 'ArrowLeft') {
        prevPage();
    }
});

// MOBİL PARMAK KAYDIRMA (SWIPE) DESTEĞİ
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
    const swipeThreshold = 50; // Kaydırma hassasiyeti
    if (touchEndX < touchStartX - swipeThreshold) {
        // Sola kaydırma (İleri)
        nextPage();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Sağa kaydırma (Geri)
        prevPage();
    }
}

// Başlangıç durumunu ayarla
updateSlider();