import React from 'react';
import { FaUserGraduate, FaBriefcase, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Education.css';

const ENTRIES = [
  {
    icon: <FaBriefcase />,
    type: 'Experience',
    degree: 'MERN Stack Intern',
    institution: 'Ethnus Codemithra',
    instUrl: 'https://ethnus.com',
    year: 'May – Jul 2025',
    grade: null,
    highlights: [
      'Built full-stack web applications using MongoDB, Express, React & Node.js',
      'Developed RESTful APIs and integrated frontend–backend data flows',
      'Created responsive React UIs with component-based architecture',
      'Implemented CRUD operations with authentication flows',
    ],
    cert: { label: 'View Industrial Certificate', url: 'https://drive.google.com/file/d/1nZAUptbgQnYC8D7vCu6zS8SrrW9TW6iW/view?usp=drive_link' },
  },
  {
    icon: <FaCertificate />,
    type: 'Certification',
    degree: 'AWS Academy Graduate — Cloud Foundations',
    institution: 'Amazon Web Services (AWS Academy)',
    instUrl: '#',
    year: 'Aug – Oct 2025',
    grade: null,
    highlights: [
      'Core cloud concepts: EC2, S3, IAM, VPCs, and cloud architecture',
      'Hands-on labs covering deployment, security, and scaling',
      'Fundamental understanding of cloud pricing and billing models',
    ],
    cert: { label: 'View AWS Certificate', url: 'https://drive.google.com/file/d/1CiIaJDOzqQSrIcT2Vemyl4JIq5AuG2XU/view?usp=drive_link' },
  },
  {
    icon: <FaUserGraduate />,
    type: 'Education',
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'VIT-AP University',
    instUrl: 'https://vitap.ac.in/',
    year: '2023 – 2027',
    grade: { val: '9.24 / 10', label: 'CGPA' },
    highlights: [
      'Core CS curriculum: DSA, DBMS, OS, Computer Networks',
      'Active DSA competitive programming participant',
      'Smart India Hackathon participant',
    ],
    cert: null,
  },
  {
    icon: '📚',
    type: 'Education',
    degree: 'Intermediate (MPC)',
    institution: 'Chaitanya IIT/JEE Academy',
    instUrl: '#',
    year: '2021 – 2023',
    grade: { val: '99%', label: 'Score' },
    highlights: [
      'Mathematics, Physics & Chemistry specialization',
      'JEE preparation — strong quantitative foundation',
    ],
    cert: null,
  },
  {
    icon: '🎓',
    type: 'Education',
    degree: 'Class X — Secondary Education',
    institution: 'Sri Vidhya High School',
    instUrl: '#',
    year: '2021',
    grade: { val: '10 / 10', label: 'GPA' },
    highlights: [
      'Perfect GPA — all subjects',
      'School topper in Mathematics',
    ],
    cert: null,
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: 40 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="education-grid">
        {/* Left sticky sidebar */}
        <motion.div
          className="education-sidebar"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-label">Background</div>
          <h2 className="section-title">
            My <em>journey</em><br />so far
          </h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            From a perfect 10 GPA in school to building production-ready full-stack systems
            and earning cloud certifications.
          </p>
        </motion.div>

        {/* Timeline — each entry reveals sequentially */}
        <div className="education-timeline">
          {ENTRIES.map((e, i) => (
            <motion.div
              key={i}
              className="edu-entry"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Dot */}
              <div className="edu-dot">
                {typeof e.icon === 'string' ? e.icon : e.icon}
              </div>

              {/* Card */}
              <div className="edu-card">
                <div className="edu-card-header">
                  <div className="edu-degree">{e.degree}</div>
                  <span className="edu-year-badge">{e.year}</span>
                </div>

                <div className="edu-institution">
                  <a href={e.instUrl} target="_blank" rel="noreferrer">{e.institution}</a>
                  <span style={{ color: 'var(--black-border)' }}>·</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    {e.type}
                  </span>
                </div>

                {e.grade && (
                  <div className="edu-grade">
                    <span className="edu-grade-val">{e.grade.val}</span>
                    <span className="edu-grade-label">{e.grade.label}</span>
                  </div>
                )}

                {e.highlights && (
                  <ul className="edu-highlights">
                    {e.highlights.map((h, hi) => <li key={hi}>{h}</li>)}
                  </ul>
                )}

                {e.cert && (
                  <a href={e.cert.url} target="_blank" rel="noreferrer" className="edu-cert-link">
                    <FaExternalLinkAlt /> {e.cert.label}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
