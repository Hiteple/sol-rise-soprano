/**
 * Generates branded press-kit PDFs in public/press/.
 * Run: npm run press-kit:generate
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

import PDFDocument from 'pdfkit'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const pressDir = path.join(root, 'public', 'press')
const IMAGE_CACHE_DIR = path.join(pressDir, '.image-cache')
const COVER_IMAGE = path.join(root, 'public', 'images', 'photo-book', 'SON06220 1.jpg')
const PUBLIC_IMAGES = path.join(root, 'public', 'images')
const COLLAGE_GAP = 10

/** Curated press photos in display order (portraits, then stage/production). */
const PRESS_PHOTO_PATHS = [
  'photo-book/SON05904.jpg',
  'photo-book/SON05912 1.jpg',
  'photo-book/SON05938 1.jpg',
  'photo-book/SON05945 1.jpg',
  'photo-book/SON06204 1.jpg',
  'photo-book/SON06218 1.jpg',
  'photo-book/SON06157.jpg',
  'photo-book/SON06173 1.jpg',
  'salon-dorado/IMG_5954.webp',
  'madama-butterfly/33-processed.webp',
  'madama-butterfly/32-processed.webp',
  'carmina-burana/carmina-burana-01-processed.webp',
  'macbeth/IMG_3251.webp',
  'macbeth/macbeth-01.JPEG',
  'magic-flute/magic-flute-celebrarte-musica-01.JPG',
  'cavaleria-rusticana/cavaleria-rusticana-01.webp',
  'cavaleria-rusticana/cavaleria-rusticana-02.jpeg',
  'don-giovanni/IMG_1371.jpg',
  'don-giovanni/IMG_1375.webp',
]

const BRAND = {
  wine: '#4d0011',
  wineRule: '#9e4a5f',
  pine: '#102b1f',
  rose: '#bd7880',
  pink: '#ffd9d9',
  muted: '#5c4c50',
}

const CONTACT = {
  name: 'Sol Risé',
  legalName: 'Florencia Sol Risé López',
  voice: 'Lyric coloratura soprano',
  voiceEs: 'Soprano lírica de coloratura',
  city: 'Buenos Aires, Argentina',
  email: 'solrisesoprano@gmail.com',
  web: 'solrisesoprano.com',
  instagram: '@solrisesoprano',
}

const CONTENT_MARGINS = { top: 56, bottom: 80, left: 48, right: 48 }
const FOOTER_HEIGHT = 48

function ensureDirs() {
  fs.mkdirSync(path.join(pressDir, 'en'), { recursive: true })
  fs.mkdirSync(path.join(pressDir, 'es'), { recursive: true })
  fs.mkdirSync(IMAGE_CACHE_DIR, { recursive: true })
}

function cacheKeyForImage(imgPath) {
  const rel = path.relative(PUBLIC_IMAGES, imgPath)
  return rel.replace(/[/\\]/g, '__').replace(/\.[^.]+$/, '.jpg')
}

function convertWebpToJpeg(src, dest) {
  if (process.platform === 'darwin') {
    execFileSync('sips', ['-s', 'format', 'jpeg', src, '--out', dest], { stdio: 'pipe' })
    return
  }

  throw new Error(
    `WebP is not supported by PDFKit (${path.relative(root, src)}). Regenerate on macOS or add sharp.`,
  )
}

function resolvePdfImage(imgPath) {
  const ext = path.extname(imgPath).toLowerCase()
  if (['.jpg', '.jpeg', '.png'].includes(ext)) return imgPath

  if (ext === '.webp') {
    const cachePath = path.join(IMAGE_CACHE_DIR, cacheKeyForImage(imgPath))
    const srcStat = fs.statSync(imgPath)
    if (fs.existsSync(cachePath)) {
      const cacheStat = fs.statSync(cachePath)
      if (cacheStat.mtimeMs >= srcStat.mtimeMs) return cachePath
    }
    convertWebpToJpeg(imgPath, cachePath)
    return cachePath
  }

  throw new Error(`Unsupported image format: ${imgPath}`)
}

function writePdf(filename, build) {
  const filepath = path.join(pressDir, filename)
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    autoFirstPage: true,
    bufferPages: true,
  })
  const stream = fs.createWriteStream(filepath)
  doc.pipe(stream)
  build(doc)
  doc.end()
  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      const size = fs.statSync(filepath).size
      console.log(`  ✓ ${filename} (${Math.round(size / 1024)} KB)`)
      resolve()
    })
    stream.on('error', reject)
  })
}

function pageSize(doc) {
  return { width: doc.page.width, height: doc.page.height }
}

function drawLinePattern(doc) {
  const { width, height } = pageSize(doc)
  doc.save()
  doc.opacity(0.12)
  doc.strokeColor(BRAND.pink).lineWidth(0.6)
  for (let x = -height; x < width + height; x += 28) {
    doc.moveTo(x, 0).lineTo(x + height * 0.72, height).stroke()
  }
  for (let x = -height; x < width + height; x += 28) {
    doc.moveTo(x + height * 0.28, 0).lineTo(x + height, height).stroke()
  }
  doc.restore()
}

function formatLastUpdated(locale) {
  const now = new Date()
  if (locale === 'es') {
    return `Última actualización: ${now.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}`
  }
  return `Last updated: ${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
}

function drawCoverPage(doc, { documentTitle, documentSubtitle, lastUpdated }) {
  const { width, height } = pageSize(doc)
  const blockBottom = height - 72
  /** Dark band hugs the title block — more of the portrait stays in the clear upper area. */
  const textBandTop = blockBottom - 128

  if (fs.existsSync(COVER_IMAGE)) {
    doc.image(COVER_IMAGE, 0, 0, { cover: [width, height], valign: 'center', align: 'center' })
  } else {
    doc.rect(0, 0, width, height).fill(BRAND.wine)
  }

  doc.save()
  doc.opacity(0.24)
  doc.rect(0, 0, width, textBandTop).fill(BRAND.wine)
  doc.restore()

  drawLinePattern(doc)

  doc.save()
  doc.opacity(0.92)
  doc.rect(0, textBandTop, width, height - textBandTop).fill(BRAND.wine)
  doc.restore()

  doc.save()
  doc.strokeColor(BRAND.wine).lineWidth(1.8)
  doc.moveTo(0, textBandTop).lineTo(width, textBandTop).stroke()
  doc.restore()

  doc.save()
  doc.strokeColor(BRAND.wineRule).lineWidth(0.8)
  doc.moveTo(48, blockBottom - 52).lineTo(140, blockBottom - 52).stroke()
  doc.restore()

  doc.fillColor(BRAND.pink)
  doc.font('Helvetica-BoldOblique').fontSize(40).text(CONTACT.name, 48, blockBottom - 102, {
    width: width - 96,
    lineGap: 2,
  })

  doc.font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(BRAND.pink)
    .text(documentTitle.toUpperCase(), 48, blockBottom - 46, {
      width: width - 96,
      characterSpacing: 2.4,
    })

  doc.font('Helvetica')
    .fontSize(10.5)
    .fillColor(BRAND.pink)
    .opacity(0.9)
    .text(documentSubtitle, 48, blockBottom - (lastUpdated ? 36 : 28), { width: width - 96 })

  if (lastUpdated) {
    doc.font('Helvetica')
      .fontSize(8.5)
      .fillColor(BRAND.pink)
      .opacity(0.72)
      .text(lastUpdated, 48, blockBottom - 18, { width: width - 96 })
  }

  doc.opacity(1)
}

function beginContentPages(doc, documentTitle) {
  doc.addPage({ margins: CONTENT_MARGINS })
  const gridTop = drawContentPageHeader(doc, documentTitle)
  doc.x = CONTENT_MARGINS.left
  doc.y = gridTop
}

function contentWidth(doc) {
  const { width } = pageSize(doc)
  return width - CONTENT_MARGINS.left - CONTENT_MARGINS.right
}

function drawContentPageHeader(doc, title, subtitle) {
  const { width } = pageSize(doc)
  const left = CONTENT_MARGINS.left
  const right = CONTENT_MARGINS.right

  doc.fillColor(BRAND.wine).font('Helvetica-Bold').fontSize(9).text(title.toUpperCase(), left, CONTENT_MARGINS.top - 8, {
    width: width - left - right,
    characterSpacing: 1.6,
  })

  doc.save()
  doc.strokeColor(BRAND.rose).lineWidth(0.8)
  doc.moveTo(left, CONTENT_MARGINS.top + 10).lineTo(width - right, CONTENT_MARGINS.top + 10).stroke()
  doc.restore()

  let gridTop = CONTENT_MARGINS.top + 22
  if (subtitle) {
    doc.fillColor(BRAND.muted).font('Helvetica').fontSize(8.5).text(subtitle, left, CONTENT_MARGINS.top + 16, {
      width: width - left - right,
    })
    gridTop = CONTENT_MARGINS.top + 34
  }

  return gridTop
}

function listCuratedPressPhotos() {
  return PRESS_PHOTO_PATHS.map((rel) => path.join(PUBLIC_IMAGES, rel)).filter((filepath) => {
    if (!fs.existsSync(filepath)) {
      console.warn(`  ! missing press photo: ${path.relative(root, filepath)}`)
      return false
    }
    return true
  })
}

function resolvePressPhotos(paths) {
  return paths.map(resolvePdfImage)
}

function drawImageCell(doc, imgPath, x, y, w, h) {
  doc.fillColor('#faf7f7')
  doc.rect(x, y, w, h).fill()

  if (fs.existsSync(imgPath)) {
    doc.save()
    doc.rect(x, y, w, h).clip()
    doc.image(imgPath, x, y, { cover: [w, h], align: 'center', valign: 'center' })
    doc.restore()
  }

  doc.strokeColor(BRAND.wineRule).lineWidth(0.55)
  doc.rect(x, y, w, h).stroke()
}

function drawPhotoGridPage(doc, images, gridTop, cols = 2, rows = 2) {
  const { height } = pageSize(doc)
  const left = CONTENT_MARGINS.left
  const w = contentWidth(doc)
  const gap = COLLAGE_GAP
  const bottom = height - CONTENT_MARGINS.bottom - 2
  const gridH = bottom - gridTop
  const cellW = (w - gap * (cols - 1)) / cols
  const cellH = (gridH - gap * (rows - 1)) / rows

  for (let i = 0; i < Math.min(images.length, cols * rows); i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = left + col * (cellW + gap)
    const y = gridTop + row * (cellH + gap)
    drawImageCell(doc, images[i], x, y, cellW, cellH)
  }
}

function generatePressPhotos(doc) {
  const images = resolvePressPhotos(listCuratedPressPhotos())
  const totalImages = images.length
  const perPage = 4
  const footerLines = [CONTACT.email, CONTACT.web]

  drawCoverPage(doc, {
    documentTitle: 'Press Photos',
    documentSubtitle: `${totalImages} images for press & programmes`,
    lastUpdated: formatLastUpdated('en'),
  })

  if (totalImages === 0) {
    beginContentPages(doc, 'Press Photos')
    bodyText(doc, 'Press photos are not available.')
    drawFooter(doc, footerLines)
    return
  }

  let offset = 0
  while (offset < images.length) {
    doc.addPage({ margins: CONTENT_MARGINS })
    const pageIndex = lastPageIndex(doc)
    const gridTop = drawContentPageHeader(doc, 'Press Photos')
    drawPhotoGridPage(doc, images.slice(offset, offset + perPage), gridTop)
    drawFooterOnPage(doc, pageIndex, footerLines)
    offset += perPage
  }
}

function contentBottomLimit(doc) {
  return doc.page.height - CONTENT_MARGINS.bottom
}

function ensureSpace(doc, height = 72) {
  if (doc.y + height > contentBottomLimit(doc)) {
    doc.addPage({ margins: CONTENT_MARGINS })
    doc.x = CONTENT_MARGINS.left
    doc.y = CONTENT_MARGINS.top
  }
}

function sectionTitle(doc, text) {
  ensureSpace(doc, 40)
  doc.fillColor(BRAND.wine).font('Helvetica-Bold').fontSize(11.5).text(text.toUpperCase(), doc.x, doc.y, {
    width: doc.page.width - CONTENT_MARGINS.left - CONTENT_MARGINS.right,
    characterSpacing: 1.1,
  })
  doc.moveDown(0.35)
}

function bodyText(doc, text, options = {}) {
  ensureSpace(doc, 48)
  doc.fillColor(BRAND.pine)
    .font('Helvetica')
    .fontSize(options.size ?? 10.5)
    .text(text, doc.x, doc.y, {
      width: doc.page.width - CONTENT_MARGINS.left - CONTENT_MARGINS.right,
      lineGap: options.lineGap ?? 3,
      align: options.align,
    })
}

function bulletList(doc, items) {
  const left = CONTENT_MARGINS.left
  const contentW = doc.page.width - left - CONTENT_MARGINS.right
  const bulletGap = 10
  const textLeft = left + bulletGap
  const textWidth = contentW - bulletGap

  for (const item of items) {
    ensureSpace(doc, 36)
    const startY = doc.y

    doc.fillColor(BRAND.rose).font('Helvetica-Bold').fontSize(10)
    doc.text('•', left, startY, { width: bulletGap, lineBreak: false })

    doc.fillColor(BRAND.pine).font('Helvetica').fontSize(10.5)
    const textHeight = doc.heightOfString(item, { width: textWidth, lineGap: 2 })
    doc.text(item, textLeft, startY, { width: textWidth, lineGap: 2 })

    doc.x = left
    doc.y = startY + textHeight + 5
  }
}

function lastPageIndex(doc) {
  const range = doc.bufferedPageRange()
  return range.start + range.count - 1
}

function drawFooterOnPage(doc, pageIndex, lines) {
  doc.switchToPage(pageIndex)
  const { width, height } = pageSize(doc)
  const barTop = height - FOOTER_HEIGHT
  const text = lines.join('   ·   ')

  doc.save()
  doc.fillColor(BRAND.pink)
  doc.rect(0, barTop, width, FOOTER_HEIGHT).fill()
  doc.fillColor(BRAND.wine).font('Helvetica').fontSize(8.25)
  const textWidth = doc.widthOfString(text)
  doc.text(text, (width - textWidth) / 2, barTop + 16, { lineBreak: false })
  doc.restore()
}

function drawFooter(doc, lines) {
  let pageIndex = lastPageIndex(doc)
  doc.switchToPage(pageIndex)

  // PDFKit sometimes opens a trailing page for the text cursor — draw footer on real content page.
  if (doc.y <= CONTENT_MARGINS.top + 6 && pageIndex > 0) {
    pageIndex -= 1
  }

  drawFooterOnPage(doc, pageIndex, lines)

  const { height } = pageSize(doc)
  doc.switchToPage(pageIndex)
  doc.x = CONTENT_MARGINS.left
  doc.y = height - FOOTER_HEIGHT - 4
}

function generateResumeEn(doc) {
  drawCoverPage(doc, {
    documentTitle: 'Resume',
    documentSubtitle: `${CONTACT.voice} · ${CONTACT.city}`,
    lastUpdated: formatLastUpdated('en'),
  })
  beginContentPages(doc, 'Resume')

  sectionTitle(doc, 'Profile')
  bodyText(
    doc,
    'Argentine lyric soprano with a career developed across opera, concert repertoire, and choral performance. Stage work includes Pamina (The Magic Flute) and Zerlina (Don Giovanni), alongside choral roles in La Traviata, Carmen, and Macbeth. She has performed with established companies and festivals in Argentina and Bolivia.',
  )
  doc.moveDown(0.55)

  sectionTitle(doc, 'Training')
  bulletList(doc, [
    'Advanced lyric singing — Instituto Superior de Arte del Teatro Colón (final year)',
    'Role development: Violetta (La Traviata), Adina (L\'elisir d\'amore) — Vincerò Academy',
    'Masterclasses: Daniela Barcelona, Lisette Oropesa, Jennifer Rowley, Michael Fabiano',
    'Scholarship programmes — Juventus Lyrica',
    'Vocal technique: Gustavo López Manzitti, Alejandra Malvino',
    'Musical theatre: Fundación Julio Bocca, Pepe Cibrián workshop',
  ])
  doc.moveDown(0.35)

  sectionTitle(doc, 'Selected Roles & Repertoire')
  bulletList(doc, [
    'Pamina — Die Zauberflöte',
    'Zerlina — Don Giovanni',
    'First Lady — Die Zauberflöte',
    'Sister Genovieffa / Suora Cercatrice — Suor Angelica',
    'Annina — La Traviata',
    'Mrs. Gobineau — The Medium',
    'Chorus — Carmen, Macbeth, Il Trovatore, Cavalleria Rusticana',
  ])
  doc.moveDown(0.35)

  sectionTitle(doc, 'Selected Appearances')
  bulletList(doc, [
    '2025 — Chorus & apparitions, Macbeth (Juventus Lyrica); chorus, Il Trovatore (Valkyria Lírica); Pamina, Die Zauberflöte (British Arts Centre); soloist, Carmina Burana (Potosí & Sucre, Bolivia)',
    '2024 — First Lady, The Magic Flute; soloist, Juventus Lyrica 25th Anniversary Gala (Teatro Avenida); chorus reinforcement, Brahms at Teatro Colón',
    '2023 — Zerlina, Don Giovanni (Teatro Avenida); soloist, Mozart\'s Requiem (Potosí, Bolivia); chorus, Joan of Arc at the Stake (Teatro Colón)',
    '2022 — Annina, La Traviata; scholarship soloist & chorus, Carmen (Juventus Lyrica)',
    '2021 — Mrs. Gobineau, The Medium (Young Talents Orchestra)',
    '2019 — Chorus, La Traviata & Die Zauberflöte (Juventus Lyrica, Teatro Avenida)',
  ])
  doc.moveDown(0.35)

  sectionTitle(doc, 'Languages')
  bodyText(doc, 'Spanish (native), advanced English, operatic diction in Italian, German, and French.')

  drawFooter(doc, [CONTACT.email, CONTACT.web, CONTACT.instagram])
}

function generateCurriculumEs(doc) {
  drawCoverPage(doc, {
    documentTitle: 'Curriculum',
    documentSubtitle: `${CONTACT.voiceEs} · ${CONTACT.city}`,
    lastUpdated: formatLastUpdated('es'),
  })
  beginContentPages(doc, 'Curriculum')

  sectionTitle(doc, 'Perfil')
  bodyText(
    doc,
    'Soprano lírica argentina con trayectoria en ópera, repertorio de concierto y formación coral. Su trabajo incluye Pamina (La flauta mágica) y Zerlina (Don Giovanni), además de trabajo coral en La Traviata, Carmen y Macbeth. Ha actuado con compañías y festivales en Argentina y Bolivia.',
  )
  doc.moveDown(0.55)

  sectionTitle(doc, 'Formación')
  bulletList(doc, [
    'Estudios avanzados en canto lírico — Instituto Superior de Arte del Teatro Colón (último año)',
    'Desarrollo de roles: Violetta (La Traviata), Adina (El elixir de amor) — Vincerò Academy',
    'Masterclasses: Daniela Barcelona, Lisette Oropesa, Jennifer Rowley, Michael Fabiano',
    'Programas becarios — Juventus Lyrica',
    'Técnica vocal: Gustavo López Manzitti, Alejandra Malvino',
    'Teatro musical: Fundación Julio Bocca, taller de Pepe Cibrián',
  ])
  doc.moveDown(0.35)

  sectionTitle(doc, 'Roles y repertorio destacado')
  bulletList(doc, [
    'Pamina — Die Zauberflöte',
    'Zerlina — Don Giovanni',
    'First Lady — Die Zauberflöte',
    'Sor Genovieffa / Sor Cercatrice — Suor Angelica',
    'Annina — La Traviata',
    'Mrs. Gobineau — The Medium',
    'Coro — Carmen, Macbeth, Il Trovatore, Cavalleria Rusticana',
  ])
  doc.moveDown(0.35)

  sectionTitle(doc, 'Apariciones destacadas')
  bulletList(doc, [
    '2025 — Coro y apariciones, Macbeth (Juventus Lyrica); coro, Il Trovatore (Valkyria Lírica); Pamina, La flauta mágica (British Arts Centre); solista, Carmina Burana (Potosí y Sucre, Bolivia)',
    '2024 — First Lady, La flauta mágica; solista, Gala 25.º aniversario Juventus Lyrica (Teatro Avenida); refuerzo de coro, Brahms en Teatro Colón',
    '2023 — Zerlina, Don Giovanni (Teatro Avenida); solista, Réquiem de Mozart (Potosí, Bolivia); coro, Juana de Arco en la hoguera (Teatro Colón)',
    '2022 — Annina, La Traviata; solista becaria y coro, Carmen (Juventus Lyrica)',
    '2021 — Mrs. Gobineau, The Medium (Orquesta Jóvenes Talentos)',
    '2019 — Coro, La Traviata y La flauta mágica (Juventus Lyrica, Teatro Avenida)',
  ])
  doc.moveDown(0.35)

  sectionTitle(doc, 'Idiomas')
  bodyText(doc, 'Español nativo, inglés avanzado, y dicción operística en italiano, alemán y francés.')

  drawFooter(doc, [CONTACT.email, CONTACT.web, CONTACT.instagram])
}

function generateShortBioEn(doc) {
  drawCoverPage(doc, {
    documentTitle: 'Short Bio',
    documentSubtitle: `${CONTACT.voice} · ${CONTACT.city}`,
    lastUpdated: formatLastUpdated('en'),
  })
  beginContentPages(doc, 'Short Bio')

  bodyText(
    doc,
    'Sol Risé is an Argentine lyric soprano whose career spans opera, concert repertoire, and choral performance. Her stage work includes Pamina (The Magic Flute) and Zerlina (Don Giovanni), as well as choral roles in La Traviata, Carmen, and Macbeth.',
    { size: 11.5, lineGap: 5 },
  )
  doc.moveDown(0.75)
  bodyText(
    doc,
    'She has performed with Teatro Colón, Teatro Avenida, Juventus Lyrica, and the British Arts Centre in Argentina, and as soloist at the International Festival of Culture in Bolivia. She continues advanced training at the Instituto Superior de Arte del Teatro Colón and Vincerò Academy, developing Violetta (La Traviata) and Adina (L\'elisir d\'amore).',
    { size: 11.5, lineGap: 5 },
  )
  doc.moveDown(1.1)

  ensureSpace(doc, 56)
  doc.fillColor(BRAND.muted).font('Helvetica-Oblique').fontSize(13).text(
    '“Singing is not what I do — it is who I am.”',
    doc.x,
    doc.y,
    {
      width: doc.page.width - CONTENT_MARGINS.left - CONTENT_MARGINS.right,
      align: 'center',
    },
  )
  doc.moveDown(0.35)
  doc.fillColor(BRAND.rose).font('Helvetica').fontSize(10).text('— Sol Risé', {
    width: doc.page.width - CONTENT_MARGINS.left - CONTENT_MARGINS.right,
    align: 'center',
  })

  drawFooter(doc, [CONTACT.email, CONTACT.web])
}

function generateShortBioEs(doc) {
  drawCoverPage(doc, {
    documentTitle: 'Bio corta',
    documentSubtitle: `${CONTACT.voiceEs} · ${CONTACT.city}`,
    lastUpdated: formatLastUpdated('es'),
  })
  beginContentPages(doc, 'Bio corta')

  bodyText(
    doc,
    'Sol Risé es una soprano lírica argentina con trayectoria en ópera, repertorio de concierto y formación coral. Su trabajo escénico incluye Pamina (La flauta mágica) y Zerlina (Don Giovanni), además de roles corales en La Traviata, Carmen y Macbeth.',
    { size: 11.5, lineGap: 5 },
  )
  doc.moveDown(0.75)
  bodyText(
    doc,
    'Ha actuado en el Teatro Colón, Teatro Avenida, Juventus Lyrica y el British Arts Centre en Argentina, y como solista en el Festival Internacional de la Cultura en Bolivia. Continúa su formación avanzada en el Instituto Superior de Arte del Teatro Colón y en Vincerò Academy, desarrollando a Violetta (La Traviata) y Adina (El elixir de amor).',
    { size: 11.5, lineGap: 5 },
  )
  doc.moveDown(1.1)

  ensureSpace(doc, 56)
  doc.fillColor(BRAND.muted).font('Helvetica-Oblique').fontSize(13).text(
    '«Cantar no es lo que hago — es lo que soy.»',
    doc.x,
    doc.y,
    {
      width: doc.page.width - CONTENT_MARGINS.left - CONTENT_MARGINS.right,
      align: 'center',
    },
  )
  doc.moveDown(0.35)
  doc.fillColor(BRAND.rose).font('Helvetica').fontSize(10).text('— Sol Risé', {
    width: doc.page.width - CONTENT_MARGINS.left - CONTENT_MARGINS.right,
    align: 'center',
  })

  drawFooter(doc, [CONTACT.email, CONTACT.web])
}

function removeLegacyPhotosDir() {
  const legacyDir = path.join(pressDir, 'photos')
  if (!fs.existsSync(legacyDir)) return
  for (const file of fs.readdirSync(legacyDir)) {
    fs.unlinkSync(path.join(legacyDir, file))
  }
  fs.rmdirSync(legacyDir)
  console.log('  · removed empty public/press/photos/')
}

async function main() {
  if (!fs.existsSync(COVER_IMAGE)) {
    console.warn(`  ! cover image missing: ${COVER_IMAGE}`)
  }

  console.log('Generating press kit assets…')
  ensureDirs()
  await writePdf('en/resume.pdf', generateResumeEn)
  await writePdf('es/curriculum.pdf', generateCurriculumEs)
  await writePdf('en/short-bio.pdf', generateShortBioEn)
  await writePdf('es/bio-corta.pdf', generateShortBioEs)
  await writePdf('press-photos.pdf', generatePressPhotos)
  removeLegacyPhotosDir()
  console.log('Done.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
