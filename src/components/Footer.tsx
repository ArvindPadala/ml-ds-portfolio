import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ArvindPadala', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/arvindcharypadala/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/Avvi_114', label: 'Twitter' },
    { icon: Mail, href: 'mailto:padalaarvindchary@gmail.com', label: 'Email' },
  ];

  return (
    <footer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text">Arvind Padala's Portfolio</h3>
            <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
              Machine Learning Engineer & Data Scientist passionate about building intelligent solutions 
              that solve real-world problems.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.18, 
                    y: -4, 
                    boxShadow: "0 0 16px 4px #e879f9, 0 0 32px 8px #60a5fa"
                  }}
                  className="p-2 bg-secondary-800 rounded-lg text-secondary-300 hover:text-white hover:bg-secondary-700 transition-all duration-200"
                  aria-label={social.label}
                  style={{ boxShadow: 'none' }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-secondary-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-secondary-900 dark:text-white">Get In Touch</h4>
            <div className="space-y-2 text-secondary-700 dark:text-secondary-300">
              <p>📍 New Jersey, NJ</p>
              <p>📧 padalaarvindchary@gmail.com</p>
              <p>📱 +1 (848) 668-3934</p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Available for new opportunities and collaborations
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-secondary-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © {currentYear} Avvi's  Portfolio. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-secondary-400 text-sm">
              <span>Made with</span>
              <motion.span
                animate={{
                  scale: [1, 1.25, 0.9, 1.15, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: [0.42, 0, 0.58, 1],
                  times: [0, 0.2, 0.5, 0.8, 1]
                }}
                style={{ display: 'inline-block' }}
              >
                <Heart size={16} className="text-red-500" />
              </motion.span>
              <span>using React & TypeScript</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 