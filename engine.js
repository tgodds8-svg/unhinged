function generateCharacterIntro(characters, setting) {
  if (!characters) {
    return "{protagonist} moved through the {place} like someone who had forgotten how to be afraid. Or maybe they had simply run out of fear, spent it all on something that could not be named.";
  }
  
  const lines = characters.split('\n').filter(l => l.trim());
  let intro = "";
  
  lines.forEach((line, i) => {
    if (line.includes(':') || line.includes('-')) {
      const parts = line.split(/:|-/).map(p => p.trim());
      const name = parts[0];
      const desc = parts[1] || "a figure of mystery";
      
      const templates = [
        `${name}—${desc}—stood at the edge of everything, watching.`,
        `They called ${name} ${desc}. They didn't know the half of it.`,
        `${name} had the look of someone who ${desc.toLowerCase()}. It was the first thing you noticed. The second thing was the blood.`,
        `If ${name} was ${desc.toLowerCase()}, nobody had bothered to tell them. They operated on their own frequency.`
      ];
      
      intro += templates[i % templates.length] + "\n\n";
    }
  });
  
  return intro || "The characters moved through this place like ghosts haunting their own lives.";
}
