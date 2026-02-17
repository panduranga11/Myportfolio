import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(sessionStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false, // mirrors Vue config or default behavior
    });
    
    // Apply dark mode class to body or app
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    sessionStorage.setItem('darkMode', newMode.toString());
  };

  return (
    <div id="app" className={darkMode ? 'dark-mode' : ''}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      {/* Journey and WriteMe were in original but maybe optional? User didn't prioritize them. 
          Contact covers footer. 
      */}
      <Contact />
    </div>
  );
}

export default App;
