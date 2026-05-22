import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout/Layout';
import { useLanguage } from '../../i18n/LanguageContext';
import { sections } from '../../data/content';
import styles from './ProjectsPage.module.css';

export default function ProjectsPage({ section }) {
  const { t, lang } = useLanguage();
  const folders = sections[section] || [];

  const [openIndex, setOpenIndex] = useState(null);

  const open = (i) => setOpenIndex(i);
  const close = () => setOpenIndex(null);

  // ---------- VUE GRILLE : Accueil de la section ----------
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

  // ---------- VUE DÉTAIL : Image + Texte + Galerie ----------
  const f = folders[openIndex];
  
  // On sépare la première image (pour le haut) des autres (pour la grille du bas)
  const mainPhoto = f.photos[0];
  const otherPhotos = f.photos.slice(1);

  return (
    <Layout>
      <div className={styles.detailWrapper}>
        
        <button className={styles.back} onClick={close}>← retour</button>
        
        {/* SECTION HAUT : Image Principale + Infos */}
        <div className={styles.heroSection}>
          <motion.div 
            className={styles.mainImageWrap}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={mainPhoto} alt={f.title} className={styles.heroImg} />
          </motion.div>
          
          <motion.aside 
            className={styles.sideInfo}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className={styles.projectTitle}>
              {f.title}{f.year ? `, ${f.year}` : ''}
            </h1>
            <div className={styles.infoText}>
              {f.info[lang].split('\n').map((line, i) => <p key={i}>{line}</p>)}
              {f.orderable && (
                <a className={styles.order} href="mailto:cyrielle.pigeau@gmail.com">
                  {t.project.orderByMail}
                </a>
              )}
            </div>
          </motion.aside>
        </div>

        {/* SECTION BAS : Galerie Mixte (Verticale / Horizontale) */}
        {otherPhotos.length > 0 && (
          <div className={styles.photoGallery}>
            {otherPhotos.map((src, i) => (
              <motion.div
                key={i}
                className={styles.galleryItem}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6 }}
              >
                <img src={src} alt={`${f.title} ${i + 2}`} />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
}