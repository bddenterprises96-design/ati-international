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

async function analyzeDiagram(filePath) {
  if (!fs.existsSync(filePath)) return;
  const image = sharp(filePath);
  const meta = await image.metadata();
  const width = meta.width;
  const height = meta.height;
  const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const rowDensity = new Array(height).fill(0);
  const rowMinX = new Array(height).fill(width);
  const rowMaxX = new Array(height).fill(-1);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
      if (a > 20 && (r < 240 || g < 240 || b < 240)) {
        rowDensity[y]++;
        if (x < rowMinX[y]) rowMinX[y] = x;
        if (x > rowMaxX[y]) rowMaxX[y] = x;
      }
    }
  }

  // Find all non-blank ranges
  const bands = [];
  let cur = null;
  for (let y = 0; y < height; y++) {
    if (rowDensity[y] > 2) {
      if (!cur) cur = { startY: y, endY: y, maxD: rowDensity[y], totalPx: rowDensity[y] };
      else {
        cur.endY = y;
        cur.totalPx += rowDensity[y];
        cur.maxD = Math.max(cur.maxD, rowDensity[y]);
      }
    } else {
      if (cur) {
        bands.push(cur);
        cur = null;
      }
    }
  }
  if (cur) bands.push(cur);

  console.log(`\n==================================================`);
  console.log(`File: ${path.basename(filePath)} (${width}x${height}) - ${bands.length} bands:`);
  bands.forEach((b, i) => {
    let minXInBand = width, maxXInBand = -1;
    for (let y = b.startY; y <= b.endY; y++) {
      if (rowMinX[y] < minXInBand) minXInBand = rowMinX[y];
      if (rowMaxX[y] > maxXInBand) maxXInBand = rowMaxX[y];
    }
    console.log(`  Band ${i}: y=${b.startY}..${b.endY} (h=${b.endY - b.startY + 1}), x=[${minXInBand}..${maxXInBand}] (w=${maxXInBand - minXInBand + 1}), maxD=${b.maxD}`);
  });
}

async function run() {
  for (const f of diagramFiles) {
    await analyzeDiagram(f);
  }
}

run();
