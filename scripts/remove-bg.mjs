import sharp from 'sharp';
import fs from 'fs';

async function removeBackground() {
  const image = sharp('public/profile.jpeg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Background target color: RGB [88, 155, 172]
  const bgR = 88;
  const bgG = 155;
  const bgB = 172;

  // Distance function in color space
  function colorDist(r, g, b) {
    const dr = r - bgR;
    const dg = g - bgG;
    const db = b - bgB;
    // Weighted Euclidean distance
    return Math.sqrt(0.3 * dr * dr + 0.59 * dg * dg + 0.11 * db * db);
  }

  // Alpha buffer: 0 = transparent, 255 = foreground
  const alpha = new Uint8Array(width * height);
  // Initially, set all to 255 (foreground)
  alpha.fill(255);

  // BFS / Queue flood fill from boundaries (top edge, left edge down to shoulder, right edge down to shoulder)
  // Let's identify the start points: entire top row (y = 0), left column (x = 0, y < 650), right column (x = width-1, y < 650)
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  function push(x, y) {
    const idx = y * width + x;
    if (!visited[idx]) {
      visited[idx] = 1;
      queue[tail++] = idx;
    }
  }

  // Seed with top row, top-left column, top-right column
  for (let x = 0; x < width; x++) {
    push(x, 0);
  }
  for (let y = 0; y < Math.floor(height * 0.7); y++) {
    push(0, y);
    push(width - 1, y);
  }

  // Color threshold:
  // Pure background is ~0-8 distance. Edge feathering between 15 and 32.
  const strictBgDist = 18;
  const edgeDist = 36;

  while (head < tail) {
    const idx = queue[head++];
    const x = idx % width;
    const y = Math.floor(idx / width);

    const pIdx = idx * channels;
    const r = data[pIdx];
    const g = data[pIdx + 1];
    const b = data[pIdx + 2];
    const dist = colorDist(r, g, b);

    if (dist <= edgeDist) {
      if (dist <= strictBgDist) {
        alpha[idx] = 0; // completely transparent background
      } else {
        // smooth transition feathering
        const factor = (dist - strictBgDist) / (edgeDist - strictBgDist);
        alpha[idx] = Math.min(alpha[idx], Math.round(factor * 255));
      }

      // Check 4-connected neighbors
      if (x > 0) push(x - 1, y);
      if (x < width - 1) push(x + 1, y);
      if (y > 0) push(x, y - 1);
      if (y < height - 1) push(x, y + 1);
    }
  }

  // Now create RGBA output buffer
  const rgbaBuffer = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * channels;
    const dstIdx = i * 4;
    const a = alpha[i];

    // Despill: slightly remove teal cast if pixel is at the border
    let r = data[srcIdx];
    let g = data[srcIdx + 1];
    let b = data[srcIdx + 2];

    if (a > 0 && a < 255) {
      // Semi-transparent edge: neutralize greenish/teal spill
      const spill = (g + b) / 2 - r;
      if (spill > 15) {
        g = Math.round(g - spill * 0.4);
        b = Math.round(b - spill * 0.4);
      }
    }

    rgbaBuffer[dstIdx] = r;
    rgbaBuffer[dstIdx + 1] = g;
    rgbaBuffer[dstIdx + 2] = b;
    rgbaBuffer[dstIdx + 3] = a;
  }

  // Save to public/profile-nobg.png
  await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile('public/profile-nobg.png');

  console.log('Background removed and saved to public/profile-nobg.png');
}

removeBackground().catch(console.error);
