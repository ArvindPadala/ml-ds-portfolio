import React, { createContext, useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Theme context for dark mode (dark mode is now default)
export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  resetThemeHint: () => {},
});

function App() {
  const [theme, setTheme] = useState('dark'); // Changed default to dark

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else {
      // Always default to dark mode on first visit
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Update localStorage and html class
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Function to reset theme hint (for testing)
  const resetThemeHint = useCallback(() => {
    localStorage.removeItem('themeHintSeen');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, resetThemeHint }}>
      <div className={`min-h-screen bg-secondary-50 dark:bg-gradient-to-br dark:from-secondary-900 dark:via-primary-900 dark:to-accent-900`}>
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App; 