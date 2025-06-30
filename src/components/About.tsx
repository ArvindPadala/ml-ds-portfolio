import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, GraduationCap } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

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

const About: React.FC = () => {
  const stats = [
    { label: 'Years Experience', value: 3, suffix: '+' },
    { label: 'Projects Completed', value: 25, suffix: '+' },
    { label: 'Technologies', value: 15, suffix: '+' },
    { label: 'Research Papers', value: 5, suffix: '+' },
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
    <section id="about" className="section-padding relative" ref={sectionRef}>
      <DataParticleBurst trigger={inView} />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">About Me</h2>
          <p className="text-lg text-secondary-600 dark:text-white max-w-2xl mx-auto">
            A passionate machine learning engineer with expertise in building scalable AI solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image and Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Profile Image Placeholder */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center">
                <User size={120} className="text-white" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-500 rounded-full flex items-center justify-center animate-float">
                <span className="text-white font-bold text-lg">ML</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold gradient-text">
                    <AnimatedNumber value={stat.value} />{stat.suffix}
                  </div>
                  <div className="text-secondary-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
              Transforming Data into Intelligent Solutions
            </h3>
            
            <p className="text-secondary-600 dark:text-white leading-relaxed">
              I'm a machine learning engineer with a passion for creating intelligent systems that solve real-world problems. 
              With expertise in deep learning, computer vision, and predictive analytics, I've successfully delivered 
              projects that have improved business outcomes and user experiences.
            </p>

            <p className="text-secondary-600 dark:text-white leading-relaxed">
              My journey in AI/ML began during my graduate studies, where I focused on computer vision and natural 
              language processing. Since then, I've worked on diverse projects ranging from recommendation systems 
              to autonomous vehicle perception systems.
            </p>

            {/* Personal Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-primary-600" />
                <span className="text-secondary-700 dark:text-white">San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar size={20} className="text-primary-600" />
                <span className="text-secondary-700 dark:text-white">Available for new opportunities</span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap size={20} className="text-primary-600" />
                <span className="text-secondary-700 dark:text-white">MS in Computer Science, Stanford University</span>
              </div>
            </div>

            {/* Key Areas */}
            <div className="pt-4">
              <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">Key Areas of Expertise:</h4>
              <div className="flex flex-wrap gap-2">
                {['Deep Learning', 'Computer Vision', 'NLP', 'MLOps', 'Data Engineering', 'Cloud Computing'].map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 