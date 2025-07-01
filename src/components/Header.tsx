import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showThemeHint, setShowThemeHint] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show theme hint for first-time visitors
  useEffect(() => {
    const hasSeenHint = localStorage.getItem('themeHintSeen');
    if (!hasSeenHint) {
      // Show hint after a short delay
      const timer = setTimeout(() => {
        setShowThemeHint(true);
        // Hide hint after 5 seconds
        setTimeout(() => {
          setShowThemeHint(false);
          localStorage.setItem('themeHintSeen', 'true');
        }, 5000);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Function to handle navigation with hash scrolling
  const handleNavigation = (href: string, hash?: string) => {
    if (location.pathname === href) {
      // If we're already on the target page, just scroll to hash
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Navigate to the page first, then scroll to hash
      navigate(href + (hash || ''));
    }
  };

  const navItems = [
    { name: 'Home', href: '/', hash: '#home' },
    { name: 'About', href: '/', hash: '#about' },
    { name: 'Skills', href: '/', hash: '#skills' },
    { name: 'Projects', href: '/', hash: '#projects' },
    { name: 'Experience', href: '/', hash: '#experience' },
    { name: 'Featured', href: '/', hash: '#blog' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/', hash: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-secondary-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text"
          >
            Arvind Chary Padala
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ 
                  scale: 1.12,
                  boxShadow: "0 0 12px 2px #60a5fa, 0 0 24px 4px #e879f9"
                }}
                whileTap={{ scale: 0.97 }}
                style={{ boxShadow: 'none' }}
              >
                {item.hash ? (
                  // For homepage sections, use custom navigation with hash
                  <button
                    onClick={() => handleNavigation(item.href, item.hash)}
                    className="text-secondary-700 dark:text-secondary-100 hover:text-primary-600 dark:hover:text-accent-400 font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                ) : (
                  // For other pages like Blog, use regular Link
                  <Link
                    to={item.href}
                    className="text-secondary-700 dark:text-secondary-100 hover:text-primary-600 dark:hover:text-accent-400 font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            {/* Theme Toggle Button */}
            <div className="relative ml-4">
              {/* Theme Hint Indicator */}
              {showThemeHint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-2 -right-2 z-10"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                  >
                    <div className="flex items-center space-x-1">
                      <Sparkles size={12} />
                      <span>Toggle Theme</span>
                    </div>
                  </motion.div>
                  {/* Arrow pointing to button */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary-500"
                  />
                </motion.div>
              )}
              
              <motion.button
                onClick={toggleTheme}
                whileHover={{
                  scale: 1.18,
                  boxShadow: "0 0 16px 4px #e879f9, 0 0 32px 8px #60a5fa"
                }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 hover:bg-primary-100 dark:hover:bg-accent-700 transition-colors duration-200 flex items-center justify-center ${
                  showThemeHint ? 'ring-2 ring-primary-500 ring-opacity-50 animate-pulse' : ''
                }`}
                aria-label="Toggle theme"
                style={{ boxShadow: 'none' }}
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-yellow-300" />
                ) : (
                  <Moon size={20} className="text-primary-600" />
                )}
              </motion.button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-secondary-200 dark:border-secondary-700 mb-6"
          >
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hash ? (
                  // For homepage sections, use custom navigation with hash
                  <button
                    onClick={() => {
                      handleNavigation(item.href, item.hash);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block py-2 text-secondary-700 dark:text-secondary-100 hover:text-primary-600 dark:hover:text-accent-400 font-medium w-full text-left"
                  >
                    {item.name}
                  </button>
                ) : (
                  // For other pages like Blog, use regular Link
                  <Link
                    to={item.href}
                    className="block py-2 text-secondary-700 dark:text-secondary-100 hover:text-primary-600 dark:hover:text-accent-400 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            {/* Theme Toggle Button (Mobile) */}
            <div className="relative mt-4">
              {/* Theme Hint Indicator (Mobile) */}
              {showThemeHint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-2 -left-2 z-10"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                  >
                    <div className="flex items-center space-x-1">
                      <Sparkles size={12} />
                      <span>Toggle Theme</span>
                    </div>
                  </motion.div>
                  {/* Arrow pointing to button */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary-500"
                  />
                </motion.div>
              )}
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 hover:bg-primary-100 dark:hover:bg-accent-700 transition-colors duration-200 flex items-center justify-center ${
                  showThemeHint ? 'ring-2 ring-primary-500 ring-opacity-50 animate-pulse' : ''
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-yellow-300" />
                ) : (
                  <Moon size={20} className="text-primary-600" />
                )}
              </button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header; 