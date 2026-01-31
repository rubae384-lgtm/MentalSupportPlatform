// main.js - الكود الرئيسي لتشغيل الموقع

// تهيئة الموقع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() { //تشغيل الكود بعد تحميل الصفحة
    console.log('منصة نفسيتي - جاهزة للتشغيل');//طباعة رسالة للتاكد من انو الموقع اشتغل دون اخطاء
    
    // تهيئة جميع الوظائف
    initializeWebsite(); //استدعاء الدالة الي مسؤولة عن تشغيل كل الوظائف
});

function initializeWebsite() { //الدالة الرئيسية لتشغيل الموقع
    // تحميل البيانات الديناميكية
    loadDynamicContent();
    
    // إعداد النماذج والأحداث
    setupFormsAndEvents();
    
    // إعداد الوضع الليلي
    setupDarkMode();
    
    // إعداد السنة الحالية
    setCurrentYear();
    
    // إعداد رسالة الترحيب
    showWelcomeMessage();
}

// 1. تحميل المحتوى الديناميكي
function loadDynamicContent() {
    // تحميل الخدمات
    if (typeof servicesData !== 'undefined') { //بفحص اذا البيانات موجودة ولا لا حتى م يصير خطا
        loadServices(); //تحميل الخدمات
    }
    
    // تحميل المقالات
    if (typeof articlesData !== 'undefined') {//بفحص اذا البيانات موجودة ولا لا حتى م يصير خطا
        loadArticles(); //تحميل المقالات
        setupArticleFilters(); // تجهيز ازرار الفلترة
    }
    
    // تحميل المتخصصين
    if (typeof therapistsData !== 'undefined') {//بفحص اذا البيانات موجودة ولا لا حتى م يصير خطا
        loadTherapists();//تحميل المتخصصين
    }
    
    // تحميل الفيديوهات
    if (typeof videosData !== 'undefined') {//بفحص اذا البيانات موجودة ولا لا حتى م يصير خطا
        loadVideos(); //تحميل الفيديوهات
    }
    
    // تحميل الأسئلة الشائعة
    if (typeof faqData !== 'undefined') {//بفحص اذا البيانات موجودة ولا لا حتى م يصير خطا
        loadFAQ();//تحميل الاسئلة
    }
}

// 2. تحميل الخدمات
function loadServices() { //دالة عرض الخدمات
    const container = document.getElementById('services-container'); //جلب العنصر الي عنحط فيه الخدمات
    if (!container) return; //اذا العنصر مش موجود اطلع من الدالة فوورا
    
    container.innerHTML = '';//تفريغ المحتوى القديم
    
    servicesData.forEach(service => { //لف على كل خدمة داخل السيرفر داتا
        //انشاء كود htmlديناميكي 
        const serviceHTML = ` 
            <div class="col-md-6 col-lg-4 mb-4"> 
                <div class="card h-100 service-card">
                    <div class="card-body text-center">
                        <div class="service-icon mb-3">
                            <i class="${service.icon} fa-3x text-primary"></i>
                        </div>
                        <h4 class="card-title">${service.title}</h4> 
                        <p class="card-text">${service.description}</p> 
                        <div class="service-details mt-3">
                            <span class="badge bg-primary me-2">${service.duration}</span> 
                            <span class="badge bg-success">${service.price}</span> 
                        </div>
                        <button class="btn btn-outline-primary mt-3 book-service-btn" 
                                data-service="${service.title}"> 
                            <i class="fas fa-calendar-plus me-2"></i>احجز الآن
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += serviceHTML; //اضافة الخدمة للصفحة
    });
}

// 3. تحميل المقالات مع الفلترة
function loadArticles(filter = 'all') { //دالة تحميل المقالات تستقبل المتغير القيمة الافترضية اله all
    const container = document.getElementById('articles-container');//جلب العنصر من الصفحة وهو المكان الي رح تنعرض فيه المقالات
    if (!container) return; //فحص اذا العنصر غير موجود اطلع من الدالة منعا للاخطاء
    
    container.innerHTML = ''; //تفريغ المحتوى الحالي حتى لاتتكرر المقاللات عند اعادة التحميل
    
    let filteredArticles = articlesData; //انشاء متغير بالبداية يحتوي كل المقالات
    if (filter !== 'all') { //اذا المستخدم اختار تصنيف مش الكل 
        filteredArticles = articlesData.filter(article => article.category === filter);//فلترة للمقالات بنجيب بس المقالات الي تصنيفها category مساوي للتصنيف المختار
    }
    
    filteredArticles.forEach(article => { //بنلف على كل مقال بعد الفلترة 
        //انشاء html ديناميكي
        const articleHTML = `
            <div class="col-md-6 col-lg-4 mb-4" data-category="${article.category}"> 
                <div class="card h-100 article-card">
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">${article.category === 'anxiety' ? 'القلق' :  //لعرض نوع المقال
                            article.category === 'depression' ? 'الاكتئاب' : 
                            article.category === 'trauma' ? 'الصدمات' : 'دعم الأطفال'}</span>
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.content}</p>
                        <div class="article-meta d-flex justify-content-between mt-3">
                            <small class="text-muted"><i class="far fa-calendar me-1"></i>${article.date}</small>
                            <small class="text-muted"><i class="far fa-clock me-1"></i>${article.readTime}</small>
                        </div>
                        <button class="btn btn-sm btn-outline-primary mt-3 read-more-btn" 
                                data-id="${article.id}">
                            <i class="fas fa-book-open me-1"></i>قراءة المزيد
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += articleHTML;
    });
}

// 4. إعداد فلاتر المقالات
function setupArticleFilters() {
    const filterButtons = document.querySelectorAll('.filter-article');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشاط للزر المختار
            this.classList.add('active');
            
            // تحميل المقالات المفلترة
            const category = this.getAttribute('data-category');
            loadArticles(category);
        });
    });
}

// 5. تحميل المتخصصين
function loadTherapists() {
    const container = document.getElementById('therapists-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    therapistsData.forEach(therapist => {
        const stars = generateStars(therapist.rating);
        
        const therapistHTML = `
            <div class="col-md-6 col-lg-3 mb-4">
                <div class="card h-100 text-center therapist-card">
                    <div class="card-body">
                        <div class="therapist-img-container mb-3">
                            <div class="therapist-img-placeholder">
                                <i class="fas fa-user-md fa-4x text-primary"></i>
                            </div>
                        </div>
                        <h5 class="card-title">${therapist.name}</h5>
                        <p class="text-primary fw-semibold">${therapist.specialization}</p>
                        <p class="card-text small">${therapist.bio}</p>
                        <div class="therapist-info mt-3">
                            <div class="rating mb-2">
                                ${stars}
                                <span class="text-muted ms-1">(${therapist.rating})</span>
                            </div>
                            <div class="therapist-stats d-flex justify-content-around">
                                <span class="text-muted small">
                                    <i class="fas fa-briefcase me-1"></i>${therapist.experience}
                                </span>
                                <span class="text-muted small">
                                    <i class="fas fa-users me-1"></i>${therapist.sessions}+
                                </span>
                            </div>
                        </div>
                        <button class="btn btn-primary mt-3 book-therapist-btn" 
                                data-therapist="${therapist.name}">
                            <i class="fas fa-calendar-alt me-2"></i>حجز موعد
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += therapistHTML;
    });
}

// 6. توليد النجوم للتقييم
function generateStars(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += '<i class="fas fa-star text-warning"></i>';
        } else if (i === fullStars && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt text-warning"></i>';
        } else {
            starsHTML += '<i class="far fa-star text-warning"></i>';
        }
    }
    
    return starsHTML;
}

// 7. تحميل الفيديوهات
function loadVideos() {
    const playlist = document.getElementById('video-playlist');
    if (!playlist) return;
    
    playlist.innerHTML = '';
    
    videosData.forEach(video => {
        const videoHTML = `
<div class="col-md-6 col-lg-4 mb-4">
                <div class="card video-card" data-video="${video.source}">
                    <div class="video-thumbnail position-relative">
                        <img src="${video.thumbnail}"
                        class="video-thumbnail-img w-100" alt="${video.title}"
                             style="height: 200px; object-fit:cover;">
                        <div class="play-icon-overlay position-absolute top-50 start-50 translate-middle">
                            <i class="fas fa-play-circle fa-3x text-white opacity-75"></i>
                        </div>
                            <i class="fas fa-play-circle fa-3x text-primary"></i>
                        </div>
                        <div class="video-duration position-absolute bottom-0 start-0 m-2">
                            <span class="badge bg-dark">${video.duration}</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title">${video.title}</h6>
                        <div class="video-meta d-flex justify-content-between">
                            <small class="text-muted">
                                <i class="fas fa-eye me-1"></i>${video.views.toLocaleString()}
                            </small>
                            <small class="text-muted">${video.category}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        playlist.innerHTML += videoHTML;
    });
    
    // إضافة أحداث النقر على الفيديوهات
    setupVideoPlaylist();
}

// 8. إعداد تشغيل الفيديوهات
function setupVideoPlaylist() {
    const videoCards = document.querySelectorAll('.video-card');
    const mainVideo = document.getElementById('mainVideo');
    
    if (!mainVideo) return;
    
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoSource = this.getAttribute('data-video');
            
            // تحديث مصدر الفيديو الرئيسي
            mainVideo.querySelector('source').src = videoSource;
            mainVideo.load();
            
            // تحديث الفيديو النشط
            videoCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // تشغيل الفيديو
            mainVideo.play().catch(e => console.log('حدث خطأ في تشغيل الفيديو:', e));
        });
    });
}

// 9. تحميل الأسئلة الشائعة
function loadFAQ() {
    const accordion = document.getElementById('faqAccordion');
    if (!accordion) return;
    
    accordion.innerHTML = '';
    
    faqData.forEach((faq, index) => {
        const faqHTML = `
            <div class="accordion-item">
                <h2 class="accordion-header" id="faqHeading${faq.id}">
                    <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#faqCollapse${faq.id}"
                            aria-expanded="${index === 0 ? 'true' : 'false'}"
                            aria-controls="faqCollapse${faq.id}">
                        ${faq.question}
                    </button>
                </h2>
                <div id="faqCollapse${faq.id}" 
                     class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
                     aria-labelledby="faqHeading${faq.id}"
                     data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        ${faq.answer}
                    </div>
                </div>
            </div>
        `;
        accordion.innerHTML += faqHTML;
    });
}

// 10. إعداد النماذج والأحداث
function setupFormsAndEvents() {
    // نموذج الحجز
    const sessionForm = document.getElementById('sessionForm');
    if (sessionForm) {
        sessionForm.addEventListener('submit', handleFormSubmit);
    }
    
    // أزرار الحجز من الخدمات
    document.addEventListener('click', function(e) {
        if (e.target.closest('.book-service-btn')) {
            const service = e.target.closest('.book-service-btn').getAttribute('data-service');
            handleServiceBooking(service);
        }
        
        if (e.target.closest('.book-therapist-btn')) {
            const therapist = e.target.closest('.book-therapist-btn').getAttribute('data-therapist');
            handleTherapistBooking(therapist);
        }
        
        if (e.target.closest('.read-more-btn')) {
            const articleId = e.target.closest('.read-more-btn').getAttribute('data-id');
            showArticleDetails(articleId);
        }
    });
    
    // التحقق من النموذج
    setupFormValidation();
}

// 11. معالجة إرسال النموذج
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        sessionType: document.getElementById('sessionType').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // التحقق من البيانات
    if (!formData.name || !formData.phone || !formData.sessionType) {
        showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // التحقق من الموافقة على الشروط
    if (!document.getElementById('agreeTerms').checked) {
        showAlert('يجب الموافقة على شروط الخصوصية والاستخدام', 'error');
        return;
    }
    
    // عرض حالة التحميل
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري الإرسال...';
    submitBtn.disabled = true;
    
    // محاكاة إرسال البيانات (في الواقع ستكون طلب AJAX)
    setTimeout(() => {
        // حفظ البيانات في localStorage (مؤقت)
        saveAppointment(formData);
        
        // عرض رسالة النجاح
        showAlert(`شكراً ${formData.name}! تم استلام طلبك بنجاح. سنتواصل معك خلال 24 ساعة على الرقم ${formData.phone}.`, 'success');
        
        // إعادة تعيين النموذج
        form.reset();
        form.classList.remove('was-validated');
        
        // استعادة الزر
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // تحديث الإحصائيات
        updateAppointmentStats();
    }, 2000);
}

// 12. حفظ الموعد
function saveAppointment(appointment) {
    let appointments = JSON.parse(localStorage.getItem('nafsyati_appointments') || '[]');
    appointment.id = Date.now();
    appointment.status = 'pending';
    appointments.push(appointment);
    localStorage.setItem('nafsyati_appointments', JSON.stringify(appointments));
}

// 13. تحديث إحصائيات المواعيد
function updateAppointmentStats() {
    const appointments = JSON.parse(localStorage.getItem('nafsyati_appointments') || '[]');
    console.log(`إجمالي المواعيد المحفوظة: ${appointments.length}`);
}

// 14. معالجة حجز الخدمة
function handleServiceBooking(service) {
    // تعيين نوع الخدمة في النموذج
    const sessionType = document.getElementById('sessionType');
    if (sessionType) {
        sessionType.value = service;
    }
    
    // التمرير لنموذج الاتصال
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const contactPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: contactPosition,
            behavior: 'smooth'
        });
    }
    
    // عرض رسالة تأكيد
    showAlert(`تم اختيار خدمة: ${service}. يرجى إكمال بيانات الحجز.`, 'info');
}

// 15. معالجة حجز المعالج
function handleTherapistBooking(therapist) {
    showAlert(`سيتم تخصيص ${therapist} لخدمتك. يرجى إكمال بيانات الحجز.`, 'info');
    
    // التركيز على حقل الاسم
    const nameField = document.getElementById('fullName');
    if (nameField) {
        nameField.focus();
    }
}

// 16. عرض تفاصيل المقال
function showArticleDetails(articleId) {
    const article = articlesData.find(a => a.id == articleId);
    if (!article) return;
    
    // إنشاء مودل لعرض المقال
    const modalHTML = `
        <div class="modal fade" id="articleModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${article.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="article-category mb-3">
                            <span class="badge bg-primary">${article.category === 'anxiety' ? 'القلق' : 
                                article.category === 'depression' ? 'الاكتئاب' : 
                                article.category === 'trauma' ? 'الصدمات' : 'دعم الأطفال'}</span>
                        </div>
                        <div class="article-content">
                            <p>${article.content}</p>
                            <p>هذا هو محتوى المقال الكامل الذي يوفر معلومات قيمة ودعم نفسي للمحتاجين.</p>
                        </div>
                        <div class="article-footer mt-4">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <small class="text-muted">
                                        <i class="far fa-calendar me-1"></i>${article.date}
                                    </small>
                                </div>
                                <div>
                                    <small class="text-muted">
                                        <i class="far fa-clock me-1"></i>${article.readTime}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
                        <button type="button" class="btn btn-primary" id="shareArticleBtn">
                            <i class="fas fa-share-alt me-2"></i>مشاركة
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة المودل للصفحة
    const existingModal = document.getElementById('articleModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // فتح المودل
    const modal = new bootstrap.Modal(document.getElementById('articleModal'));
    modal.show();
    
    // إعداد زر المشاركة
    document.getElementById('shareArticleBtn').addEventListener('click', function() {
        shareArticle(article);
    });
}

// 17. مشاركة المقال
function shareArticle(article) {
    const shareText = `اقرأ هذا المقال: ${article.title} - منصة نفسيتي للدعم النفسي`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: article.title,
            text: article.content.substring(0, 100) + '...',
            url: shareUrl
        }).catch(err => {
            console.log('مشاركة غير مدعومة:', err);
            copyToClipboard(`${shareText}\n${shareUrl}`);
        });
    } else {
        copyToClipboard(`${shareText}\n${shareUrl}`);
    }
}

// 18. نسخ النص للحافظة
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showAlert('تم نسخ الرابط للمشاركة', 'success');
    }).catch(err => {
        console.log('فشل في النسخ:', err);
        showAlert('فشل في المشاركة', 'error');
    });
}

// 19. إعداد الوضع الليلي
function setupDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    // التحقق من الإعداد السابق
    const savedTheme = localStorage.getItem('nafsyati_theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // حدث تغيير الوضع
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // تغيير للوضع الفاتح
            document.body.removeAttribute('data-theme');
            localStorage.setItem('nafsyati_theme', 'light');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            // تغيير للوضع الداكن
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('nafsyati_theme', 'dark');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// 20. إعداد السنة الحالية
function setCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// 21. عرض رسالة ترحيب
function showWelcomeMessage() {
    // التحقق من أول زيارة
    if (!localStorage.getItem('nafsyati_welcome_shown')) {
        setTimeout(() => {
            showAlert('مرحباً بك في منصة نفسيتي للدعم النفسي والاجتماعي', 'info');
            localStorage.setItem('nafsyati_welcome_shown', 'true');
        }, 1000);
    }
}

// 22. عرض الإشعارات
function showAlert(message, type = 'info') {
    const alertClass = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    }[type] || 'alert-info';
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(alertDiv);
    
    // إزالة الإشعار بعد 5 ثوانٍ
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.classList.remove('show');
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 300);
        }
    }, 5000);
}

// 23. إعداد التحقق من النموذج
function setupFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });
}

// 24. دعم المتصفحات القديمة
function checkBrowserCompatibility() {
    // التحقق من دعم localStorage
    if (!window.localStorage) {
        console.warn('localStorage غير مدعوم في هذا المتصفح');
    }
    
    // التحقق من دعم Intersection Observer
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver غير مدعوم في هذا المتصفح');
    }
}

// التحقق من التوافق عند التحميل
checkBrowserCompatibility();