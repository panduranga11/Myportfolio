import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaMoon, FaSun } from 'react-icons/fa';
import './Navbar.scss';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [glossy, setGlossy] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) { 
        // if scroll down hide the navbar
        setShow(false);
      } else { 
        // if scroll up show the navbar
        setShow(true);  
      }
      
      if (window.scrollY > 50) {
        setGlossy(true);
      } else {
        setGlossy(false);
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div 
        id="navigation" 
        className={`py-3 shadow nav ${show ? 'nav-visible' : 'nav-hidden'} ${glossy ? 'glossy' : ''}`}
    >
      <div className="container d-flex justify-content-between">
        <h2 className="d-inline">Portfolio</h2>
        <ul className="d-flex mb-0">
          <li className="p-2 scroll-to">
            <Link activeClass="active" to="summary" spy={true} smooth={true} offset={-70} duration={500}>
              Summary
            </Link>
          </li>
          <li className="p-2 scroll-to">
            <Link activeClass="active" to="about" spy={true} smooth={true} offset={-70} duration={500}>
              Experience
            </Link>
          </li>
          <li className="p-2 scroll-to">
            <Link activeClass="active" to="practicle_skills" spy={true} smooth={true} offset={-70} duration={500}>
              Skills
            </Link>
          </li>
          <li className="p-2 scroll-to">
            <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-70} duration={500}>
              Projects
            </Link>
          </li>
          <li className="p-2 scroll-to">
            <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-70} duration={500}>
              Contact
            </Link>
          </li>

          <li className="pt-2 pl-3">
            <input 
              type="checkbox" 
              className="checkbox" 
              id="checkbox" 
              checked={darkMode} 
              onChange={toggleDarkMode} 
            />
            <label htmlFor="checkbox" className="checkbox-label">
              <FaMoon className="fa-moon" />
              <FaSun className="fa-sun" />
              <span className="ball"></span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
