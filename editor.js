/* =========================================================
   BULUT DÜZENLEYİCİ
   claude.ai'de açıldığında, sayfanın sahibine "Düzenle" düğmesi
   gösterir. İçerik hesabındaki veritabanına kaydedilir; her
   bilgisayardan aynı linkle açıp düzenleyebilirsin.
   Netlify / yerel kopyada hiçbir şey yapmaz (data.js geçerlidir).
   ========================================================= */
(function () {
  const P = window.PORTFOLYO;
  if (!P) return;
  const SITE = P.site;
  const DOC = "site/icerik";

  // Yerel deneme: ?duzenle-test ile sahte bulut (yalnız bu tarayıcı)
  if (!window.claude && /duzenle-test/.test(location.search)) window.claude = mockClaude();
  if (!window.claude || typeof window.claude.use !== "function") return;

  const LABEL = {
    renkler: "Renkler", kagit: "Arka plan", yazi: "Yazı", vurgu: "Vurgu rengi", varsayilanDil: "Açılış dili",
    ad: "Ad soyad", unvan: "Unvan", konum: "Konum", yil: "Yıl", koordinat: "Koordinat notu", profilFoto: "Profil fotoğrafı",
    cvLinki: "CV bağlantısı", ozet: "Özet", hakkimda: "Hakkımda", oneCikanlar: "Öne çıkanlar", yetkinlikler: "Yetkinlikler",
    yapayZeka: "Yapay zekâ", aiIsler: "Yapay zekâ işleri", yazilimlar: "Yazılımlar", diller: "Diller", deneyim: "Deneyim",
    sertifikalar: "Sertifikalar", egitim: "Eğitim", fuar: "Fuar", projeNotu: "Proje notu", projeler: "Projeler",
    eposta: "E-posta", telefon: "Telefon", sosyal: "Sosyal medya", baslik: "Başlık", tur: "Tür", yer: "Yer",
    aciklama: "Açıklama", roller: "Üstlendiğim işler", gorsel: "Kapak görseli", gorseller: "Görseller",
    dosyalar: "İndirilebilir dosyalar", link: "Bağlantı", linkler: "Bağlantılar", onizleme: "Önizleme sayfası",
    onizlemeGorsel: "Önizleme görseli", etkilesimli: "Canlı denenebilir", kurum: "Kurum", tarih: "Tarih",
    gorevler: "Görevler", metin: "Metin", seviye: "Seviye", baslangic: "Başlangıç", bitis: "Bitiş",
  };
  const KIMLIK = "__kimlik";
  const lbl = (k) => LABEL[k] || String(k);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const isImg = (k, v) =>
    typeof v === "string" &&
    (/^(gorsel|profilFoto|onizlemeGorsel|foto|resim)$/.test(String(k)) || /\.(jpe?g|png|webp|gif|avif|svg)(\?|$)/i.test(v) || v.startsWith("/_blob/"));
  const isLang = (v) => v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length && Object.keys(v).every((k) => k === "tr" || k === "en");
  const titleOf = (o, i) => {
    if (!o || typeof o !== "object") return `#${i + 1}`;
    for (const k of ["baslik", "ad", "kurum", "isim", "unvan", "metin", "tr"]) {
      const v = o[k];
      const s = typeof v === "string" ? v : v && (v.tr || v.en);
      if (s && typeof s === "string") return `${i + 1}. ${s.slice(0, 48)}`;
    }
    return `#${i + 1}`;
  };

  let db = null, assets = null, downloads = null;
  let saveTimer = 0, drawTimer = 0, saving = false, dirty = false, lastJson = "";
  let section = null;
  const base = clone(SITE); // data.js'teki ilk hâl

  function replaceSite(obj) {
    Object.keys(SITE).forEach((k) => delete SITE[k]);
    Object.assign(SITE, clone(obj));
  }

  // ---------- Başlangıç ----------
  (async () => {
    const [d, u] = await Promise.all([claude.use("db"), claude.use("user")]);
    db = d;
    if (!db) return;
    let first = true;
    const timer = setTimeout(() => setStatus("Bulut yanıt vermedi", true), 10000);
    db.doc(DOC).onSnapshot(
      (snap) => {
        clearTimeout(timer);
        const data = snap.exists ? snap.data() : null;
        const json = data && typeof data.json === "string" ? data.json : "";
        if (json && json !== lastJson && !dirty) {
          lastJson = json;
          try { replaceSite(JSON.parse(json)); P.yenile(); if (panel && !panel.hidden) buildForm(); } catch (e) {}
          if (!first) setStatus("Başka bir cihazdan güncellendi");
        }
        if (first) { first = false; setStatus(json ? "Buluttaki içerik" : "Henüz bulutta kayıt yok — data.js gösteriliyor"); }
      },
      () => { clearTimeout(timer); setStatus("Bulut bağlantısı koptu — sayfayı yenile", true); }
    );
    const canEdit = !!u && ((u.isOwner && u.isOwner()) || (u.canEdit && u.canEdit()));
    if (!canEdit) return;
    [assets, downloads] = await Promise.all([claude.use("assets"), claude.use("downloads")]);
    mountUI();
  })();

  // ---------- Kaydetme ----------
  function changed() {
    dirty = true;
    setStatus("Kaydediliyor…");
    clearTimeout(drawTimer);
    drawTimer = setTimeout(() => P.yenile(), 250);
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, 1200);
  }
  async function save() {
    if (saving) { saveTimer = setTimeout(save, 600); return; }
    saving = true;
    const json = JSON.stringify(SITE);
    try {
      await db.doc(DOC).set({ json, guncelleme: Date.now() });
      lastJson = json;
      dirty = false;
      setStatus("Kaydedildi · " + new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
    } catch (e) {
      setStatus("Kaydedilemedi: " + ((e && (e.message || e.code)) || "hata"), true);
    } finally { saving = false; }
  }

  // ---------- Arayüz ----------
  let panel, statusEl, formEl, sectionSel;
  function setStatus(s, bad) {
    if (!statusEl) return;
    statusEl.textContent = s;
    statusEl.classList.toggle("bad", !!bad);
  }

  function mountUI() {
    const st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);

    const btn = document.createElement("button");
    btn.className = "ed-fab";
    btn.type = "button";
    btn.textContent = "✎ Düzenle";
    document.body.appendChild(btn);

    panel = document.createElement("aside");
    panel.className = "ed-panel";
    panel.hidden = true;
    panel.innerHTML = `
      <header class="ed-head">
        <div><b>İçerik düzenleyici</b><small class="ed-status">Hazır</small></div>
        <button type="button" class="ed-x" aria-label="Kapat">✕</button>
      </header>
      <label class="ed-sec">Bölüm <select></select></label>
      <div class="ed-form"></div>
      <footer class="ed-foot">
        <button type="button" class="ed-dl">data.js indir (Netlify için)</button>
        <button type="button" class="ed-reset">Buluttaki değişiklikleri sil</button>
        <p>Değişiklikler otomatik kaydedilir ve hesabına bağlıdır: bu linki hangi bilgisayardan açarsan aç aynı içerik gelir. Ziyaretçiler düzenleme düğmesini görmez.</p>
      </footer>`;
    document.body.appendChild(panel);
    statusEl = panel.querySelector(".ed-status");
    formEl = panel.querySelector(".ed-form");
    sectionSel = panel.querySelector("select");

    btn.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      document.body.classList.toggle("ed-open", !panel.hidden);
      if (!panel.hidden) buildForm();
    });
    panel.querySelector(".ed-x").addEventListener("click", () => btn.click());
    sectionSel.addEventListener("change", () => { section = sectionSel.value; buildForm(); formEl.scrollTop = 0; });
    panel.querySelector(".ed-dl").addEventListener("click", exportData);
    panel.querySelector(".ed-reset").addEventListener("click", async () => {
      if (!confirm("Buluttaki tüm düzenlemeler silinsin ve site data.js'teki hâline dönsün mü? Bu geri alınamaz.")) return;
      try {
        await db.doc(DOC).delete();
        lastJson = ""; dirty = false;
        replaceSite(base); P.yenile(); buildForm();
        setStatus("Sıfırlandı — data.js gösteriliyor");
      } catch (e) { setStatus("Silinemedi", true); }
    });
    setStatus(lastJson ? "Buluttaki içerik" : "Henüz bulutta kayıt yok — ilk değişiklikte kaydedilir");
  }

  function sections() {
    const keys = Object.keys(SITE);
    const prim = keys.filter((k) => SITE[k] === null || typeof SITE[k] !== "object" || isLang(SITE[k]));
    const rest = keys.filter((k) => !prim.includes(k));
    const order = ["projeler", "hakkimda", "ozet", "deneyim", "aiIsler", "oneCikanlar", "egitim", "sertifikalar", "fuar"];
    rest.sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
    return [[KIMLIK, "Kimlik ve iletişim"], ...rest.map((k) => [k, lbl(k)])]
      .map(([k, l]) => ({ k, l, prim: k === KIMLIK ? prim : null }));
  }

  function buildForm() {
    if (!formEl) return;
    const secs = sections();
    if (!section || !secs.some((s) => s.k === section)) section = secs[1] ? secs[1].k : secs[0].k;
    sectionSel.innerHTML = secs.map((s) => `<option value="${s.k}"${s.k === section ? " selected" : ""}>${esc(s.l)}</option>`).join("");
    formEl.innerHTML = "";
    const s = secs.find((x) => x.k === section);
    if (s.prim) s.prim.forEach((k) => formEl.appendChild(field(SITE, k)));
    else formEl.appendChild(field(SITE, section, true));
  }

  // Bir alanın düzenleme kutusunu üretir; değişiklikte parent[key]'i günceller
  function field(parent, key, top) {
    const v = parent[key];
    const wrap = el("div", "ed-f");
    if (!top) wrap.appendChild(el("div", "ed-l", lbl(key)));

    if (isLang(v)) {
      const g = el("div", "ed-lang");
      ["tr", "en"].forEach((L) => {
        const row = el("div", "ed-lrow");
        row.appendChild(el("span", "ed-tag", L.toUpperCase()));
        if (!(L in v)) v[L] = Array.isArray(v.tr || v.en) ? [] : "";
        row.appendChild(valueEditor(v, L, key));
        g.appendChild(row);
      });
      wrap.appendChild(g);
    } else {
      wrap.appendChild(valueEditor(parent, key, key));
    }
    return wrap;
  }

  function valueEditor(parent, key, hintKey) {
    const v = parent[key];
    if (typeof v === "boolean") {
      const c = el("input"); c.type = "checkbox"; c.checked = v;
      c.addEventListener("change", () => { parent[key] = c.checked; changed(); });
      const l = el("label", "ed-check"); l.append(c, " evet"); return l;
    }
    if (typeof v === "number") {
      const i = el("input", "ed-in"); i.type = "number"; i.value = v;
      i.addEventListener("input", () => { parent[key] = Number(i.value); changed(); });
      return i;
    }
    if (v === null || v === undefined || typeof v === "string") {
      if (isImg(hintKey, v || "") || /^(gorsel|profilFoto|onizlemeGorsel)$/.test(hintKey)) return imageEditor(parent, key);
      return textEditor(parent, key);
    }
    if (Array.isArray(v)) return arrayEditor(parent, key, hintKey);
    if (typeof v === "object") {
      const box = el("div", "ed-obj");
      Object.keys(v).forEach((k) => box.appendChild(field(v, k)));
      return box;
    }
    return el("span", "", String(v));
  }

  function textEditor(parent, key) {
    const v = parent[key] ?? "";
    const long = v.length > 60 || /aciklama|metin|ozet|not/i.test(String(key));
    const i = el(long ? "textarea" : "input", "ed-in");
    i.value = v;
    if (long) { i.rows = Math.min(10, Math.max(2, Math.ceil(v.length / 52))); }
    i.addEventListener("input", () => { parent[key] = i.value; changed(); });
    return i;
  }

  function imageEditor(parent, key) {
    const box = el("div", "ed-img");
    const th = el("img"); th.alt = "";
    const i = el("input", "ed-in"); i.value = parent[key] || "";
    const sync = () => { th.src = i.value; th.style.visibility = i.value ? "" : "hidden"; };
    sync();
    i.addEventListener("input", () => { parent[key] = i.value; sync(); changed(); });
    const side = el("div", "ed-img-side");
    side.appendChild(i);
    if (assets) {
      const up = el("button", "ed-small", "Görsel yükle"); up.type = "button";
      const f = el("input"); f.type = "file"; f.accept = "image/*"; f.hidden = true;
      up.addEventListener("click", () => f.click());
      f.addEventListener("change", async () => {
        const file = f.files && f.files[0];
        if (!file) return;
        up.disabled = true; up.textContent = "Yükleniyor…";
        try {
          const blob = await shrink(file);
          const r = await assets.upload(blob);
          i.value = "/_blob/" + r.id;
          parent[key] = i.value; sync(); changed();
        } catch (e) {
          setStatus("Görsel yüklenemedi: " + ((e && (e.message || e.code)) || "hata"), true);
        } finally { up.disabled = false; up.textContent = "Görsel yükle"; f.value = ""; }
      });
      side.append(up, f);
    }
    box.append(th, side);
    return box;
  }

  function arrayEditor(parent, key, hintKey) {
    const arr = parent[key];
    const box = el("div", "ed-arr");
    const objs = arr.some((x) => x && typeof x === "object");
    const redraw = () => { const n = arrayEditor(parent, key, hintKey); box.replaceWith(n); };
    arr.forEach((item, idx) => {
      const tools = el("span", "ed-tools");
      const mk = (txt, title, fn) => { const b = el("button", "ed-ico", txt); b.type = "button"; b.title = title; b.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); fn(); }); tools.appendChild(b); };
      mk("↑", "Yukarı taşı", () => { if (idx > 0) { [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]; changed(); redraw(); } });
      mk("↓", "Aşağı taşı", () => { if (idx < arr.length - 1) { [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]]; changed(); redraw(); } });
      if (objs) mk("⧉", "Kopyala", () => { arr.splice(idx + 1, 0, clone(item)); changed(); redraw(); });
      mk("✕", "Sil", () => { if (!objs || confirm(`"${titleOf(item, idx)}" silinsin mi?`)) { arr.splice(idx, 1); changed(); redraw(); } });

      if (objs) {
        const d = el("details", "ed-item");
        const sm = el("summary", "", "");
        sm.appendChild(el("span", "ed-sum", titleOf(item, idx)));
        sm.appendChild(tools);
        d.appendChild(sm);
        d.addEventListener("toggle", () => {
          if (d.open && d.children.length === 1) {
            const inner = el("div", "ed-obj");
            if (item && typeof item === "object") Object.keys(item).forEach((k) => inner.appendChild(field(item, k)));
            d.appendChild(inner);
            inner.addEventListener("input", () => { sm.querySelector(".ed-sum").textContent = titleOf(item, idx); });
          }
        });
        box.appendChild(d);
      } else {
        const row = el("div", "ed-row");
        row.appendChild(valueEditor(arr, idx, hintKey === "gorseller" ? "gorsel" : hintKey));
        row.appendChild(tools);
        box.appendChild(row);
      }
    });
    const add = el("button", "ed-small", "+ Ekle"); add.type = "button";
    add.addEventListener("click", () => {
      const tpl = arr.length ? arr[arr.length - 1] : "";
      const blank = (x) => (Array.isArray(x) ? [] : x && typeof x === "object" ? Object.fromEntries(Object.entries(x).map(([k, y]) => [k, blank(y)])) : typeof x === "boolean" ? false : typeof x === "number" ? 0 : "");
      const n = objs ? blank(tpl) : "";
      arr.push(n);
      changed(); redraw();
      if (objs) setTimeout(() => { const ds = document.querySelectorAll(".ed-form .ed-item"); const last = ds[ds.length - 1]; if (last) { last.open = true; last.scrollIntoView({ block: "nearest" }); } }, 0);
    });
    box.appendChild(add);
    return box;
  }

  // Büyük görselleri 2400 px'e küçültür (JPEG)
  function shrink(file) {
    return new Promise((res) => {
      if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return res(file);
      const img = new Image();
      img.onload = () => {
        const M = 2400, s = Math.min(1, M / Math.max(img.width, img.height));
        if (s === 1 && file.size < 4e6) return res(file);
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        c.toBlob((b) => res(b || file), "image/jpeg", 0.86);
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => res(file);
      img.src = URL.createObjectURL(file);
    });
  }

  async function exportData() {
    const blobs = JSON.stringify(SITE).match(/\/_blob\/[0-9a-f]+/g) || [];
    const head =
      "/* =========================================================\n   PORTFOLYO İÇERİĞİ — bulut düzenleyiciden dışa aktarıldı\n   " +
      new Date().toLocaleString("tr-TR") +
      "\n   ========================================================= */\n\n";
    const text = head + "const SITE = " + JSON.stringify(SITE, null, 2) + ";\n";
    if (blobs.length && !confirm(`${blobs.length} görsel claude.ai'ye yüklendi ("/_blob/…"). Bunlar Netlify'da görünmez; o görselleri assets klasörüne koyup yollarını değiştirmen gerekir. Yine de indirilsin mi?`)) return;
    try {
      if (downloads) await downloads.save({ filename: "data.js", data: text });
      else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([text], { type: "text/javascript" }));
        a.download = "data.js"; a.click();
      }
      setStatus("data.js hazır");
    } catch (e) { setStatus("İndirme iptal edildi"); }
  }

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null && text !== "") e.textContent = text;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  // Yerel deneme için sahte bulut
  function mockClaude() {
    const K = "ed-mock-db";
    const subs = [];
    const read = () => { try { return JSON.parse(localStorage.getItem(K) || "null"); } catch (e) { return null; } };
    const snap = (d) => ({ exists: !!d, data: () => d || undefined });
    const ref = {
      onSnapshot(fn) { subs.push(fn); setTimeout(() => fn(snap(read())), 50); return () => {}; },
      async get() { return snap(read()); },
      async set(d) { localStorage.setItem(K, JSON.stringify(d)); },
      async delete() { localStorage.removeItem(K); },
    };
    const caps = {
      db: { doc: () => ref },
      user: { isOwner: () => true, canEdit: () => true },
      assets: { async upload(b) { return { id: "yerel", url: URL.createObjectURL(b) }; } },
      downloads: null,
    };
    return { use: async (n) => caps[n] ?? null };
  }

  const CSS = `
  .ed-fab{position:fixed;right:18px;bottom:18px;z-index:200;background:var(--red);color:#fff;border:0;border-radius:999px;padding:11px 18px;font:500 14px/1 var(--font);cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.18)}
  body.ed-open .ed-fab{display:none}
  .ed-panel{position:fixed;top:0;right:0;bottom:0;width:min(440px,100vw);z-index:210;background:#fff;color:#1d1c1a;border-left:1px solid #ddd;display:flex;flex-direction:column;font:14px/1.4 var(--font);box-shadow:-10px 0 30px rgba(0,0,0,.08)}
  .ed-panel[hidden]{display:none}
  .ed-head{display:flex;justify-content:space-between;align-items:center;padding:16px 18px 10px;border-bottom:1px solid #eee}
  .ed-head b{display:block;font-weight:500;font-size:16px}
  .ed-status{display:block;color:#777;font-size:12px;margin-top:2px}.ed-status.bad{color:#a3201b}
  .ed-x{border:0;background:none;font-size:18px;cursor:pointer;padding:6px}
  .ed-sec{display:flex;gap:10px;align-items:center;padding:10px 18px;border-bottom:1px solid #eee;font-size:12px;color:#777}
  .ed-sec select{flex:1;font:inherit;font-size:14px;color:#1d1c1a;padding:7px 8px;border:1px solid #ccc;border-radius:6px;background:#fff}
  .ed-form{flex:1;overflow:auto;padding:14px 18px 30px}
  .ed-f{margin:0 0 14px}.ed-l{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#888;margin:0 0 5px}
  .ed-in{width:100%;font:inherit;font-size:14px;color:#1d1c1a;padding:7px 9px;border:1px solid #d6d3cd;border-radius:6px;background:#fbfaf8;resize:vertical}
  .ed-in:focus{outline:2px solid color-mix(in srgb,var(--red) 40%,transparent);border-color:var(--red);background:#fff}
  .ed-lang{display:grid;gap:6px}.ed-lrow{display:grid;grid-template-columns:26px 1fr;gap:6px;align-items:start}
  .ed-tag{font-size:10px;color:#999;padding-top:9px}
  .ed-obj{display:block;padding:10px 0 2px 10px;border-left:2px solid #eee}
  .ed-arr{display:grid;gap:6px}.ed-row{display:flex;gap:6px;align-items:flex-start}.ed-row>:first-child{flex:1;min-width:0}
  .ed-item{border:1px solid #e6e3de;border-radius:8px;background:#fff}
  .ed-item>summary{display:flex;align-items:center;gap:8px;padding:8px 10px;cursor:pointer;list-style:none}
  .ed-item>summary::-webkit-details-marker{display:none}
  .ed-item[open]>summary{border-bottom:1px solid #eee}.ed-item>.ed-obj{padding:12px 12px 4px;border:0}
  .ed-sum{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}
  .ed-tools{display:flex;gap:2px;flex:none}
  .ed-ico{border:0;background:none;width:26px;height:26px;border-radius:5px;cursor:pointer;color:#777;font-size:13px}.ed-ico:hover{background:#f1efeb;color:#1d1c1a}
  .ed-small{justify-self:start;border:1px solid #d6d3cd;background:#fff;border-radius:6px;padding:6px 10px;font:inherit;font-size:13px;cursor:pointer}.ed-small:hover{border-color:var(--red);color:var(--red)}
  .ed-img{display:grid;grid-template-columns:72px 1fr;gap:8px;align-items:start}
  .ed-img img{width:72px;height:48px;object-fit:cover;border-radius:4px;background:#eee}
  .ed-img-side{display:grid;gap:6px}
  .ed-check{display:flex;gap:6px;align-items:center}
  .ed-foot{border-top:1px solid #eee;padding:12px 18px 16px;display:grid;gap:8px}
  .ed-foot button{font:inherit;font-size:13px;padding:8px 10px;border-radius:6px;cursor:pointer;border:1px solid #d6d3cd;background:#fff;text-align:left}
  .ed-foot .ed-dl{border-color:var(--red);color:var(--red)}
  .ed-foot .ed-reset{color:#777}
  .ed-foot p{margin:2px 0 0;font-size:12px;color:#888}
  @media (min-width:1360px){body.ed-open #app{margin-right:440px}}
  `;
})();
