import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Eye, Code, Brain, BarChart3 } from 'lucide-react';

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

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Computer Vision Object Detection',
      description: 'Real-time object detection system using YOLO and TensorFlow, achieving 95% accuracy on COCO dataset.',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop',
      category: 'computer-vision',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'YOLO', 'Docker'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      features: ['Real-time detection', 'Multi-class classification', 'API integration', 'Performance optimization']
    },
    {
      id: 2,
      title: 'NLP Sentiment Analysis API',
      description: 'BERT-based sentiment analysis service with REST API, processing 10K+ requests per minute.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      category: 'nlp',
      technologies: ['Python', 'Transformers', 'FastAPI', 'PostgreSQL', 'Redis'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      features: ['BERT fine-tuning', 'Scalable API', 'Caching layer', 'Monitoring dashboard']
    },
    {
      id: 3,
      title: 'Recommendation System',
      description: 'Collaborative filtering recommendation engine for e-commerce, improving conversion by 25%.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      category: 'ml',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'MongoDB'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      features: ['Matrix factorization', 'A/B testing', 'Real-time updates', 'Performance metrics']
    },
    {
      id: 4,
      title: 'Time Series Forecasting',
      description: 'LSTM-based forecasting model for stock prices with 85% directional accuracy.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
      category: 'ml',
      technologies: ['Python', 'PyTorch', 'NumPy', 'Plotly', 'Streamlit'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      features: ['LSTM architecture', 'Feature engineering', 'Interactive dashboard', 'Backtesting']
    },
    {
      id: 5,
      title: 'Data Pipeline Automation',
      description: 'End-to-end data pipeline using Apache Airflow and Spark for processing 1TB+ daily data.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      category: 'data-engineering',
      technologies: ['Python', 'Apache Spark', 'Airflow', 'AWS', 'Kafka'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      features: ['ETL automation', 'Data quality checks', 'Scalable processing', 'Monitoring alerts']
    },
    {
      id: 6,
      title: 'ML Model Deployment Platform',
      description: 'Kubernetes-based platform for deploying and managing ML models with auto-scaling.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      category: 'mlops',
      technologies: ['Docker', 'Kubernetes', 'Flask', 'Prometheus', 'Grafana'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      features: ['Auto-scaling', 'Model versioning', 'Health monitoring', 'Rollback capability']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', icon: Code },
    { id: 'ml', label: 'Machine Learning', icon: Brain },
    { id: 'computer-vision', label: 'Computer Vision', icon: Eye },
    { id: 'nlp', label: 'NLP', icon: BarChart3 },
    { id: 'data-engineering', label: 'Data Engineering', icon: Code },
    { id: 'mlops', label: 'MLOps', icon: Code }
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
      damping: 25,
      stiffness: 700,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
      damping: 25,
      stiffness: 700,
    });

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((e.clientX - centerX) / (rect.width / 2));
      mouseY.set((e.clientY - centerY) / (rect.height / 2));
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30, rotateX: -15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ 
          scale: 1.02,
          transition: { type: "spring", stiffness: 300 }
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="card group relative overflow-hidden"
      >
        {/* 3D Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: "translateZ(-10px)",
          }}
        />

        {/* Project Image with 3D Parallax */}
        <div className="relative overflow-hidden rounded-lg mb-6">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
            style={{
              transform: "translateZ(20px)",
            }}
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
          />
          <motion.div
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4"
            style={{
              transform: "translateZ(30px)",
            }}
          >
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.2,
                rotateY: 180,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white rounded-full hover:bg-primary-100 transition-colors duration-200"
            >
              <Github size={20} className="text-secondary-700" />
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.2,
                rotateY: -180,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white rounded-full hover:bg-primary-100 transition-colors duration-200"
            >
              <ExternalLink size={20} className="text-secondary-700" />
            </motion.a>
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="space-y-4" style={{ transform: "translateZ(10px)" }}>
          <motion.h3 
            className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200"
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            {project.title}
          </motion.h3>
          
          <p className="text-secondary-600 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies with 3D hover effects */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string, techIndex: number) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  y: -2,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)"
                }}
                className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Features with animated bullets */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-secondary-900">Key Features:</h4>
            <ul className="space-y-1">
              {project.features.map((feature: string, featureIndex: number) => (
                <motion.li 
                  key={feature} 
                  className="text-sm text-secondary-600 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="w-1 h-1 bg-primary-500 rounded-full mr-2"
                    whileHover={{ 
                      scale: 1.5,
                      backgroundColor: "#3b82f6"
                    }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };

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
    <section id="projects" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <DataParticleBurst trigger={inView} />
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-10"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-accent-200 to-primary-200 rounded-full opacity-10"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            rotate: [360, 180, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
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
          <h2 className="text-4xl font-bold gradient-text mb-4">Featured Projects</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto dark:text-white">
            A collection of machine learning and data science projects showcasing technical expertise and problem-solving skills
          </p>
        </motion.div>

        {/* Filter Buttons with 3D effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                y: -2,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <filter.icon size={16} />
              <span>{filter.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More Button with 3D effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center space-x-2"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Github size={20} />
            <span>View More on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 