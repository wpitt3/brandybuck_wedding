// ─── Palettes ────────────────────────────────────────────────
// Each palette: { id, name, colors: [primary, accent, background, surface] }
// primary   = hero bg, nav accent, footer
// accent    = CTA buttons, pins, highlights
// background= page paper
// surface   = alternate section bg (schedule etc.)

export const PALETTES = [
  {
    id: 'avon',
    name: 'Avon Blue',
    colors: ["#fc8a10","#17b3d9","#edf1f4","#e2c1de"],
  },
  {
    id: 'gorge',
    name: 'Avon Gorge',
    colors: ["#cb674c","#6c95b0","#dbd7d3","#595421"],
  },
  {
    id: 'harbourside',
    name: 'Harbourside',
    colors: ["#b46a61","#e57b62","#f6c324","#7093b1",],
  },
  {
    id: 'suspension',
    name: 'Suspension Bridge',
    colors: ["#1f0d0b","#5d3e56","#f65156","#fdaa74"],
  },
  {
    id: 'clifton',
    name: 'Clifton Village',
    colors: ["#398170","#bdf48d","#530021","#ed2461"],
  },
  {
    id: 'meadow',
    name: 'River Meadow',
    colors: ["#f1b416","#da746f","#f2ede9","#631d17"],
  },
  {
    id: 'dusk',
    name: 'Bristol Dusk',
    colors: ["#f3a850", "#f9e3c1","#dd6529","#400602"],
  },
  {
    id: 'sandstone',
    name: 'Cotswold Stone',
    colors: ["#163943","#8ba7b5","#ffcba4","#d96b75"],
  },
];

// ─── Font Pairings ───────────────────────────────────────────
// display = hero names / section titles
// body    = body copy / labels
export const FONT_PAIRINGS = [
  {
    id: 'bristol',
    name: 'Bristol',
    display: 'Bebas Neue',
    body: 'DM Sans',
    googleFonts: 'Bebas+Neue&family=DM+Sans:wght@300;400;500',
  },
  {
    id: 'editorial',
    name: 'Editorial',
    display: 'Playfair Display',
    body: 'Lora',
    googleFonts: 'Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;1,400',
  },
  {
    id: 'modern',
    name: 'Modern',
    display: 'Cormorant Garamond',
    body: 'Raleway',
    googleFonts: 'Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Raleway:wght@300;400;500',
  },
  {
    id: 'bold',
    name: 'Bold',
    display: 'Anton',
    body: 'Nunito',
    googleFonts: 'Anton&family=Nunito:wght@300;400;600',
  },
  {
    id: 'romantic',
    name: 'Romantic',
    display: 'Great Vibes',
    body: 'Josefin Sans',
    googleFonts: 'Great+Vibes&family=Josefin+Sans:wght@300;400;600',
  },
  {
    id: 'traveller',
    name: 'Traveller',
    display: 'Abril Fatface',
    body: 'Jost',
    googleFonts: 'Abril+Fatface&family=Jost:wght@300;400;500',
  },
  {
    id: 'geometric',
    name: 'Geometric',
    display: 'Righteous',
    body: 'Karla',
    googleFonts: 'Righteous&family=Karla:wght@300;400;600',
  },
  {
    id: 'literary',
    name: 'Literary',
    display: 'IM Fell English',
    body: 'Libre Baskerville',
    googleFonts: 'IM+Fell+English:ital@0;1&family=Libre+Baskerville:wght@400;700',
  },
];

// Derive the full set of CSS vars from a palette + font pairing
export function buildTheme(palette, fontPairing) {
  let [primary, accent, background, surface] = palette.colors;

  return {
    '--primary':   primary,
    '--accent':    accent,
    '--bg':        background,
    '--surface':   surface,
    '--font-display': `'${fontPairing.display}', Georgia, serif`,
    '--font-body':    `'${fontPairing.body}', sans-serif`,
  };
}
