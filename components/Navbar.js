'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [theme, setTheme] = useState('auto');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gradient-theme') || 'auto';
      setTheme(saved);
      applyTheme(saved);
    } catch (e) {}
  }, []);

  const applyTheme = (t) => {
    const root = document.documentElement;
    if (t === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.dataset.theme = t;
    }
  };

  const toggleTheme = () => {
    const next = theme === 'auto' ? 'dark' : theme === 'dark' ? 'light' : 'auto';
    setTheme(next);
    try {
      localStorage.setItem('gradient-theme', next);
    } catch (e) {}
    applyTheme(next);
  };

  return (
    <header className="topbar">
      <Link href="/" className="mark">
        <i className="mark-dot"></i>
        <span className="brand-name">GradiEnt</span>
        <span className="mark-sub">Studio</span>
      </Link>
      <nav className="nav" aria-label="Primary navigation">
        <Link href="/#projects">Projects</Link>
        <Link href="/#approach">Approach</Link>
        <Link href="/#contact">Contact</Link>
        <Link href="/login" className="nav-auth">
          <span>Masuk / Akun</span>
          <span>→</span>
        </Link>
        <button className="theme-toggle" onClick={toggleTheme} type="button">
          Theme: {theme}
        </button>
      </nav>
    </header>
  );
}
