'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function MaintenancePage() {
  return (
    <div style={{
      minHeight: '82vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 'clamp(32px, 6vw, 72px) clamp(20px, 4vw, 40px)',
      position: 'relative',
      textAlign: 'center'
    }}>
      
      {/* Background Subtle Gradient & Grid */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(320px, 50vw, 640px)',
        height: 'clamp(320px, 50vw, 640px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(207, 107, 66, 0.08) 0%, rgba(56, 189, 248, 0.04) 50%, transparent 75%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
        
        {/* Brand Logo & Studio Mark */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '28px',
          padding: '8px 20px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--line)',
          borderRadius: '40px',
          backdropFilter: 'blur(12px)'
        }}>
          <img 
            src="/brand-logo-transparent.png" 
            alt="GradiEnt Studio Logo" 
            style={{ width: '24px', height: '24px', objectFit: 'contain' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span style={{
            fontFamily: 'var(--display)',
            fontSize: '18px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: 'var(--ink)'
          }}>
            GradiEnt Studio
          </span>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.18em',
            color: 'var(--accent)',
            textTransform: 'uppercase'
          }}>
            • Spatial Practice
          </span>
        </div>

        {/* Status Live Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--mono)',
          fontSize: '10px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          background: 'rgba(207, 107, 66, 0.12)',
          border: '1px solid rgba(207, 107, 66, 0.28)',
          padding: '6px 14px',
          borderRadius: '20px',
          marginBottom: '28px'
        }}>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 10px var(--accent)',
            display: 'inline-block'
          }} />
          <span>Scheduled System Enhancement</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(36px, 5.5vw, 64px)',
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          color: 'var(--ink)',
          marginBottom: '20px'
        }}>
          Peningkatan Pengalaman Digital & Visual 3D
        </h1>

        {/* Subtitle / Philosophy */}
        <p style={{
          fontFamily: 'var(--display)',
          fontStyle: 'italic',
          fontSize: 'clamp(18px, 2.4vw, 24px)',
          color: 'var(--accent-soft)',
          marginBottom: '24px',
          fontWeight: 300
        }}>
          &ldquo;Spaces with weather in them. Built slowly, drawn clearly.&rdquo;
        </p>

        {/* Formal Notice */}
        <p style={{
          fontSize: '14px',
          lineHeight: 1.7,
          color: 'var(--ink-soft)',
          marginBottom: '36px',
          maxWidth: '560px',
          margin: '0 auto 36px'
        }}>
          Situs resmi GradiEnt Studio saat ini sedang menjalani peningkatan performa sistem menyeluruh dan pembaruan portofolio komputasi spasial 3D. Seluruh konsultasi perancangan arsitektur dan komunikasi proyek tetap berjalan aktif seperti biasa.
        </p>

        {/* Direct Action Hub */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          <a
            href="https://wa.me/6285143628550?text=Halo%20GradiEnt%20Studio,%20saya%20ingin%20berkonsultasi%20mengenai%20proyek%20arsitektur."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              background: 'var(--accent)',
              color: '#ffffff',
              borderRadius: '6px',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              boxShadow: '0 4px 20px rgba(207, 107, 66, 0.35)',
              transition: 'all 0.3s'
            }}
          >
            <span>Hubungi WhatsApp Studio</span>
            <span>→</span>
          </a>

          <a
            href="mailto:heruardiansyah2one@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              borderRadius: '6px',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s'
            }}
          >
            <span>Email Bisnis</span>
            <span>↗</span>
          </a>

          <Link
            href="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'transparent',
              border: '1px solid var(--line)',
              color: 'var(--ink-soft)',
              borderRadius: '6px',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s'
            }}
          >
            <span>Portal Klien</span>
            <span>→</span>
          </Link>
        </div>

        {/* Technical Studio Metadata Card */}
        <div style={{
          background: 'rgba(15, 18, 22, 0.75)',
          border: '1px solid var(--line)',
          borderRadius: '10px',
          padding: '20px 24px',
          backdropFilter: 'blur(16px)',
          textAlign: 'left',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          fontFamily: 'var(--mono)',
          fontSize: '10px',
          color: 'var(--ink-muted)',
          lineHeight: 1.8
        }}>
          <div>
            <div style={{ color: 'var(--ink)', fontWeight: 600, marginBottom: '2px' }}>PRACTICE & DISCIPLINE</div>
            <div>Architecture, Spatial Computation & BIM (LOD 350)</div>
            <div>Principal: Heru Ardiansyah</div>
          </div>
          <div>
            <div style={{ color: 'var(--ink)', fontWeight: 600, marginBottom: '2px' }}>STUDIO LOCATION</div>
            <div>Makassar, South Sulawesi, Indonesia</div>
            <div>Timezone: Asia/Makassar (WITA / GMT+8)</div>
          </div>
          <div>
            <div style={{ color: 'var(--ink)', fontWeight: 600, marginBottom: '2px' }}>OFFICIAL CHANNELS</div>
            <div>IG: <a href="https://instagram.com/heruardiansyah_" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-soft)', textDecoration: 'none' }}>@heruardiansyah_</a></div>
            <div>LI: <a href="https://www.linkedin.com/in/heru-ardiansyah-84a97343a/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-soft)', textDecoration: 'none' }}>Heru Ardiansyah</a></div>
          </div>
        </div>

      </div>

    </div>
  );
}
