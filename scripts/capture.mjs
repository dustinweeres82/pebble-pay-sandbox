// Screenshot every [data-testid] section in each mode × brand.
// Usage: node scripts/capture.mjs <baseUrl> <outDir>
import { chromium } from "playwright"
import { mkdirSync } from "node:fs"

const [, , baseUrl = "http://localhost:4173", outDir = "screens/current"] = process.argv
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 1 })
let count = 0

for (const brand of ["pebble", "partner"]) {
  for (const theme of ["light", "dark"]) {
    await page.goto(`${baseUrl}/?theme=${theme}&brand=${brand}`, { waitUntil: "networkidle" })
    await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}" })
    const ids = await page.$$eval("[data-testid]", (els) => els.map((e) => e.dataset.testid))
    for (const id of ids) {
      await page.locator(`[data-testid="${id}"]`).screenshot({ path: `${outDir}/${brand}-${theme}-${id}.png` })
      count++
    }
  }
}

await browser.close()
console.log(`Captured ${count} screenshots in ${outDir}`)
