'use client';

import { useState, useEffect } from 'react';
import AxonModel from '../components/AxonModel';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    type: 'Rumah Tinggal / Private Residence',
    notes: ''
  });

  const [projects, setProjects] = useState([
    { id: '01', title: 'House for\nthe Long View', tag: 'Built', loc: 'Makassar, ID / 2025', bg: '#172326' },
    { id: '02', title: 'Salt\nLibrary', tag: 'In Progress', loc: 'South Sulawesi, ID / 2025', bg: '#2b3b3e' },
    { id: '03', title: 'Parametric\nCanopy', tag: 'Research', loc: 'Rhino & Grasshopper / 2024', bg: '#223035' },
    { id: '04', title: 'The Quiet\nWorkshop', tag: 'Built', loc: 'Gowa, ID / 2024', bg: '#172326' }
  ]);

  useEffect(() => {
    fetch('/api/notion/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch((err) => console.log('Notion projects sync info:', err));
  }, []);

  const sendInquiry = async (e) => {
    e.preventDefault();
    const { name, contact, type, notes } = formData;
    const msg = `Halo GradiEnt Studio!\nSaya *${name}* (${contact}) ingin konsultasi arsitektur:\n• Kategori: *${type}*\n• Lokasi & Detail: ${notes || '-'}\n\nMohon informasi waktu luang untuk sesi konsultasi awal. Terima kasih!`;

    // 1. Save to Supabase Cloud Database
    try {
      await supabase.from('inquiries').insert([{
        name,
        contact,
        project_type: type,
        notes
      }]);
    } catch (err) {
      console.log('Inquiry save notice:', err);
    }

    // 2. Sync to Notion CRM (Real-time Lead Entry)
    try {
      fetch('/api/notion/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, type, notes })
      });
    } catch (err) {
      console.log('Notion inquiry sync error:', err);
    }

    // 3. Track GA4 Event
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'inquiry',
        event_label: type,
        value: 1
      });
    }

    // 4. Open WhatsApp Direct
    window.open(`https://wa.me/6285143628550?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div>
      {/* CINEMATIC HERO SECTION (Awwwards Architectural Style) */}
      <section style={{
        padding: 'clamp(30px, 5vw, 60px) 0 30px',
        position: 'relative'
      }}>
        {/* Top Editorial Identity & Metadata */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '24px',
          borderBottom: '1px solid var(--line)',
          paddingBottom: '24px',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ width: '28px', height: '1px', background: 'var(--accent)' }}></span>
              GradiEnt Studio / Est. 2026 • Makassar, Indonesia
            </div>
            <h1 style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(46px, 6.5vw, 96px)',
              fontWeight: 500,
              lineHeight: 0.88,
              letterSpacing: '-.05em',
              margin: '18px 0 12px'
            }}>
              Spaces with<br />
              <em style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: 600 }}>weather</em> in them.
            </h1>
          </div>

          <div style={{ maxWidth: '440px' }}>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'var(--ink-soft)',
              marginBottom: '20px'
            }}>
              Praktik arsitektur spasial yang beroperasi di antara lansekap tropis, geometri parametrik, dan materialitas lokal. Menghadirkan ruang yang bernapas bersama iklim dan ritual keseharian.
            </p>
            <div style={{
              display: 'flex',
              gap: '24px',
              borderTop: '1px solid var(--line)',
              paddingTop: '14px',
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              color: 'var(--ink-soft)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              <div>
                <span style={{ color: 'var(--accent)' }}>Principal:</span> Heru Ardiansyah
              </div>
              <div>
                <span style={{ color: 'var(--accent)' }}>Discipline:</span> Spatial Computation
              </div>
            </div>
          </div>
        </div>

        {/* CINEMATIC THREE.JS 3D VIEWPORT (Wide Stage) */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(460px, 58vh, 660px)',
          background: 'linear-gradient(180deg, rgba(14, 17, 21, 0.4) 0%, rgba(14, 17, 21, 0.95) 100%)',
          border: '1px solid var(--line)',
          overflow: 'hidden',
          marginBottom: '26px'
        }}>
          {/* Three.js Canvas */}
          <AxonModel />

          {/* Architectural Drafting Guidelines (Overlay) */}
          <div style={{
            position: 'absolute',
            top: '18px',
            left: '20px',
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
            <span>Study 01 // Tropical Modular Pavilion • Live 3D WebGL</span>
          </div>

          <div style={{
            position: 'absolute',
            top: '18px',
            right: '20px',
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            pointerEvents: 'none'
          }}>
            LAT -5.1477° // LON 119.4327° MAKASSAR
          </div>

          <div style={{
            position: 'absolute',
            bottom: '18px',
            left: '20px',
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: 'var(--accent-soft)',
            pointerEvents: 'none',
            textTransform: 'uppercase'
          }}>
            Dusk Lighting • Charred Cedar Timber • Panoramic Glazing
          </div>

          <div style={{
            position: 'absolute',
            bottom: '18px',
            right: '20px',
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            pointerEvents: 'none',
            padding: '4px 8px',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            border: '1px solid var(--line)'
          }}>
            Drag to Rotate 360° • Scroll Zoom
          </div>
        </div>

        {/* Hero Action CTAs */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '20px'
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                background: 'var(--accent)',
                color: 'var(--white)',
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 0.2s'
              }}
            >
              <span>Mulai Konsultasi Tapak</span>
              <span>→</span>
            </a>
            <a
              href="#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: 'transparent',
                color: 'var(--ink)',
                border: '1px solid var(--line)',
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'border-color 0.2s'
              }}
            >
              <span>Telusuri Karya Terpilih</span>
              <span>↓</span>
            </a>
          </div>

          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            color: 'var(--ink-soft)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Integrated with Notion CRM & Supabase Cloud
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="projects" style={{ paddingBottom: '100px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTop: '1px solid var(--line)',
          paddingTop: '18px',
          marginBottom: '36px'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '20px', height: '1px', background: 'var(--accent)' }}></span>
              Selected Work / 2024—26
            </div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(38px, 5vw, 68px)', fontWeight: 500, lineHeight: 0.9, letterSpacing: '-.04em', margin: '10px 0 0' }}>
              Grounded gestures.
            </h2>
          </div>
          <div style={{ font: '10px var(--mono)', color: 'var(--ink-soft)', letterSpacing: '.08em', textTransform: 'uppercase', textAlign: 'right' }}>
            {projects.length} studies in<br />light, mass + air
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {projects.map((item, idx) => (
            <div key={item.id || idx} style={{
              background: item.bg || '#172326',
              color: 'var(--white)',
              minHeight: '340px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ font: '10px var(--mono)', letterSpacing: '.1em', color: 'var(--blueprint)' }}>
                  {item.id} / {String(projects.length).padStart(2, '0')}
                </span>
                <span style={{ font: '9px var(--mono)', padding: '4px 8px', border: '1px solid rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                  {item.tag}
                </span>
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'var(--display)',
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  lineHeight: 0.9,
                  fontWeight: 500,
                  whiteSpace: 'pre-line',
                  marginBottom: '10px'
                }}>
                  {item.title}
                </h3>
                <p style={{ font: '10px var(--mono)', color: 'var(--accent-soft)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                  {item.loc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APPROACH SECTION */}
      <section id="approach" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        padding: '30px 0 100px',
        borderTop: '1px solid var(--line)'
      }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>
            Point of View
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 500, lineHeight: 0.9, letterSpacing: '-.05em' }}>
            Read the<br />site first.
          </h2>
        </div>
        <div>
          <p style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', lineHeight: 1.25, letterSpacing: '-.02em', marginBottom: '40px' }}>
            Kami memulai dari apa yang sudah ada: <span style={{ color: 'var(--accent)' }}>arah angin tropis, orientasi matahari, dan material yang berakar pada tempat.</span> Arsitektur hadir sebagai perwujudan ketelitian tersebut.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
            <div>
              <div style={{ font: '11px var(--mono)', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '8px' }}>01 / Observe</div>
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ink-soft)' }}>Analisis iklim mikro, survei material, dan konteks tapak.</p>
            </div>
            <div>
              <div style={{ font: '11px var(--mono)', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '8px' }}>02 / Frame</div>
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ink-soft)' }}>Sistem spasial parametrik yang mengubah kendala menjadi harmoni.</p>
            </div>
            <div>
              <div style={{ font: '11px var(--mono)', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '8px' }}>03 / Make</div>
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ink-soft)' }}>Kolaborasi intensif dari sketsa awal hingga detail konstruksi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONSULTATION CONTACT */}
      <section id="contact" style={{
        background: 'var(--paper-deep)',
        border: '1px solid var(--line)',
        color: 'var(--ink)',
        padding: '50px clamp(20px, 5vw, 60px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'center',
        margin: '0 0 100px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <img 
              src="/brand-logo-transparent.png" 
              alt="GradiEnt Logo" 
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            />
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>
                GradiEnt Studio
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink-soft)' }}>
                Architecture + Spatial Computation
              </div>
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 500, lineHeight: 0.95, letterSpacing: '-.04em' }}>
            Let us build<br />with the land.
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: '420px', marginTop: '20px' }}>
            Diskusikan rencana tapak, sayembara, atau eksplorasi arsitektur bersama GradiEnt Studio. Tinggalkan detail Anda di formulir untuk konsultasi langsung.
          </p>
          <div style={{
            marginTop: '30px',
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
            <span>Menerima Konsultasi Proyek Baru 2026</span>
          </div>
        </div>

        <div style={{
          background: 'var(--paper)',
          border: '1px solid var(--line)',
          padding: '28px',
          borderRadius: '2px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)'
            }}>
              Formulir Konsultasi Proyek
            </h3>
            <img 
              src="/brand-logo-transparent.png" 
              alt="GradiEnt Mark" 
              style={{ width: '22px', height: '22px', objectFit: 'contain' }}
            />
          </div>

          <form onSubmit={sendInquiry} style={{ display: 'grid', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '6px' }}>
                Nama Lengkap / Instansi *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama Anda / Perusahaan"
                style={{
                  width: '100%',
                  padding: '11px 13px',
                  background: 'var(--paper-deep)',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--body)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '6px' }}>
                Nomor WhatsApp / Kontak *
              </label>
              <input
                type="text"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="08xxxxxxxxxx atau email aktif"
                style={{
                  width: '100%',
                  padding: '11px 13px',
                  background: 'var(--paper-deep)',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--body)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '6px' }}>
                Kategori Pekerjaan
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '11px 13px',
                  background: 'var(--paper-deep)',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--body)',
                  fontSize: '13px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Rumah Tinggal / Private Residence">Rumah Tinggal / Private Residence</option>
                <option value="Bangunan Komersial / Cafe / Hospitality">Bangunan Komersial / Cafe / Hospitality</option>
                <option value="Desain Parametrik & Masterplanning">Desain Parametrik & Masterplanning</option>
                <option value="Renovasi Spasial & Interior">Renovasi Spasial & Interior</option>
                <option value="Kolaborasi Riset / Sayembara">Kolaborasi Riset / Sayembara</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '6px' }}>
                Rencana Lokasi & Deskripsi Singkat
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Ceritakan sedikit tentang lokasi lahan atau kebutuhan ruang..."
                style={{
                  width: '100%',
                  padding: '11px 13px',
                  background: 'var(--paper-deep)',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--body)',
                  fontSize: '13px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: 'var(--accent)',
                color: 'var(--white)',
                padding: '13px 20px',
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '6px',
                cursor: 'pointer',
                border: 'none',
                transition: 'opacity 0.2s'
              }}
            >
              <span>Kirim via WhatsApp Direct</span>
              <span>→</span>
            </button>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontFamily: 'var(--mono)',
              fontSize: '9px',
              color: 'var(--ink-soft)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginTop: '4px'
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }}></span>
              Tersinkronisasi otomatis ke WhatsApp, Supabase & Notion CRM
            </div>
          </form>

          <div style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            fontSize: '11px',
            color: 'var(--ink-soft)',
            fontFamily: 'var(--mono)'
          }}>
            <span>Email: <a href="mailto:heruardiansyah2one@gmail.com" style={{ textDecoration: 'underline', color: 'var(--accent)' }}>heruardiansyah2one@gmail.com</a></span>
            <span>WhatsApp: <a href="https://wa.me/6285143628550" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--accent)' }}>+62 851-4362-8550</a></span>
          </div>
        </div>
      </section>
    </div>
  );
}
