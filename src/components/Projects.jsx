import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

/* ── Tech icon CDN ────────────────────────────────── */
const DI = (n) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${n}/${n}-original.svg`;
const TAG_META = {
  'MongoDB':    { icon: DI('mongodb'),    color: '#47A248' },
  'Express':    { icon: DI('express'),    color: '#fff' },
  'React':      { icon: DI('react'),      color: '#61DAFB' },
  'Node.js':    { icon: DI('nodejs'),     color: '#68A063' },
  'MySQL':      { icon: DI('mysql'),      color: '#00758F' },
  'Python':     { icon: DI('python'),     color: '#3776AB' },
  'TensorFlow': { icon: DI('tensorflow'), color: '#FF6F00' },
  'Keras':      { icon: DI('keras'),      color: '#D00000' },
  'Flask':      { icon: DI('flask'),      color: '#fff' },
  'Pandas':     { icon: DI('pandas'),     color: '#150458' },
  'HTML':       { icon: DI('html5'),      color: '#E34F26' },
  'CSS':        { icon: DI('css3'),       color: '#264DE4' },
  'JavaScript': { icon: DI('javascript'), color: '#F7DF1E' },
};

/* ── Project Data ─────────────────────────────────── */
const PROJECTS = [
  {
    id: 'complaint-portal',
    title: 'Smart Complaint Portal',
    subtitle: 'JanSamadhan — Civic Tech',
    emoji: '🏛️',
    bannerText: 'Full-stack citizen grievance system with real-time tracking, role-based access, and admin analytics dashboard.',
    desc: 'A full-stack citizen grievance system connecting people with local authorities for transparent complaint resolution and tracking.',
    features: [
      'Secure JWT auth with role-based access (citizen / admin)',
      'Real-time complaint status tracking & notifications',
      'Admin dashboard with analytics and resolution workflows',
    ],
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'MySQL'],
    github: '#',
    live: '#',
    status: 'Completed',
    statusColor: '#4ade80',
    accent: '#c0392b',
    accentGrad: 'linear-gradient(145deg, #3a0a0a 0%, #6b1515 35%, #8b1a1a 60%, #a01c1c 100%)',
    img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=700&q=80',
  },
  {
    id: 'fraud-detection',
    title: 'Fraud Detection CNN',
    subtitle: 'Credit Card Security — ML',
    emoji: '🔍',
    bannerText: 'Deep-learning pipeline using CNNs for real-time fraud detection with 98.7% accuracy on imbalanced datasets.',
    desc: 'A deep-learning pipeline using CNNs to detect fraudulent credit card transactions with 98.7% accuracy on imbalanced datasets.',
    features: [
      '98.7% classification accuracy using CNN + oversampling',
      'Advanced preprocessing: scaling, SMOTE class balancing',
      'Flask REST API exposing model predictions in real-time',
    ],
    tags: ['Python', 'TensorFlow', 'Keras', 'Flask', 'Pandas'],
    github: '#',
    live: '#',
    status: 'Completed',
    statusColor: '#4ade80',
    accent: '#2d2d5e',
    accentGrad: 'linear-gradient(145deg, #08081a 0%, #12123a 35%, #1a1a4e 60%, #2d2d6e 100%)',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80',
  },
  {
    id: 'myntra-clone',
    title: 'Myntra Clone',
    subtitle: 'E-Commerce Frontend',
    emoji: '🛍️',
    bannerText: 'Pixel-perfect e-commerce frontend clone with product browsing, cart management, and fully responsive layouts.',
    desc: 'A pixel-perfect frontend clone of the Myntra shopping platform built with React, featuring product browsing, cart state, and responsive layouts.',
    features: [
      'Complete product listing and detail pages',
      'Cart management with local state persistence',
      'Fully responsive mobile-first design',
    ],
    tags: ['HTML', 'CSS', 'React'],
    github: '#',
    live: '#',
    status: 'Completed',
    statusColor: '#4ade80',
    accent: '#4527a0',
    accentGrad: 'linear-gradient(145deg, #0a0520 0%, #1a0d45 35%, #2a1565 60%, #3d1f90 100%)',
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&q=80',
  },
  {
    id: 'calculator',
    title: 'Calculator App',
    subtitle: 'Web Tool',
    emoji: '🧮',
    bannerText: 'Clean, keyboard-accessible scientific calculator with history, dark/light mode, built from scratch.',
    desc: 'A clean, keyboard-accessible scientific calculator built from scratch with HTML, CSS, and vanilla JavaScript.',
    features: [
      'Full keyboard navigation support',
      'History of calculations retained in session',
      'Dark / light mode toggle',
    ],
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: '#',
    live: 'https://panduranga11.github.io/calculator_basic/',
    status: 'Live',
    statusColor: '#38bdf8',
    accent: '#525252',
    accentGrad: 'linear-gradient(145deg, #0a0a0a 0%, #161616 35%, #1e1e1e 60%, #2a2a2a 100%)',
    img: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=700&q=80',
  },
];

/* ════════════════════════════════════════════════════
   VisitBtn — Circular spinning text button
   ════════════════════════════════════════════════════ */
function VisitBtn({ href, index }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="proj-visit-btn" onClick={e => e.stopPropagation()}>
      <svg viewBox="0 0 80 80" className="proj-visit-svg" aria-hidden="true">
        <defs><path id={`cp-${index}`} d="M 40,40 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" /></defs>
        <text><textPath href={`#cp-${index}`} startOffset="0%"><tspan className="proj-visit-text">VISIT PROJECT · VISIT PROJECT · </tspan></textPath></text>
      </svg>
      <span className="proj-visit-arrow">↗</span>
    </a>
  );
}

/* ════════════════════════════════════════════════════
   ProjectVisual — Left side image card with 3D tilt
   ════════════════════════════════════════════════════ */
function ProjectVisual({ project, isActive, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      rx: -((e.clientY - r.top) / r.height - 0.5) * 10,
      ry: ((e.clientX - r.left) / r.width - 0.5) * 10,
    });
  }, []);

  const onLeave = useCallback(() => {
    setHovering(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  return (
    <motion.div
      className={`proj-visual${isActive ? ' active' : ' inactive'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Stacked layers behind — spring-animated */}
      <motion.div
        className="proj-stack-layer layer-back"
        animate={isActive ? { rotate: -5, x: -22, y: 12, opacity: 0.28, scale: 0.96 } : { rotate: 0, x: 0, y: 0, opacity: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        style={{ background: project.accentGrad }}
      >
        <img src={project.img} alt="" loading="lazy" />
      </motion.div>

      <motion.div
        className="proj-stack-layer layer-mid"
        animate={isActive ? { rotate: -2.5, x: -11, y: 6, opacity: 0.45, scale: 0.98 } : { rotate: 0, x: 0, y: 0, opacity: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 110, damping: 15 }}
        style={{ background: project.accentGrad }}
      >
        <img src={project.img} alt="" loading="lazy" />
      </motion.div>

      {/* Main card */}
      <div
        ref={cardRef}
        className="proj-visual-card"
        style={{
          background: project.accentGrad,
          transform: hovering
            ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.03)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={onLeave}
      >
        {/* Banner strip */}
        <div className="proj-banner">
          <p className="proj-banner-text">{project.bannerText}</p>
          <span className="proj-banner-arrow">→</span>
        </div>

        {/* Screenshot */}
        <div className="proj-visual-img">
          <img
            src={project.img}
            alt={project.title}
            loading="eager"
            onError={(e) => { e.target.src = `https://via.placeholder.com/700x400/0c0c0c/333?text=${encodeURIComponent(project.title)}`; }}
          />
        </div>

        <VisitBtn href={project.live !== '#' ? project.live : project.github} index={index} />
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   ProjectDetails — Sticky right panel content
   ════════════════════════════════════════════════════ */
function ProjectDetails({ project }) {
  return (
    <motion.div
      className="proj-details"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Status */}
      <div className="proj-status">
        <span className="proj-status-dot" style={{ background: project.statusColor }} />
        <span style={{ color: project.statusColor }}>{project.status}</span>
      </div>

      {/* Title */}
      <div className="proj-title-row">
        <div className="proj-accent-bar" style={{ background: project.accent }} />
        <div>
          <h3 className="proj-title">{project.title}</h3>
          <div className="proj-subtitle">{project.subtitle}</div>
        </div>
      </div>

      {/* Description */}
      <p className="proj-desc">
        <span className="proj-desc-emoji">{project.emoji}</span> {project.desc}
      </p>

      {/* Features */}
      <ul className="proj-features">
        {project.features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>

      {/* Tech tags */}
      <div className="proj-tags">
        {project.tags.map((t) => {
          const m = TAG_META[t];
          return (
            <span key={t} className="proj-tag">
              {m && <img src={m.icon} alt="" className="proj-tag-icon" loading="lazy" />}
              {t}
            </span>
          );
        })}
      </div>

      {/* Actions */}
      <div className="proj-actions">
        <a href={project.github} target="_blank" rel="noreferrer" className="proj-btn proj-btn-ghost">
          <FaGithub /> Source Code
        </a>
        {project.live !== '#' && (
          <a href={project.live} target="_blank" rel="noreferrer" className="proj-btn proj-btn-primary" style={{ background: project.accent }}>
            <FaExternalLinkAlt /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   Projects — Main orchestrating component
   ════════════════════════════════════════════════════ */
const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  /* Intersection Observer — determine active project */
  useEffect(() => {
    const observers = [];
    sectionRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.55 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const activeProject = PROJECTS[activeIndex];

  return (
    <section id="projects" className="proj-section">
      {/* Header */}
      <div className="proj-header">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="section-label">Selected Work</div>
          <h2 className="section-title">Things I&apos;ve <em>built</em></h2>
          <p className="section-subtitle">
            A curated set of projects spanning full-stack web apps,
            machine learning systems, and frontend interfaces.
          </p>
        </motion.div>
      </div>

      {/* Scrollytelling layout */}
      <div className="proj-scrolly">
        {/* Left: scrollable project visuals */}
        <div className="proj-scrolly-left">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="proj-card-section"
            >
              <ProjectVisual project={p} isActive={activeIndex === i} index={i} />
              {/* Inline details for mobile — hidden on desktop */}
              <div className="proj-mobile-details">
                <ProjectDetails project={p} />
              </div>
            </div>
          ))}
        </div>

        {/* Right: sticky detail panel — desktop only */}
        <div className="proj-scrolly-right proj-desktop-only">
          <div className="proj-details-sticky">
            {/* Progress dots */}
            <div className="proj-dots">
              {PROJECTS.map((_, i) => (
                <div key={i} className={`proj-dot${activeIndex === i ? ' active' : ''}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <ProjectDetails key={activeProject.id} project={activeProject} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
