const { chromium } = require("playwright");
const fs = require("fs");
const AUS = "/tmp/claude-0/-home-user-MyMeditationIsland/27b0af7f-8421-501c-91c5-ff0790bc6557/scratchpad/svg/";

// Gleiche Familie wie die bestehenden Bilder: eine Farbe, gleichmaessig
// dicke Linien, runde Enden, Motiv fuellt gut drei Viertel des Feldes.
const FARBE = "#8A6A2F", DICKE = 5.2;
const motive = {
  "haken": `<circle cx="50" cy="50" r="34"/><path d="M35 51 L45 61 L66 38"/>`,
  "sanduhr": `<path d="M31 17 H69"/><path d="M31 83 H69"/>
              <path d="M36 17 C36 37 50 44 50 50 C50 56 36 63 36 83"/>
              <path d="M64 17 C64 37 50 44 50 50 C50 56 64 63 64 83"/>`,
  "schloss": `<rect x="27" y="47" width="46" height="37" rx="8"/>
              <path d="M37 47 V37 a13 13 0 0 1 26 0 V47"/>`
};

(async () => {
  const b = await chromium.launch({ executablePath:"/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  const p = await (await b.newContext({viewport:{width:240,height:240}, deviceScaleFactor:1})).newPage();
  for (const [n, inhalt] of Object.entries(motive)){
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 100 100">
      <g fill="none" stroke="${FARBE}" stroke-width="${DICKE}" stroke-linecap="round" stroke-linejoin="round">${inhalt}</g></svg>`;
    fs.writeFileSync(AUS+n+".svg", svg);
    await p.setContent(`<body style="margin:0;background:transparent">${svg}</body>`);
    await p.screenshot({ path: AUS+"icon-"+n+".png", omitBackground:true });
  }
  await b.close();
  console.log("gezeichnet:", Object.keys(motive).join(", "));
})();
