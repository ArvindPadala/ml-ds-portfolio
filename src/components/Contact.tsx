import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import { web3formsService, ContactFormData } from '../services/web3forms';

// Micro-animation: Data Particle Burst
const DataParticleBurst = ({ trigger }: { trigger: boolean }) => {
  const particles = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {particles.map((p) => (
        <motion.div
          key={p}
          className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={trigger ? { opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], y: [-20, 0, 20] } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: p * 0.04, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const response = await web3formsService.submitContactForm(formData);
      setSubmitStatus({ type: 'success', message: response.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'padalaarvindchary@gmail.com',
      link: 'mailto:padalaarvindchary@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (848) 668-3934',
      link: 'tel:+18486683934'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'New Jersey, NJ',
      link: 'https://maps.app.goo.gl/LkE97gyP3iy5gZgZ7'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/ArvindPadala',
      color: 'hover:text-gray-800'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/arvindcharypadala/',
      color: 'hover:text-blue-600'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: 'https://x.com/Avvi_114',
      color: 'hover:text-blue-400'
    }
  ];

  // Track if section is in view for burst
  const [inView, setInView] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
        setInView(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <DataParticleBurst trigger={inView} />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 bg-accent-200 rounded-full opacity-20"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-12 h-12 bg-primary-300 rounded-full opacity-30"
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            rotateZ: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Get In Touch</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto dark:text-white">
            I'm always interested in new opportunities and collaborations. Let's discuss how we can work together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-6 dark:text-white">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-primary-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-primary-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2 dark:text-white">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-primary-400"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2 dark:text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-primary-400 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ 
                  scale: isSubmitting ? 1 : 1.02,
                  rotateY: isSubmitting ? 0 : 5,
                  boxShadow: isSubmitting ? "0 10px 20px rgba(107, 114, 128, 0.2)" : "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center space-x-2 py-3 relative overflow-hidden group ${
                  isSubmitting 
                    ? 'bg-secondary-400 cursor-not-allowed' 
                    : 'btn-primary'
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="relative z-10"
                  >
                    <Send size={20} />
                  </motion.div>
                ) : (
                  <Send size={20} className="relative z-10" />
                )}
                <span className="relative z-10">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
              </motion.button>

              {/* Status Message */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                  <span className="text-sm font-medium">{submitStatus.message}</span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-6 dark:text-white">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    initial={{ opacity: 0, y: 20, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      y: -5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-all duration-200 group"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div 
                      className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors duration-200"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <info.icon size={20} className="text-primary-600" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-secondary-900">{info.title}</p>
                      <p className="text-secondary-600">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links with 3D effects */}
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-6 dark:text-white">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -5,
                      rotateY: 180,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 bg-secondary-100 rounded-lg text-secondary-600 transition-all duration-200 ${social.color}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability with floating animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="card"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h4 className="text-lg font-bold text-secondary-900 mb-3">Current Availability</h4>
              <div className="space-y-2 text-sm text-secondary-600">
                {[
                  'Available for new opportunities',
                  'Open to freelance projects',
                  'Interested in research collaborations',
                  'Available for speaking engagements'
                ].map((item, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <motion.span
                      className="mr-2"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      ✅
                    </motion.span>
                    {item}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Response Time with pulse animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="text-center p-6 bg-primary-50 rounded-lg"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.p 
                className="text-primary-700 font-medium"
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                I typically respond within 24 hours during business days
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 