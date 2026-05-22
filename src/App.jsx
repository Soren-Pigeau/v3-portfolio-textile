import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/work" element={<ProjectsPage section="work" />} />
      {/* Nouvelle route pour quand on entre dans un projet de "work" */}
      <Route path="/work/:slug" element={<ProjectsPage section="work" />} />
      
      <Route path="/about" element={<About />} />
      
      <Route path="/print" element={<ProjectsPage section="print" />} />
      {/* Nouvelle route pour quand on entre dans un projet de "print" */}
      <Route path="/print/:slug" element={<ProjectsPage section="print" />} />
      
      <Route path="/book" element={<ProjectsPage section="book" />} />
      {/* Nouvelle route pour quand on entre dans un projet de "book" */}
      <Route path="/book/:slug" element={<ProjectsPage section="book" />} />
      
      {/* toute URL inconnue → accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}