import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirs = [
  'public/assets/pdf_diagrams',
  'public/assets'
];

// Specific diagram image filenames to inspect and clean
const targetImages = [
  'crankshaft_structure.png',
  'crankshaft_theory.png',
  'cylinder_head_structure.png',
  'cylinder_head_theory.png',
  'cylinder_structure.png',
  'cylinder_theory.png',
  'ebike_motor_structure.png',
  'ebike_motor_theory.png',
  'ebike_controller_structure.png',
  'ebike_controller_theory.png',
  'ebike_charger_structure.png',
  'ebike_charger_theory.png',
  'crankshaft_main.png',
  'cylinder_head_main.png',
  'cylinder_main.png',
  'ebike_motor_main.png',
  'ebike_controller_main.png',
  'ebike_charger_main.png',
  'cylinder.png',
  'cyy.png',
  'il2.png',
  'oo.png',
  'il.png',
  'oo1.png'
];

async function processImage(filePath) {
  if (!fs.existsSync(filePath)) return;
  console.log(`\n-----------------------------------`);
  console.log(`Processing: ${filePath}`);

  const image = sharp(filePath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  // Get raw RGBA buffer
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // Compute non-white / non-transparent density per row (y = 0..height-1)
  const rowDensity = new Array(height).fill(0);
  const rowMinX = new Array(height).fill(width);
  const rowMaxX = new Array(height).fill(-1);

  for (let y = 0; y < height; y++) {
    let nonWhiteCount = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Pixel is non-background if alpha > 20 and not pure white (e.g. RGB < 245)
      const isContent = (a > 20) && (r < 245 || g < 245 || b < 245);
      if (isContent) {
        nonWhiteCount++;
        if (x < rowMinX[y]) rowMinX[y] = x;
        if (x > rowMaxX[y]) rowMaxX[y] = x;
      }
    }
    rowDensity[y] = nonWhiteCount;
  }

  // Find contiguous bands of rows with non-zero content
  // A band is a range [startY, endY] where rowDensity > 0 (or > threshold)
  const bands = [];
  let currentBand = null;

  for (let y = 0; y < height; y++) {
    // Treat row as active if it has at least 2 non-white pixels
    if (rowDensity[y] >= 2) {
      if (!currentBand) {
        currentBand = { startY: y, endY: y, totalPixels: rowDensity[y], maxDensity: rowDensity[y] };
      } else {
        currentBand.endY = y;
        currentBand.totalPixels += rowDensity[y];
        currentBand.maxDensity = Math.max(currentBand.maxDensity, rowDensity[y]);
      }
    } else {
      if (currentBand) {
        // Only consider gaps >= 3 blank rows as band separators
        bands.push(currentBand);
        currentBand = null;
      }
    }
  }
  if (currentBand) bands.push(currentBand);

  console.log(`Original size: ${width}x${height}, found ${bands.length} vertical bands of content.`);
  bands.forEach((b, i) => {
    console.log(`  Band ${i}: y=${b.startY}..${b.endY} (height=${b.endY - b.startY + 1}), maxDensity=${b.maxDensity}, totalPx=${b.totalPixels}`);
  });

  if (bands.length === 0) {
    console.log(`No content detected, skipping.`);
    return;
  }

  // Determine main diagram band(s) and stray text bands
  // Stray header text band: band near top (startY < height * 0.25), height <= 45px, separated by a gap from next band.
  // Stray footer text band: band near bottom (endY > height * 0.75), height <= 45px, separated by a gap from previous band.

  let validBands = [...bands];

  // Check top band
  if (validBands.length > 1) {
    const topBand = validBands[0];
    const topBandHeight = topBand.endY - topBand.startY + 1;
    const gapToNext = validBands[1].startY - topBand.endY;

    if (topBand.startY < height * 0.25 && topBandHeight <= 60 && gapToNext >= 4) {
      console.log(`🚨 DETECTED STRAY TOP HEADER TEXT (y=${topBand.startY}..${topBand.endY})! Removing it...`);
      validBands.shift();
    }
  }

  // Check bottom band
  if (validBands.length > 1) {
    const bottomBand = validBands[validBands.length - 1];
    const bottomBandHeight = bottomBand.endY - bottomBand.startY + 1;
    const gapFromPrev = bottomBand.startY - validBands[validBands.length - 2].endY;

    if (bottomBand.endY > height * 0.75 && bottomBandHeight <= 60 && gapFromPrev >= 4) {
      console.log(`🚨 DETECTED STRAY BOTTOM FOOTER TEXT (y=${bottomBand.startY}..${bottomBand.endY})! Removing it...`);
      validBands.pop();
    }
  }

  // Now calculate crop bounding box over validBands
  let cropStartY = validBands[0].startY;
  let cropEndY = validBands[validBands.length - 1].endY;

  let cropMinX = width;
  let cropMaxX = 0;

  for (let y = cropStartY; y <= cropEndY; y++) {
    if (rowMinX[y] < cropMinX) cropMinX = rowMinX[y];
    if (rowMaxX[y] > cropMaxX) cropMaxX = rowMaxX[y];
  }

  // Add a small safety padding (10px) around crop area
  const pad = 12;
  cropStartY = Math.max(0, cropStartY - pad);
  cropEndY = Math.min(height - 1, cropEndY + pad);
  cropMinX = Math.max(0, cropMinX - pad);
  cropMaxX = Math.min(width - 1, cropMaxX + pad);

  const cropWidth = cropMaxX - cropMinX + 1;
  const cropHeight = cropEndY - cropStartY + 1;

  console.log(`Final crop rectangle: left=${cropMinX}, top=${cropStartY}, width=${cropWidth}, height=${cropHeight}`);

  // Only perform crop if crop area is valid
  if (cropWidth > 20 && cropHeight > 20) {
    // To ensure clean background, extract crop region and save over existing file
    const buffer = await sharp(filePath)
      .extract({ left: cropMinX, top: cropStartY, width: cropWidth, height: cropHeight })
      .toBuffer();

    await sharp(buffer).toFile(filePath + '.tmp');
    fs.renameSync(filePath + '.tmp', filePath);
    console.log(`✅ Successfully cropped and saved clean diagram to ${filePath}`);
  }
}

async function run() {
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        await processImage(path.join(dir, file));
      }
    }
  }
}

run().catch(console.error);
