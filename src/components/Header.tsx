import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../App';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
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
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                className="text-secondary-700 dark:text-secondary-100 hover:text-primary-600 dark:hover:text-accent-400 font-medium transition-colors duration-200"
              >
                {item.name}
              </motion.a>
            ))}
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 hover:bg-primary-100 dark:hover:bg-accent-700 transition-colors duration-200 flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-300" />
              ) : (
                <Moon size={20} className="text-primary-600" />
              )}
            </button>
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
            className="md:hidden py-4 border-t border-secondary-200 dark:border-secondary-700"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-secondary-700 dark:text-secondary-100 hover:text-primary-600 dark:hover:text-accent-400 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {/* Theme Toggle Button (Mobile) */}
            <button
              onClick={toggleTheme}
              className="mt-4 p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 hover:bg-primary-100 dark:hover:bg-accent-700 transition-colors duration-200 flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-300" />
              ) : (
                <Moon size={20} className="text-primary-600" />
              )}
            </button>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header; 