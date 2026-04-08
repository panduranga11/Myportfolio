import React, { useEffect, useRef } from 'react';
import './index.css';
import './App.css';

import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import Projects    from './components/Projects';
import CodingProfile from './components/CodingProfile';
import Education   from './components/Education';
import Footer      from './components/Footer';
import StarCanvas  from './components/StarCanvas';

/* ── Custom bi-cursor ──────────────────────────────── */
function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onEnter = () => {
      dotRef.current?.classList.add('hover');
      ringRef.current?.classList.add('hover');
    };
    const onLeave = () => {
      dotRef.current?.classList.remove('hover');
      ringRef.current?.classList.remove('hover');
    };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [role="button"], .navbar-link').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor"      aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}



/* ── App ───────────────────────────────────────────── */
function App() {
  return (
    <div id="app">
      <StarCanvas />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <CodingProfile />
        <Education />
        <Footer />
      </main>
    </div>
  );
}

export default App;
