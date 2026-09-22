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

async function cleanDiagram(filePath) {
  if (!fs.existsSync(filePath)) return;
  console.log(`\n--------------------------------------------------`);
  console.log(`Analyzing: ${filePath}`);

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

  // Find bands
  const bands = [];
  let currentBand = null;

  for (let y = 0; y < height; y++) {
    if (rowDensity[y] > 3) {
      if (!currentBand) {
        currentBand = { startY: y, endY: y, maxDensity: rowDensity[y], totalPx: rowDensity[y] };
      } else {
        currentBand.endY = y;
        currentBand.totalPx += rowDensity[y];
        currentBand.maxDensity = Math.max(currentBand.maxDensity, rowDensity[y]);
      }
    } else {
      if (currentBand) {
        bands.push(currentBand);
        currentBand = null;
      }
    }
  }
  if (currentBand) bands.push(currentBand);

  console.log(`Original size: ${width}x${height}, found ${bands.length} bands:`);
  bands.forEach((b, i) => {
    console.log(`  Band ${i}: y=${b.startY}..${b.endY} (height=${b.endY - b.startY + 1}), maxDensity=${b.maxDensity}`);
  });

  if (bands.length === 0) return;

  // Find the primary diagram band (the tallest band or band with maximum pixels)
  let mainBandIdx = 0;
  let maxPx = 0;
  bands.forEach((b, i) => {
    if (b.totalPx > maxPx) {
      maxPx = b.totalPx;
      mainBandIdx = i;
    }
  });

  console.log(`Main diagram core is Band ${mainBandIdx} (y=${bands[mainBandIdx].startY}..${bands[mainBandIdx].endY})`);

  // Determine which bands to KEEP
  // We start by keeping mainBandIdx
  const keepBands = [mainBandIdx];

  // Look at bands ABOVE mainBandIdx
  for (let i = mainBandIdx - 1; i >= 0; i--) {
    const b = bands[i];
    const nextBand = bands[i + 1];
    const gapToNext = nextBand.startY - b.endY;
    const bandH = b.endY - b.startY + 1;

    // Check if this top band is PDF text sentence / header
    // PDF text sentences at top are typically near top (startY < height * 0.2), short height (<= 50px), and have gap >= 35px to diagram callouts
    const isPDFText = (b.startY < height * 0.25) && (bandH <= 60) && (gapToNext >= 25 || b.startY <= 45);
    
    if (isPDFText) {
      console.log(`❌ DROPPING TOP STRAY TEXT BAND ${i}: y=${b.startY}..${b.endY} (gap to next=${gapToNext}px)`);
    } else {
      console.log(`✅ KEEPING TOP LABEL BAND ${i}: y=${b.startY}..${b.endY}`);
      keepBands.unshift(i);
    }
  }

  // Look at bands BELOW mainBandIdx
  for (let i = mainBandIdx + 1; i < bands.length; i++) {
    const b = bands[i];
    const prevBand = bands[i - 1];
    const gapFromPrev = b.startY - prevBand.endY;
    const bandH = b.endY - b.startY + 1;

    // Check if this bottom band is PDF text sentence / "Working Principle" header
    const isPDFText = (b.endY > height * 0.75) && (bandH <= 90) && (gapFromPrev >= 20 || b.endY >= height - 60);

    if (isPDFText) {
      console.log(`❌ DROPPING BOTTOM STRAY TEXT BAND ${i}: y=${b.startY}..${b.endY} (gap from prev=${gapFromPrev}px)`);
    } else {
      console.log(`✅ KEEPING BOTTOM LABEL BAND ${i}: y=${b.startY}..${b.endY}`);
      keepBands.push(i);
    }
  }

  // Compute crop box based on keepBands
  const firstKept = bands[keepBands[0]];
  const lastKept = bands[keepBands[keepBands.length - 1]];

  let cropStartY = firstKept.startY;
  let cropEndY = lastKept.endY;

  let cropMinX = width;
  let cropMaxX = 0;

  for (let y = cropStartY; y <= cropEndY; y++) {
    if (rowMinX[y] < cropMinX) cropMinX = rowMinX[y];
    if (rowMaxX[y] > cropMaxX) cropMaxX = rowMaxX[y];
  }

  // Pad by 10px
  const pad = 10;
  cropStartY = Math.max(0, cropStartY - pad);
  cropEndY = Math.min(height - 1, cropEndY + pad);
  cropMinX = Math.max(0, cropMinX - pad);
  cropMaxX = Math.min(width - 1, cropMaxX + pad);

  const cropW = cropMaxX - cropMinX + 1;
  const cropH = cropEndY - cropStartY + 1;

  console.log(`Crop rect: left=${cropMinX}, top=${cropStartY}, width=${cropW}, height=${cropH}`);

  if (cropW > 20 && cropH > 20) {
    const buffer = await sharp(filePath)
      .extract({ left: cropMinX, top: cropStartY, width: cropW, height: cropH })
      .toBuffer();

    await sharp(buffer).toFile(filePath + '.tmp');
    fs.renameSync(filePath + '.tmp', filePath);
    console.log(`✅ SAVED CLEAN DIAGRAM: ${filePath}`);
  }
}

async function run() {
  for (const f of diagramFiles) {
    await cleanDiagram(f);
  }
}

run().catch(console.error);
