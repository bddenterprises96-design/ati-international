import sharp from 'sharp';
import fs from 'fs';

async function check() {
  const meta = await sharp('public/assets/pdf_diagrams/ebike_motor_theory.png').metadata();
  console.log(`ebike_motor_theory.png size: ${meta.width}x${meta.height}`);
}

check();
