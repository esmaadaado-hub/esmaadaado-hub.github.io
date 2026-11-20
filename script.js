/* =========================================================
   Sayfayı data.js'teki SITE nesnesinden oluşturur (TR / EN).
   İçerik değiştirmek için bu dosyaya dokunmana gerek yok.
   ========================================================= */
(function () {
  const S = typeof SITE !== "undefined" ? SITE : {};

  // Arayüz yazıları
  const UI = {
    tr: {
      about: "Hakkımda", experience: "Deneyim", projects: "Projeler", contact: "İletişim",
      skills: "Yetkinlikler", software: "Yazılımlar", languages: "Diller", education: "Eğitim", certs: "Sertifikalar", viewCert: "Belgeyi gör ↗",
      portfolio: "Portfolyo", cv: "CV'yi indir", email: "E-posta", phone: "Telefon",
      social: "Sosyal", location: "Konum", top: "Başa dön ↑", view: "Projeyi gör ↗",
      selected: "Seçili işler",
      ai: "Yapay zekâ araçları", aiWork: "Yapay zekâ ile",
      fair: "Fuar", tasks: "Üstlendiğim görevler", post: "LinkedIn'de gör ↗",
      role: "Üstlendiğim işler", files: "Dosyalar", download: "İndir ↓", details: "Projeyi incele →", close: "Kapat ✕", cursor: "İncele",
      preview: "Önizleme", previewOpen: "Önizlemeyi aç →", previewNote: "Önizleme — etkileşim kapalı. Arayüz kendi kendine oynar.",
      tryIt: "Canlı dene", tryOpen: "Aracı dene →", tryNote: "Canlı araç: tıkla, sürükle, kendi görselini yükle. Dokunana kadar kendi kendine oynar; yaptığın değişiklikler yalnız bu tarayıcıda kalır.", fullscreen: "Tam ekranda aç ↗",
    },
    en: {
      about: "About", experience: "Experience", projects: "Projects", contact: "Contact",
      skills: "Skills", software: "Software", languages: "Languages", education: "Education", certs: "Certificates", viewCert: "View certificate ↗",
      portfolio: "Portfolio", cv: "Download CV", email: "Email", phone: "Phone",
      social: "Social", location: "Location", top: "Back to top ↑", view: "View project ↗",
      selected: "Selected work",
      ai: "AI tools", aiWork: "Made with AI",
      fair: "Trade fair", tasks: "What I did", post: "See on LinkedIn ↗",
      role: "My role", files: "Files", download: "Download ↓", details: "View project →", close: "Close ✕", cursor: "View",
      preview: "Preview", previewOpen: "Open preview →", previewNote: "Preview — interaction disabled. The interface plays on its own.",
      tryIt: "Try it live", tryOpen: "Try the tool →", tryNote: "A live tool: click, drag, upload your own image. It plays on its own until you touch it; your changes stay only in this browser.", fullscreen: "Open full screen ↗",
    },
  };

  // Dil seçimi: adres (?lang=en) > son seçim > varsayılan
  let lang = new URLSearchParams(location.search).get("lang");
  if (!lang) { try { lang = localStorage.getItem("dil"); } catch (e) {} }
  if (!UI[lang]) lang = S.varsayilanDil === "en" ? "en" : "tr";

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // { tr, en } nesnesinden doğru dili seçer; düz metin/listeyi aynen döndürür
  const t = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.tr ?? "" : v ?? "");
  const nn = (i) => String(i).padStart(2, "0");

  // Renkler
  function applyColors() {
    const r = S.renkler || {};
    const css = document.documentElement.style;
    if (r.kagit) css.setProperty("--paper", r.kagit);
    if (r.yazi) css.setProperty("--ink", r.yazi);
    if (r.vurgu) css.setProperty("--red", r.vurgu);
  }
  applyColors();
  // Bu kopyada bulunmayan indirme dosyaları (ör. claude.ai sürümü) gizlenir
  const okLink = (d) => !!(d && d.link) && !(window.DOSYA_YOK && /^assets\/dosyalar\//.test(d.link));
  // Bulut düzenleyici (editor.js) içeriği değiştirince sayfayı yeniden çizer
  window.PORTFOLYO = {
    site: S,
    yenile() { applyColors(); const y = scrollY; render(); scrollTo(0, y); },
  };

  function render() {
    const L = UI[lang];
    document.documentElement.lang = lang;
    document.title = `${S.ad} Portfolio`;

    const nav = [
      ["hakkimda", L.about],
      ["deneyim", L.experience],
      ...(S.fuar ? [["fuar", L.fair]] : []),
      ["projeler", L.projects],
      ...((S.aiIsler || []).length ? [["yapay-zeka", L.aiWork]] : []),
      ["iletisim", L.contact],
    ];
    const num = (id) => nn(nav.findIndex(([x]) => x === id) + 1);
    const F = S.fuar;
    const names = String(S.ad || "").split(" ");
    const list = (items) => (t(items) || []).map((x) => `<li>${esc(x)}</li>`).join("");
    // Yazılım + seviye (1–5) çubukları
    const levels = (items) =>
      (items || [])
        .map((x) => {
          const ad = typeof x === "string" ? x : x.ad;
          const lv = Math.max(0, Math.min(5, typeof x === "string" ? 0 : +x.seviye || 0));
          const bars = lv ? `<span class="lv" aria-label="${lv}/5">${[1, 2, 3, 4, 5].map((k) => `<i class="${k <= lv ? "on" : ""}"></i>`).join("")}</span>` : "";
          return `<li class="sk"><span>${esc(ad)}</span>${bars}</li>`;
        })
        .join("");
    const rows = (items) =>
      (items || [])
        .map(
          (d) => `<li><span class="muted">${esc(t(d.tarih))}</span>
          <span><span class="t">${esc(t(d.baslik))}</span><br><span class="muted">${esc(t(d.yer))}</span></span>
          <span class="d">${esc(t(d.aciklama))}</span></li>`
        )
        .join("");

    const social = Object.entries(S.sosyal || {}).filter(([, u]) => u);

    document.getElementById("app").innerHTML = `
      <div class="bg-grid grid" aria-hidden="true">${"<i></i>".repeat(12)}</div>
      <header class="bar grid">
        <a class="who" href="#ust">${esc(S.ad)}</a>
        <nav>${nav.map(([id, ad], i) => `<a href="#${id}"><span>${nn(i + 1)}</span>${esc(ad)}</a>`).join("")}</nav>
        <div class="lang">
          ${S.sosyal && S.sosyal.LinkedIn ? `<a class="li" href="${esc(S.sosyal.LinkedIn)}" target="_blank" rel="noopener">LinkedIn ↗</a>` : ""}
          <button data-l="tr" class="${lang === "tr" ? "on" : ""}">TR</button>
          <button data-l="en" class="${lang === "en" ? "on" : ""}">EN</button>
        </div>
      </header>

      <main>
        <section class="hero grid" id="ust">
          <div class="hero-meta">
            <p>${esc(t(S.unvan))}</p>
            <p class="muted">${esc(t(S.konum))}</p>
            <p class="muted">${esc(L.portfolio)} ${esc(S.yil)}</p>
            <p class="muted">${esc(L.selected)} — ${nn((S.projeler || []).length)}</p>
          </div>
          <div class="hero-name">
            <h1>${names.map(esc).join("<br>")}<i>.</i></h1>
            <p>${esc(t(S.ozet))}</p>
          </div>
          ${S.profilFoto ? `<figure class="hero-photo"><img src="${esc(S.profilFoto)}" alt="${esc(S.ad)}"></figure>` : ""}
          <div class="marks" aria-hidden="true">
            <span class="cm tl"></span><span class="cm tr"></span><span class="cm bl"></span><span class="cm br"></span>
            ${S.koordinat ? `<span class="coord">${esc(S.koordinat)}</span>` : ""}
            <span class="datum"></span>
          </div>
        </section>

        <section class="sec grid" id="hakkimda">
          <h2 class="sec-head"><span>01</span>${esc(L.about)}</h2>
          <aside class="sec-aside">
            <h3>${esc(L.skills)}</h3>
            <p>${(t(S.yetkinlikler) || []).map(esc).join(" · ")}</p>
            <h3>${esc(L.languages)}</h3>
            <p>${(t(S.diller) || []).map(esc).join(" · ")}</p>
          </aside>
          <div class="sec-body">
            <p class="lead">${esc(t(S.hakkimda))}</p>
            ${(S.oneCikanlar || []).length ? `<div class="focus">${S.oneCikanlar
              .map((o, i) => `<div><span class="red">${String.fromCharCode(65 + i)}</span><h3>${esc(t(o.baslik))}</h3><p>${esc(t(o.aciklama))}</p></div>`)
              .join("")}</div>` : ""}
            <div class="cols">
              ${(S.yapayZeka || []).length ? `<div><h3>${esc(L.ai)}</h3><ul>${S.yapayZeka
                .map((a) => typeof a === "string"
                  ? `<li>${esc(a)}</li>`
                  : `<li class="ai-tool"><span>${esc(a.ad)}</span>${t(a.not) ? `<small>${esc(t(a.not))}</small>` : ""}</li>`)
                .join("")}</ul></div>` : ""}
              ${(S.yazilimlar || [])
                .map((g) => g && g.liste
                  ? `<div><h3>${esc(t(g.grup))}</h3><ul>${levels(g.liste)}</ul></div>`
                  : "")
                .join("")}
              ${(S.yazilimlar || []).some((g) => !g.liste) ? `<div><h3>${esc(L.software)}</h3><ul>${levels(S.yazilimlar.filter((g) => !g.liste))}</ul></div>` : ""}
            </div>
          </div>
        </section>

        <section class="sec grid" id="deneyim">
          <h2 class="sec-head"><span>02</span>${esc(L.experience)}</h2>
          <div class="sec-body">
            <ul class="table">${rows(S.deneyim)}</ul>
            <p class="label">${esc(L.education)}</p>
            <ul class="table">${rows(S.egitim)}</ul>
            ${(S.sertifikalar || []).length ? `<p class="label">${esc(L.certs)}</p><ul class="table certs">${S.sertifikalar.map((c) => `<li><span class="muted">${esc(t(c.tarih))}</span><span><span class="t">${esc(t(c.baslik))}</span><br><span class="muted">${esc(t(c.kurum))}</span></span><a class="cert" href="${esc(c.gorsel)}" target="_blank" rel="noopener"><img src="${esc(c.gorsel)}" alt="${esc(t(c.baslik))}" loading="lazy"><span>${esc(L.viewCert)}</span></a></li>`).join("")}</ul>` : ""}
            ${S.cvLinki ? `<p style="margin-top:28px"><a class="red" href="${esc(S.cvLinki)}" download>${esc(L.cv)} ↓</a></p>` : ""}
          </div>
        </section>

        ${F ? `<section class="sec grid" id="fuar">
          <h2 class="sec-head"><span>${num("fuar")}</span>${esc(L.fair)}</h2>
          <div class="sec-body fair">
            ${F.gorsel ? `<figure class="fair-img"><img src="${esc(F.gorsel)}" alt="${esc(F.ad)}" loading="lazy"></figure>` : ""}
            <div class="fair-text">
              <p class="fair-meta"><span>${esc(F.firma)}${F.yer ? ` — ${esc(t(F.yer))}` : ""}</span><span class="muted">${esc(t(F.rol))}</span></p>
              <h3 class="fair-title">${esc(F.ad)}</h3>
              <p class="fair-intro">${esc(t(F.giris))}</p>
              <p class="label">${esc(L.tasks)}</p>
              <ol class="tasks">${(F.gorevler || [])
                .map((g, i) => `<li><span class="red">${nn(i + 1)}</span><div><b>${esc(t(g.baslik))}</b><p>${esc(t(g.aciklama))}</p></div></li>`)
                .join("")}</ol>
              ${(() => {
                const ls = [].concat(F.linkler || F.link || []).filter(Boolean);
                return ls.length
                  ? `<p class="fair-links">${ls
                      .map((u, i) => `<a class="fair-link" href="${esc(u)}" target="_blank" rel="noopener">${esc(L.post)}${ls.length > 1 ? ` <span class="muted">${nn(i + 1)}</span>` : ""}</a>`)
                      .join("")}</p>`
                  : "";
              })()}
            </div>
          </div>
        </section>` : ""}

        <section class="sec grid" id="projeler">
          <h2 class="sec-head"><span>${num("projeler")}</span>${esc(L.projects)}</h2>
          <div class="sec-body">
            ${S.projeNotu ? `<p class="proj-note">${esc(t(S.projeNotu.giris))} <b>${esc(t(S.projeNotu.vurgu))}</b> ${esc(t(S.projeNotu.son))}</p>` : ""}
            <div class="works">${(S.projeler || [])
              .map((p, i) => {
                const detail = hasDetail(p);
                const tag = detail || p.link ? "a" : "article";
                const attrs = detail
                  ? ` href="#proje-${i + 1}"`
                  : p.link ? ` href="${esc(p.link)}" target="_blank" rel="noopener"` : "";
                const meta = [t(p.tur), t(p.yer)].filter(Boolean).map(esc).join(", ");
                return `<${tag} class="work${detail ? " has-detail" : ""}"${attrs}>
                  <div class="work-img">${p.gorsel
                    ? `<img src="${esc(p.gorsel)}" alt="${esc(t(p.baslik))}" loading="lazy" onerror="this.outerHTML='<span class=&quot;n&quot;>${nn(i + 1)}</span>'">`
                    : `<span class="n">${nn(i + 1)}</span>`}</div>
                  <div class="work-cap"><span class="no">${nn(i + 1)}</span><h3>${esc(t(p.baslik))}</h3><span class="y">${esc(p.yil)}</span></div>
                  ${meta ? `<p class="meta">${meta}</p>` : ""}
                  ${t(p.aciklama) ? `<p class="desc">${esc(t(p.aciklama))}</p>` : ""}
                  ${detail ? `<p class="desc more">${esc(L.details)}</p>` : ""}
                </${tag}>`;
              })
              .join("")}</div>
          </div>
        </section>

        ${(S.aiIsler || []).length ? `<section class="sec grid" id="yapay-zeka">
          <h2 class="sec-head"><span>${num("yapay-zeka")}</span>${esc(L.aiWork)}</h2>
          <div class="sec-body">
            <div class="works ai-works">${S.aiIsler
              .map((p, i) => {
                const tag = (p.onizleme || p.onizlemeGorsel) || p.link ? "a" : "article";
                const attrs = (p.onizleme || p.onizlemeGorsel)
                  ? ` href="#ai-${i + 1}"`
                  : p.link ? ` href="${esc(p.link)}" target="_blank" rel="noopener"` : "";
                return `<${tag} class="work${(p.onizleme || p.onizlemeGorsel) ? " has-detail" : ""}"${attrs}>
                  <div class="work-img">${p.gorsel
                    ? `<img src="${esc(p.gorsel)}" alt="${esc(t(p.baslik))}" loading="lazy" onerror="this.outerHTML='<span class=&quot;n&quot;>AI</span>'">`
                    : `<span class="n">AI</span>`}${(p.onizleme || p.onizlemeGorsel) ? `<em class="play">▶ ${esc(p.etkilesimli ? L.tryIt : L.preview)}</em>` : ""}</div>
                  <div class="work-cap"><span class="no">${nn(i + 1)}</span><h3>${esc(t(p.baslik))}</h3><span class="y">${esc(p.arac || "")}</span></div>
                  ${t(p.aciklama) ? `<p class="desc">${esc(t(p.aciklama))}</p>` : ""}
                  ${(p.onizleme || p.onizlemeGorsel) ? `<p class="desc more">${esc(p.etkilesimli ? L.tryOpen : L.previewOpen)}</p>` : ""}
                </${tag}>`;
              })
              .join("")}</div>
          </div>
        </section>` : ""}

        <section class="sec grid" id="iletisim">
          <h2 class="sec-head"><span>${num("iletisim")}</span>${esc(L.contact)}</h2>
          <div class="sec-body">
            <a class="mail" href="mailto:${esc(S.eposta)}">${esc(S.eposta)}</a>
            <div class="cols">
              ${S.telefon ? `<div><h3>${esc(L.phone)}</h3><a href="tel:${esc(S.telefon.replace(/\s/g, ""))}">${esc(S.telefon)}</a></div>` : ""}
              <div><h3>${esc(L.location)}</h3><p>${esc(t(S.konum))}</p></div>
              ${social.length ? `<div><h3>${esc(L.social)}</h3><ul>${social
                .map(([ad, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(ad)} ↗</a></li>`)
                .join("")}</ul></div>` : ""}
            </div>
          </div>
        </section>
      </main>

      <footer class="foot grid">
        <p>© ${new Date().getFullYear()} ${esc(S.ad)}</p>
        <a href="#ust">${esc(L.top)}</a>
      </footer>
      <div class="modal" id="modal" role="dialog" aria-modal="true" hidden></div>`;

    // Bölümlerin sağ üstündeki büyük kontur numaralar
    document.querySelectorAll(".sec").forEach((s) => {
      const n = s.querySelector(".sec-head span");
      if (n) s.dataset.n = n.textContent;
    });

    openFromHash();

    // Dil butonları
    document.querySelectorAll(".lang button").forEach((b) =>
      b.addEventListener("click", () => {
        lang = b.dataset.l;
        try { localStorage.setItem("dil", lang); } catch (e) {}
        const y = scrollY;
        render();
        scrollTo(0, y);
      })
    );

    // Menüde bulunduğun bölümü işaretle
    const links = [...document.querySelectorAll(".bar nav a")];
    const spy = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === `#${e.target.id}`));
      }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll(".sec").forEach((s) => spy.observe(s));
  }

  // ---- Proje sayfası (açılır pencere) ----
  function hasDetail(p) {
    return !!((p.gorseller && p.gorseller.length) || t(p.roller).length || (p.dosyalar || []).some(okLink));
  }

  function openProject(i) {
    const p = (S.projeler || [])[i];
    const m = document.getElementById("modal");
    if (!p || !m || !hasDetail(p)) return closeProject();
    const L = UI[lang];
    const imgs = p.gorseller && p.gorseller.length ? p.gorseller : p.gorsel ? [p.gorsel] : [];
    const files = (p.dosyalar || []).filter(okLink);
    const roles = t(p.roller) || [];
    const meta = [t(p.tur), t(p.yer), p.yil].filter(Boolean).map(esc).join(" · ");
    m.innerHTML = `
      <header class="bar grid">
        <span class="who">${esc(S.ad)}</span>
        <span class="m-title"><span class="red">${nn(i + 1)}</span> ${esc(t(p.baslik))}</span>
        <a href="#projeler" class="m-close">${esc(L.close)}</a>
      </header>
      <div class="m-body grid">
        <aside class="m-info">
          <p class="label">${meta}</p>
          <h2>${esc(t(p.baslik))}</h2>
          ${t(p.aciklama) ? `<p class="m-desc">${esc(t(p.aciklama))}</p>` : ""}
          ${roles.length ? `<p class="label">${esc(L.role)}</p><ol class="tasks">${roles
            .map((r, k) => `<li><span class="red">${nn(k + 1)}</span><div><b>${esc(r)}</b></div></li>`)
            .join("")}</ol>` : ""}
          ${files.length ? `<p class="label">${esc(L.files)}</p><ul class="m-files">${files
            .map((d) => `<li><a href="${esc(d.link)}" download target="_blank" rel="noopener"><span>${esc(t(d.ad))}</span><span class="red">${esc(L.download)}</span></a></li>`)
            .join("")}</ul>` : t(p.dosyaNotu) ? `<p class="label">${esc(L.files)}</p><p class="m-note">${esc(t(p.dosyaNotu))}</p>` : ""}
        </aside>
        <div class="m-gallery">${imgs
          .map((src, k) => `<figure><img src="${esc(src)}" alt="${esc(t(p.baslik))} — ${k + 1}" loading="${k < 2 ? "eager" : "lazy"}" onerror="this.parentNode.remove()"><figcaption>${nn(k + 1)} / ${nn(imgs.length)}</figcaption></figure>`)
          .join("")}</div>
      </div>`;
    m.hidden = false;
    m.scrollTop = 0;
    document.body.classList.add("locked");
  }

  function closeProject() {
    const m = document.getElementById("modal");
    if (m) { m.hidden = true; m.innerHTML = ""; }
    document.body.classList.remove("locked");
  }

  // Yapay zekâ işi: etkileşimi kapalı canlı önizleme
  function openAI(i) {
    const p = (S.aiIsler || [])[i];
    const m = document.getElementById("modal");
    if (!p || !(p.onizleme || p.onizlemeGorsel) || !m) return closeProject();
    const L = UI[lang];
    m.innerHTML = `
      <header class="bar grid">
        <span class="who">${esc(S.ad)}</span>
        <span class="m-title"><span class="red">AI</span> ${esc(t(p.baslik))}</span>
        <a href="#yapay-zeka" class="m-close">${esc(L.close)}</a>
      </header>
      <div class="ai-view grid">
        ${p.etkilesimli ? `<div class="ai-frame live"><div class="ai-scale"><iframe src="${esc(p.onizleme)}?onizleme" title="${esc(t(p.baslik))}" loading="eager"></iframe></div></div>`
        : `<div class="ai-frame">
          ${p.onizleme ? `<iframe src="${esc(p.onizleme)}?onizleme" title="${esc(t(p.baslik))}" tabindex="-1" loading="eager"></iframe>` : `<div class="ai-img"><img src="${esc(p.onizlemeGorsel)}" alt="${esc(t(p.baslik))}"></div>`}
          <div class="ai-shield" aria-hidden="true"></div>
          <span class="ai-badge">${esc(L.preview)}</span>
        </div>`}
        <div class="ai-info">
          <p class="label">${esc(p.arac || "")}${p.etkilesimli ? ` · <span class="red">${esc(L.tryIt)}</span>` : ""}</p>
          <h2>${esc(t(p.baslik))}</h2>
          <p class="m-desc">${esc(t(p.aciklama))}</p>
          <p class="m-note">${esc(p.etkilesimli ? L.tryNote : L.previewNote)}</p>
          ${p.etkilesimli ? `<p><a class="ai-full" href="${esc(p.onizleme)}" target="_blank" rel="noopener">${esc(L.fullscreen)}</a></p>` : ""}
        </div>
      </div>`;
    m.hidden = false;
    // Canlı araç: 1440×900 masaüstü düzeninde çalışsın, pencereye ölçeklensin
    const live = m.querySelector(".ai-frame.live");
    if (live) {
      const fit = () => { const sc = live.querySelector(".ai-scale"); if (sc) sc.style.transform = `scale(${live.clientWidth / 1440})`; };
      fit(); requestAnimationFrame(fit);
      if (window.ResizeObserver) new ResizeObserver(fit).observe(live); else addEventListener("resize", fit);
    }
    const fr = m.querySelector(".ai-frame iframe"), sh = m.querySelector(".ai-shield"), im = m.querySelector(".ai-img");
    if (im && sh) sh.addEventListener("wheel", (e) => { e.preventDefault(); im.scrollTop += e.deltaY; }, { passive: false });
    if (fr && sh) sh.addEventListener("wheel", (e) => { e.preventDefault(); try { fr.contentWindow.scrollBy(0, e.deltaY); } catch (_) {} }, { passive: false });
    m.scrollTop = 0;
    document.body.classList.add("locked");
  }

  function openFromHash() {
    const k = /^#proje-(\d+)$/.exec(location.hash);
    const a = /^#ai-(\d+)$/.exec(location.hash);
    if (k) openProject(+k[1] - 1);
    else if (a) openAI(+a[1] - 1);
    else closeProject();
  }

  addEventListener("hashchange", openFromHash);
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && /^#proje-/.test(location.hash)) location.hash = "projeler";
    if (e.key === "Escape" && /^#ai-/.test(location.hash)) location.hash = "yapay-zeka";
  });

  // ---- Özel fare imleci (sadece fare olan cihazlarda) ----
  function setupCursor() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cur-dot";
    ring.className = "cur-ring";
    ring.innerHTML = "<span></span>";
    document.body.append(dot, ring);
    document.documentElement.classList.add("has-cursor");

    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    addEventListener("mousemove", (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      document.documentElement.classList.remove("cur-out");
    });
    document.addEventListener("mouseleave", () => document.documentElement.classList.add("cur-out"));
    (function loop() {
      rx += (x - rx) * (calm ? 1 : 0.18);
      ry += (y - ry) * (calm ? 1 : 0.18);
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();

    addEventListener("mouseover", (e) => {
      const card = e.target.closest(".work.has-detail");
      const link = e.target.closest("a, button");
      ring.classList.toggle("on-card", !!card);
      ring.classList.toggle("on-link", !card && !!link);
      ring.querySelector("span").textContent = card ? UI[lang].cursor : "";
    });
    addEventListener("mousedown", () => ring.classList.add("down"));
    addEventListener("mouseup", () => ring.classList.remove("down"));
  }

  render();
  setupCursor();
})();
