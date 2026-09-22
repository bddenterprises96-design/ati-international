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

async function checkTopBottom(filePath) {
  if (!fs.existsSync(filePath)) return;
  const image = sharp(filePath);
  const meta = await image.metadata();
  const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const width = meta.width;
  const height = meta.height;

  // Let's print top 50px profile and bottom 50px profile
  let topNonWhiteCount = 0;
  for (let y = 0; y < Math.min(50, height); y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (data[idx + 3] > 20 && (data[idx] < 240 || data[idx+1] < 240 || data[idx+2] < 240)) {
        topNonWhiteCount++;
      }
    }
  }

  let bottomNonWhiteCount = 0;
  for (let y = Math.max(0, height - 50); y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (data[idx + 3] > 20 && (data[idx] < 240 || data[idx+1] < 240 || data[idx+2] < 240)) {
        bottomNonWhiteCount++;
      }
    }
  }

  console.log(`${path.basename(filePath)} (${width}x${height}): top 50px pxCount=${topNonWhiteCount}, bottom 50px pxCount=${bottomNonWhiteCount}`);
}

async function run() {
  for (const f of diagramFiles) {
    await checkTopBottom(f);
  }
}

run();
