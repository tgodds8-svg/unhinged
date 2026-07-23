// Optimized generateCharacterIntro with hoisted constants, templates, and debounce helper
const LINE_SEP = /\r?\n/;
const PART_SEP = /:|-/;
const MAX_INPUT_CHARS = 10000;

const TEMPLATES = [
  (name, desc) => `${name} ${desc}. They called ${name} ${desc.toLowerCase()}.`,
  (name, desc) => `${name} looked at the edge of everything, watching.`,
  (name, desc) => `${name} had the look of someone who ${desc.toLowerCase()}`
];

function generateCharacterIntro(characters, setting) {
  // Fast-path for empty input
  if (!characters || !characters.trim()) {
    return "The characters moved through this place like ghosts haunting their own lives.";
  }

  // Enforce a soft input limit to avoid extreme allocations
  let input = characters;
  if (input.length > MAX_INPUT_CHARS) {
    input = input.slice(0, MAX_INPUT_CHARS);
  }

  const lines = input.split(LINE_SEP).map(l => l.trim()).filter(Boolean);
  const out = new Array(lines.length);

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(PART_SEP).map(p => p.trim());
    const name = parts[0] || "Someone";
    const desc = parts[1] || "a figure of mystery";
    const tpl = TEMPLATES[i % TEMPLATES.length];
    out[i] = tpl(name, desc);
  }

  // join once
  return out.join("\n\n");
}

// Simple debounce helper exposed for the page to use for live previews.
function debounce(fn, wait) {
  let t = null;
  return function(...args) {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

// A small convenience that updates an output element with a debounced preview
const debouncedPreview = debounce((inputId, outputId) => {
  const el = document.getElementById(inputId);
  const out = document.getElementById(outputId);
  if (!el || !out) return;
  const preview = generateCharacterIntro(el.value);
  // preserve whitespace in output container (expects CSS white-space: pre-wrap)
  out.textContent = preview;
}, 250);
