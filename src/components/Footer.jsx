import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import './Footer.css';

const SOCIALS = [
  { name: 'LinkedIn',    handle: 'panduranga1108',          icon: <FaLinkedin />,      url: 'https://linkedin.com/in/panduranga1108', color: '#0A66C2' },
  { name: 'GitHub',      handle: 'panduranga11',             icon: <FaGithub />,        url: 'https://github.com/panduranga11', color: '#f0ede8' },
  { name: 'LeetCode',   handle: 'pandurangabollepalli',     icon: <SiLeetcode />,      url: 'https://leetcode.com/u/pandurangabollepalli/', color: '#FFA116' },
  { name: 'GeeksForGeeks', handle: 'pandurangabogeo',       icon: <SiGeeksforgeeks />, url: 'https://www.geeksforgeeks.org/profile/pandurangabogeo', color: '#2F8D46' },
  { name: 'Email',       handle: 'pandurangabollepalli@gmail.com', icon: <FaEnvelope />, url: 'mailto:pandurangabollepalli@gmail.com', color: '#EA4335' },
];

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section id="connect" className="connect-section">
      {/* CTA Card — scale + fade in */}
      <motion.div
        className="connect-cta-card"
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.span
          className="connect-logo-mark"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          BP
        </motion.span>

        <motion.h2
          className="connect-headline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Let&apos;s innovate<br />together
        </motion.h2>

        <motion.p
          className="connect-sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          viewport={{ once: true }}
        >
          Ready to bring your vision to life? I&apos;m actively looking for 
          internship opportunities and exciting projects to contribute to.
        </motion.p>

        <motion.a
          href="mailto:pandurangabollepalli@gmail.com"
          className="connect-email-btn"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
        >
          <span className="email-icon">✉</span>
          pandurangabollepalli@gmail.com
        </motion.a>
        <span className="connect-caption">Get in touch via email · Response within 24h</span>
      </motion.div>

      {/* Social Cards — staggered */}
      <motion.div
        className="connect-socials-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {SOCIALS.map(s => (
          <motion.a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="connect-social-card"
            style={{ '--social-color': s.color }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <span className="social-card-icon">{s.icon}</span>
            <div className="social-card-text">
              <div className="social-card-name">{s.name}</div>
              <div className="social-card-handle">{s.handle}</div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer Strip */}
      <motion.div
        className="footer-strip"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="footer-logo">P<span>.</span></div>
        <div className="footer-copy">
          © {new Date().getFullYear()} Bollepalli Panduranga — Built with React &amp; Vite
        </div>
        <button className="footer-back-top" onClick={scrollTop} aria-label="Back to top">
          <span className="footer-back-top-icon"><FaArrowUp /></span>
          Back to top
        </button>
      </motion.div>
    </section>
  );
};

export default Footer;
