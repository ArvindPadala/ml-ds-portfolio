import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Database, BarChart3, Cpu, Zap, Globe, Shield, Layers, Target } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Floating Skill Icons Animation
  const FloatingSkillIcons = () => {
    const icons = [
      { icon: Brain, label: 'AI/ML', color: 'from-purple-400 to-pink-400' },
      { icon: Code, label: 'Programming', color: 'from-blue-400 to-cyan-400' },
      { icon: Database, label: 'Data', color: 'from-green-400 to-emerald-400' },
      { icon: BarChart3, label: 'Analytics', color: 'from-orange-400 to-red-400' },
      { icon: Cpu, label: 'Computing', color: 'from-indigo-400 to-purple-400' },
      { icon: Zap, label: 'Performance', color: 'from-yellow-400 to-orange-400' }
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {icons.map((iconData, index) => (
          <motion.div
            key={index}
            className={`absolute w-12 h-12 bg-gradient-to-r ${iconData.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
            style={{ 
              left: `${10 + (index * 15) % 80}%`,
              top: `${20 + (index * 10) % 60}%`,
              transformStyle: "preserve-3d" 
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "easeInOut"
            }}
          >
            <iconData.icon size={20} />
          </motion.div>
        ))}
      </div>
    );
  };

  // Neural Network Progress Bars
  const NeuralProgressBar = ({ percentage, label, color }: { percentage: number; label: string; color: string }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-secondary-700 font-medium">{label}</span>
          <span className="text-sm text-secondary-500">{percentage}%</span>
        </div>
        <div className="relative h-3 bg-secondary-200 rounded-full overflow-hidden">
          {/* Neural Network Nodes */}
          <div className="absolute inset-0 flex items-center justify-between px-2">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Progress Bar with Neural Effect */}
          <motion.div
            className={`h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden`}
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Animated Data Flow */}
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const skillCategories = [
    {
      id: 'all',
      label: 'All Skills',
      icon: Target,
      skills: [
        { name: 'Python', percentage: 95, color: 'from-blue-500 to-cyan-500' },
        { name: 'TensorFlow', percentage: 90, color: 'from-orange-500 to-red-500' },
        { name: 'PyTorch', percentage: 88, color: 'from-red-500 to-pink-500' },
        { name: 'Scikit-learn', percentage: 92, color: 'from-orange-400 to-yellow-400' },
        { name: 'Pandas', percentage: 94, color: 'from-blue-400 to-indigo-400' },
        { name: 'NumPy', percentage: 96, color: 'from-green-400 to-blue-400' }
      ]
    },
    {
      id: 'ml',
      label: 'Machine Learning',
      icon: Brain,
      skills: [
        { name: 'Deep Learning', percentage: 90, color: 'from-purple-500 to-pink-500' },
        { name: 'Computer Vision', percentage: 85, color: 'from-blue-500 to-purple-500' },
        { name: 'NLP', percentage: 82, color: 'from-green-500 to-blue-500' },
        { name: 'Reinforcement Learning', percentage: 78, color: 'from-yellow-500 to-orange-500' },
        { name: 'Transfer Learning', percentage: 88, color: 'from-indigo-500 to-purple-500' },
        { name: 'Model Optimization', percentage: 85, color: 'from-red-500 to-pink-500' }
      ]
    },
    {
      id: 'data',
      label: 'Data Science',
      icon: BarChart3,
      skills: [
        { name: 'Data Analysis', percentage: 92, color: 'from-green-500 to-emerald-500' },
        { name: 'Statistical Modeling', percentage: 88, color: 'from-blue-500 to-cyan-500' },
        { name: 'Data Visualization', percentage: 85, color: 'from-purple-500 to-pink-500' },
        { name: 'Feature Engineering', percentage: 90, color: 'from-orange-500 to-red-500' },
        { name: 'A/B Testing', percentage: 83, color: 'from-indigo-500 to-purple-500' },
        { name: 'Predictive Analytics', percentage: 87, color: 'from-yellow-500 to-orange-500' }
      ]
    },
    {
      id: 'engineering',
      label: 'ML Engineering',
      icon: Code,
      skills: [
        { name: 'MLOps', percentage: 85, color: 'from-blue-500 to-indigo-500' },
        { name: 'Docker', percentage: 88, color: 'from-blue-400 to-cyan-400' },
        { name: 'Kubernetes', percentage: 80, color: 'from-blue-500 to-purple-500' },
        { name: 'AWS/GCP', percentage: 82, color: 'from-orange-500 to-red-500' },
        { name: 'CI/CD', percentage: 85, color: 'from-green-500 to-blue-500' },
        { name: 'Model Serving', percentage: 83, color: 'from-purple-500 to-pink-500' }
      ]
    }
  ];

  const currentCategory = skillCategories.find(cat => cat.id === activeCategory) || skillCategories[0];

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* ML/DS Specific Background Animations */}
      <FloatingSkillIcons />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Skills & Expertise</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto dark:text-white">
            Technical skills and tools I use to build intelligent systems and solve complex problems
          </p>
        </motion.div>

        {/* Category Tabs with 3D effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
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
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 border border-secondary-200'
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <category.icon size={18} />
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-6 dark:text-white">
              Technical Proficiency
            </h3>
            {currentCategory.skills.map((skill, index) => (
              <NeuralProgressBar
                key={skill.name}
                percentage={skill.percentage}
                label={skill.name}
                color={skill.color}
              />
            ))}
          </motion.div>

          {/* Right Column - Skill Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-6 dark:text-white">
              Core Competencies
            </h3>
            
            {/* Skill Cards with 3D effects */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Brain, label: 'Deep Learning', desc: 'Neural Networks, CNNs, RNNs, Transformers' },
                { icon: Globe, label: 'Computer Vision', desc: 'Image Recognition, Object Detection, Segmentation' },
                { icon: Database, label: 'Big Data', desc: 'Spark, Hadoop, Data Pipelines, ETL' },
                { icon: Shield, label: 'MLOps', desc: 'Model Deployment, Monitoring, CI/CD' },
                { icon: Layers, label: 'Cloud Computing', desc: 'AWS, GCP, Azure, Kubernetes' },
                { icon: Zap, label: 'Performance', desc: 'Model Optimization, Scalability, Efficiency' }
              ].map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 10,
                    y: -5,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)"
                  }}
                  className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <skill.icon size={20} className="text-primary-600" />
                    </div>
                    <h4 className="font-semibold text-secondary-900">{skill.label}</h4>
                  </div>
                  <p className="text-sm text-secondary-600 leading-relaxed">
                    {skill.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-secondary-900 mb-8 text-center dark:text-white">
            Tools & Technologies
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
              'OpenCV', 'NLTK', 'SpaCy', 'Hugging Face', 'Docker', 'Kubernetes',
              'AWS', 'GCP', 'Azure', 'Git', 'Jupyter', 'VS Code', 'PostgreSQL',
              'MongoDB', 'Redis', 'Apache Spark', 'Airflow', 'MLflow', 'Weights & Biases'
            ].map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 5,
                  y: -3,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.2)"
                }}
                className="bg-secondary-50 px-4 py-3 rounded-lg text-center text-sm font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 