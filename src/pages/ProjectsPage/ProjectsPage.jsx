import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout/Layout';
import { useLanguage } from '../../i18n/LanguageContext';
import { sections } from '../../data/content';
import styles from './ProjectsPage.module.css';

// section = 'work' | 'print' | 'book' (passé depuis App.jsx)
export default function ProjectsPage({ section }) {
  const { t, lang } = useLanguage();
  const folders = sections[section] || [];

  const [openIndex, setOpenIndex] = useState(null); // dossier ouvert
  const [showInfo, setShowInfo] = useState(false);   // toggle "Infos"

  const open = (i) => { setOpenIndex(i); setShowInfo(false); };
  const close = () => { setOpenIndex(null); setShowInfo(false); };

  // ---------- VUE GRILLE : 3 dossiers ----------
  if (openIndex === null) {
    return (
      <Layout>
        <div className={styles.grid}>
          {folders.map((f, i) => (
            <motion.button
              key={f.slug}
              className={styles.folder}
              onClick={() => open(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Flou par défaut, net au survol (demande de Cyrielle) */}
              <span className={styles.thumbWrap}>
                <img src={f.cover} alt={f.title} className={styles.thumb} />
              </span>
              <span className={styles.thumbTitle}>
                {f.title}{f.year ? `, ${f.year}` : ''}
              </span>
            </motion.button>
          ))}
        </div>
      </Layout>
    );
  }

  // ---------- VUE DÉTAIL : photos qui défilent + Infos ----------
  const f = folders[openIndex];

  return (
    <Layout>
      <div className={styles.detail}>
        {/* Colonne photos (défilent au scroll) */}
        <div className={styles.photos}>
          {f.photos.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`${f.title} ${i + 1}`}
              className={styles.photo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7 }}
            />
          ))}
        </div>

        {/* Colonne texte, tout aligné à droite (cf. cahier des charges) */}
        <aside className={styles.side}>
          <button className={styles.back} onClick={close}>← retour</button>
          <h1 className={styles.projectTitle}>
            {f.title}{f.year ? `, ${f.year}` : ''}
          </h1>
          <button
            className={styles.infosBtn}
            onClick={() => setShowInfo((v) => !v)}
          >
            {t.project.infos}
          </button>

          {showInfo && (
            <motion.div
              className={styles.infoText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {f.info[lang].split('\n').map((line, i) => <p key={i}>{line}</p>)}
              {f.orderable && (
                <a className={styles.order} href="mailto:cyrielle.pigeau@gmail.com">
                  {t.project.orderByMail}
                </a>
              )}
            </motion.div>
          )}
        </aside>
      </div>
    </Layout>
  );
}
