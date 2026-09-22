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
  'public/assets/pdf_diagrams/crankshaft_main.png',
  'public/assets/pdf_diagrams/cylinder_head_main.png',
  'public/assets/pdf_diagrams/cylinder_main.png',
  'public/assets/pdf_diagrams/ebike_motor_main.png',
  'public/assets/pdf_diagrams/ebike_controller_main.png',
  'public/assets/pdf_diagrams/ebike_charger_main.png',
  'public/assets/cylinder.png',
  'public/assets/cyy.png',
  'public/assets/il2.png',
  'public/assets/oo.png',
  'public/assets/il.png',
  'public/assets/oo1.png'
];

async function inspectImage(filePath) {
  if (!fs.existsSync(filePath)) return;
  const image = sharp(filePath);
  const meta = await image.metadata();
  const width = meta.width;
  const height = meta.height;

  const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // Calculate row densities
  const rowDensity = new Array(height).fill(0);
  const rowDarkCount = new Array(height).fill(0);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
      if (a > 20 && (r < 240 || g < 240 || b < 240)) {
        rowDensity[y]++;
      }
      if (a > 20 && (r < 80 && g < 80 && b < 80)) {
        rowDarkCount[y]++;
      }
    }
  }

  console.log(`\n==================================================`);
  console.log(`File: ${path.basename(filePath)} (${width}x${height})`);

  // Find all bands of non-white rows (allowing 1-2 blank rows inside a band)
  const bands = [];
  let currentBand = null;

  for (let y = 0; y < height; y++) {
    if (rowDensity[y] > 5) {
      if (!currentBand) {
        currentBand = { startY: y, endY: y, maxDensity: rowDensity[y], maxDark: rowDarkCount[y] };
      } else {
        currentBand.endY = y;
        currentBand.maxDensity = Math.max(currentBand.maxDensity, rowDensity[y]);
        currentBand.maxDark = Math.max(currentBand.maxDark, rowDarkCount[y]);
      }
    } else {
      if (currentBand) {
        // Look ahead 2 rows
        if (y + 1 < height && rowDensity[y + 1] > 5) {
          // continue band
        } else if (y + 2 < height && rowDensity[y + 2] > 5) {
          // continue band
        } else {
          bands.push(currentBand);
          currentBand = null;
        }
      }
    }
  }
  if (currentBand) bands.push(currentBand);

  console.log(`Found ${bands.length} vertical content bands:`);
  bands.forEach((b, idx) => {
    const bandH = b.endY - b.startY + 1;
    console.log(`  Band ${idx}: y=${b.startY}..${b.endY} (height=${bandH}px), maxDensity=${b.maxDensity}, maxDark=${b.maxDark}`);
  });
}

async function run() {
  for (const f of diagramFiles) {
    await inspectImage(f);
  }
}

run();
