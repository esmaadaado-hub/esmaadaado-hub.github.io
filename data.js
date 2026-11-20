/* =========================================================
   PORTFOLYO İÇERİĞİ  /  PORTFOLIO CONTENT
   ---------------------------------------------------------
   Sitedeki tüm yazılar bu dosyadan gelir.
   İki dilli alanlar şöyle yazılır:
       { tr: "Türkçe metin", en: "English text" }
   Sadece tırnak içindeki metinleri değiştir, kaydet,
   tarayıcıda sayfayı yenile (F5).
   ========================================================= */

const SITE = {
  // ---- Renkler ----
  renkler: {
    kagit: "#f4f2ee", // arka plan
    yazi: "#1d1c1a", // yazı
    vurgu: "#a3201b", // kırmızı — buradan değiştir
  },
  varsayilanDil: "tr", // site ilk açıldığında: "tr" veya "en"

  // ---- Kimlik ----
  ad: "Esma Dado",
  unvan: { tr: "Mimar", en: "Architect" },
  konum: { tr: "Kayseri · İstanbul, Türkiye", en: "Kayseri · Istanbul, Turkey" },
  yil: "2026",
  koordinat: "38°43′ N — 35°29′ E", // girişte küçük pafta notu; gizlemek için "" yap
  profilFoto: "assets/ben.jpg", // boş bırakırsan gizlenir
  cvLinki: "", // Örn: "assets/cv.pdf" — boşsa gizlenir

  // ---- 01 Hakkımda ----
  ozet: {
    tr: "Konut, kentsel tasarım ve iç mimarlık alanlarında çalışıyorum. İşlevsellik ile estetiği bir araya getirerek kullanıcı odaklı ve özgün mekânlar tasarlıyorum.",
    en: "I work across housing, urban design and interior architecture, combining functionality and aesthetics to create user-centred, original spaces.",
  },
  hakkimda: {
    tr: "Benim için mimarlık yalnızca mekân tasarlamak değil, insanların hayatına dokunan deneyimler yaratmaktır. Sürecin her aşamasında yenilikçi ve özgün bakış açıları geliştirmeyi amaçlıyorum.",
    en: "For me, architecture is not only about designing spaces but about creating experiences that touch people's lives. I aim to bring innovative and original perspectives to every stage of the process.",
  },
  // Öne çıkanlar — Hakkımda bölümünde kırmızı çizgiyle vurgulanır
  oneCikanlar: [
    {
      baslik: { tr: "Fuar deneyimi — İMAR 2026", en: "Trade fair — İMAR 2026" },
      aciklama: {
        tr: "Hazırlık sürecinden stant tanıtımına kadar aktif rol: portfolyo, baskılar, sunumlar ve ziyaretçilerle birebir iletişim.",
        en: "An active role from preparation to the stand itself: portfolio, print, presentations and face-to-face visitor engagement.",
      },
    },
    {
      baslik: { tr: "Yapay zekâ destekli tasarım", en: "AI-assisted design" },
      aciklama: {
        tr: "Yapay zekâ araçlarını konsept geliştirme, görselleştirme ve sunum süreçlerine entegre ediyorum.",
        en: "Integrating AI tools into concept development, visualization and presentation workflows.",
      },
    },
  ],
  yetkinlikler: {
    tr: ["Görselleştirme", "Problem çözme", "Eleştirel düşünme", "Detay odaklılık", "Ekip liderliği", "İş birliği", "Zaman yönetimi", "Hızlı öğrenme"],
    en: ["Visualization", "Problem solving", "Critical thinking", "Detail-oriented", "Team leadership", "Collaboration", "Time management", "Fast learning"],
  },
  // Yapay zekâ araçları — Hakkımda bölümünde ayrı sütun
  // not: aracın altında görünen kısa açıklama (TASLAK — kendi kullanımına göre düzelt)
  yapayZeka: [
    { ad: "Claude", not: { tr: "Proje metinleri, sunum dili ve araştırma", en: "Project texts, presentation copy and research" } },
    { ad: "Claude Code", not: { tr: "Bu portfolyo sitesinin kodlanması", en: "Coding this portfolio website" } },
    { ad: "ChatGPT", not: { tr: "Konsept geliştirme ve fikir üretimi", en: "Concept development and ideation" } },
    { ad: "Gemini", not: { tr: "Görsel üretim ve araştırma", en: "Image generation and research" } },
    { ad: "Magnific", not: { tr: "Render iyileştirme ve detay artırma", en: "Render enhancement and upscaling" } },
  ],

  // ---- Yapay zekâ ile yapılan işler (Projeler'in altında ayrı bölüm) ----
  // gorsel: "assets/ai/01.jpg" — boşsa kırmızı bir alan görünür
  // onizleme: tıklanınca kendi kendine oynayan, etkileşimi kapalı canlı önizleme
  aiIsler: [
    {
      baslik: { tr: "Villa Yapım Turu", en: "Villa Construction Tour" },
      arac: "Claude",
      aciklama: {
        tr: "Bir villanın arsadan salona yedi aşamada inşa edilişini gösteren, kaydırmayla ilerleyen etkileşimli 3D anlatım arayüzü.",
        en: "An interactive, scroll-driven 3D storytelling interface showing a villa being built in seven stages, from empty plot to living room.",
      },
      gorsel: "assets/ai/villa-yapim-turu.jpg",
      onizleme: "ai/villa-yapim-turu.html",
      link: "",
    },
    {
      baslik: { tr: "Paylaşım Masası", en: "Social Post Studio" },
      arac: "Claude",
      aciklama: {
        tr: "Instagram gönderi ve story tasarımlarını, paylaşmadan önce akışta nasıl görüneceğiyle birlikte hazırlayan bir araç. 12 şablon, sürüklenebilir yazılar ve PNG dışa aktarma.",
        en: "A tool for designing Instagram posts and stories while previewing how they will look in the feed. 12 templates, draggable text and PNG export.",
      },
      gorsel: "assets/ai/paylasim-masasi.jpg",
      onizleme: "ai/paylasim-masasi.html",
      link: "",
    },
    {
      baslik: { tr: "Sunum Altlığı", en: "Presentation Layout Tool" },
      arac: "Claude",
      aciklama: {
        tr: "Plan, analiz ve render görsellerini sürükle-bırak ile sunum paftalarına dizen arayüz. Sunumlar otomatik kaydedilir, PNG ya da tek PDF olarak dışa aktarılır.",
        en: "An interface for laying out plans, analyses and renders onto presentation boards by drag and drop. Boards save automatically and export as PNG or a single PDF.",
      },
      gorsel: "assets/ai/sunum-altligi.jpg",
      onizleme: "ai/sunum-altligi.html",
      etkilesimli: true,
      link: "",
    },
    {
      baslik: { tr: "Moodboard Stüdyosu", en: "Moodboard Studio" },
      arac: "Claude",
      aciklama: {
        tr: "Bir renderdan malzeme ve renk paletini çıkarıp kolaj, malzeme panosu ve konsept panosu hazırlayan stüdyo. Panolar PDF olarak indirilebiliyor.",
        en: "A studio that pulls the materials and colour palette out of a render and builds collages, material boards and concept boards, exportable as PDF.",
      },
      gorsel: "assets/ai/moodboard-studyosu.jpg",
      onizleme: "ai/moodboard-studyosu.html",
      etkilesimli: true,
      link: "",
    },
    {
      baslik: { tr: "Bu portfolyo sitesi", en: "This portfolio website" },
      arac: "Claude Code",
      aciklama: {
        tr: "Tasarımdan iki dilli içeriğe kadar bu siteyi yapay zekâ ile birlikte kodladım.",
        en: "I built this site together with AI — from the design to the bilingual content.",
      },
      gorsel: "assets/ai/portfolyo-sitesi.jpg",
      link: "",
    },
  ],
  // Yazılımlar ve seviyeleri — seviye: 1 (başlangıç) … 5 (ileri)
  // Gruplara ayrılmış yazılımlar — her grup Hakkımda'da ayrı sütun olur
  yazilimlar: [
    {
      grup: { tr: "2D", en: "2D" },
      liste: [
        { ad: "AutoCAD", seviye: 5 },
        { ad: "Rayon", seviye: 5 },
        { ad: "BricsCAD", seviye: 5 },
      ],
    },
    {
      grup: { tr: "3D & Render", en: "3D & Render" },
      liste: [
        { ad: "Revit", seviye: 3 },
        { ad: "SketchUp", seviye: 5 },
        { ad: "3ds Max", seviye: 3 },
        { ad: "D5 Render", seviye: 5 },
        { ad: "Lumion", seviye: 3 },
        { ad: "Corona", seviye: 3 },
      ],
    },
    {
      grup: { tr: "Sunum", en: "Presentation" },
      liste: [
        { ad: "Photoshop", seviye: 5 },
        { ad: "InDesign", seviye: 5 },
        { ad: "Affinity", seviye: 4 },
      ],
    },
  ],
  diller: {
    tr: ["Türkçe", "İngilizce", "Arapça"],
    en: ["Turkish", "English", "Arabic"],
  },

  // ---- 02 Deneyim ----
  deneyim: [
    {
      tarih: { tr: "2023 — Bugün", en: "2023 — Present" },
      baslik: { tr: "Mimari Tasarımcı", en: "Architectural Designer" },
      yer: "İkon Proje, Kayseri",
      aciklama: {
        tr: "Toplu konut, teknopark, okul, otel, AVM, hangar ve villa projelerinde şantiye uygulaması, yapım teknikleri ve detaylandırma; ardından AVM, konut, otel ve villalar için iç ve dış mekân konsept tasarımı ve 3D görselleştirme.",
        en: "Site implementation, construction techniques and detailing on mass housing, technoparks, schools, hotels, malls, hangars and villas; followed by interior and exterior concept design and 3D visualization for malls, residences, hotels and villas.",
      },
    },
    {
      tarih: { tr: "Bugün", en: "Present" },
      baslik: { tr: "Serbest Mimar", en: "Freelance Architect" },
      yer: "Kayseri",
      aciklama: {
        tr: "Konut iç mekân projeleri ve mimari yarışmalar: konsept, 2D/3D çizim, görselleştirme ve müşteri iletişimi.",
        en: "Residential interiors and architectural competitions: concept, 2D/3D drawings, visualization and client communication.",
      },
    },
    {
      tarih: "2022",
      baslik: { tr: "Mimarlık Stajyeri", en: "Architecture Intern" },
      yer: "Esküp Yapı, Kayseri",
      aciklama: {
        tr: "Villa projelerinde 2D ve 3D çizimler, şantiyede yapım detayları ve deprem riskli binaların incelenmesi.",
        en: "2D and 3D drawings for villa projects, on-site construction details and inspection of earthquake-risk buildings.",
      },
    },
  ],
  // ---- Sertifikalar (Deneyim bölümünde, Eğitim'in altında) ----
  sertifikalar: [
    {
      tarih: { tr: "Şubat 2024", en: "February 2024" },
      baslik: { tr: "Tasarım Odaklı Düşünme Eğitimi", en: "Design Thinking Training" },
      kurum: { tr: "Çiğdem Sezer Akademi · İkon Proje Mimarlık ekibi için", en: "Çiğdem Sezer Academy · for the İkon Proje architecture team" },
      gorsel: "assets/sertifika/tasarim-odakli-dusunme.jpg",
    },
  ],
  egitim: [
    {
      tarih: "2020 — 2025",
      baslik: { tr: "Mimarlık Lisans", en: "B.Arch, Architecture" },
      yer: { tr: "Erciyes Üniversitesi, Mimarlık Fakültesi", en: "Erciyes University, Faculty of Architecture" },
    },
  ],

  // ---- 03 Fuar ----
  fuar: {
    ad: "İMAR 2026",
    firma: "İkon Proje",
    yer: { tr: "Şam, Suriye", en: "Damascus, Syria" },
    rol: { tr: "Fuar hazırlığı & stant temsilcisi", en: "Fair preparation & stand representative" },
    giris: {
      tr: "İkon Proje adına katıldığım İMAR 2026'da, fuarın hazırlık sürecinden stanttaki tanıtımlara kadar her aşamada aktif rol aldım.",
      en: "At İMAR 2026, representing İkon Proje, I took an active role at every stage, from preparing for the fair to presenting at the stand.",
    },
    gorevler: [
      {
        baslik: { tr: "Hazırlık süreci", en: "Preparation" },
        aciklama: { tr: "Fuar öncesi planlama ve hazırlıkların yürütülmesi.", en: "Planning and coordinating the run-up to the fair." },
      },
      {
        baslik: { tr: "Şirket portfolyosu", en: "Company portfolio" },
        aciklama: { tr: "Firma projelerinin portfolyo olarak derlenmesi ve tasarlanması.", en: "Compiling and designing the company's project portfolio." },
      },
      {
        baslik: { tr: "Baskılar & paftalar", en: "Print & display boards" },
        aciklama: { tr: "Stantta sergilenen paftaların ve basılı materyallerin hazırlanması.", en: "Producing the boards and printed material shown at the stand." },
      },
      {
        baslik: { tr: "Sunumlar", en: "Presentations" },
        aciklama: { tr: "Proje sunumlarının hazırlanması.", en: "Preparing the project presentations." },
      },
      {
        baslik: { tr: "Firma tanıtımı", en: "Company presentations" },
        aciklama: { tr: "Ziyaretçilere ve potansiyel müşterilere firmayı ve projeleri iki dilde tanıtmak.", en: "Presenting the company and its projects to visitors and prospective clients in two languages." },
      },
      {
        baslik: { tr: "Network", en: "Networking" },
        aciklama: { tr: "Yeni iş bağlantıları ve iş birlikleri kurmak.", en: "Building new business contacts and partnerships." },
      },
    ],
    gorsel: "assets/fuar-imar-2026.jpg",
    // LinkedIn'deki fuar gönderileri (istediğin kadar ekleyebilirsin)
    linkler: [
      "https://www.linkedin.com/posts/ikonproje_imar2026-internationalexhibitionforbuildingsyria-activity-7504117474909470720-D0I0",
      "https://www.linkedin.com/posts/ikonproje_imar2026-damascus-syria-activity-7505282683304976385-YCzW",
    ],
  },

  // ---- Projeler bölümünün başındaki kısa not (vurgu: koyu yazılan cümle) ----
  projeNotu: {
    giris: { tr: "Farklı profesyonel ve akademik bağlamlarda geliştirdiğim mimari ve tasarım çalışmalarından bir seçki.", en: "A selection of architectural and design work developed across professional and academic contexts." },
    vurgu: { tr: "Müşteri gizliliği gereği proje adları ve bazı detaylar değiştirilmiştir.", en: "Project names and some details have been changed to protect client confidentiality." },
    son: { tr: "Odak yalnızca sonuçta değil; her projenin ardındaki düşünce ve tasarım sürecinde.", en: "The focus is not only on the result, but on the thinking and design process behind each project." },
  },

  // ---- 04 Projeler (12 adet) ----
  // gorsel: kapak görseli — boşsa renkli bir alan görünür
  projeler: [
    // ---- 1 ----
    {
      baslik: "Ateliera",
      tur: { tr: "Kamusal alan / Peyzaj", en: "Public space / Landscape" },
      yer: "",
      yil: "",
      aciklama: {
        tr: "Cami, dere ve tarihi köy dokusu arasında yeniden kurgulanan bir köy meydanı. Ahşap oturma adaları, yeşil cepler ve dereye inen seyir terasları ile köyün buluşma noktası. Tasarımı ve renderları tamamen bana ait.",
        en: "A village square reimagined between the mosque, the stream and the historic village fabric: timber seating islands, green pockets and viewing terraces stepping down to the water make it the village's meeting place. The design and renders are entirely my work.",
      },
      roller: { tr: ["Tasarım (tamamı)", "Render ve görselleştirme (tamamı)"], en: ["Design (in full)", "Renders and visualization (in full)"] },
      gorsel: "assets/proje1/01.jpg",
      gorseller: ["assets/proje1/01.jpg", "assets/proje1/02.jpg", "assets/proje1/03.jpg", "assets/proje1/04.jpg", "assets/proje1/05.jpg", "assets/proje1/06.jpg", "assets/proje1/07.jpg", "assets/proje1/08.jpg"],
      dosyalar: [],
      link: "",
    },
    // ---- 2 ----
    {
      baslik: "Eunoia",
      tur: { tr: "Konut · ekip projesi", en: "Residential · team project" },
      yer: "",
      yil: "",
      aciklama: {
        tr: "Peyzajlı iç avlular, gölet ve ticari zemin katlar etrafında kurgulanan çok bloklu bir konut sitesi. Ekip olarak yürütülen projede 3D model ve DWG çizim süreçlerinde yer aldım; M1–M2 tip bloklarını üstlendim. Ortak bir dosya üzerinde, ekiple uyum içinde üretmeyi seviyorum.",
        en: "A multi-block residential complex arranged around landscaped courtyards, a pond and retail ground floors. As part of the project team I worked on the 3D model and the DWG drawing sets, taking on the M1–M2 type blocks. I enjoy producing within a shared model, in step with a team.",
      },
      roller: {
        tr: ["Ekip içinde 3D model üretimi", "DWG çizim setlerine katkı", "M1–M2 tip blokların çizimleri", "Ekip koordinasyonu ve ortak dosya düzeni"],
        en: ["3D modelling within the team", "Contribution to the DWG drawing sets", "Drawings for the M1–M2 type blocks", "Team coordination and shared-file workflow"],
      },
      gorsel: "assets/proje2/04.jpg",
      gorseller: ["assets/proje2/04.jpg", "assets/proje2/01.jpg", "assets/proje2/02.jpg", "assets/proje2/03.jpg", "assets/proje2/05.jpg", "assets/proje2/06.jpg", "assets/proje2/07.jpg"],
      dosyalar: [
        { ad: { tr: "M1–M2 blokları (DWG · 32 MB)", en: "M1–M2 blocks (DWG · 32 MB)" }, link: "assets/dosyalar/eunoia-m1-m2-bloklar.dwg" },
      ],
      link: "",
    },
    {
      baslik: "Terra Nova",
      tur: { tr: "Master plan", en: "Master planning" },
      yer: { tr: "Suriye", en: "Syria" },
      yil: "",
      aciklama: {
        tr: "Suriye bakanlığı için hazırlanan, Kilis–Halep aksında yeni bir yaşam bölgesi master planı. Avlulu konut adaları, ticari akslar, cami ve meydanlar. Taslaktan sunuma kadar müşteri ve bakanlıklarla iletişimi yürüttüm; 3D model ve renderları üstlendim.",
        en: "A master plan for a new district on the Kilis–Aleppo axis, prepared for the Syrian ministry: courtyard housing blocks, commercial streets, a mosque and public squares. I handled communication with the client and the ministries from draft to presentation, and produced the 3D model and renders.",
      },
      gorsel: "assets/proje3/01.jpg",
      gorseller: ["assets/proje3/01.jpg", "assets/proje3/02.jpg", "assets/proje3/03.jpg", "assets/proje3/04.jpg", "assets/proje3/05.jpg"],
      roller: {
        tr: ["Master plan taslağı", "Müşteriyle iletişim", "Bakanlıklarla iletişim ve koordinasyon", "3D model", "Render ve görselleştirme"],
        en: ["Master plan draft", "Client communication", "Liaison and coordination with the ministries", "3D model", "Renders and visualization"],
      },
      dosyalar: [],
      // Dosya paylaşılmadığında "Dosyalar" başlığı altında gösterilen not
      dosyaNotu: {
        tr: "Bakanlık, projeye ait bazı verilerin gizli tutulmasını talep ettiğinden çizim ve model dosyaları paylaşılmamaktadır.",
        en: "Drawings and model files are not shared, as the ministry has requested that certain project data remain confidential.",
      },
      link: "",
    },
    // ---- 4 ----
    {
      baslik: "Nexora",
      tur: { tr: "Karma kullanım · ekip projesi", en: "Mixed-use · team project" },
      yer: { tr: "Kayseri", en: "Kayseri" },
      yil: "2025",
      aciklama: {
        tr: "Ağaç formlu taşıyıcıların altında açılan bir iç avlu etrafında kurgulanan açık hava yaşam merkezi. Ekip olarak yürütülen projede taslak tasarım aşamasında yer aldım.",
        en: "An open-air lifestyle centre arranged around a courtyard beneath tree-like canopy structures. I was part of the team during the schematic design stage.",
      },
      roller: {
        tr: ["Taslak tasarım", "Ekip içinde konsept geliştirme"],
        en: ["Schematic design", "Concept development within the team"],
      },
      gorsel: "assets/proje4/01.jpg",
      gorseller: ["assets/proje4/01.jpg", "assets/proje4/02.jpg", "assets/proje4/03.jpg", "assets/proje4/04.jpg"],
      dosyalar: [],
      link: "",
    },
    {
      baslik: "Sylvora",
      tur: { tr: "Konut / Villa", en: "Residential / Villa" },
      yer: { tr: "Altınoluk, Balıkesir", en: "Altınoluk, Balıkesir" },
      yil: "",
      aciklama: {
        tr: "Ağaçlık bir yamaca yerleşen bahçeli villa sitesi. Projenin ruhsat ve uygulama sürecini baştan sona üstlendim. Tuğla ve sıva dokulu cepheler, bahçeye açılan geniş camlı yaşam alanları.",
        en: "A garden villa community on a wooded slope. I led the project's permit and construction-documentation process from start to finish. Brick and render façades, generously glazed living spaces opening onto the gardens.",
      },
      gorsel: "assets/proje5/01.jpg",
      gorseller: ["assets/proje5/01.jpg", "assets/proje5/02.jpg", "assets/proje5/03.jpg", "assets/proje5/04.jpg", "assets/proje5/05.jpg"],
      roller: {
        tr: ["Ruhsat projeleri ve belediye süreci", "Uygulama projeleri", "Vaziyet planı ve tip villa çizimleri", "Süreç takibi ve koordinasyon"],
        en: ["Permit drawings and municipal approvals", "Construction documentation", "Site plan and type-villa drawings", "Process management and coordination"],
      },
      dosyalar: [
        { ad: { tr: "Tip-B villa projesi (DWG)", en: "Type-B villa drawings (DWG)" }, link: "assets/dosyalar/sylvora-tip-b.dwg" },      ],
      link: "",
    },
    {
      baslik: "Aurel",
      tur: { tr: "İç mimari", en: "Interior architecture" },
      yer: "",
      yil: "",
      aciklama: {
        tr: "Konseptten uygulamaya kadar A'dan Z'ye üstlendiğim bir konut iç mekânı. Sıcak ahşap yüzeyler, yumuşak kavisler ve gizli aydınlatmayla sakin, bütünlüklü bir yaşam alanı.",
        en: "A residential interior I led end to end, from concept to completion. Warm timber, soft curves and concealed lighting shape a calm, cohesive home.",
      },
      // Proje sayfasında "Üstlendiğim işler" listesi
      roller: {
        tr: ["Konsept ve iç mekân tasarımı", "3D modelleme ve görselleştirme", "Uygulama projeleri ve detaylar", "Malzeme ve ürün seçimi", "Şantiye takibi ve uygulama kontrolü"],
        en: ["Concept and interior design", "3D modelling and visualization", "Construction drawings and details", "Material and product selection", "Site supervision and quality control"],
      },
      // Kapak görseli + proje sayfasındaki tüm görseller (assets/proje6 klasörü)
      gorsel: "assets/proje6/01.jpg",
      gorseller: [
        "assets/proje6/01.jpg", "assets/proje6/02.jpg", "assets/proje6/03.jpg", "assets/proje6/04.jpg", "assets/proje6/05.jpg",
        "assets/proje6/06.jpg", "assets/proje6/07.jpg", "assets/proje6/08.jpg", "assets/proje6/09.jpg", "assets/proje6/10.jpg",
      ],
      // İndirilebilir dosyalar — DWG'yi "assets/dosyalar" klasörüne koyup yolunu yaz
      // ya da Google Drive / WeTransfer linkini yapıştır. Link boşsa gösterilmez.
      dosyalar: [
        { ad: { tr: "Uygulama detayları (DWG)", en: "Construction details (DWG)" }, link: "" },
      ],
    },
    // ---- 7–12: boş alanlar — görseller gelince doldurulacak ----
    // ---- 7 ----
    {
      baslik: "Elysia",
      tur: { tr: "Villa konut", en: "Villa residence" },
      yer: "",
      yil: "",
      aciklama: {
        tr: "Ormanlık bir yamacın eteğinde, bahçeli villalardan oluşan küçük bir yerleşke. Taş, sıva ve bronz tonlu metal detaylarla doğayla uyumlu sakin cepheler. Uygulama çizimlerinden ruhsata kadar tüm süreci ben yürüttüm.",
        en: "A small enclave of garden villas at the foot of a wooded hillside. Stone, render and bronze-toned metal details give calm façades in tune with the landscape. I handled the whole process, from construction drawings through to the building permit.",
      },
      roller: { tr: ["Uygulama çizimleri", "Ruhsata kadar tüm süreç"], en: ["Construction drawings", "Full process through to the building permit"] },
      gorsel: "assets/proje7/01.jpg",
      gorseller: ["assets/proje7/01.jpg", "assets/proje7/02.jpg", "assets/proje7/03.jpg", "assets/proje7/04.jpg"],
      dosyalar: [],
      link: "",
    },
    // ---- 8 ----
    {
      baslik: "Vantera",
      tur: { tr: "Ticaret / Perakende", en: "Commercial / Retail" },
      yer: "",
      yil: "",
      aciklama: {
        tr: "Kafe ve mağazaların iki kat boyunca sıralandığı, önünde geniş bir meydan açan açık hava alışveriş merkezi. Teraslar, saçak altı aydınlatmalar ve sokakla iç içe bir zemin kat. Tadilat dosyası, Kent Estetik Kurulu dosyası ve 3D model süreçlerinde yer aldım.",
        en: "An open-air shopping centre with cafés and shops lining two levels around a generous public plaza: terraces, lit soffits and a ground floor that merges with the street. I worked on the renovation file, the Urban Aesthetics Board submission and the 3D model.",
      },
      roller: { tr: ["Tadilat projesi dosyası", "Kent Estetik Kurulu dosyası", "3D model"], en: ["Renovation project file", "Urban Aesthetics Board submission", "3D model"] },
      gorsel: "assets/proje8/01.jpg",
      gorseller: ["assets/proje8/01.jpg", "assets/proje8/02.jpg", "assets/proje8/03.jpg", "assets/proje8/04.jpg"],
      dosyalar: [
        { ad: { tr: "As-built proje (DWG · 28 MB)", en: "As-built drawings (DWG · 28 MB)" }, link: "assets/dosyalar/vantera-asbuilt.dwg" },
      ],
      link: "",
    },
    // ---- 9 ----
    {
      baslik: "Azurea",
      tur: { tr: "Konut", en: "Residential" },
      yer: { tr: "Kuşadası, Aydın", en: "Kuşadası, Aydın" },
      yil: "2026",
      aciklama: {
        tr: "Eğimli arazide kademelenerek yükselen, akışkan beyaz saçaklarla tanımlanan teraslı bir konut yapısı. Her katta denize bakan geniş teraslar, havuz bahçesi ve yeşille iç içe bir zemin. Taslak çözümde, 3D modelde ve sunum hazırlığında yer aldım.",
        en: "A terraced residential building that steps up the sloping site, defined by flowing white bands. Generous sea-facing terraces on every level, a pool garden and a ground floor woven into the greenery. I worked on the schematic solution, the 3D model and the presentation.",
      },
      roller: { tr: ["Taslak çözüm", "3D model", "Sunum"], en: ["Schematic solution", "3D model", "Presentation"] },
      gorsel: "assets/proje9/01.jpg",
      gorseller: ["assets/proje9/01.jpg", "assets/proje9/02.jpg", "assets/proje9/03.jpg", "assets/proje9/04.jpg", "assets/proje9/05.jpg", "assets/proje9/06.jpg"],
      dosyalar: [
        { ad: { tr: "3D model (SKP · 17 MB)", en: "3D model (SKP · 17 MB)" }, link: "assets/dosyalar/azurea-model.skp" },
      ],
      link: "",
    },
    // ---- 10 ----
    {
      baslik: "Thalassa",
      tur: { tr: "Turizm / Konaklama", en: "Hospitality" },
      yer: { tr: "Didim, Aydın", en: "Didim, Aydın" },
      yil: "",
      aciklama: {
        tr: "Ege kıyısında, havuz avlusu etrafında kurgulanan iki katlı bir sahil oteli. Sahile açılan ticari birimlerin üzerinde yeşil çatılı teraslar ve palmiyelerle çevrili bir bahçe. Projenin 3D model sürecinde yer aldım.",
        en: "A two-storey beach hotel on the Aegean coast, arranged around a pool courtyard. Green-roofed terraces sit above beach-facing retail units, all framed by a palm garden. I worked on the project's 3D model.",
      },
      roller: { tr: ["3D model"], en: ["3D model"] },
      gorsel: "assets/proje10/01.jpg",
      gorseller: ["assets/proje10/01.jpg", "assets/proje10/02.jpg", "assets/proje10/03.jpg", "assets/proje10/04.jpg"],
      dosyalar: [],
      link: "",
    },
    // ---- 11 ----
    {
      baslik: "Aureon",
      tur: { tr: "Karma kullanım", en: "Mixed-use" },
      yer: "",
      yil: "",
      aciklama: {
        tr: "Kademeli ticaret katlarının üzerinde yükselen konut blokları. Cadde boyunca uzanan süs havuzları, teras restoranlar ve tramvay hattına açılan canlı bir kent cephesi. 3D model ve mimari proje detaylarında çalıştım.",
        en: "Residential towers rising above stepped retail terraces. Ornamental pools along the avenue, terrace restaurants and a lively street front facing the tram line. I worked on the 3D model and the architectural project details.",
      },
      roller: { tr: ["3D model", "Mimari proje detayları"], en: ["3D model", "Architectural project details"] },
      gorsel: "assets/proje11/01.jpg",
      gorseller: ["assets/proje11/01.jpg", "assets/proje11/02.jpg", "assets/proje11/03.jpg", "assets/proje11/04.jpg", "assets/proje11/05.jpg"],
      dosyalar: [],
      link: "",
    },
    // ---- 12 ----
    {
      baslik: "Lumora",
      tur: { tr: "Sanayi / Hangar", en: "Industrial / Hangar" },
      yer: { tr: "Ankara", en: "Ankara" },
      yil: "2025",
      aciklama: {
        tr: "Ostim'de, yola paralel uzanan tek bir blokta sıralanan hangar ve atölye birimleri. Her birimin önünde turuncu çerçeveli yükleme kapısı, aralarında ise camlı ve iki katlı ofis girişleri var; bunlar uzun cepheyi ritimli parçalara bölüyor.",
        en: "Hangar and workshop units lined up in a single block parallel to the road in Ostim. Each unit has an orange-framed loading door, and glazed two-storey office entrances between them break the long façade into a steady rhythm.",
      },
      roller: {
        tr: ["3D model", "Render ve görselleştirme"],
        en: ["3D model", "Renders and visualization"],
      },
      gorsel: "assets/proje12/01.jpg",
      gorseller: ["assets/proje12/01.jpg", "assets/proje12/02.jpg", "assets/proje12/03.jpg", "assets/proje12/04.jpg"],
      dosyalar: [],
      link: "",
    },
  ],

  // ---- İletişim ----
  eposta: "esmaadaado@gmail.com",
  telefon: "+90 530 645 33 68", // gizlemek için "" yap
  sosyal: {
    LinkedIn: "https://www.linkedin.com/in/esma-dado/",
    Instagram: "https://www.instagram.com/archesmaa/",
    Behance: "",
  },
};
