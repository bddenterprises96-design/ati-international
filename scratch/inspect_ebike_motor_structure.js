import sharp from 'sharp';
import fs from 'fs';

async function analyzeFile(filePath) {
  console.log(`\n==============================================`);
  console.log(`Analyzing original: ${filePath}`);
  const image = sharp(filePath);
  const meta = await image.metadata();
  const width = meta.width;
  const height = meta.height;
  const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let y = 0; y < height; y++) {
    let nonWhite = 0;
    let minX = width, maxX = -1;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
      if (a > 20 && (r < 240 || g < 240 || b < 240)) {
        nonWhite++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
    if (nonWhite > 0) {
      console.log(`y=${y}: nonWhite=${nonWhite}, xRange=[${minX}..${maxX}]`);
    } else {
      console.log(`y=${y}: [BLANK WHITE ROW]`);
    }
  }
}

async function run() {
  await analyzeFile('public/assets/pdf_diagrams/ebike_motor_structure.png');
  await analyzeFile('public/assets/pdf_diagrams/ebike_motor_theory.png');
}

run();
