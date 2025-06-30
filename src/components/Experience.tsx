import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const Experience: React.FC = () => {
  const workExperience = [
    {
      title: 'Senior Machine Learning Engineer',
      company: 'TechCorp AI',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: 'Leading ML initiatives for computer vision and NLP projects, managing a team of 5 engineers.',
      achievements: [
        'Developed computer vision system reducing processing time by 60%',
        'Implemented MLOps pipeline improving model deployment efficiency by 40%',
        'Mentored junior engineers and conducted technical interviews'
      ],
      technologies: ['Python', 'TensorFlow', 'Kubernetes', 'AWS', 'Docker']
    },
    {
      title: 'Data Scientist',
      company: 'DataFlow Analytics',
      location: 'Seattle, WA',
      period: '2020 - 2022',
      description: 'Built predictive models and data pipelines for e-commerce analytics.',
      achievements: [
        'Created recommendation system increasing sales by 25%',
        'Automated data processing pipeline handling 1TB+ daily data',
        'Published 2 research papers on recommendation algorithms'
      ],
      technologies: ['Python', 'PyTorch', 'Apache Spark', 'PostgreSQL', 'Airflow']
    },
    {
      title: 'ML Research Intern',
      company: 'AI Research Lab',
      location: 'Stanford, CA',
      period: '2019 - 2020',
      description: 'Research intern focusing on natural language processing and transformer models.',
      achievements: [
        'Contributed to BERT-based sentiment analysis research',
        'Improved model accuracy by 15% on benchmark datasets',
        'Presented findings at 2 international conferences'
      ],
      technologies: ['Python', 'Transformers', 'PyTorch', 'Hugging Face', 'Jupyter']
    }
  ];

  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'Stanford University',
      location: 'Stanford, CA',
      period: '2018 - 2020',
      gpa: '3.9/4.0',
      focus: 'Artificial Intelligence & Machine Learning',
      thesis: 'Advanced Techniques in Computer Vision for Autonomous Systems'
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      period: '2014 - 2018',
      gpa: '3.8/4.0',
      focus: 'Computer Science & Mathematics',
      thesis: 'Machine Learning Applications in Data Mining'
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Machine Learning - Specialty',
      issuer: 'Amazon Web Services',
      date: '2023',
      credential: 'AWS-ML-001'
    },
    {
      name: 'Google Cloud Professional Machine Learning Engineer',
      issuer: 'Google Cloud',
      date: '2022',
      credential: 'GCP-ML-001'
    },
    {
      name: 'Deep Learning Specialization',
      issuer: 'Coursera (Andrew Ng)',
      date: '2021',
      credential: 'DL-SPEC-001'
    }
  ];

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Experience & Education</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto dark:text-white">
            Professional journey and academic background in machine learning and data science
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Briefcase size={24} className="text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">Work Experience</h3>
            </div>

            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-secondary-900">{job.title}</h4>
                      <p className="text-lg text-primary-600 font-medium">{job.company}</p>
                    </div>
                    <span className="text-sm text-secondary-500 bg-secondary-100 px-3 py-1 rounded-full">
                      {job.period}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-secondary-600">
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <p className="text-secondary-600 mb-4">{job.description}</p>

                  <div className="mb-4">
                    <h5 className="font-semibold text-secondary-900 mb-2">Key Achievements:</h5>
                    <ul className="space-y-1">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-secondary-600 flex items-start">
                          <div className="w-1 h-1 bg-primary-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Education */}
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-accent-100 rounded-lg">
                  <GraduationCap size={24} className="text-accent-600" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">Education</h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-secondary-900">{edu.degree}</h4>
                        <p className="text-primary-600 font-medium">{edu.school}</p>
                      </div>
                      <span className="text-sm text-secondary-500 bg-secondary-100 px-3 py-1 rounded-full">
                        {edu.period}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-secondary-600">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                      <p><strong>Focus:</strong> {edu.focus}</p>
                      <p><strong>Thesis:</strong> {edu.thesis}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">Certifications</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-secondary-900">{cert.name}</h4>
                        <p className="text-primary-600">{cert.issuer}</p>
                        <p className="text-sm text-secondary-600">Credential: {cert.credential}</p>
                      </div>
                      <span className="text-sm text-secondary-500 bg-accent-100 px-3 py-1 rounded-full">
                        {cert.date}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 