import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import EditorPage from './pages/EditorPage';
import PublishedPage from './pages/PublishedPage';
import { AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Don't show the toggle on Published pages (they have their own themes)
  const isPublishedPage = location.pathname.startsWith('/p/');

  return (
    <>
      {!isPublishedPage && (
        <button 
          onClick={toggleTheme}
          style={{ 
            position: 'fixed', bottom: 20, right: 20, zIndex: 10000, 
            background: 'var(--text)', color: 'var(--bg)', 
            border: '2px solid var(--bg)', borderRadius: '50%',
            width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', transition: 'all 0.2s'
          }}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      )}

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/edit/:id" element={<EditorPage />} />
          <Route path="/p/:slug" element={<PublishedPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
