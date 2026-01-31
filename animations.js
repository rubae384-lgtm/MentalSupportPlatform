// animations.js - تأثيرات الحركة والتحريك

// انتظر حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() { // استنى لما الصفحة تجهز بالكامل
    console.log('صفحة التحريك جاهزة'); // اطبع رسالة بالكونسول للتأكيد
    
    initAllAnimations(); // شغّل كل التأثيرات
});

function initAllAnimations() { 
    // التأثيرات الأساسية
    initSmoothScrolling(); // تنقل سلس بين الأقسام
    initNavbarScroll(); // تأثير الـ Navbar عند التمرير
    initCardHoverEffects(); // تأثير البطاقات عند المرور عليها بالماوس
    initScrollToTopButton(); // زر العودة للأعلى
    
    // التأثيرات الاختيارية
    initTypingEffect(); // الكتابة الآلية
    initCounterAnimation(); // العد للأرقام
    initParallaxEffect(); // تأثير Parallax للصورة الرئيسية
}

// 1. التنقل السلس بين الأقسام
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]'); // كل الروابط اللي تبدأ بـ #
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // منع السلوك الافتراضي للروابط
            
            const targetId = this.getAttribute('href'); // احصل على معرف القسم
            if (targetId === '#') return; // لو الرابط مجرد # عدّي
            
            const targetElement = document.querySelector(targetId); // العنصر الهدف
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight; // ارتفاع الهيدر
                const targetPosition = targetElement.offsetTop - headerHeight; // موقع القسم
                
                window.scrollTo({ // نفّذ التمرير السلس
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(targetId); // حدّث الرابط النشط بالـ Navbar
            }
        });
    });
}

// 2. تحديث الروابط النشطة في الـ Navbar
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link'); // كل الروابط بالـ Navbar
    
    navLinks.forEach(link => {
        link.classList.remove('active'); // شيل كل الـ Active
        if (link.getAttribute('href') === activeId) { // الرابط الحالي
            link.classList.add('active'); // اضف Active
        }
    });
}

// 3. تأثير الـ Navbar عند التمرير
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar'); // اختر الـ Navbar
    let lastScrollTop = 0; // لتحديد اتجاه التمرير
    
    window.addEventListener('scroll', function() { // تابع حدث التمرير
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // موقع التمرير الحالي
        
        if (scrollTop > lastScrollTop && scrollTop > 100) { // التمرير للأسفل
            navbar.style.transform = 'translateY(-100%)'; // اخفاء الـ Navbar
        } else { // التمرير للأعلى
            navbar.style.transform = 'translateY(0)'; // اظهار الـ Navbar
        }
        
        if (scrollTop > 50) { // إضافة ظل عند التمرير
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        lastScrollTop = scrollTop; // حفظ آخر موقع تمرير
    });
}

// 4. تأثيرات التمرير على البطاقات
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card'); // كل البطاقات
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() { // عند المرور بالماوس
            this.style.transform = 'translateY(-10px) scale(1.02)'; // رفع البطاقة قليلًا
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)'; // زيادة الظل
        });
        
        card.addEventListener('mouseleave', function() { // عند خروج الماوس
            this.style.transform = 'translateY(0) scale(1)'; // ارجع للوضع الطبيعي
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)'; // ظل طبيعي
        });
    });
}

// 5. زر العودة للأعلى
function initScrollToTopButton() {
    if (!document.getElementById('scrollToTop')) { // لو الزر مش موجود
        const button = document.createElement('button'); // إنشاء زر
        button.id = 'scrollToTop';
        button.className = 'btn btn-primary';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>'; // أيقونة السهم للأعلى
        button.style.cssText = `
            position: fixed; bottom: 30px; left: 30px; width: 50px; height: 50px;
            border-radius: 50%; display: none; z-index: 1000; opacity: 0.8;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(button); // ضعه بالصفحة
        
        button.addEventListener('click', function() { // عند النقر
            window.scrollTo({ top: 0, behavior: 'smooth' }); // عد للأعلى بسلاسة
        });
        
        window.addEventListener('scroll', function() { // إظهار/إخفاء حسب التمرير
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
                setTimeout(() => { button.style.opacity = '1'; }, 100);
            } else {
                button.style.opacity = '0';
                setTimeout(() => { button.style.display = 'none'; }, 300);
            }
        });
    }
}

// 6. تأثير الكتابة الآلي
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text'); // العنصر الهدف
    if (!typingElement) return;
    
    const texts = ["فريق مؤهل", "سرية تامة", "دعم 24/7", "مجاني للأسر المتضررة"]; // النصوص
    let textIndex = 0; // النص الحالي
    let charIndex = 0; // الحرف الحالي
    let isDeleting = false; // هل نحن نمسح؟
    let typingSpeed = 100; // سرعة الكتابة
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) { // إذا نمسح
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else { // إذا نكتب
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) { // انتهينا من الكتابة
            isDeleting = true;
            typingSpeed = 1500; // تأخير قبل المسح
        } else if (isDeleting && charIndex === 0) { // انتهينا من المسح
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // انتقل للنص التالي
            typingSpeed = 500; // تأخير قبل الكتابة
        }
        
        setTimeout(type, typingSpeed); // استدعاء نفسها لتستمر
    }
    
    setTimeout(type, 1000); // بدء التأثير بعد 1 ثانية
}

// 7. تأثير العد للأرقام
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter'); // كل العناصر اللي فيها أرقام
    
    const observer = new IntersectionObserver((entries) => { // لملاحظة ظهور العنصر
        entries.forEach(entry => {
            if (entry.isIntersecting) { // إذا ظهر العنصر
                const counter = entry.target;
                const target = +counter.getAttribute('data-target'); // الرقم المستهدف
                const duration = 2000; // مدة 2 ثانية
                const increment = target / (duration / 16); // مقدار الزيادة كل 16ms
                let current = 0;
                
                const updateCounter = () => {
                    current += increment; 
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString(); // عرض الرقم الحالي
                        setTimeout(updateCounter, 16); // تابع العد
                    } else {
                        counter.textContent = target.toLocaleString(); // عرض الرقم النهائي
                    }
                };
                
                updateCounter(); // ابدأ العد
                observer.unobserve(counter); // لا تتابع العنصر بعد العد
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter)); // راقب كل الأرقام
}

// 8. تأثير Parallax للصورة الرئيسية
function initParallaxEffect() {
    const heroImage = document.getElementById('heroImage'); // الصورة الرئيسية
    if (!heroImage) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5; // تحرك الصورة عكس التمرير
        heroImage.style.transform = `translateY(${rate}px)`; // نفذ الحركة
    });
}

// 9. Fade In للعناصر عند التمرير
function initFadeInOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in'); // كل العناصر المخفية
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // أظهر العنصر
                fadeObserver.unobserve(entry.target); // توقف عن متابعة العنصر
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.classList.add('fade-element'); // أضف صنف التحضير
        fadeObserver.observe(element); // راقب العنصر
    });
}

// CSS إضافي للتأثيرات
const style = document.createElement('style'); // إنشاء عنصر ستايل
style.textContent = `
    .navbar-scrolled {
        background-color: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(10px);
    }
    
    .fade-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-element.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    #scrollToTop:hover {
        opacity: 1 !important;
        transform: scale(1.1);
    }
    
    .card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style); // أضف الستايل للصفحة