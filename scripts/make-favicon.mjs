import fs from 'fs';
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <rect width="128" height="128" rx="28" fill="#000000"/>
  <rect width="126" height="126" x="1" y="1" rx="27" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <text x="50%" y="53%" dominant-baseline="central" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="84" letter-spacing="-2">P</text>
</svg>`;

fs.writeFileSync('public/favicon.svg', svg);

async function generate() {
  const pngBuffer = await sharp(Buffer.from(svg))
    .resize(64, 64)
    .png()
    .toBuffer();
    
  fs.writeFileSync('public/favicon.png', pngBuffer);
  
  // ICO file container with embedded PNG
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // type 1 = icon
  icoHeader.writeUInt16LE(1, 4); // count = 1 image
  
  const icoDir = Buffer.alloc(16);
  icoDir.writeUInt8(64, 0); // width
  icoDir.writeUInt8(64, 1); // height
  icoDir.writeUInt8(0, 2);  // color count
  icoDir.writeUInt8(0, 3);  // reserved
  icoDir.writeUInt16LE(1, 4); // color planes
  icoDir.writeUInt16LE(32, 6); // bits per pixel
  icoDir.writeUInt32LE(pngBuffer.length, 8); // size of image data
  icoDir.writeUInt32LE(22, 12); // offset of image data (6 + 16 = 22)
  
  const ico = Buffer.concat([icoHeader, icoDir, pngBuffer]);
  fs.writeFileSync('public/favicon.ico', ico);
  console.log('Favicon P generated successfully!');
}

generate().catch(console.error);
