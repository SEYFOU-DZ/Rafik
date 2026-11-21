// Mock data for رفيقك الذكي platform

export const SPECIALISTS = [
  {
    id: "spec-1",
    name: "د. أمال بوعلام",
    title: "أخصائية نفسية إكلينيكية",
    email: "amal@rafiq.dz",
    password: "specialist123",
    avatar: "/avatars/amal.jpg",
    initials: "أب",
    specialty: ["قلق", "اكتئاب", "علاج معرفي سلوكي"],
    city: "الجزائر العاصمة",
    wilaya: "الجزائر",
    experience: 12,
    rating: 4.9,
    reviewsCount: 127,
    price: 3000,
    currency: "دج",
    languages: ["العربية", "الفرنسية"],
    bio: "أخصائية نفسية إكلينيكية معتمدة بخبرة 12 سنة في علاج اضطرابات القلق والاكتئاب وصعوبات العلاقات. حاصلة على شهادة الدكتوراه في علم النفس الإكلينيكي من جامعة الجزائر.",
    education: "دكتوراه في علم النفس الإكلينيكي - جامعة الجزائر",
    availableDays: ["الاثنين", "الثلاثاء", "الخميس"],
    availableHours: "09:00 - 17:00",
    isOnline: true,
    sessionsCount: 843,
    nextAvailable: "غداً",
    appointments: [
      { patientId: "pat-1", patientName: "أحمد بن علي", date: "2026-08-12", time: "10:00", status: "pending" },
      { patientId: "pat-2", patientName: "فاطمة سعيدي", date: "2026-08-13", time: "14:00", status: "confirmed" },
    ]
  },
  {
    id: "spec-2",
    name: "د. كريم مزيان",
    title: "معالج نفسي وأخصائي وسواس قهري",
    email: "karim@rafiq.dz",
    password: "specialist123",
    avatar: "/avatars/karim.jpg",
    initials: "كم",
    specialty: ["وسواس قهري", "رهاب اجتماعي", "اضطراب ما بعد الصدمة"],
    city: "وهران",
    wilaya: "وهران",
    experience: 8,
    rating: 4.8,
    reviewsCount: 89,
    price: 2500,
    currency: "دج",
    languages: ["العربية", "الفرنسية", "الإنجليزية"],
    bio: "متخصص في علاج الوسواس القهري وتطبيق بروتوكولات ERP (التعرض ومنع الاستجابة). حاصل على شهادة الدكتوراه من جامعة وهران بتخصص اضطرابات القلق.",
    education: "دكتوراه في علم النفس - جامعة وهران",
    availableDays: ["الثلاثاء", "الأربعاء", "السبت"],
    availableHours: "10:00 - 18:00",
    isOnline: false,
    sessionsCount: 561,
    nextAvailable: "الثلاثاء القادم",
    appointments: [
      { patientId: "pat-3", patientName: "زينب مولود", date: "2026-08-15", time: "11:00", status: "pending" },
    ]
  },
  {
    id: "spec-3",
    name: "د. سارة حمزة",
    title: "معالجة نفسية للأطفال والمراهقين",
    email: "sara@rafiq.dz",
    password: "specialist123",
    avatar: "/avatars/sara.jpg",
    initials: "سح",
    specialty: ["اضطرابات الطفولة", "تأخر الكلام", "فرط الحركة ADHD"],
    city: "قسنطينة",
    wilaya: "قسنطينة",
    experience: 6,
    rating: 4.95,
    reviewsCount: 203,
    price: 2800,
    currency: "دج",
    languages: ["العربية", "الفرنسية"],
    bio: "متخصصة في الصحة النفسية للأطفال والمراهقين. تستخدم أساليب العلاج باللعب والعلاج الفني لمساعدة الأطفال على التعبير عن مشاعرهم بطريقة آمنة.",
    education: "ماجستير في علم نفس الأطفال - جامعة قسنطينة",
    availableDays: ["الاثنين", "الأربعاء", "الجمعة"],
    availableHours: "08:00 - 16:00",
    isOnline: true,
    sessionsCount: 1024,
    nextAvailable: "اليوم - 3 مواعيد متاحة",
    appointments: []
  },
  {
    id: "spec-4",
    name: "د. يوسف بلعيد",
    title: "أخصائي نفسي وإرشاد أسري",
    email: "youcef@rafiq.dz",
    password: "specialist123",
    avatar: "/avatars/youcef.jpg",
    initials: "يب",
    specialty: ["إرشاد أسري", "مشاكل الزواج", "إدارة الغضب"],
    city: "عنابة",
    wilaya: "عنابة",
    experience: 15,
    rating: 4.7,
    reviewsCount: 156,
    price: 3500,
    currency: "دج",
    languages: ["العربية", "الفرنسية"],
    bio: "خبير في الإرشاد الأسري وعلاج مشكلات العلاقات الزوجية. يعمل مع الأفراد والأزواج والعائلات لتحسين جودة التواصل وحل النزاعات.",
    education: "دكتوراه في الإرشاد النفسي - جامعة عنابة",
    availableDays: ["الاثنين", "الثلاثاء", "الخميس", "السبت"],
    availableHours: "11:00 - 19:00",
    isOnline: false,
    sessionsCount: 1287,
    nextAvailable: "الأسبوع القادم",
    appointments: []
  },
  {
    id: "spec-5",
    name: "د. نور الهدى قاسمي",
    title: "أخصائية نفسية سريرية",
    email: "nour@rafiq.dz",
    password: "specialist123",
    avatar: "/avatars/nour.jpg",
    initials: "نق",
    specialty: ["اكتئاب", "صدمات نفسية", "اضطرابات النوم"],
    city: "البليدة",
    wilaya: "البليدة",
    experience: 9,
    rating: 4.85,
    reviewsCount: 94,
    price: 2700,
    currency: "دج",
    languages: ["العربية"],
    bio: "متخصصة في علاج الاكتئاب والصدمات النفسية باستخدام أحدث الأساليب العلاجية. تؤمن بأن كل شخص لديه القدرة على التعافي والازدهار.",
    education: "دكتوراه في علم النفس الإكلينيكي - جامعة البليدة",
    availableDays: ["الاثنين", "الأربعاء", "الجمعة"],
    availableHours: "09:00 - 17:00",
    isOnline: true,
    sessionsCount: 628,
    nextAvailable: "بعد غد",
    appointments: []
  },
];

export const PATIENTS = [
  {
    id: "pat-1",
    name: "أحمد بن علي",
    email: "ahmed@test.dz",
    password: "patient123",
    age: 28,
    gender: "ذكر",
    city: "الجزائر العاصمة",
    phone: "0555 123 456",
    assessmentDone: true,
    assessmentResult: { anxiety: 14, depression: 8, dominant: "anxiety" },
    purchasedBoxes: ["box-anxiety"],
    bookedAppointments: [
      { specialistId: "spec-1", specialistName: "د. أمال بوعلام", date: "2026-08-12", time: "10:00", status: "pending" }
    ]
  },
  {
    id: "pat-2",
    name: "فاطمة سعيدي",
    email: "fatima@test.dz",
    password: "patient123",
    age: 34,
    gender: "أنثى",
    city: "وهران",
    phone: "0661 234 567",
    assessmentDone: true,
    assessmentResult: { anxiety: 7, depression: 17, dominant: "depression" },
    purchasedBoxes: ["box-depression"],
    bookedAppointments: [
      { specialistId: "spec-1", specialistName: "د. أمال بوعلام", date: "2026-08-13", time: "14:00", status: "confirmed" }
    ]
  },
  {
    id: "pat-3",
    name: "زينب مولود",
    email: "zineb@test.dz",
    password: "patient123",
    age: 22,
    gender: "أنثى",
    city: "وهران",
    phone: "0770 345 678",
    assessmentDone: false,
    assessmentResult: null,
    purchasedBoxes: [],
    bookedAppointments: [
      { specialistId: "spec-2", specialistName: "د. كريم مزيان", date: "2026-08-15", time: "11:00", status: "pending" }
    ]
  },
];

export const BOXES = [
  {
    id: "box-anxiety",
    name: "صندوق القلق",
    nameEn: "Anxiety Relief Kit",
    emoji: "🔵",
    price: 3500,
    currency: "دج",
    color: "#4A8BB5",
    colorLight: "rgba(74, 139, 181, 0.1)",
    gradient: "linear-gradient(135deg, #2D5F7E, #4A8BB5)",
    description: "حقيبة علاجية متكاملة للتعامل مع القلق ونوبات الهلع، تضم أدلة علمية وكتيبات استرشادية وبطاقات تقنيات عملية معتمدة.",
    shortDesc: "أدوات وبروتوكولات علاجية لمواجهة القلق والهلع",
    targetSymptoms: ["قلق عام", "نوبات هلع", "توتر مزمن", "تسارع ضربات القلب", "أفكار مقلقة"],
    rating: 4.9,
    purchasesCount: 342,
    patientContent: {
      booklets: [
        { id: "b1", title: "دليل التعافي المتكامل من القلق والهلع", subtitle: "رحلة الفهم والسيطرة والعلاج السلوكي", file: "/books/anxiety-recovery-guide.pdf", type: "pdf", pages: 8 },
        { id: "b2", title: "الاستشارة النفسية والطبية لاضطراب القلق العام", subtitle: "التقييم العيادي الأولي وخارطة الطريق", file: "/books/anxiety-specialized-consultation.pdf", type: "pdf", pages: 10 },
        { id: "b3", title: "دليل الاستغاثة النفسية وخطة الطوارئ", subtitle: "إرشادات فورية للتعامل مع نوبات الهلع الحادة", file: "/books/anxiety-emergency-protocol.pdf", type: "pdf", pages: 3 },
        { id: "b4", title: "مهمة ترويض تنين الأميغدالا", subtitle: "دليل الأكاديمية العصبية لمواجهة مشاعر الخوف", file: "/books/amygdala-taming-guide.pdf", type: "pdf", pages: 10 },
        { id: "b5", title: "ملحمة استعادة القلعة: الخروج من الضباب", subtitle: "إعادة بناء التوازن النفسي خطوة بخطوة", file: "/books/castle-recovery-epic.pdf", type: "pdf", pages: 10 },
        { id: "b6", title: "ملحمة استعادة القلعة: كراس التدريبات", subtitle: "تطبيقات وتمارين سلوكية عملية", file: "/books/castle-recovery-workbook.pdf", type: "pdf", pages: 5 },
      ],
      cards: [
        {
          id: "c-breath-belly",
          type: "technique",
          title: "التنفس البطني",
          subtitle: "توسيع البطن للتهدئة الفورية",
          image: "/cards/card-belly-breathing.jpg",
          color: "#E8A87C",
          badge: "بطاقة مساعدة",
          content: "1. يد على البطن\n2. شهيق ببطء (توسع البطن)\n3. حبس لحظة\n4. زفير ببطء\n\nاشعر بالهدوء والاتزان."
        },
        {
          id: "c-breath-878",
          type: "technique",
          title: "تقنية التنفس 8-7-8",
          subtitle: "إعادة ضبط إيقاع الجهاز العصبي",
          image: "/cards/card-breathing-878.jpg",
          color: "#4A8BB5",
          badge: "بطاقة مساعدة",
          content: "• شهيق: 4 ثوانٍ\n• حبس: 7 ثوانٍ\n• زفير: 8 ثوانٍ\n\nكرر الدورة 4 مرات ليهدأ عقلك."
        },
        {
          id: "c-challenge-thoughts",
          type: "technique",
          title: "تحدي الأفكار التلقائية",
          subtitle: "أفكارك ليست دائماً حقيقة",
          image: "/cards/card-challenge-thoughts.jpg",
          color: "#7FB285",
          badge: "بطاقة مساعدة",
          content: "1. حدد الفكرة المقلقة\n2. اسأل: هل هي حقيقة؟\n3. ما هو البديل العقلاني؟\n\nأفكارك ليست دائماً حقيقة."
        },
        {
          id: "c-grounding-54321",
          type: "technique",
          title: "تقنية التأريض 5-4-3-2-1",
          subtitle: "عُد إلى الحاضر في لحظة",
          image: "/cards/card-grounding-54321.jpg",
          color: "#2D5F7E",
          badge: "بطاقة مساعدة",
          content: "• 5 أشياء تراها\n• 4 أشياء تلمسها\n• 3 أصوات تسمعها\n• 2 روائح تشمها\n• 1 طعم تذوقه\n\nعُد إلى الحاضر في لحظة."
        }
      ],
      worksheets: [
        {
          id: "w1",
          title: "ورقة تفكيك فكرة القلق",
          description: "اكتب الفكرة المقلقة وتحداها بأسئلة الفحص العقلاني",
          fields: ["الفكرة المقلقة", "ما مدى واقعيتها؟", "الدليل المنطقي المعاكس", "الفكرة البديلة المتزنة"]
        }
      ]
    },
    specialistContent: {
      booklets: [
        { id: "sb1", title: "دليل التعافي المتكامل من القلق والهلع", subtitle: "رحلة الفهم والسيطرة والعلاج السلوكي", file: "/books/anxiety-recovery-guide.pdf", type: "pdf", pages: 8 },
        { id: "sb2", title: "الاستشارة النفسية والطبية لاضطراب القلق العام", subtitle: "التقييم العيادي الأولي وخارطة الطريق", file: "/books/anxiety-specialized-consultation.pdf", type: "pdf", pages: 10 },
        { id: "sb3", title: "دليل الاستغاثة النفسية وخطة الطوارئ", subtitle: "إرشادات فورية للتعامل مع نوبات الهلع الحادة", file: "/books/anxiety-emergency-protocol.pdf", type: "pdf", pages: 3 },
        { id: "sb4", title: "مهمة ترويض تنين الأميغدالا", subtitle: "دليل الأكاديمية العصبية لمواجهة مشاعر الخوف", file: "/books/amygdala-taming-guide.pdf", type: "pdf", pages: 10 },
        { id: "sb5", title: "ملحمة استعادة القلعة: الخروج من الضباب", subtitle: "إعادة بناء التوازن النفسي خطوة بخطوة", file: "/books/castle-recovery-epic.pdf", type: "pdf", pages: 10 },
        { id: "sb6", title: "ملحمة استعادة القلعة: كراس التدريبات", subtitle: "تطبيقات وتمارين سلوكية عملية", file: "/books/castle-recovery-workbook.pdf", type: "pdf", pages: 5 },
      ],
      clinicalScales: [
        { id: "cs1", title: "مقياس اضطراب القلق العام (GAD-7)", subtitle: "Generalized Anxiety Disorder-7 المعتمد دولياً", file: "/measurements/gad7-anxiety-scale.pdf", pages: 1, type: "pdf" },
        { id: "cs2", title: "مقياس هاملتون لتقدير القلق (HARS)", subtitle: "Hamilton Anxiety Rating Scale لتقييم الأعراض الجسدية والنفسية", file: "/measurements/hamilton-anxiety-scale.pdf", pages: 2, type: "pdf" },
        { id: "cs3", title: "مقياس الاكتئاب والقلق والضغوط (Arabic DASS-21)", subtitle: "النسخة العربية المعتمدة ثلاثية المحاور", file: "/measurements/arabic-dass21.pdf", pages: 2, type: "pdf" },
        { id: "cs4", title: "استمارة تطبيق مقياس DASS-21", subtitle: "نموذج الإجابة العيادية المباشرة", file: "/measurements/dass21-response-form.pdf", pages: 1, type: "pdf" },
        { id: "cs5", title: "سلم استراتيجيات المواجهة (Lazarus & Folkman)", subtitle: "استراتيجيات التكيف مع الضغوط والأزمات", file: "/measurements/lazarus-folkman-coping.pdf", pages: 3, type: "pdf" }
      ],
      assessments: [
        {
          id: "gad7",
          name: "مقياس القلق العام (GAD-7)",
          description: "الاستبيان المعتمد عالمياً لقياس مستوى القلق",
          questions: [
            "هل تلاحقك العصبية والشد العصبي؟",
            "هل تجد صعوبة في إيقاف فكرة قلقة؟",
            "هل تقلق بشأن أشياء كثيرة في وقت واحد؟",
            "هل تجد صعوبة في الجلوس براحة؟",
            "هل تشعر بتململ وعدم استقرار حركي؟",
            "هل تثار وتغضب بسرعة؟",
            "هل ينتابك خوف مفاجئ كأن شيئاً سيئاً سيحدث؟"
          ],
          scoring: { min: 5, mild: 10, moderate: 15, severe: 21 }
        }
      ],
      protocols: [
        { id: "p1", title: "بروتوكول CBT للقلق", content: "خطة جلسات العلاج المعرفي السلوكي للقلق..." },
        { id: "p2", title: "مخطط دائرة القلق البصري", content: "شرح كيف تتشابك الأفكار مع المشاعر والأعراض..." },
      ]
    }
  },
  {
    id: "box-ocd",
    name: "صندوق الوسواس القهري",
    nameEn: "OCD Management Kit",
    emoji: "🟢",
    price: 1200,
    currency: "دج",
    color: "#7FB285",
    colorLight: "rgba(127, 178, 133, 0.1)",
    gradient: "linear-gradient(135deg, #4a7d50, #7FB285)",
    description: "حزمة متكاملة لإدارة الوسواس القهري تساعدك على فهم الطقوس القهرية ومواجهتها بأدوات علمية مثبتة.",
    shortDesc: "أدوات علاجية لمواجهة الوسواس القهري",
    targetSymptoms: ["أفكار وسواسية", "طقوس قهرية", "التحقق المتكرر", "الخوف من الأذى"],
    rating: 4.7,
    purchasesCount: 156,
    patientContent: {
      booklets: [],
      cards: [
        {
          id: "oc1",
          type: "info",
          title: "ما هو الوسواس القهري؟ 🧠",
          color: "#7FB285",
          content: "الوسواس القهري له جزءان:\n\n🔄 الأفكار الوسواسية (Obsessions): أفكار دخيلة غير مرغوبة تتكرر وتسبب القلق\n\n⚡ السلوكيات القهرية (Compulsions): أفعال تكررها لتخفيف القلق مؤقتاً\n\nالفخ: كلما نفذت السلوك القهري، كلما تقوّت الحلقة!\nالحل: مواجهة الفكرة دون تنفيذ السلوك",
          badge: "فهم المرض"
        },
        {
          id: "oc2",
          type: "technique",
          title: "بطاقات مواجهة الوسواس 💪",
          color: "#4A8BB5",
          content: '"هذه مجرد فكرة وسواسية ولن تؤذيني"\n\n"أنا لست مضطراً للاستجابة لهذه الفكرة"\n\n"سأتحمل عدم اليقين لدقيقة واحدة"\n\n"القلق يخف بدون تنفيذ الطقس"\n\n"الفكرة ليست خطراً حقيقياً"',
          badge: "مواجهة"
        },
        {
          id: "oc3",
          type: "technique",
          title: "تأجيل الطقس (تقنية ERP) ⏱️",
          color: "#E8A87C",
          content: "خطوات تأجيل السلوك القهري:\n\n1. لاحظ الفكرة الوسواسية بدون حكم\n2. اضبط مؤقتاً لـ 5 دقائق\n3. خلال الانتظار، افعل شيئاً آخر\n4. بعد 5 دقائق، مدد لـ 10 دقائق\n5. الهدف: تعلم أن القلق يخف لوحده!\n\nكل مرة تؤجل فيها، تضعف الحلقة القهرية",
          badge: "تقنية ERP"
        },
        {
          id: "oc4",
          type: "affirmation",
          title: "سجل تتبع الطقوس 📓",
          color: "#2D5F7E",
          content: "دوّن كل يوم:\n\n⏰ وقت حدوث الطقس\n🔢 عدد مرات التكرار\n⬇️ هل حاولت التأجيل؟\n✅ هل نجحت في التأجيل؟\n\nالتتبع يساعدك على رؤية تقدمك ويعطيك قوة على الوسواس",
          badge: "تتبع التقدم"
        },
      ],
      worksheets: []
    },
    specialistContent: {
      booklets: [],
      assessments: [
        {
          id: "ybocs",
          name: "مقياس ييل-براون للوسواس (Y-BOCS)",
          description: "الاستبيان المعتمد عالمياً لقياس شدة الوسواس القهري",
          questions: [
            "كم من وقتك تستغرق الأفكار الوسواسية؟",
            "كيف يؤثر الوسواس على حياتك اليومية؟",
            "ما مدى انزعاجك من الأفكار الوسواسية؟",
            "كيف تقاوم الأفكار الوسواسية؟",
            "كيف تتحكم في أفكارك الوسواسية؟",
            "كم وقتاً تقضي في الطقوس القهرية؟",
            "كيف تؤثر الطقوس على حياتك؟",
            "كيف تشعر إذا لم تنفذ الطقوس؟",
            "هل تقاوم الطقوس القهرية؟",
            "كيف تتحكم في الطقوس القهرية؟"
          ],
          scoring: { min: 8, mild: 16, moderate: 24, severe: 40 }
        }
      ],
      protocols: [
        { id: "erp1", title: "دليل بروتوكول ERP", content: "خطوات تطبيق التعرض ومنع الاستجابة..." },
        { id: "erp2", title: "نموذج هرم التعرض", content: "قائمة الخاوف مرتبة من الأسهل للأصعب..." },
      ]
    }
  },
  {
    id: "box-depression",
    name: "صندوق الاكتئاب",
    nameEn: "Depression & Activation Kit",
    emoji: "🟠",
    price: 1500,
    currency: "دج",
    color: "#E8A87C",
    colorLight: "rgba(232, 168, 124, 0.1)",
    gradient: "linear-gradient(135deg, #b5673a, #E8A87C)",
    description: "حزمة التنشيط السلوكي لمساعدتك على كسر دائرة الاكتئاب والعودة لحياتك بخطوات صغيرة وممنهجة.",
    shortDesc: "أدوات علاجية لمواجهة الاكتئاب",
    targetSymptoms: ["حزن مستمر", "فقدان الاهتمام", "إرهاق", "عزلة اجتماعية"],
    rating: 4.9,
    purchasesCount: 198,
    patientContent: {
      booklets: [
        { id: "db1", title: 'دليل رحلة التعافي من الاكتئاب', subtitle: 'ملحمة استعادة القلعة', file: "/pdfs/\u0645\u0644\u062d\u0645\u0629 \u0627\u0633\u062a\u0639\u0627\u062f\u0629 \u0627\u0644\u0642\u0644\u0639\u0629_ \u0627\u0644\u062e\u0631\u0648\u062c \u0645\u0646 \u0627\u0644\u0636\u0628\u0627\u0628.pdf", type: "pdf", pages: 80 },
        { id: "db2", title: 'دليل الاكتئاب - 10 صفحات', subtitle: 'دليل مختصر', file: "/pdfs/depression_10_pages_guide.pdf", type: "pdf", pages: 10 },
        { id: "db3", title: 'الدليل الشامل للاكتئاب', subtitle: 'فهم المرض والعلاج', file: "/pdfs/depression_comprehensive_guide.pdf", type: "pdf", pages: 10 },
        { id: "db4", title: 'دليل الاستشارة الطبية للاكتئاب', subtitle: 'للمراجعة مع الطبيب', file: "/pdfs/depression_medical_consultation.pdf", type: "pdf", pages: 10 },
      ],
      cards: [
        {
          id: "dc1",
          type: "info",
          title: "لماذا تشعر أنك 'بطارية فارغة'؟ 🔋",
          color: "#E8A87C",
          content: "عقلك يحتوي على خزانين:\n\n☀️ السيروتونين: مسؤول عن المزاج والسعادة\n⚡ الدوبامين: مسؤول عن الشغف والحركة\n\nالاكتئاب يفرغ الخزانين!\n\nفخ الاكتئاب: 'لا تتحرك حتى تشعر بالرغبة أولاً'\nالحقيقة: الحركة هي التي تولّد الشغف وليس العكس!\n\nالعلاج: ابدأ بأصغر خطوة ممكنة",
          badge: "علم الدماغ"
        },
        {
          id: "dc2",
          type: "technique",
          title: "خدعة الخطوات الميكروسكوبية 🔬",
          color: "#7FB285",
          content: "الاكتئاب يجعل أبسط مهمة تبدو كجبل!\n\n❌ لا تقل: 'سأنظف الغرفة'\n✅ قل: 'سأرفع جورباً واحداً فقط ثم أعود للسرير'\n\nبمجرد رفع الجورب، يفرز دماغك جرعة دوبامين صغيرة تعطيك طاقة للخطوة التالية!\n\nكل إنجاز صغير = شحنة دوبامين",
          badge: "تنشيط سلوكي"
        },
        {
          id: "dc3",
          type: "technique",
          title: "شاحن السيروتونين السريع ☀️",
          color: "#4A8BB5",
          content: "نشاطان يومياً يشحنان مزاجك:\n\n🏆 نشاط الإنجاز (Mastery):\n• شرب كوب ماء كامل\n• ترتيب الوسادة فقط\n• غسل الوجه\n\n😊 نشاط المتعة (Pleasure):\n• الجلوس في الشمس 5 دقائق (يُنتج سيروتونين)\n• غسل الوجه بماء دافئ\n• الاستماع لأغنية واحدة تحبها",
          badge: "شحن المزاج"
        },
        {
          id: "dc4",
          type: "affirmation",
          title: "الرد على صوت الاكتئاب 🗣️",
          color: "#2D5F7E",
          content: '❌ صوت الاكتئاب: "أنت فاشل لم تفعل شيئاً اليوم"\n✅ ردك: "استيقاظي وأنا أعاني من نقص الدوبامين هو بطولة حقيقية!"\n\n❌ صوت الاكتئاب: "لا فائدة من الخروج"\n✅ ردك: "الخروج سيمنح جسدي أكسجيناً وشمساً أفضل من جدران الغرفة"',
          badge: "مواجهة"
        },
      ],
      worksheets: [
        {
          id: "dw1",
          title: "مخطط المهام اليومية الصغيرة",
          description: "حدد 3 مهام صغيرة جداً لكل يوم",
          fields: ["المهمة الصغيرة الأولى", "المهمة الصغيرة الثانية", "المهمة الصغيرة الثالثة", "ماذا أنجزت اليوم؟"]
        }
      ]
    },
    specialistContent: {
      booklets: [
        { id: "dsb1", title: 'مرجع الطبيب - الاستشارة الطبية', subtitle: 'للأخصائيين الطبيين', file: "/pdfs/depression_medical_consultation.pdf", type: "pdf", pages: 10 },
      ],
      assessments: [
        {
          id: "phq9",
          name: "مقياس PHQ-9 للاكتئاب",
          description: "الاستبيان المعتمد لتقييم شدة الاكتئاب",
          questions: [
            "قلة الرغبة والمتعة في أداء أي شيء؟",
            "الشعور بالإحباط واليأس والكآبة؟",
            "صعوبة شديدة في النوم أو نوم مفرط؟",
            "الإحساس الدائم بالتعب وفقدان الطاقة؟",
            "ضعف الشهية أو الأكل بشكل مفرط؟",
            "شعور بالسوء تجاه نفسك وأنك خيبت الأمل؟",
            "صعوبة التركيز في القراءة أو مشاهدة أي شيء؟",
            "البطء الشديد في الكلام والحركة أو التململ؟",
            "ورود أفكار سلبية عن جدوى الحياة؟"
          ],
          scoring: { min: 5, mild: 10, moderate: 15, severe: 27 }
        }
      ],
      protocols: [
        { id: "ba1", title: "دليل بروتوكول التنشيط السلوكي", content: "كيفية إعادة دمج المريض في الأنشطة..." },
        { id: "ba2", title: "نموذج خطة الأمان", content: "خطة طوارئ لحماية المريض..." },
      ]
    }
  }
];

export const TIPS = {
  general: [
    {
      id: "t1",
      icon: "🌙",
      title: "نظّم نومك",
      content: "حاول النوم والاستيقاظ في نفس الوقت كل يوم. النوم المنتظم يحسن المزاج بشكل كبير ويقلل أعراض القلق.",
      category: "نمط الحياة",
      color: "#4A8BB5"
    },
    {
      id: "t2",
      icon: "🚶",
      title: "المشي 20 دقيقة يومياً",
      content: "المشي يفرز إندورفين طبيعي يحسن المزاج. ابدأ بـ 10 دقائق وزد تدريجياً.",
      category: "نشاط بدني",
      color: "#7FB285"
    },
    {
      id: "t3",
      icon: "📱",
      title: "ابتعد عن الشاشات قبل النوم",
      content: "الضوء الأزرق من الهاتف يعطل هرمون الميلاتونين. ضع هاتفك جانباً ساعة قبل النوم.",
      category: "تقنية",
      color: "#2D5F7E"
    },
    {
      id: "t4",
      icon: "💧",
      title: "اشرب الماء بكميات كافية",
      content: "الجفاف يزيد مستوى الكورتيزول (هرمون التوتر). اشرب 8 أكواب ماء يومياً.",
      category: "تغذية",
      color: "#E8A87C"
    },
    {
      id: "t5",
      icon: "🤝",
      title: "تواصل مع شخص تثق به",
      content: "التحدث مع شخص تثق به يخفف العبء النفسي. لا تتحمل كل شيء لوحدك.",
      category: "علاقات",
      color: "#4A8BB5"
    },
    {
      id: "t6",
      icon: "📔",
      title: "دوّن مشاعرك",
      content: "الكتابة اليومية تساعدك على فهم مشاعرك. خصص 5 دقائق يومياً لتدوين ما تشعر به.",
      category: "تطوير الذات",
      color: "#7FB285"
    },
  ],
  anxiety: [
    {
      id: "ta1",
      icon: "🫁",
      title: "تمرين التنفس الصندوقي",
      content: "عند الشعور بالقلق: شهيق 4 ثوانٍ → احبس 4 ثوانٍ → زفير 4 ثوانٍ → انتظر 4 ثوانٍ. كرر 4 مرات.",
      category: "تقنيات تنفس",
      color: "#4A8BB5"
    },
    {
      id: "ta2",
      icon: "⚓",
      title: "تقنية التأريض 5-4-3-2-1",
      content: "لاحظ: 5 أشياء تراها، 4 تلمسها، 3 تسمعها، 2 تشمها، 1 تتذوقها. هذا يعيدك للحظة الحاضرة.",
      category: "تأريض",
      color: "#7FB285"
    },
  ],
  depression: [
    {
      id: "td1",
      icon: "☀️",
      title: "اجلس في الشمس 5 دقائق",
      content: "الشمس تحفز إنتاج السيروتونين. حتى في الأيام الغائمة، الضوء الطبيعي يساعد.",
      category: "تنشيط سلوكي",
      color: "#E8A87C"
    },
    {
      id: "td2",
      icon: "🏆",
      title: "احتفل بالإنجازات الصغيرة",
      content: "الاستيقاظ، الأكل، الاستحمام... هذه إنجازات حقيقية عند الاكتئاب. اعترف بها وكافئ نفسك.",
      category: "تعزيز الذات",
      color: "#7FB285"
    },
  ]
};

export const ASSESSMENT_QUESTIONS = [
  // ─── نفسي: مزاج واكتئاب ───
  { id: "q1", text: "هل تشعر بقلة الرغبة والمتعة في فعل أي شيء؟", category: "depression", type: "psych" },
  { id: "q2", text: "هل تشعر بالحزن أو اليأس أو الكآبة بشكل متكرر؟", category: "depression", type: "psych" },
  { id: "q3", text: "هل تعاني من صعوبة في النوم أو تنام أكثر من المعتاد؟", category: "depression", type: "psych" },
  { id: "q4", text: "هل تشعر بالتعب الشديد وفقدان الطاقة حتى بدون مجهود؟", category: "depression", type: "psych" },
  // ─── نفسي: قلق ───
  { id: "q5", text: "هل تشعر بالعصبية والتوتر والقلق المستمر؟", category: "anxiety", type: "psych" },
  { id: "q6", text: "هل تجد صعوبة في إيقاف التفكير القلق أو التحكم فيه؟", category: "anxiety", type: "psych" },
  { id: "q7", text: "هل تقلق بشأن أشياء كثيرة في آنٍ واحد؟", category: "anxiety", type: "psych" },
  { id: "q8", text: "هل تجد صعوبة في التركيز على ما تقوم به؟", category: "both", type: "psych" },
  // ─── طبي: أعراض جسدية ───
  { id: "q9",  text: "هل تعاني من صداع متكرر أو ثقل مستمر في الرأس؟", category: "medical", type: "medical" },
  { id: "q10", text: "هل تشعر بضيق أو ألم في الصدر بدون سبب واضح؟", category: "medical", type: "medical" },
  { id: "q11", text: "هل تعاني من مشاكل في الجهاز الهضمي (غثيان، إسهال، آلام بطن)؟", category: "medical", type: "medical" },
  { id: "q12", text: "هل لاحظت تغيراً كبيراً في وزنك مؤخراً بدون سبب واضح؟", category: "medical", type: "medical" },
  { id: "q13", text: "هل تعاني من ضيق في التنفس أو إحساس بالاختناق أحياناً؟", category: "medical", type: "medical" },
  { id: "q14", text: "هل تشعر بخدر أو تنميل في أجزاء من جسمك؟", category: "medical", type: "medical" },
  { id: "q15", text: "هل لاحظت تغيراً في ضربات قلبك (سرعة أو بطء غير طبيعي)؟", category: "medical", type: "medical" },
  { id: "q16", text: "هل تشعر بإرهاق جسدي شديد حتى بعد الراحة الكاملة؟", category: "medical", type: "medical" },
];

// ─── بيانات الطبيب العام ───────────────────────────────────────────────────
export const GENERAL_DOCTOR = {
  id: "doc-1",
  name: "طبيب عام",
  title: "طبيب عام",
  specialty: "الطب العام والرعاية الصحية الأولية",
  initials: "ط",
  experience: 10,
  rating: 4.7,
  reviewsCount: 312,
  city: "الجزائر العاصمة",
  wilaya: "الجزائر",
  languages: ["العربية", "الفرنسية"],
  bio: "طبيب عام معتمد بخبرة 10 سنوات في الرعاية الصحية الأولية. يتعامل مع الأعراض الجسدية التي تؤثر على الصحة النفسية كاضطرابات الغدة الدرقية، فقر الدم، أمراض القلب والجهاز الهضمي.",
  availableDays: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"],
  availableHours: "08:00 - 16:00",
  price: 1000,
  currency: "دج",
  phone: "0555 789 123",
  address: "عيادة الرعاية الأولية، شارع الأمير عبد القادر، الجزائر العاصمة",
  isOnline: true,
  nextAvailable: "اليوم — 5 مواعيد متاحة",
  services: ["فحص عام شامل", "تحاليل الدم", "مراجعة الأدوية", "استشارة عبر الإنترنت"],
};

// ─── بيانات البودكاست والمحتوى السمعي ────────────────────────────────────
export const PODCASTS = [
  {
    id: "pod-1",
    title: "أسرار النوم الصحي",
    host: "د. أمال بوعلام",
    description: "كيف تحسّن جودة نومك وتتخلص من الأرق نهائياً. جلسة استماع ممتعة ومريحة.",
    duration: "28 دقيقة / حلقة",
    episodes: 6,
    price: 500,
    currency: "دج",
    category: "نوم وراحة",
    color: "#4A8BB5",
    gradient: "linear-gradient(135deg, #2D5F7E, #4A8BB5)",
    cover: "🌙",
    tags: ["نوم", "راحة", "أرق"],
    rating: 4.9,
    listens: 1240,
    isFree: false,
  },
  {
    id: "pod-2",
    title: "تأملات الهدوء اليومي",
    host: "د. سارة حمزة",
    description: "جلسات تأمل موجهة تساعدك على تهدئة العقل والتحرر من التوتر اليومي.",
    duration: "20 دقيقة / حلقة",
    episodes: 10,
    price: 700,
    currency: "دج",
    category: "تأمل وتنفس",
    color: "#7FB285",
    gradient: "linear-gradient(135deg, #4a7d50, #7FB285)",
    cover: "🧘",
    tags: ["تأمل", "تنفس", "هدوء"],
    rating: 4.8,
    listens: 2100,
    isFree: false,
  },
  {
    id: "pod-3",
    title: "كسر دائرة القلق",
    host: "د. كريم مزيان",
    description: "فهم القلق وإدارته بطرق علمية مبسطة. برنامج متكامل من 8 حلقات.",
    duration: "35 دقيقة / حلقة",
    episodes: 8,
    price: 800,
    currency: "دج",
    category: "قلق واسترخاء",
    color: "#E8A87C",
    gradient: "linear-gradient(135deg, #b5673a, #E8A87C)",
    cover: "💆",
    tags: ["قلق", "علاج", "تقنيات"],
    rating: 4.95,
    listens: 3400,
    isFree: false,
  },
  {
    id: "pod-4",
    title: "صوت الشفاء — موسيقى علاجية",
    host: "فريق رفيقك الذكي",
    description: "مقطوعات صوتية هادئة مصممة علمياً لتخفيف التوتر وتحسين المزاج.",
    duration: "45 دقيقة",
    episodes: 12,
    price: 0,
    currency: "دج",
    category: "موسيقى علاجية",
    color: "#2D5F7E",
    gradient: "linear-gradient(135deg, #1a3d55, #2D5F7E)",
    cover: "🎵",
    tags: ["موسيقى", "استرخاء", "شفاء"],
    rating: 4.7,
    listens: 890,
    isFree: true,
  },
  {
    id: "pod-5",
    title: "الثقة بالنفس — ابنِ شخصيتك",
    host: "د. نور الهدى قاسمي",
    description: "رحلة من 5 حلقات لبناء الثقة وتقدير الذات والتخلص من الخوف الداخلي.",
    duration: "30 دقيقة / حلقة",
    episodes: 5,
    price: 650,
    currency: "دج",
    category: "تطوير الذات",
    color: "#7FB285",
    gradient: "linear-gradient(135deg, #4a7d50, #7FB285)",
    cover: "⭐",
    tags: ["ثقة", "تطوير", "شخصية"],
    rating: 4.85,
    listens: 1560,
    isFree: false,
  },
  {
    id: "pod-6",
    title: "قصص الأمل — تجارب حقيقية",
    host: "متطوعون من منصتنا",
    description: "قصص واقعية لأشخاص تغلبوا على التحديات النفسية. لست وحدك.",
    duration: "25 دقيقة / حلقة",
    episodes: 15,
    price: 0,
    currency: "دج",
    category: "قصص وإلهام",
    color: "#4A8BB5",
    gradient: "linear-gradient(135deg, #2D5F7E, #4A8BB5)",
    cover: "💙",
    tags: ["قصص", "أمل", "تجارب"],
    rating: 4.9,
    listens: 5200,
    isFree: true,
  },
];

// ─── الجلسات الجماعية المجانية ────────────────────────────────────────────
export const GROUP_SESSIONS = [
  {
    id: "gs-1",
    title: "جلسة إدارة القلق",
    specialist: "د. أمال بوعلام",
    date: "الجمعة 30 أغسطس",
    time: "18:00 – 19:30",
    seats: 12,
    bookedSeats: 7,
    topic: "تقنيات التهدئة الفورية وإدارة نوبات القلق",
    color: "#4A8BB5",
    gradient: "linear-gradient(135deg, #2D5F7E, #4A8BB5)",
  },
  {
    id: "gs-2",
    title: "جلسة الدعم العاطفي",
    specialist: "د. نور الهدى قاسمي",
    date: "الجمعة 6 سبتمبر",
    time: "17:00 – 18:30",
    seats: 10,
    bookedSeats: 3,
    topic: "التحدث عن مشاعرك في بيئة آمنة وداعمة",
    color: "#7FB285",
    gradient: "linear-gradient(135deg, #4a7d50, #7FB285)",
  },
  {
    id: "gs-3",
    title: "ورشة النوم الصحي",
    specialist: "د. سارة حمزة",
    date: "الجمعة 13 سبتمبر",
    time: "19:00 – 20:00",
    seats: 15,
    bookedSeats: 11,
    topic: "أسرار النوم العميق والتخلص من الأرق نهائياً",
    color: "#E8A87C",
    gradient: "linear-gradient(135deg, #b5673a, #E8A87C)",
  },
];

