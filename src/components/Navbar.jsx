import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About',    to: 'hero' },
  { label: 'Projects', to: 'projects' },
  { label: 'Coding',   to: 'coding' },
  { label: 'Education',to: 'education' },
];

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY]     = useState(0);
  const [active, setActive]   = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  return (
    <nav className={`navbar${visible ? '' : ' hidden'}`} aria-label="Main navigation">
      <div className="navbar-pill">
        <span className="navbar-logo">P<span>.</span></span>

        {NAV_LINKS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            spy={true}
            smooth={true}
            duration={700}
            offset={-20}
            onSetActive={() => setActive(to)}
            className={`navbar-link${active === to ? ' active' : ''}`}
          >
            {label}
          </Link>
        ))}

        <Link
          to="connect"
          smooth={true}
          duration={700}
          className="navbar-cta"
        >
          Let&apos;s Talk
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
