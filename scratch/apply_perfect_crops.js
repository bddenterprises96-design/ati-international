import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Exact verified bounding boxes for each diagram image file
// ensuring 100% of all diagram illustrations, callout labels, and captions are fully preserved.
const CROPS = {
  'public/assets/pdf_diagrams/crankshaft_structure.png': { top: 80, left: 60, width: 1400, height: 1025 },
  'public/assets/pdf_diagrams/crankshaft_theory.png': { top: 175, left: 140, width: 1280, height: 1355 },
  'public/assets/pdf_diagrams/cylinder_head_structure.png': { top: 110, left: 100, width: 1300, height: 960 },
  'public/assets/pdf_diagrams/cylinder_head_theory.png': { top: 150, left: 50, width: 1380, height: 1045 },
  'public/assets/pdf_diagrams/cylinder_structure.png': { top: 90, left: 220, width: 1120, height: 1100 },
  'public/assets/pdf_diagrams/cylinder_theory.png': { top: 140, left: 40, width: 1360, height: 770 },
  'public/assets/pdf_diagrams/ebike_motor_structure.png': { top: 110, left: 50, width: 1395, height: 570 },
  'public/assets/pdf_diagrams/ebike_motor_theory.png': { top: 150, left: 70, width: 1360, height: 625 },
  'public/assets/pdf_diagrams/ebike_controller_structure.png': { top: 60, left: 90, width: 1290, height: 750 },
  'public/assets/pdf_diagrams/ebike_controller_theory.png': { top: 185, left: 75, width: 1345, height: 600 },
  'public/assets/pdf_diagrams/ebike_charger_structure.png': { top: 60, left: 85, width: 1295, height: 760 },
  'public/assets/pdf_diagrams/ebike_charger_theory.png': { top: 145, left: 75, width: 1365, height: 650 },
  'public/assets/pdf_diagrams/crankshaft_main.png': { top: 190, left: 70, width: 1015, height: 720 },
  'public/assets/pdf_diagrams/cylinder_head_main.png': { top: 55, left: 95, width: 835, height: 680 },
  'public/assets/pdf_diagrams/cylinder_main.png': { top: 65, left: 100, width: 830, height: 805 },
  'public/assets/pdf_diagrams/ebike_motor_main.png': { top: 25, left: 25, width: 1135, height: 835 },
  'public/assets/pdf_diagrams/ebike_controller_main.png': { top: 45, left: 130, width: 1195, height: 1425 },
  'public/assets/pdf_diagrams/ebike_charger_main.png': { top: 125, left: 30, width: 940, height: 1160 },
  'public/assets/cylinder.png': { top: 130, left: 15, width: 1130, height: 1005 },
  'public/assets/cyy.png': { top: 65, left: 20, width: 1430, height: 945 },
  'public/assets/il2.png': { top: 120, left: 35, width: 1185, height: 825 },
  'public/assets/oo.png': { top: 65, left: 50, width: 1370, height: 870 },
  'public/assets/il.png': { top: 50, left: 70, width: 1320, height: 585 },
  'public/assets/oo1.png': { top: 30, left: 110, width: 1360, height: 925 }
};

async function applyCrop(filePath, crop) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  const meta = await sharp(filePath).metadata();
  const top = Math.max(0, Math.min(crop.top, meta.height - 10));
  const left = Math.max(0, Math.min(crop.left, meta.width - 10));
  const width = Math.min(crop.width, meta.width - left);
  const height = Math.min(crop.height, meta.height - top);

  console.log(`Cropping ${path.basename(filePath)} (${meta.width}x${meta.height}) -> top=${top}, left=${left}, w=${width}, h=${height}`);

  const buffer = await sharp(filePath)
    .extract({ left, top, width, height })
    .toBuffer();

  await sharp(buffer).toFile(filePath + '.tmp');
  fs.renameSync(filePath + '.tmp', filePath);
  console.log(`✅ Saved perfectly cropped image: ${filePath}`);
}

async function run() {
  for (const [filePath, crop] of Object.entries(CROPS)) {
    await applyCrop(filePath, crop);
  }
}

run().catch(console.error);
