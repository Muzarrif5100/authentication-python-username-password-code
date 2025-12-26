const el = (id) => document.getElementById(id);

const form = el("form");
const loading = el("loading");
const result = el("result");

const yourName = el("yourName");
const yourAge = el("yourAge");
const loverName = el("loverName");
const loverAge = el("loverAge");
const calcBtn = el("calcBtn");
const againBtn = el("againBtn");

const loadingText = el("loadingText");
const lovePercentNow = el("lovePercentNow");
const loveBarFill = el("loveBarFill");

const pairLine = el("pairLine");
const loveFinalPercent = el("loveFinalPercent");
const flemsLabel = el("flemsLabel");
const flemsDesc = el("flemsDesc");

const LOADING_LINES = [
  "Matching hearts…",
  "Checking chemistry…",
  "Counting sweet moments…",
  "Final love scan…",
];

function show(section) {
  [form, loading, result].forEach((block) => block.classList.add("hidden"));
  section.classList.remove("hidden");
}

function cleanName(value) {
  return (value || "").trim().replace(/\s+/g, " ");
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function calcLovePercent(aName, aAge, bName, bAge) {
  const seed = `${aName.toLowerCase()}|${aAge}|${bName.toLowerCase()}|${bAge}`;
  const h = hashString(seed);

  let pct = 30 + (h % 71);
  const ageGap = Math.abs((aAge || 0) - (bAge || 0));
  if (ageGap <= 2) pct += 6;
  if (ageGap >= 12) pct -= 5;

  return Math.max(10, Math.min(100, pct));
}

function flemsFromPercent(pct) {
  if (pct >= 85) {
    return { code: "L", label: "Love ❤️", emoji: "💖", desc: "True love vibes between you two." };
  }
  if (pct >= 70) {
    return { code: "M", label: "Marriage 💍", emoji: "💍", desc: "Strong bond that feels like marriage energy." };
  }
  if (pct >= 55) {
    return { code: "F", label: "Friend 🤝", emoji: "🤝", desc: "Great friendship and support energy." };
  }
  if (pct >= 40) {
    return { code: "S", label: "Sister 👧", emoji: "👧", desc: "Caring, protective, sibling-like connection." };
  }
  return { code: "E", label: "Enemy 😈", emoji: "😈", desc: "Opposite energy right now. Give it time." };
}

function runLoveCalculator() {
  const aName = cleanName(yourName.value);
  const bName = cleanName(loverName.value);
  const aAge = Number.parseInt(yourAge.value, 10);
  const bAge = Number.parseInt(loverAge.value, 10);

  if (!aName || !bName || !aAge || !bAge) {
    alert("Please fill all fields ❤️");
    return;
  }

  const target = calcLovePercent(aName, aAge, bName, bAge);
  const flems = flemsFromPercent(target);

  lovePercentNow.textContent = "0";
  loveBarFill.style.width = "0%";
  loadingText.textContent = LOADING_LINES[0];
  show(loading);

  let lineIndex = 0;
  const lineTimer = setInterval(() => {
    lineIndex = (lineIndex + 1) % LOADING_LINES.length;
    loadingText.textContent = LOADING_LINES[lineIndex];
  }, 850);

  const duration = 2200;
  const start = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const current = Math.floor(t * target);

    lovePercentNow.textContent = String(current);
    loveBarFill.style.width = `${current}%`;

    if (t < 1) {
      requestAnimationFrame(tick);
      return;
    }

    clearInterval(lineTimer);
    pairLine.textContent = `${aName} (${aAge}) ❤️ ${bName} (${bAge})`;
    loveFinalPercent.textContent = String(target);
    flemsLabel.textContent = `FLEMS Result: ${flems.code}`;
    flemsDesc.textContent = `${flems.label} ${flems.emoji} — ${flems.desc}`;
    show(result);
  }

  requestAnimationFrame(tick);
}

calcBtn.addEventListener("click", runLoveCalculator);
againBtn.addEventListener("click", () => show(form));

show(form);
