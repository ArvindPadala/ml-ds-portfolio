import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';
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

// Helper to render periods with animated years
function renderPeriodWithAnimation(period: string) {
  const parts = period.split(/(\d{4})/);
  return parts.map((part, i) =>
    /^\d{4}$/.test(part) ? <AnimatedNumber key={i} value={parseInt(part)} /> : part
  );
}

const Experience: React.FC = () => {
  const workExperience = [
    {
      title: 'Software Engineer',
      company: 'INFOSYS LIMITED',
      location: 'Hyderabad, India',
      period: '2021 - 2023',
      description: 'Spearheaded AI and data-driven automation across NLP, BI, and database systems—boosting model reliability, accelerating queries by 40%, and slashing customer response time by 50%.',
      achievements: [
        'Automated AI quality assurance processes, improving model pipeline reliability by 30%',
        'Optimized SQL & Oracle databases, enhancing query performance by 40%',
        'Designed Power BI dashboards, enabling real-time telecom data visualization for business teams.',
        'Developed NLP-based chatbots to automate customer support, reducing response time by 50%'
      ],
      technologies: ['Python', 'SQL', 'Power BI', 'Oracle', 'Docker', 'NLP', 'Chatbots']
    },
    {
      title: 'International Student Orientation Leader',
      company: 'Rutgers University',
      location: 'New Brunswick, NJ',
      period: '2024 - 2025',
      description: 'Led orientation sessions for 1000+ international students, providing cultural integration support.',
      achievements: [
        'Developed a comprehensive orientation program, reducing student anxiety by 60%',
        'Created a student-led mentorship program, improving retention by 30%',
        'Data collection and analysis for the Office of International Student and Scholar Services'
      ],
      technologies: ['Python', 'SQL', 'Data Analysis', 'Data Visualization', 'ETL', 'Data Warehousing','Excel']
    },
    {
      title: 'Data Operations Support',
      company: 'Rutgers Mailing Services',
      location: 'New Brunswick, NJ',
      period: '2024 - Present',
      description: 'Supported data-driven optimization of high-volume mail operations at Rutgers IP&O by streamlining tracking workflows and ensuring accurate, timely delivery across departments.',
      achievements: [
        'Streamlined internal mailing workflows with a process-first mindset—bridging physical operations with data-driven thinking.',
        'Supported backend logistics for university-wide correspondence, applying operational precision to route, track, and deliver high-volume mail across departments.',
        'Gained hands-on exposure to real-world service systems, reinforcing my foundation in systems optimization, attention to detail, and procedural efficiency'
      ],
      technologies: ['Excel', 'Data Analysis', 'Data Visualization', 'ETL', 'Data Warehousing']
    }
  ];

  const education = [
    {
      degree: 'Master of Science in Statistics - Data Science',
      school: 'Rutgers, The State University of New Jersey',
      location: 'New Brunswick, NJ',
      period: '2023 - 2025',
      gpa: '3.7 /4.0',
      focus: 'Artificial Intelligence & Machine Learning'
    },
    {
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      school: 'St. Martin\'s Engineering College',
      location: 'Hyderabad, India',
      period: '2017 - 2021',
      gpa: '3.8 /4.0',
      focus: 'Computer Science & Systems Design Engineering'
    }
  ];

  const certifications = [
    {
      name: 'Microsoft Certified: Azure Data Scientist Associate',
      issuer: 'Microsoft',
      date: '2025',
      credential_ID: 'E6271CC73F99439F',
      Certification_number: '4D027F-7228BD'
    },
    {
      name: 'AWS Certified AI Practitioner',
      issuer: 'Amazon Web Services',
      date: '2025',
      credential: 'AWS-AI-001'
    },
    {
      name: 'Deep Learning Specialization',
      issuer: 'Coursera (Andrew Ng)',
      date: '2021',
      credential: 'DL-SPEC-001'
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
    <section id="experience" className="section-padding relative" ref={sectionRef}>
      <DataParticleBurst trigger={inView} />
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
                      {renderPeriodWithAnimation(job.period)}
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
                        {renderPeriodWithAnimation(edu.period)}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-secondary-600">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>GPA: <AnimatedNumber value={parseFloat(edu.gpa.split('/')[0])} duration={1.5} />/4.0</span>
                      </div>
                      <p><strong>Focus:</strong> {edu.focus}</p>
                      {/* <p><strong>Thesis:</strong> {edu.thesis}</p> */}
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
                        {cert.credential_ID && (
                          <p className="text-sm text-secondary-600">Credential ID: {cert.credential_ID}</p>
                        )}
                        {cert.Certification_number && (
                          <p className="text-sm text-secondary-600">Certification #: {cert.Certification_number}</p>
                        )}
                        {cert.credential && (
                          <p className="text-sm text-secondary-600">Credential: {cert.credential}</p>
                        )}
                      </div>
                      <span className="text-sm text-secondary-500 bg-accent-100 px-3 py-1 rounded-full">
                        <AnimatedNumber value={parseInt(cert.date)} />
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