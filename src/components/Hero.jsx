import React, { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaLinkedin, FaGithub, FaRegCopy } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { Sparkles } from './ui/Sparkles';
import profilePhoto from '../assets/me.jpg';
import './Hero.css';



/* ── Tech Ticker ───────────────────────────────────── */
const TECHS = ['Java', 'React', 'Node.js', 'MongoDB', 'Express', 'MySQL', 'Python', 'AWS', 'Git'];

function TechTicker() {
  const doubled = [...TECHS, ...TECHS];
  return (
    <div className="hero-tech-ticker" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Animation variants ────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0,   transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const socialItem = {
  hidden: { opacity: 0, scale: 0.85 },
  show:   { opacity: 1, scale: 1,    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
};

/* ── Split headline ────────────────────────────────── */
function SplitHeadline() {
  const line1 = ['I', 'build', 'products', 'that'];
  const line2Words = ['solve'];
  const line2Italic = ['real', 'problems'];

  return (
    <motion.h1
      className="hero-headline"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <span style={{ display: 'block' }}>
        {line1.map((w, i) => (
          <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>
            {w}
          </motion.span>
        ))}
      </span>
      <span style={{ display: 'block' }}>
        {line2Words.map((w, i) => (
          <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.2em' }}>
            {w}
          </motion.span>
        ))}
        <em>
          {line2Italic.map((w, i) => (
            <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.2em' }}>
              {w}
            </motion.span>
          ))}
        </em>
      </span>
    </motion.h1>
  );
}

/* ── Hero ──────────────────────────────────────────── */
const Hero = () => {
  const [copied, setCopied] = useState(false);
  const email = 'pandurangabollepalli@gmail.com';

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="hero">

      {/* Bottom glow effect */}
      <div className="hero-bottom-glow" aria-hidden="true">
        <div className="hero-bottom-glow__gradient" />
        <Sparkles
          density={1200}
          className="hero-bottom-glow__sparkles"
          color="#ffffff"
        />
      </div>

      {/* Two-column layout */}
      <div className="hero-layout">

        {/* LEFT: text */}
        <div className="hero-content">

          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="badge-pill">Open</span>
            <span className="badge-text">Available for internships &amp; opportunities</span>
            <span className="badge-arrow">›</span>
          </motion.div>

          <SplitHeadline />

          {/* Role row */}
          <motion.div
            className="hero-role-wrap"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.55 }}
          >
            <span className="hero-role-label">
              Hello, I&apos;m <strong>Bollepalli Panduranga</strong>
            </span>
            <span className="hero-role-badge">
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer', 2200,
                  'Competitive Programmer', 2200,
                  'MERN Stack Dev', 2200,
                  'Problem Solver', 2200,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          <motion.p
            className="hero-bio"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.7 }}
          >
            CS undergrad at VIT-AP (CGPA 9.24) — obsessed with clean code,
            fast UIs, and cracking algorithms. 500+ problems solved.
            Currently deep-diving into Fullstack Development &amp; cloud.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta-row"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.85 }}
          >
            <a
              href="https://drive.google.com/file/d/1Xdcj2RryP2_a01bzo5Gg-ZfEyc6H6qKk/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="btn-hero-primary"
            >
              <span className="btn-icon">↗</span>
              View Resume
            </a>
            <button className="hero-email" onClick={copyEmail} title="Copy email">
              <FaRegCopy />
              {copied ? 'Copied!' : email}
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="hero-socials"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={{ transitionDelay: '1s' }}
          >
            {[
              { icon: <FaLinkedin />,      label: 'LinkedIn', url: 'https://linkedin.com/in/panduranga1108' },
              { icon: <FaGithub />,        label: 'GitHub',   url: 'https://github.com/panduranga11' },
              { icon: <SiLeetcode />,      label: 'LeetCode', url: 'https://leetcode.com/u/pandurangabollepalli/' },
              { icon: <SiGeeksforgeeks />, label: 'GFG',      url: 'https://www.geeksforgeeks.org/profile/pandurangabogeo' },
            ].map(({ icon, label, url }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="hero-social-link"
                variants={socialItem}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                {icon} {label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: profile photo */}
        <motion.div
          className="hero-photo-wrap"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-photo-ring">
            <img src={profilePhoto} alt="Bollepalli Panduranga" className="hero-photo" />
          </div>
          <div className="hero-photo-glow" aria-hidden="true" />
        </motion.div>

      </div>

      {/* Scroll hint */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        aria-hidden="true"
      >
        <div className="hero-scroll-line" />
      </motion.div>

      <TechTicker />
    </section>
  );
};

export default Hero;
