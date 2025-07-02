import React, { useRef, useContext } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, BookOpen, Sparkles } from 'lucide-react';
import { ThemeContext } from '../App';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { resetThemeHint } = useContext(ThemeContext);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    damping: 25,
    stiffness: 700,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    damping: 25,
    stiffness: 700,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Floating Data Points Animation
  const FloatingDataPoints = () => {
    const points = Array.from({ length: 15 }, (_, i) => i);
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {points.map((point) => (
          <motion.div
            key={point}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: point * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  // Gradient Descent Visualization
  const GradientDescentAnimation = () => {
    const steps = Array.from({ length: 8 }, (_, i) => i);
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {steps.map((step) => (
          <motion.div
            key={step}
            className="absolute w-3 h-3 bg-accent-400 rounded-full"
            style={{
              left: `${20 + step * 8}%`,
              top: `${60 - step * 3}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              boxShadow: [
                "0 0 5px rgba(236, 72, 153, 0.3)",
                "0 0 15px rgba(236, 72, 153, 0.8)",
                "0 0 5px rgba(236, 72, 153, 0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: step * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  // Neural Network Connections
  const NeuralConnections = () => {
    const connections = Array.from({ length: 12 }, (_, i) => i);
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {connections.map((connection) => (
          <motion.div
            key={connection}
            className="absolute h-0.5 bg-gradient-to-r from-primary-400/20 to-accent-400/20"
            style={{
              left: `${10 + (connection * 7) % 80}%`,
              top: `${30 + (connection * 5) % 40}%`,
              width: `${20 + (connection * 3) % 30}%`,
              transformOrigin: "left center"
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: connection * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  // Floating Mathematical Symbols
  const FloatingMathSymbols = () => {
    const symbols = ["∑", "∫", "∂", "∇", "σ", "μ", "θ", "λ", "α", "β"];
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {symbols.map((symbol, index) => (
          <motion.div
            key={symbol}
            className="absolute text-lg font-bold text-primary-300/30"
            style={{
              left: `${15 + (index * 8) % 70}%`,
              top: `${20 + (index * 6) % 60}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-secondary-900 dark:via-primary-900 dark:to-accent-900"
    >
      {/* ML/DS Specific Background Animations */}
      <FloatingDataPoints />
      <GradientDescentAnimation />
      <NeuralConnections />
      <FloatingMathSymbols />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium mb-2 sm:px-4 sm:py-2 sm:text-sm sm:mb-4">
                Here's what I do
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 sm:mt-0 text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-white mb-6 leading-tight"
            >
              Transforming Data into
              <span className="gradient-text block">Intelligent Insights</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-secondary-600 dark:text-white mb-8 leading-relaxed"
            >
              Passionate about building intelligent systems that solve real-world problems. 
              Specializing in deep learning, computer vision, and scalable ML solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-4 text-lg font-semibold"
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Projects
              </motion.button>
              <motion.a
                href="/Arvind_Padala_Resume.pdf"
                download="Arvind_Padala_Resume.pdf"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(107, 114, 128, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download CV
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex justify-center lg:justify-start gap-6"
            >
              <motion.a
                href="https://github.com/ArvindPadala"
                whileHover={{ 
                  scale: 1.2,
                  rotateY: 15,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors duration-200"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/arvindcharypadala/"
                whileHover={{ 
                  scale: 1.2,
                  rotateY: 15,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors duration-200"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://medium.com/@padalaarvindchary1"
                whileHover={{ 
                  scale: 1.2,
                  rotateY: 15,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors duration-200"
                style={{ transformStyle: "preserve-3d" }}
              >
                <BookOpen size={20} />
              </motion.a>
              <motion.a
                href="mailto:padalaarvindchary@gmail.com"
                whileHover={{ 
                  scale: 1.2,
                  rotateY: 15,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors duration-200"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Mail size={20} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Card */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="relative">
              {/* 3D Card with ML/DS Theme */}
              <motion.div
                className="relative bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 rounded-3xl p-8 shadow-2xl"
                style={{
                  transform: "translateZ(50px)",
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                {/* Neural Network Visualization */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-accent-400/20" />
                  
                  {/* Animated Neural Network Nodes */}
                  {Array.from({ length: 9 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{
                        left: `${20 + (i % 3) * 30}%`,
                        top: `${20 + Math.floor(i / 3) * 30}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                        boxShadow: [
                          "0 0 5px rgba(255, 255, 255, 0.3)",
                          "0 0 15px rgba(255, 255, 255, 0.8)",
                          "0 0 5px rgba(255, 255, 255, 0.3)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 text-white">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="text-2xl font-bold mb-4"
                  >
                    AI/ML Engineer
                  </motion.h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">Deep Learning</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                      <span className="text-sm">Computer Vision</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                      <span className="text-sm">MLOps & Deployment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-sm">Data Science</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    className="mt-6 pt-6 border-t border-white/20"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-80">Experience</span>
                      <span className="text-lg font-bold">3+ Years</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm opacity-80">Projects</span>
                      <span className="text-lg font-bold">20+</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm opacity-80">Technologies</span>
                      <span className="text-lg font-bold">15+</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-accent-400 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transform: "translateZ(100px)" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-400 rounded-full"
                animate={{
                  y: [0, 10, 0],
                  rotate: [360, 180, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transform: "translateZ(75px)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-secondary-600"
          >
            <span className="text-sm mb-2 dark:text-white">Scroll to explore</span>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>

        {/* Theme Hint Test Button (Development Only) */}
        <motion.button
          onClick={resetThemeHint}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 p-2 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200"
          title="Reset Theme Hint (Test)"
        >
          <Sparkles size={16} />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero; 