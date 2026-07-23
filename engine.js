// ==========================================
// UNHINGED LOCAL ENGINE CORE LOGIC
// ==========================================
const LINE_SEP = /\r?\n/;
const PART_SEP = /:|-/;
const MAX_INPUT_CHARS = 10000;

const TEMPLATES = [
  (name, desc) => `${name} ${desc}. They called ${name} ${desc.toLowerCase()}.`,
  (name, desc) => `${name} looked at the edge of everything, watching.`,
  (name, desc) => `${name} had the look of someone who ${desc.toLowerCase()}`
];

function generateCharacterIntro(characters, setting) {
  if (!characters || !characters.trim()) {
    return "The characters moved through this place like ghosts haunting their own lives.";
  }

  let input = characters;
  if (input.length > MAX_INPUT_CHARS) {
    input = input.slice(0, MAX_INPUT_CHARS);
  }

  const lines = input.split(LINE_SEP).map(l => l.trim()).filter(Boolean);
  const out = new Array(lines.length);

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(PART_SEP).map(p => p.trim());
    
    // Explicit array indexes to prevent raw data-array dumps
    const name = parts[0] || "Someone";
    const desc = parts[1] || "a figure of mystery";
    
    const tpl = TEMPLATES[i % TEMPLATES.length];
    out[i] = tpl(name, desc);
  }

  return out.join("\n\n");
}

// ==========================================
// UI NAVIGATION & INTERFACE ROUTING BRIDGE
// ==========================================
let currentMode = 'local';

function setMode(mode) {
  currentMode = mode;
  document.getElementById('mode-local').classList.toggle('active', mode === 'local');
  document.getElementById('mode-api').classList.toggle('active', mode === 'api');
  document.getElementById('api-fields').classList.toggle('hidden', mode === 'local');
  document.getElementById('local-info').classList.toggle('hidden', mode === 'api');
}

// Global button router connecting HTML layouts directly to the function logic
function aiGen(type) {
  if (currentMode === 'local') {
    if (type === 'characters') {
      const inputData = document.getElementById('characters').value;
      const settingData = document.getElementById('setting').value;
      
      const result = generateCharacterIntro(inputData, settingData);
      document.getElementById('characters').value = result;
    } else {
      alert(`Local template algorithm for "${type}" triggered. Expand template definitions inside engine.js to process this field.`);
    }
  } else {
    console.log(`Routing an external API pipeline request for block element: ${type}`);
  }
}
