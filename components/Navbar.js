'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
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
    <>
      <div className="topline">
        <span>Praktik Arsitektur & Desain Spasial</span>
        <span>Makassar, Indonesia</span>
      </div>

      <header className="header">
        <Link href="/" className="brand" aria-label="GradiEnt Studio — beranda">
          <img 
            src="/assets/brand-logo.png" 
            alt="Logo GradiEnt" 
            width="40" 
            height="40" 
          />
          <span>GradiEnt<span className="brand-studio">STUDIO</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Navigasi utama">
          <Link href="/#explorations">Studi Desain</Link>
          <Link href="/#services">Layanan</Link>
          <Link href="/#process">Tahapan Kerja</Link>
          <Link href="/about">Tentang</Link>
          <Link href="/contact">Kontak</Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                  fontSize: '11px',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  borderRadius: '3px'
                }}
              >
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 700
                }}>
                  {avatarChar}
                </span>
                <span>{displayName} (Portal)</span>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  border: '1px solid var(--line-strong)',
                  padding: '6px 10px',
                  borderRadius: '3px'
                }}
                title="Keluar dari akun"
              >
                Keluar
              </button>
            </div>
          ) : (
            <Link className="account" href="/login">Masuk</Link>
          )}

          <Link className="button button-dark compact" href="/#contact">
            Bicarakan proyek
          </Link>

          <button
            id="menu-button"
            className="menu-button"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav id="mobile-nav" className="mobile-nav" aria-label="Navigasi ponsel" hidden={!menuOpen}>
        <Link href="/#explorations" onClick={() => setMenuOpen(false)}>Studi Desain</Link>
        <Link href="/#services" onClick={() => setMenuOpen(false)}>Layanan</Link>
        <Link href="/#process" onClick={() => setMenuOpen(false)}>Tahapan Kerja</Link>
        <Link href="/#studio" onClick={() => setMenuOpen(false)}>Studio</Link>
        {user ? (
          <Link href={user.isAdmin ? '/admin' : '/dashboard'} onClick={() => setMenuOpen(false)}>
            Portal ({displayName})
          </Link>
        ) : (
          <Link href="/login" onClick={() => setMenuOpen(false)}>Masuk ke akun</Link>
        )}
        <Link href="/#contact" onClick={() => setMenuOpen(false)}>Bicarakan proyek</Link>
      </nav>
    </>
  );
}
