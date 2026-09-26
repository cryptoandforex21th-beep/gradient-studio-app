'use client';

import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ marginTop: '60px' }}>
      <div style={{
        borderTop: '1px solid var(--line)',
        padding: '48px 0 36px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Brand Column */}
        <div>
          <button onClick={scrollToTop} style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(26px, 3vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            lineHeight: 1,
            color: 'inherit',
            textAlign: 'left'
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              background: 'var(--accent)',
              display: 'inline-block',
              borderRadius: '50%',
              boxShadow: '0 0 12px var(--accent)',
              flexShrink: 0
            }}></span>
            <span style={{
              background: 'linear-gradient(135deg, var(--ink) 30%, var(--accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>GradiEnt</span>
            <span style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              paddingLeft: '10px',
              borderLeft: '1px solid var(--line)',
              WebkitTextFillColor: 'var(--accent)'
            }}>Studio</span>
          </button>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            color: 'var(--ink-soft)',
            letterSpacing: '.06em',
            margin: '16px 0 0',
            maxWidth: '300px',
            lineHeight: 1.7
          }}>
            Architecture & Spatial Design<br />
            Makassar, Indonesia — Est. 2026
          </p>
        </div>

        {/* Navigation Column */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} aria-label="Footer navigation">
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '4px'
          }}>Navigasi</span>
          <Link href="/" style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)'
          }}>Home</Link>
          <Link href="/#projects" style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)'
          }}>Projects</Link>
          <Link href="/#approach" style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)'
          }}>Approach</Link>
          <Link href="/#contact" style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)'
          }}>Contact</Link>
          <Link href="/login" style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            fontWeight: 600
          }}>Login / Portal →</Link>
        </nav>

        {/* Social Media Column (Malaka Books Style) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '4px'
          }}>Social Media</span>
          
          <a
            href="https://instagram.com/heruardiansyah_"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 16px',
              border: '1px solid var(--line)',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              width: 'fit-content',
              transition: 'all .2s'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            @heruardiansyah_
          </a>

          <a
            href="https://www.linkedin.com/in/heru-ardiansyah-84a97343a/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 16px',
              border: '1px solid var(--line)',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              width: 'fit-content',
              transition: 'all .2s'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            Heru Ardiansyah
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid var(--line)',
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        color: 'var(--ink-soft)',
        fontFamily: 'var(--mono)',
        fontSize: '10px',
        letterSpacing: '.06em',
        textTransform: 'uppercase'
      }}>
        <span>© 2026 GradiEnt Studio — Heru Ardiansyah</span>
        <span>Built slowly, drawn clearly.</span>
      </div>
    </footer>
  );
}
