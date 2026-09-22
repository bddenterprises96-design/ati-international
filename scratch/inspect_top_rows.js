import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const diagramFiles = [
  'public/assets/pdf_diagrams/crankshaft_structure.png',
  'public/assets/pdf_diagrams/crankshaft_theory.png',
  'public/assets/pdf_diagrams/cylinder_head_structure.png',
  'public/assets/pdf_diagrams/cylinder_head_theory.png',
  'public/assets/pdf_diagrams/cylinder_structure.png',
  'public/assets/pdf_diagrams/cylinder_theory.png',
  'public/assets/pdf_diagrams/ebike_motor_structure.png',
  'public/assets/pdf_diagrams/ebike_motor_theory.png',
  'public/assets/pdf_diagrams/ebike_controller_structure.png',
  'public/assets/pdf_diagrams/ebike_controller_theory.png',
  'public/assets/pdf_diagrams/ebike_charger_structure.png',
  'public/assets/pdf_diagrams/ebike_charger_theory.png',
  'public/assets/cylinder.png',
  'public/assets/cyy.png',
  'public/assets/il2.png',
  'public/assets/oo.png',
  'public/assets/il.png',
  'public/assets/oo1.png'
];

async function inspectRows(filePath) {
  if (!fs.existsSync(filePath)) return;
  const image = sharp(filePath);
  const meta = await image.metadata();
  const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const width = meta.width;
  const height = meta.height;

  console.log(`\n========================================`);
  console.log(`File: ${path.basename(filePath)} (${width}x${height})`);

  // Analyze top 120 rows
  const topRows = Math.min(120, height);
  for (let y = 0; y < topRows; y++) {
    let nonWhite = 0;
    let darkPixels = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
      if (a > 20 && (r < 240 || g < 240 || b < 240)) nonWhite++;
      if (a > 20 && (r < 100 && g < 100 && b < 100)) darkPixels++;
    }
    if (nonWhite > 0) {
      console.log(`  Top y=${y}: nonWhite=${nonWhite}, darkPx=${darkPixels}`);
    } else {
      console.log(`  Top y=${y}: [WHITE BLANK ROW]`);
    }
  }

  console.log(`--- Bottom 80 rows ---`);
  for (let y = Math.max(0, height - 80); y < height; y++) {
    let nonWhite = 0;
    let darkPixels = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
      if (a > 20 && (r < 240 || g < 240 || b < 240)) nonWhite++;
      if (a > 20 && (r < 100 && g < 100 && b < 100)) darkPixels++;
    }
    if (nonWhite > 0) {
      console.log(`  Bot y=${y}: nonWhite=${nonWhite}, darkPx=${darkPixels}`);
    } else {
      console.log(`  Bot y=${y}: [WHITE BLANK ROW]`);
    }
  }
}

async function run() {
  for (const f of diagramFiles) {
    await inspectRows(f);
  }
}

run();
