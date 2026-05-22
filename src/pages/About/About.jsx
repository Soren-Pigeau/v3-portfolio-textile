import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout/Layout';
import PdfPages from '../../components/PdfPages/PdfPages';
import { useLanguage } from '../../i18n/LanguageContext';
import { cv, aboutPortrait } from '../../data/content';
import styles from './About.module.css';

// ── Réglage : le CV s'affiche en PDF intégré (true) OU en texte bilingue (false)
//    Mets false si tu préfères garder la version typographiée FR/EN (dans content.js).
const CV_AS_PDF = false;

export default function About() {
  const { t } = useLanguage();
  const [tab, setTab] = useState('infos'); // 'infos' | 'portfolio' | 'cv'
  const a = t.about;

  return (
    <Layout>
      <div className={styles.page}>
        {/* Sous-navigation, alignée à droite (cf. maquette) */}
        <nav className={styles.tabs}>
          {['infos', 'portfolio', 'cv'].map((key) => (
            <button
              key={key}
              className={tab === key ? styles.tabActive : ''}
              onClick={() => setTab(key)}
            >
              {a.tabs[key]}
            </button>
          ))}
        </nav>

        <motion.div
          key={tab}
          className={styles.content}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {tab === 'infos' && (
            <div className={styles.infos}>
              <div className={styles.contact}>
                <a href={`mailto:${a.email}`}><MailIcon /> {a.email}</a>
                <a href="https://instagram.com/_cyrielle_p" target="_blank" rel="noreferrer"><InstaIcon /> {a.instagram}</a>
                <span><PinIcon /> {a.location}</span>
              </div>
              <div className={styles.bio}>
                {a.bio.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                {/* Portrait — Cyrielle était indécise dessus : à retirer si besoin */}
                {aboutPortrait && (
                  <img src={aboutPortrait} alt="Cyrielle Pigeau" className={styles.portrait} />
                )}
              </div>
            </div>
          )}

          {tab === 'portfolio' && (
            // Pages affichées en images (propre, sans barre ni cadre).
            // Le PDF d'origine reste dans public/portfolio.pdf pour le téléchargement.
            <PdfPages doc="portfolio" downloadLabel={a.portfolioCta} />
          )}

          {tab === 'cv' && (
            CV_AS_PDF ? (
              // Pages affichées en images (propre). PDF d'origine : public/cv.pdf
              <PdfPages doc="cv" downloadLabel={a.cvDownload} />
            ) : (
              <div className={styles.cv}>
                <CvBlock title={a.cvSections.bourses} items={cv.bourses} />
                <CvBlock title={a.cvSections.expos} items={cv.expos} />
                <CvBlock title={a.cvSections.freelance} items={cv.freelance} />
                <CvBlock title={a.cvSections.workshop} items={cv.workshop} />
                <CvBlock title={a.cvSections.formations} items={cv.formations} />
                <CvBlock title={a.cvSections.evenements} items={cv.evenements} />
              </div>
            )
          )}
        </motion.div>
      </div>
    </Layout>
  );
}

function CvBlock({ title, items }) {
  return (
    <section className={styles.cvBlock}>
      <h2 className={styles.cvTitle}>{title}</h2>
      <ul>{items.map((it, i) => <li key={i}>{it}</li>)}</ul>
    </section>
  );
}

/* ── Petites icônes (SVG inline, sans dépendance) ── */
function MailIcon() {
  return (
    <svg className="ico" width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7L22 6" />
    </svg>
  );
}
function InstaIcon() {
  return (
    <svg className="ico" width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="ico" width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
