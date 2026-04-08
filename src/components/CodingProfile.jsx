import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import './CodingProfile.css';

/* ── Platform data ─────────────────────────────────── */
const PLATFORMS = [
  {
    name: 'LeetCode',
    username: '@pandurangabollepalli',
    icon: <SiLeetcode />,
    url: 'https://leetcode.com/u/pandurangabollepalli/',
    stats: [
      { val: '500+', label: 'Problems' },
      { val: '~1450', label: 'Rating' },
    ],
    rating: '⭐ Top 40% Globally',
    color: '#FFA116',
    glow: 'rgba(255,161,22,0.2)',
  },
  {
    name: 'GeeksForGeeks',
    username: '@pandurangabogeo',
    icon: <SiGeeksforgeeks />,
    url: 'https://www.geeksforgeeks.org/profile/pandurangabogeo',
    stats: [
      { val: '100+', label: 'Problems' },
      { val: 'Top 200', label: 'Institute' },
    ],
    rating: '🏅 Institute Rank Top 00',
    color: '#2F8D46',
    glow: 'rgba(47,141,70,0.2)',
  },
  {
    name: 'GitHub',
    username: '@panduranga11',
    icon: <FaGithub />,
    url: 'https://github.com/panduranga11',
    stats: [
      { val: '20+', label: 'Repos' },
      { val: '365+', label: 'Commits' },
    ],
    rating: '🔥 Active Contributor',
    color: '#f0ede8',
    glow: 'rgba(240,237,232,0.1)',
  },
];

/* ── GitHub Heatmap (live) ────────────────────────── */
const AVAILABLE_YEARS = [2024, 2025, 2026];

function GitHubHeatmap({ username }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const redTheme = {
    light: ['#161616', '#3d0b0f', '#7a1620', '#b82030', '#e63946'],
    dark:  ['#161616', '#3d0b0f', '#7a1620', '#b82030', '#e63946'],
  };

  return (
    <motion.div
      className="github-block"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Header */}
      <div className="github-block-header">
        <div className="github-title-group">
          <FaGithub className="github-icon" />
          <div>
            <div className="github-title">Contribution Activity</div>
            <div className="github-handle">github.com/{username}</div>
          </div>
        </div>
        <div className="github-header-right">
          {/* Year selector */}
          <div className="year-selector">
            {AVAILABLE_YEARS.map(yr => (
              <button
                key={yr}
                className={`year-btn${selectedYear === yr ? ' active' : ''}`}
                onClick={() => setSelectedYear(yr)}
              >
                {yr}
              </button>
            ))}
          </div>
          <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="github-profile-btn">
            <FaGithub /> View Profile
          </a>
        </div>
      </div>

      {/* Calendar */}
      <div className="heatmap-wrap">
        <GitHubCalendar
          username={username}
          year={selectedYear}
          theme={redTheme}
          colorScheme="dark"
          blockSize={20}
          blockMargin={5}
          blockRadius={3}
          fontSize={12}
          style={{ color: 'var(--white-muted)', width: '100%' }}
          labels={{
            totalCount: '{{count}} contributions in {{year}}',
          }}
        />
      </div>

      {/* Stats */}
      <div className="github-stats-row">
        {[
          { val: '20+', label: 'Repositories' },
          { val: '5+',  label: 'Projects Shipped' },
          { val: '🔥',   label: 'Active Streak' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="github-stat-chip"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <span className="github-stat-chip-val">{s.val}</span>
            <span className="github-stat-chip-label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main component ────────────────────────────────── */
const CodingProfile = () => (
  <section id="coding" className="coding-section">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="section-label">Coding Activity</div>
      <h2 className="section-title">Where I <em>grind</em></h2>
      <p className="section-subtitle">
        Competitive programming, open-source contributions, and daily coding
        streaks across platforms.
      </p>
    </motion.div>

    {/* Platform cards — staggered */}
    <div className="coding-platforms">
      {PLATFORMS.map((p, i) => (
        <motion.a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="platform-card"
          style={{ '--card-color': p.color, '--card-glow': p.glow }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
        >
          <div className="platform-header">
            <div className="platform-icon-wrap">{p.icon}</div>
            <FaExternalLinkAlt className="platform-ext-link" />
          </div>
          <div>
            <div className="platform-name">{p.name}</div>
            <div className="platform-username">{p.username}</div>
          </div>
          <div className="platform-stats">
            {p.stats.map(s => (
              <div key={s.label} className="platform-stat">
                <span className="platform-stat-val">{s.val}</span>
                <span className="platform-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="platform-rating">{p.rating}</div>
        </motion.a>
      ))}
    </div>

    <GitHubHeatmap username="panduranga11" />
  </section>
);

export default CodingProfile;
