// Gift data
const gifts = [
  { category: "MAKE UP", name: "Backstage Glow Face Pallete shade universa (Dior)" },
  { category: "MAKE UP", name: "Eyelash curler (lashboss) Addict Refillable shine lipstick shade 727 (Dior)" },
  { category: "MAKE UP", name: "Ysl touche glow pact cushion shade B20 (Ysl)" },
  { category: "MAKE UP", name: "Brush 3 pcs (aeris)" },
  { category: "MAKE UP", name: "Loose powder shade fair light (something)" },
  { category: "MAKE UP", name: "Beautybland (haquhara)" },
  { category: "MAKE UP", name: "Airbrush flawles setting spray (charlotte tilbury)" },
  { category: "MAKE UP", name: "Lume baked powder blush shade maja (guele)" },
  { category: "MAKE UP", name: "Cream blush (shade hope)" },
  { category: "MAKE UP", name: "Embryolisse lait cream (30ml)" },
  { category: "MAKE UP", name: "Noir lash mascara (instaperfect)" },
  { category: "PERLENGKAPAN IBADAH", name: "Mukena (Heylocal)" },
  { category: "PERLENGKAPAN IBADAH", name: "Sajadah (howel & co)", bought: true },
  { category: "PERLENGKAPAN IBADAH", name: "Al quran mini", bought: true },
  { category: "PERLENGKAPAN IBADAH", name: "Tasbih" },
  { category: "SKINCARE", name: "Cleansing Oil (Centella madagascar 1004)" },
  { category: "SKINCARE", name: "Sabun cuci muka low Ph (Cosrx)" },
  { category: "SKINCARE", name: "Soothing toner (anua)" },
  { category: "SKINCARE", name: "Brightning capsule ampule (Centella skin 1004)" },
  { category: "SKINCARE", name: "Sunscreen hyalu cica water fit (Centella 1004)" },
  { category: "SKINCARE", name: "Cica pad (Npure)" },
  { category: "SKINCARE", name: "Sheet mask (Npure)" },
  { category: "SKINCARE", name: "Lait cream concentrate moisterizer (embryolise)" },
  { category: "BODYCARE", name: "Almond milk scrub (The body shop)" },
  { category: "BODYCARE", name: "Almond milk body butter (The body shop)" },
  { category: "BODYCARE", name: "Body mist (bath and body works)" },
  { category: "BODYCARE", name: "Parfume (bebas apa aja)" },
  { category: "PERALATAN MANDI", name: "Shower puff" },
  { category: "PERALATAN MANDI", name: "Handuk couple (howel & co)", bought: true },
  { category: "PERALATAN MANDI", name: "Sabun (bath and body works)" },
  { category: "PERALATAN MANDI", name: "Shampo (bath and body works)" },
  { category: "PERALATAN MANDI", name: "Cermin kecil" },
  { category: "ACCESSORIES", name: "Tas tangan (charles and keith)" },
  { category: "ACCESSORIES", name: "Tas (teserah apa aja)" },
  { category: "ACCESSORIES", name: "Sneakers (teserah kamu aja)" },
  { category: "ACCESSORIES", name: "Heels (staccato/steve madden)" },
  { category: "ACCESSORIES", name: "Flatshoes (dianalable)" },
  { category: "BAKAL & BAJU", name: "Pashmina viscose (hijabqa)" },
  { category: "BAKAL & BAJU", name: "Pashmina ceruty (daissy)" },
  { category: "BAKAL & BAJU", name: "Pashmina kaos (lafiye)" },
  { category: "BAKAL & BAJU", name: "Bakal baju 3 meter" },
  { category: "BAKAL & BAJU", name: "Renda baju 3 meter" },
  { category: "BAKAL & BAJU", name: "Baju (bebas apa aja)" },
  { category: "LAIN-LAIN", name: "Piyama couple (bebas)" },
  { category: "LAIN-LAIN", name: "Linggerie" },
  { category: "LAIN-LAIN", name: "Daleman (3bra&3underware)" },
  { category: "LAIN-LAIN", name: "Kain sarung 2 pcs", bought: true },
  { category: "LAIN-LAIN", name: "Kain jarik barik 2 pcs" },
  { category: "LAIN-LAIN", name: "Sisir" },
];

const giftList = document.getElementById("giftList");
const categoryFilter = document.getElementById("categoryFilter");

// Populate category filter
const categories = [...new Set(gifts.map(g => g.category))];
categories.forEach(cat => {
  const opt = document.createElement("option");
  opt.value = cat;
  opt.textContent = cat;
  categoryFilter.appendChild(opt);
});

// Load bought status from localStorage
function loadStatus() {
  const saved = JSON.parse(localStorage.getItem("giftStatus")) || {};
  gifts.forEach(g => {
    if (saved[g.name]) g.bought = true;
  });
}

// Save bought status
function saveStatus() {
  const status = {};
  gifts.forEach(g => {
    if (g.bought) status[g.name] = true;
  });
  localStorage.setItem("giftStatus", JSON.stringify(status));
}

// Render gifts
function renderGifts(filter = "all") {
  giftList.innerHTML = "";
  gifts
    .filter(g => filter === "all" || g.category === filter)
    .forEach(g => {
      const card = document.createElement("div");
      card.className = "gift-card" + (g.bought ? " bought" : "");

      // Placeholder image if no picture
      const img = document.createElement("img");
      img.src = "https://via.placeholder.com/250x160?text=" + encodeURIComponent(g.name.split(" ")[0]);
      img.alt = g.name;

      const title = document.createElement("h3");
      title.textContent = g.name;

      const category = document.createElement("p");
      category.textContent = g.category;

      const btn = document.createElement("button");
      btn.className = "mark";
      btn.textContent = g.bought ? "Bought ✅" : "Mark as Bought";
      btn.onclick = () => {
        g.bought = !g.bought;
        saveStatus();
        renderGifts(filter);
      };

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(category);
      card.appendChild(btn);

      giftList.appendChild(card);
    });
}

categoryFilter.addEventListener("change", e => renderGifts(e.target.value));

// Initialize
loadStatus();
renderGifts();
