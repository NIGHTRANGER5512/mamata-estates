/**
 * One-time image compression script.
 * Run: node scripts/compress-images.mjs
 *
 * Compresses all photos in public/projects to max 800px wide / 85 quality JPEG.
 * Skips files already under 300 KB. Overwrites in-place.
 */
import sharp from 'sharp'
import { readdirSync, statSync, existsSync } from 'fs'
import { join, extname, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..', 'public', 'projects')

function walk(dir) {
  const entries = readdirSync(dir)
  let files = []
  for (const e of entries) {
    const full = join(dir, e)
    if (statSync(full).isDirectory()) {
      files = files.concat(walk(full))
    } else {
      const ext = extname(e).toLowerCase()
      if (['.jpg', '.jpeg', '.png'].includes(ext)) files.push(full)
    }
  }
  return files
}

const files = walk(ROOT)
console.log(`Found ${files.length} image(s).\n`)

for (const file of files) {
  const sizeBefore = statSync(file).size
  const rel = relative(ROOT, file)

  // Skip if already under 300 KB
  if (sizeBefore < 300 * 1024) {
    console.log(`  skip  ${rel}  (${(sizeBefore / 1024).toFixed(0)} KB — already small)`)
    continue
  }

  const ext = extname(file).toLowerCase()
  try {
    const img = sharp(file).resize({ width: 1200, withoutEnlargement: true })
    if (ext === '.png') {
      await img.png({ quality: 80, compressionLevel: 9 }).toBuffer().then(buf => {
        require('fs').writeFileSync(file, buf)
      })
    } else {
      const buf = await img.jpeg({ quality: 82, mozjpeg: true }).toBuffer()
      const { writeFileSync } = await import('fs')
      writeFileSync(file, buf)
    }
    const sizeAfter = statSync(file).size
    const pct = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(0)
    console.log(`  ✓  ${rel}  ${(sizeBefore / 1024).toFixed(0)} KB → ${(sizeAfter / 1024).toFixed(0)} KB  (−${pct}%)`)
  } catch (err) {
    console.error(`  ✗  ${rel}  ${err.message}`)
  }
}
console.log('\nDone.')
