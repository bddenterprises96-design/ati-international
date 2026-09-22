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

async function inspectFinal(filePath) {
  if (!fs.existsSync(filePath)) return;
  const image = sharp(filePath);
  const meta = await image.metadata();
  const width = meta.width;
  const height = meta.height;

  const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  console.log(`\n--------------------------------------------------`);
  console.log(`File: ${path.basename(filePath)} (${width}x${height})`);

  // Check top 35px
  let topRowsWithDark = 0;
  for (let y = 0; y < Math.min(35, height); y++) {
    let darkInRow = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (data[idx+3] > 20 && data[idx] < 80 && data[idx+1] < 80 && data[idx+2] < 80) {
        darkInRow++;
      }
    }
    if (darkInRow > 10) topRowsWithDark++;
  }

  // Check bottom 35px
  let botRowsWithDark = 0;
  for (let y = Math.max(0, height - 35); y < height; y++) {
    let darkInRow = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (data[idx+3] > 20 && data[idx] < 80 && data[idx+1] < 80 && data[idx+2] < 80) {
        darkInRow++;
      }
    }
    if (darkInRow > 10) botRowsWithDark++;
  }

  console.log(`  Top 35px dark rows count: ${topRowsWithDark}`);
  console.log(`  Bottom 35px dark rows count: ${botRowsWithDark}`);
}

async function run() {
  for (const f of diagramFiles) {
    await inspectFinal(f);
  }
}

run();
