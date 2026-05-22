// =============================================================
//  CONTENU "DONNÉES" — dossiers de projets + CV
//  Les images sont chargées automatiquement depuis
//  src/assets/photos/<section>/<dossier>/  via import.meta.glob.
//  → Pour AJOUTER / RETIRER une photo : dépose / supprime le
//    fichier dans le bon dossier, rien d'autre à modifier.
//  → L'ordre suit le nom de fichier (préfixe 01-, 02-, ...).
// =============================================================

// Charge un dossier d'images, trié par nom de fichier
function load(glob) {
  return Object.keys(glob).sort().map((k) => glob[k]);
}

// ---- WORK (6 projets) ----
const wPoseurs   = load(import.meta.glob('../assets/photos/work/1-les-poseurs/*.jpg', { eager: true, query: '?url', import: 'default' }));
const wInterieur = load(import.meta.glob('../assets/photos/work/2-interieur/*.jpg', { eager: true, query: '?url', import: 'default' }));
const wTissage   = load(import.meta.glob('../assets/photos/work/3-tissage/*.jpg', { eager: true, query: '?url', import: 'default' }));
const wWool      = load(import.meta.glob('../assets/photos/work/4-wool-production/*.jpg', { eager: true, query: '?url', import: 'default' }));
const wFleur     = load(import.meta.glob('../assets/photos/work/5-fleur-en-strass/*.jpg', { eager: true, query: '?url', import: 'default' }));
const wReflect   = load(import.meta.glob('../assets/photos/work/6-reflect-pattern/*.jpg', { eager: true, query: '?url', import: 'default' }));

// ---- BOOK (3 dossiers) ----
const bAnnees  = load(import.meta.glob('../assets/photos/book/1-1983-2024/*.jpg', { eager: true, query: '?url', import: 'default' }));
const b002     = load(import.meta.glob('../assets/photos/book/2-002/*.jpg', { eager: true, query: '?url', import: 'default' }));
const bArchive = load(import.meta.glob('../assets/photos/book/3-archives/*.jpg', { eager: true, query: '?url', import: 'default' }));

// ---- PRINT (placeholders issus de "Intérieur" — à confirmer / remplacer) ----
const pDos    = load(import.meta.glob('../assets/photos/print/1-interieur-dos/*.jpg', { eager: true, query: '?url', import: 'default' }));
const pFace   = load(import.meta.glob('../assets/photos/print/2-interieur-face/*.jpg', { eager: true, query: '?url', import: 'default' }));
const pTallud = load(import.meta.glob('../assets/photos/print/3-le-tallud/*.jpg', { eager: true, query: '?url', import: 'default' }));

// ---- ABOUT (portrait) ----
export const aboutPortrait =
  load(import.meta.glob('../assets/photos/about/*.jpg', { eager: true, query: '?url', import: 'default' }))[0] || null;

// ---- Pages PDF (portfolio + CV) affichées en images ----
export const pdfPages = {
  portfolio: load(import.meta.glob('../assets/pdf/portfolio/*.jpg', { eager: true, query: '?url', import: 'default' })),
  cv:        load(import.meta.glob('../assets/pdf/cv/*.jpg',        { eager: true, query: '?url', import: 'default' })),
};

// ---- "Dernières œuvres" affichées sur la page d'accueil ----
// (3 visuels au choix — modifie les images ou titres ici)
export const recentWorks = [
  { img: wPoseurs[2]   ?? wPoseurs[0],   title: 'Les poseurs',     year: '2024' },
  { img: wInterieur[3] ?? wInterieur[0], title: 'Intérieur',       year: '2024' },
  { img: wFleur[3]     ?? wFleur[0],     title: 'Fleur en Strass', year: '2025' },
];

// Textes "info" génériques (à personnaliser par projet)
const infoTodo = {
  fr: 'Texte de présentation du projet.\nContexte\u2026',
  en: 'Project description.\nContext\u2026',
};
const infoTirage = {
  fr: 'Tirage unique\nArgentique tiré chez Glory Lab sur papier Fujifilm DPII Glossy',
  en: 'Single print\nFilm print made at Glory Lab on Fujifilm DPII Glossy paper',
};

export const sections = {
  work: [
    { slug: 'les-poseurs',     title: 'Les poseurs', year: '2024', photos: wPoseurs,   cover: wPoseurs[2]   ?? wPoseurs[0],   info: infoTodo },
    { slug: 'interieur',       title: 'Intérieur',                 photos: wInterieur, cover: wInterieur[3] ?? wInterieur[0], info: infoTodo },
    { slug: 'tissage',         title: 'Tissage',                   photos: wTissage,   cover: wTissage[0],                    info: infoTodo },
    { slug: 'wool-production', title: 'Wool production',           photos: wWool,      cover: wWool[0],                       info: infoTodo },
    { slug: 'fleur-en-strass', title: 'Fleur en Strass',           photos: wFleur,     cover: wFleur[3]    ?? wFleur[0],      info: infoTodo },
    { slug: 'reflect-pattern', title: 'Reflect Pattern',           photos: wReflect,   cover: wReflect[0],                    info: infoTodo },
  ],

  print: [
    { slug: 'interieur-dos',  title: 'Intérieur dos',  photos: pDos,    cover: pDos[0],    info: infoTirage, orderable: true },
    { slug: 'interieur-face', title: 'Intérieur face', photos: pFace,   cover: pFace[0],   info: infoTirage, orderable: true },
    { slug: 'le-tallud',      title: 'Le Tallud',      photos: pTallud, cover: pTallud[0], info: infoTirage, orderable: true },
  ],

  book: [
    { slug: '1983-2024', title: '1983-2024', photos: bAnnees,  cover: bAnnees[1] ?? bAnnees[0], info: infoTodo, orderable: true },
    { slug: '002',       title: '002',       photos: b002,     cover: b002[0],                  info: infoTodo, orderable: true },
    { slug: 'archives',  title: 'Archives',  photos: bArchive, cover: bArchive[0],              info: infoTodo, orderable: true },
  ],
};

// --- CV transcrit depuis le nouveau PDF ---
export const cv = {
  bourses: [
    "2026 — Homo Faber Fellowship - Fondation Michelangelo. Avec l'atelier Mérigot Sanzay, Venise - Paris.",
  ],
  expos: [
    "2024 — Eurofabrique - Restitution à Cluj-Napoca et à la Gaité Lyrique, Paris.",
    "2023 — Lignes de Vie, cur. Mayfly Gallery, Bastille Design Center, Paris.",
    "2022 — Désert Samples - Galerie Octave Cowbell, Metz.",
  ],
  freelance: [
    "2026 — Tisserande - Diane Collongues, atelier Mérigot Sanzay, Paris.",
    "2026 — Tisserande - Marie Hazard, project Ad Hoc, Paris.",
    "2024-2025 — Chargée de communication - Carel Paris, Paris.",
    "2023 — Assistante éditoriale - Revue Revive, studio Anémone Image, artistes Amir Tikriti et Célia Cotelle, Paris.",
    "2022 — Tirage argentique - Studio Pauléon, La Rochelle.",
  ],
  workshop: [
    "2025 — Technique modélisme - Patrice Dutartre et Catarina Knoch-mulot, Paris.",
    "2023 — Vidéo - Lou Fauroux, Mulhouse.",
    "2022 — Désert Samples - Marie Quéau, Mulhouse.",
  ],
  formations: [
    "2026 — Mastère Spécialisé Management de la Mode et du Luxe - avec mention - Institut Français de la Mode, Paris.",
    "2024 — DNSEP option Design Textile - avec mention - Haute École des Arts du Rhin, Mulhouse.",
    "2022 — DNA option Design Textile - avec les félicitations du jury - Haute École des Arts du Rhin, Mulhouse.",
    "2020 — CPGE Arts et Design - avec mention, Toulouse.",
  ],
  evenements: [
    "2024 — Performance Fleur en Strass - Vernissage de l'exposition Ministère de l'impression à la Filature Scène Nationale, Mulhouse.",
    "2023 — Performance Fleur en Strass - série de 3 soirées de performances au Doc (19ème), Paris.",
    "2023 — VJ pour le Festival Elektric Park , Chatou.",
  ],
};
