import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, BookOpen, Code, Brain, BarChart3, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';
import { web3formsService } from '../services/web3forms';
import { Link } from 'react-router-dom';

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

const Blog: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setNewsletterStatus({ type: null, message: '' });
    
    try {
      const response = await web3formsService.subscribeToNewsletter({ email: newsletterEmail });
      setNewsletterStatus({ type: 'success', message: response.message });
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.' 
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  // Neural Network Animation Component
  const NeuralNetworkAnimation = () => {
    const nodes = Array.from({ length: 12 }, (_, i) => i);
    const connections = [
      [0, 4], [0, 5], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5],
      [4, 8], [4, 9], [5, 8], [5, 9], [6, 8], [6, 9], [7, 8], [7, 9],
      [8, 10], [8, 11], [9, 10], [9, 11]
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural Network Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node}
            className="absolute w-3 h-3 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
            style={{
              left: `${20 + (index % 4) * 20}%`,
              top: `${20 + Math.floor(index / 4) * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
              boxShadow: [
                "0 0 10px rgba(59, 130, 246, 0.3)",
                "0 0 20px rgba(59, 130, 246, 0.6)",
                "0 0 10px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Neural Network Connections */}
        {connections.map((connection, index) => (
          <motion.div
            key={index}
            className="absolute h-0.5 bg-gradient-to-r from-primary-400/30 to-accent-400/30"
            style={{
              left: `${20 + (connection[0] % 4) * 20}%`,
              top: `${20 + Math.floor(connection[0] / 4) * 20}%`,
              width: `${Math.abs((connection[1] % 4) - (connection[0] % 4)) * 20}%`,
              transformOrigin: "left center"
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  // Floating Mathematical Formulas
  const FloatingFormulas = () => {
    const formulas = [
      "f(x) = σ(Wx + b)",
      "∇L = ∂L/∂θ",
      "P(A|B) = P(B|A)P(A)/P(B)",
      "y = mx + b",
      "E = mc²",
      "∑(x - μ)²/n"
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {formulas.map((formula, index) => (
          <motion.div
            key={index}
            className="absolute text-xs font-mono text-primary-400/40"
            style={{
              left: `${10 + (index * 15) % 80}%`,
              top: `${20 + (index * 25) % 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 1.5,
              ease: "easeInOut"
            }}
          >
            {formula}
          </motion.div>
        ))}
      </div>
    );
  };

  // Data Flow Particles
  const DataFlowParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => i);

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle}
            className="absolute w-1 h-1 bg-accent-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: particle * 0.2,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };

  // 3D Matrix Grid
  const MatrixGrid = () => {
    const cells = Array.from({ length: 25 }, (_, i) => i);

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="grid grid-cols-5 gap-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {cells.map((cell) => (
            <motion.div
              key={cell}
              className="w-2 h-2 bg-primary-300/20 rounded"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.8, 0.2],
                rotateY: [0, 180, 360],
                rotateX: [0, 90, 180]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: cell * 0.1,
                ease: "easeInOut"
              }}
              style={{ transformStyle: "preserve-3d" }}
            />
          ))}
        </div>
      </div>
    );
  };

  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Transformer Architecture in Deep Learning',
      excerpt: 'A comprehensive guide to transformer models, their architecture, and applications in natural language processing.',
      content: 'Transformers have revolutionized the field of natural language processing...',
      author: 'Your Name',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'deep-learning',
      tags: ['Transformers', 'NLP', 'Attention Mechanism', 'BERT'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
      featured: true,
      views: 1247,
      likes: 89
    },
    {
      id: 2,
      title: 'Building Production-Ready ML Pipelines with MLOps',
      excerpt: 'Best practices for deploying machine learning models in production environments with proper monitoring and scaling.',
      content: 'MLOps bridges the gap between machine learning development and production deployment...',
      author: 'Your Name',
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'mlops',
      tags: ['MLOps', 'Docker', 'Kubernetes', 'Monitoring'],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
      featured: false,
      views: 892,
      likes: 67
    },
    {
      id: 3,
      title: 'Computer Vision: From Traditional Methods to Deep Learning',
      excerpt: 'Evolution of computer vision techniques and how deep learning has transformed image recognition capabilities.',
      content: 'Computer vision has evolved significantly from traditional feature-based methods...',
      author: 'Your Name',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'computer-vision',
      tags: ['Computer Vision', 'CNN', 'Image Recognition', 'OpenCV'],
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop',
      featured: true,
      views: 1567,
      likes: 124
    },
    {
      id: 4,
      title: 'Time Series Forecasting with LSTM Networks',
      excerpt: 'Practical implementation of LSTM networks for time series prediction with real-world examples.',
      content: 'Time series forecasting is crucial for many business applications...',
      author: 'Your Name',
      date: '2023-12-28',
      readTime: '15 min read',
      category: 'deep-learning',
      tags: ['LSTM', 'Time Series', 'Forecasting', 'PyTorch'],
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
      featured: false,
      views: 734,
      likes: 45
    },
    {
      id: 5,
      title: 'Data Engineering: Building Scalable Data Pipelines',
      excerpt: 'Designing and implementing robust data pipelines for processing large-scale datasets efficiently.',
      content: 'Data engineering is the foundation of any successful data science project...',
      author: 'Your Name',
      date: '2023-12-20',
      readTime: '14 min read',
      category: 'data-engineering',
      tags: ['Apache Spark', 'Airflow', 'Data Pipelines', 'ETL'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      featured: false,
      views: 623,
      likes: 38
    },
    {
      id: 6,
      title: 'The Future of AI: Trends and Predictions for 2024',
      excerpt: 'Exploring emerging trends in artificial intelligence and their potential impact on various industries.',
      content: 'Artificial intelligence continues to evolve at an unprecedented pace...',
      author: 'Your Name',
      date: '2023-12-15',
      readTime: '11 min read',
      category: 'ai-trends',
      tags: ['AI Trends', 'Future Tech', 'Industry Impact', 'Innovation'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      featured: true,
      views: 2134,
      likes: 156
    }
  ];

  const categories = [
    { id: 'all', label: 'All Articles', icon: BookOpen, count: blogPosts.length },
    { id: 'deep-learning', label: 'Deep Learning', icon: Brain, count: blogPosts.filter(p => p.category === 'deep-learning').length },
    { id: 'mlops', label: 'MLOps', icon: Code, count: blogPosts.filter(p => p.category === 'mlops').length },
    { id: 'computer-vision', label: 'Computer Vision', icon: Globe, count: blogPosts.filter(p => p.category === 'computer-vision').length },
    { id: 'data-engineering', label: 'Data Engineering', icon: BarChart3, count: blogPosts.filter(p => p.category === 'data-engineering').length },
    { id: 'ai-trends', label: 'AI Trends', icon: BookOpen, count: blogPosts.filter(p => p.category === 'ai-trends').length }
  ];

  const filteredPosts = blogPosts.filter(post => 
    activeFilter === 'all' || post.category === activeFilter
  );

  const BlogCard = ({ post, index }: { post: any; index: number }) => {
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
        className="card group relative overflow-hidden cursor-pointer"
      >
        {/* Featured Badge */}
        {post.featured && (
          <motion.div
            className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Featured
          </motion.div>
        )}

        {/* 3D Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: "translateZ(-10px)",
          }}
        />

        {/* Blog Image with 3D Parallax */}
        <div className="relative overflow-hidden rounded-lg mb-6">
          <motion.img
            src={post.image}
            alt={post.title}
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
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{
              transform: "translateZ(30px)",
            }}
          >
            <motion.div
              className="text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight size={32} className="mx-auto mb-2" />
              <p className="text-sm font-medium">Read Article</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Blog Content */}
        <div className="space-y-4" style={{ transform: "translateZ(10px)" }}>
          {/* Category and Stats */}
          <div className="flex items-center justify-between text-sm text-secondary-600">
            <motion.span
              className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
              whileHover={{ scale: 1.05 }}
            >
              {categories.find(cat => cat.id === post.category)?.label}
            </motion.span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <BookOpen size={14} />
                <span><AnimatedNumber value={post.views} /></span>
              </span>
              <span className="flex items-center space-x-1">
                <User size={14} />
                <span><AnimatedNumber value={post.likes} /></span>
              </span>
            </div>
          </div>

          {/* Title */}
          <motion.h3 
            className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2"
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            {post.title}
          </motion.h3>
          
          {/* Excerpt */}
          <p className="text-secondary-600 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-secondary-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock size={14} />
                <span>
                  {post.readTime.match(/\d+/) ? <AnimatedNumber value={parseInt(post.readTime.match(/\d+/)![0])} /> : null}
                  {post.readTime.replace(/\d+/, '')}
                </span>
              </span>
            </div>
            <span className="font-medium text-primary-600">{post.author}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.3, delay: tagIndex * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  y: -2,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)"
                }}
                className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs font-medium cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                {tag}
              </motion.span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 bg-secondary-100 text-secondary-500 rounded text-xs">
                +{post.tags.length - 3} more
              </span>
            )}
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
    <section id="blog" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <DataParticleBurst trigger={inView} />
      {/* ML/DS Specific 3D Animations */}
      <NeuralNetworkAnimation />
      <FloatingFormulas />
      <DataFlowParticles />
      <MatrixGrid />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Blog & Articles</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto dark:text-white">
            Insights, tutorials, and thoughts on machine learning, data science, and AI trends
          </p>
        </motion.div>

        {/* Category Filters with 3D effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
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
                activeFilter === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-secondary-700 hover:bg-secondary-100 border border-secondary-200'
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <category.icon size={16} />
              <span>{category.label}</span>
              <span className="ml-1 text-xs opacity-75">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Article */}
        {filteredPosts.filter(post => post.featured).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">Featured Article</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredPosts.filter(post => post.featured).slice(0, 1).map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(post => !post.featured || activeFilter !== 'all').map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-secondary-200">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">Stay Updated</h3>
            <p className="text-secondary-600 mb-6 max-w-md mx-auto">
              Get notified when I publish new articles about machine learning and data science.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
              />
              <motion.button
                type="submit"
                disabled={isSubscribing}
                whileHover={{ 
                  scale: isSubscribing ? 1 : 1.05,
                  rotateY: isSubscribing ? 0 : 5,
                  boxShadow: isSubscribing ? "0 5px 15px rgba(107, 114, 128, 0.2)" : "0 10px 25px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: isSubscribing ? 1 : 0.95 }}
                className={`px-6 py-3 ${
                  isSubscribing 
                    ? 'bg-secondary-400 cursor-not-allowed' 
                    : 'btn-primary'
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>

            {/* Newsletter Status Message */}
            {newsletterStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg flex items-center justify-center space-x-2 ${
                  newsletterStatus.type === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                {newsletterStatus.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span className="text-sm font-medium">{newsletterStatus.message}</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="flex justify-center mt-8">
          <Link to="/blog" className="btn-primary px-8 py-3 text-lg font-semibold">
            See More Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog; 