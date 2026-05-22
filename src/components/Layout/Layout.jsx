import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './Layout.module.css';

// variant="overlay" → texte clair par-dessus l'image (page d'accueil)
// variant="default" → texte sombre sur fond clair (pages intérieures)
export default function Layout({ children, variant = 'default' }) {
  const { t, lang, toggle } = useLanguage();

  return (
    <div className={`${styles.shell} ${variant === 'overlay' ? styles.overlay : ''}`}>
      {/* Nom — haut gauche, présent partout, ramène à l'accueil */}
      <Link to="/" className={styles.name}>
        Cyrielle<br />Pigeau
      </Link>

      {/* Bascule de langue — haut droite */}
      <button className={styles.lang} onClick={toggle} aria-label="Changer de langue">
        <span className={lang === 'fr' ? styles.langActive : ''}>FR</span>
        <span className={styles.langSep}>/</span>
        <span className={lang === 'en' ? styles.langActive : ''}>EN</span>
      </button>

      {/* Contenu de la page */}
      <main className={styles.main}>{children}</main>

      {/* Navigation principale — bas gauche, présente partout */}
      <nav className={styles.nav} aria-label="Navigation principale">
        <NavLink to="/work" className={({ isActive }) => (isActive ? styles.active : '')}>{t.nav.work}</NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>{t.nav.about}</NavLink>
        <NavLink to="/print" className={({ isActive }) => (isActive ? styles.active : '')}>{t.nav.print}</NavLink>
        <NavLink to="/book" className={({ isActive }) => (isActive ? styles.active : '')}>{t.nav.book}</NavLink>
      </nav>
    </div>
  );
}
