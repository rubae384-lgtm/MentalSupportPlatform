// data.js - بيانات الموقع

// بيانات الخدمات النفسية
const servicesData = [ //  متغير ثابت يحتوي مصفوفة من الكائنات
    {
        id: 1, //رقم تعريف فريد لكل خدمة
        icon: "fas fa-user-md", //ايقونة من مكتبة لعرضها بالموقع
        title: "استشارات فردية",//عنوان الخدمة
        description: "جلسات علاجية فردية مع أخصائيين نفسيين مرخصين عبر الإنترنت",//وصف الخدمة بشكل مختصر
        price: "مجانية للأسر المتضررة",//السعر 
        duration: "60 دقيقة",//مدة الجلسة
        category: "consultation"//نوع الخدمة
    },
    {
        id: 2,
        icon: "fas fa-users",
        title: "جلسات جماعية",
        description: "مجموعات دعم نفسي للتعافي الجماعي وتبادل الخبرات",
        price: "مجانية",
        duration: "90 دقيقة",
        category: "group"
    },
    {
        id: 3,
        icon: "fas fa-home",
        title: "دعم عائلي",
        description: "استشارات عائلية لتحسين التواصل وحل المشكلات الأسرية",
        price: "مجانية",
        duration: "90 دقيقة",
        category: "family"
    },
    {
        id: 4,
        icon: "fas fa-child",
        title: "دعم الأطفال",
        description: "برامج خاصة لدعم الأطفال نفسياً بعد الصدمات",
        price: "مجانية",
        duration: "45 دقيقة",
        category: "children"
    },
    {
        id: 5,
        icon: "fas fa-headset",
        title: "خط الطوارئ",
        description: "دعم نفسي عاجل على مدار الساعة لحالات الأزمات",
        price: "مجاني",
        duration: "حسب الحاجة",
        category: "emergency"
    },
    {
        id: 6,
        icon: "fas fa-book-reader",
        title: "ورش توعوية",
        description: "ورش عمل وأنشطة مجتمعية للتعافي النفسي",
        price: "مجانية",
        duration: "متغيرة",
        category: "workshop"
    }
];

// بيانات المقالات النفسية
const articlesData = [ //متغير ثابت يحتوي على المقالات النفسية
    {
        id: 1, //عنوان فريد لكل مقال
        title: "كيف تتعامل مع نوبات القلق؟", //عنوان المقال
        //محتوى المقال النصي
        content: "القلق هو رد فعل طبيعي للتوتر، ولكن عندما يصبح مفرطاً يمكن أن يؤثر على حياتك اليومية. تعلم تقنيات بسيطة للتعامل مع القلق.",
        category: "anxiety", //تصنيف المقال 
        date: "2024-03-15",//تاريخ نشر المقال
        readTime: "5 دقائق",//الوقت النقدر لقراءة المقال
        
    },
    {
        id: 2,
        title: "علامات الاكتئاب وكيفية التغلب عليه",
        content: "الاكتئاب ليس مجرد حزن عابر، بل هو حالة نفسية تحتاج للعلاج والدعم المناسب. تعرف على العلامات وطرق المواجهة.",
        category: "depression",
        date: "2024-03-10",
        readTime: "7 دقائق",
        image: "assets/images/articles/depression.jpg"
    },
    {
        id: 3,
        title: "التعافي من الصدمات النفسية",
        content: "الصدمات النفسية تؤثر على طريقة تفكيرنا وشعورنا وتصرفاتنا. نصائح عملية للتعافي والتغلب على الآثار.",
        category: "trauma",
        date: "2024-03-05",
        readTime: "8 دقائق",
        image: "assets/images/articles/trauma.jpg"
    },
    {
        id: 4,
        title: "كيف ندعم أطفالنا نفسياً بعد الحروب؟",
        content: "الأطفال هم الأكثر تأثراً بالأحداث الصادمة، ولديهم احتياجات خاصة للتعافي النفسي. دليل عملي للوالدين.",
        category: "children",
        date: "2024-02-28",
        readTime: "6 دقائق",
        image: "assets/images/articles/children.jpg"
    }
];

// بيانات المتخصصين النفسيين
const therapistsData = [
    {
        id: 1,
        name: "د. أحمد سليمان",
        specialization: "طبيب نفسي",
        experience: "15 سنة",
        rating: 4.9,
        sessions: 1200,
        image: "assets/images/therapists/dr-ahmed.jpg",
        bio: "متخصص في علاج الاكتئاب والقلق واضطرابات ما بعد الصدمة"
    },
    {
        id: 2,
        name: "د. فاطمة محمد",
        specialization: "معالجة نفسية",
        experience: "12 سنة",
        rating: 4.8,
        sessions: 950,
        image: "assets/images/therapists/dr-fatima.jpg",
        bio: "متخصصة في العلاج الأسري ودعم الأطفال"
    },
    {
        id: 3,
        name: "أ. خالد أبو زيد",
        specialization: "أخصائي نفسي إكلينيكي",
        experience: "10 سنوات",
        rating: 4.7,
        sessions: 800,
        image: "assets/images/therapists/khaled.jpg",
        bio: "متخصص في العلاج السلوكي المعرفي"
    },
    {
        id: 4,
        name: "د. سمر الحسيني",
        specialization: "طبيبة نفسية",
        experience: "8 سنوات",
        rating: 4.9,
        sessions: 600,
        image: "assets/images/therapists/dr-samar.jpg",
        bio: "متخصصة في الصحة النفسية للمرأة والمراهقين"
    }
];

// بيانات الفيديوهات التعليمية
const videosData = [
    {
        id: 1,
        title: "تمارين الاسترخاء والتأمل",
        duration: "10:25",
        thumbnail: "imges/immg.png",
        source: "video/videoo.mp4",
        category: "meditation",
        views: 1500
    },
    {
        id: 2,
        title: "كيف تتعامل مع الأفكار السلبية؟",
        duration: "15:42",
        thumbnail: "imges/img.png",
        source: "video/asssets.mp4",
        category: "cognitive",
        views: 2300
    },
    {
        id: 3,
        title: "دعم الأطفال بعد الصدمات",
        duration: "18:30",
        thumbnail: "imges/children.png",
        source: "video/assets.mp4",
        category: "children",
        views: 1800
    }
];

// بيانات الأسئلة الشائعة
const faqData = [
    {
        id: 1,
        question: "هل الجلسات النفسية مجانية؟",
        answer: "نعم، جميع الجلسات مجانية للأسر المتضررة من الحروب والأزمات في غزة."
    },
    {
        id: 2,
        question: "كم مدة الجلسة الواحدة؟",
        answer: "تتراوح مدة الجلسة بين 45-60 دقيقة للجلسات الفردية، و90 دقيقة للجلسات الجماعية والعائلية."
    },
    {
        id: 3,
        question: "هل الجلسات سرية؟",
        answer: "نعم، نلتزم بسرية تامة لجميع المعلومات والجلسات، ولا يتم مشاركة أي بيانات مع أطراف ثالثة بدون موافقتك."
    },
    {
        id: 4,
        question: "كيف يمكنني التأكد من مؤهلات المعالجين؟",
        answer: "جميع المعالجين في منصتنا حاصلون على تراخيص مزاولة المهنة وشهادات معتمدة، ويمكنك الاطلاع على مؤهلات كل معالج في صفحته الخاصة."
    },
    {
        id: 5,
        question: "ماذا أفعل في حالة الطوارئ النفسية؟",
        answer: "يمكنك الاتصال بخط الطوارئ النفسي 1234 على مدار الساعة، أو التوجه لأقرب مركز صحي نفسي."
    }
];

// موارد الطوارئ
const emergencyResources = [
    { name: "خط الدعم النفسي السريع", number: "1234", icon: "fas fa-headset" },
    { name: "الدفاع المدني", number: "102", icon: "fas fa-fire-extinguisher" },
    { name: "الإسعاف", number: "101", icon: "fas fa-ambulance" }
];