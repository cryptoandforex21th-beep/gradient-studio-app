'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const [theme, setTheme] = useState('auto');
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gradient-theme') || 'auto';
      setTheme(saved);
      applyTheme(saved);
    } catch (e) {}

    // Check Supabase session & local admin session
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
      } else {
        const adminFlag = sessionStorage.getItem('gradient_admin');
        if (adminFlag === '1') {
          setUser({ email: 'gradient_admin', user_metadata: { full_name: 'Studio Admin' }, isAdmin: true });
        }
      }
    };
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        const adminFlag = sessionStorage.getItem('gradient_admin');
        if (adminFlag === '1') {
          setUser({ email: 'gradient_admin', user_metadata: { full_name: 'Studio Admin' }, isAdmin: true });
        } else {
          setUser(null);
        }
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    try {
      sessionStorage.removeItem('gradient_admin');
      sessionStorage.removeItem('gradient_user_name');
      localStorage.removeItem('gradient_guest');
    } catch (e) {}
    setUser(null);
    window.location.href = '/';
  };

  const displayName = user?.user_metadata?.full_name 
    ? user.user_metadata.full_name.split(' ')[0] 
    : user?.isAdmin 
    ? 'Admin' 
    : user?.email ? user.email.split('@')[0] : 'Akun';

  const avatarChar = displayName[0]?.toUpperCase() || 'U';

  return (
    <header className="topbar">
      <Link href="/" className="mark" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <img 
          src="/brand-logo-transparent.png" 
          alt="GradiEnt Logo" 
          style={{ width: '22px', height: '22px', objectFit: 'contain' }}
        />
        <span className="brand-name">GradiEnt</span>
        <span className="mark-sub">Studio</span>
      </Link>
      <nav className="nav" aria-label="Primary navigation">
        <Link href="/#projects">Projects</Link>
        <Link href="/#approach">Approach</Link>
        <Link href="/#contact">Contact</Link>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link 
              href={user.isAdmin ? '/admin' : '/dashboard'} 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: 'rgba(207, 107, 66, 0.12)',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                fontWeight: 600,
                borderRadius: '2px'
              }}
            >
              <span style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--accent)',
                color: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: 700
              }}>
                {avatarChar}
              </span>
              <span>{displayName} (Profil)</span>
            </Link>
            <button
              onClick={handleLogout}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '9px',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-soft)',
                border: '1px solid var(--line)',
                padding: '6px 8px'
              }}
              title="Keluar dari akun"
            >
              Keluar
            </button>
          </div>
        ) : (
          <Link href="/login" className="nav-auth">
            <span>Masuk / Akun</span>
            <span>→</span>
          </Link>
        )}

        <button className="theme-toggle" onClick={toggleTheme} type="button">
          Theme: {theme}
        </button>
      </nav>
    </header>
  );
}
