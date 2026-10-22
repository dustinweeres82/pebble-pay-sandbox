// Compare two screenshot folders and write a Markdown summary + diff images.
// Usage: node scripts/compare.mjs <beforeDir> <afterDir> <outDir>
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { PNG } from "pngjs"
import pixelmatch from "pixelmatch"

const [, , before, after, outDir = "screens/diff"] = process.argv
mkdirSync(outDir, { recursive: true })

const list = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".png")) : [])
const names = [...new Set([...list(before), ...list(after)])].sort()
const rows = []

for (const name of names) {
  const a = `${before}/${name}`
  const b = `${after}/${name}`
  if (!existsSync(a)) { rows.push([name, "added"]); continue }
  if (!existsSync(b)) { rows.push([name, "removed"]); continue }
  const imgA = PNG.sync.read(readFileSync(a))
  const imgB = PNG.sync.read(readFileSync(b))
  if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
    rows.push([name, `size ${imgA.width}×${imgA.height} → ${imgB.width}×${imgB.height}`])
    continue
  }
  const diff = new PNG({ width: imgA.width, height: imgA.height })
  const pixels = pixelmatch(imgA.data, imgB.data, diff.data, imgA.width, imgA.height, { threshold: 0.05 })
  if (pixels > 0) {
    writeFileSync(`${outDir}/${name}`, PNG.sync.write(diff))
    rows.push([name, `${pixels.toLocaleString()} px`])
  }
}

const label = (n) => {
  const [brand, theme, ...rest] = n.replace(".png", "").split("-")
  return `${brand} · ${theme} · ${rest.join("-")}`
}
let md = `### Visual diff\n\n**${rows.length} of ${names.length} screenshots changed.**\n\n`
if (rows.length) {
  md += "| Screenshot (brand · mode · section) | Change |\n| --- | --- |\n"
  for (const [n, c] of rows) md += `| ${label(n)} | ${c} |\n`
  md += "\nDiff images are in the `visual-diff` artifact of this workflow run.\n"
} else {
  md += "No visual change. ✅\n"
}
writeFileSync(`${outDir}/summary.md`, md)
console.log(md)
