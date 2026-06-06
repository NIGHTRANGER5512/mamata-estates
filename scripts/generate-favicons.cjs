/**
 * generate-favicons.js
 * Generates favicon.ico (multi-size ICO) and various sized PNGs from logo.png
 * Uses sharp for image processing.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SRC = path.join(PUBLIC_DIR, 'logo.png');

// ICO file is a multi-size container. We'll create 16x16, 32x32, 48x48 PNGs
// then pack them into a proper ICO binary.

async function makeResized(size) {
  return sharp(SRC)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

function buildIco(imageBuffers) {
  // ICO format:
  // Header: 6 bytes (reserved 2, type 2, count 2)
  // Directory entries: count * 16 bytes each
  // Image data: variable

  const count = imageBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = count * dirEntrySize;

  let offset = headerSize + dirSize;
  const dirEntries = [];
  const imageDataParts = [];

  for (let i = 0; i < imageBuffers.length; i++) {
    const { width, height, data } = imageBuffers[i];
    const imageData = imageBuffers[i].data;
    const size = imageData.length;

    // width/height stored as 0 if 256
    const w = width >= 256 ? 0 : width;
    const h = height >= 256 ? 0 : height;

    const entry = Buffer.alloc(16);
    entry.writeUInt8(w, 0);          // Width
    entry.writeUInt8(h, 1);          // Height
    entry.writeUInt8(0, 2);          // Color count (0 = no palette)
    entry.writeUInt8(0, 3);          // Reserved
    entry.writeUInt16LE(1, 4);       // Color planes
    entry.writeUInt16LE(32, 6);      // Bits per pixel
    entry.writeUInt32LE(size, 8);    // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset to image data

    dirEntries.push(entry);
    imageDataParts.push(imageData);
    offset += size;
  }

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // Count

  return Buffer.concat([header, ...dirEntries, ...imageDataParts]);
}

async function main() {
  console.log('Generating favicons from', SRC);

  // Generate individual PNGs
  const sizes = [16, 32, 48, 192, 512];
  const pngBuffers = {};

  for (const size of sizes) {
    const buf = await makeResized(size);
    pngBuffers[size] = buf;
    console.log(`  ✓ ${size}x${size} PNG generated (${buf.length} bytes)`);
  }

  // Write individual PNG files
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-16x16.png'), pngBuffers[16]);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), pngBuffers[32]);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-48x48.png'), pngBuffers[48]);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), pngBuffers[192]);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'), pngBuffers[192]);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'), pngBuffers[512]);
  console.log('  ✓ Individual PNG files written');

  // Build ICO containing 16, 32, 48
  const icoImages = [16, 32, 48].map(size => ({
    width: size,
    height: size,
    data: pngBuffers[size]
  }));

  const icoBuffer = buildIco(icoImages);
  const icoPath = path.join(PUBLIC_DIR, 'favicon.ico');
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`  ✓ favicon.ico written (${icoBuffer.length} bytes)`);

  // Update site.webmanifest with correct icon paths
  const manifest = {
    name: "Tribhuvan Awas Pvt. Ltd.",
    short_name: "Tribhuvan Awas",
    description: "RERA-registered real estate developer in Patna, Bihar",
    start_url: "/",
    display: "browser",
    background_color: "#FFFCF8",
    theme_color: "#8B1A1A",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };

  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2) + '\n'
  );
  console.log('  ✓ site.webmanifest updated');

  console.log('\nAll favicons generated successfully!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
