'use client';

import { useState } from 'react';
import AxonModel from '../components/AxonModel';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    type: 'Rumah Tinggal / Private Residence',
    notes: ''
  });

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

    // 2. Track GA4 Event
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'inquiry',
        event_label: type,
        value: 1
      });
    }

    // 3. Open WhatsApp Direct
    window.open(`https://wa.me/6285143628550?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: 'clamp(32px, 6vw, 90px)',
        alignItems: 'center',
        padding: 'clamp(50px, 7vw, 100px) 0 80px'
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
            GradiEnt / Est. 2026
          </div>

          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(54px, 7vw, 110px)',
            fontWeight: 500,
            lineHeight: 0.85,
            letterSpacing: '-.05em',
            margin: '24px 0 30px'
          }}>
            Spaces with<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: 600 }}>weather</em> in them.
          </h1>

          <p style={{
            fontSize: '16px',
            lineHeight: 1.6,
            color: 'var(--ink-soft)',
            maxWidth: '430px'
          }}>
            GradiEnt adalah praktik arsitektur yang beroperasi di antara lansekap, geometri parametrik, dan material lokal. Kami merancang ruang yang adaptif terhadap iklim dan ritual keseharian.
          </p>

          <div style={{
            display: 'flex',
            gap: '28px',
            marginTop: '40px',
            paddingTop: '16px',
            borderTop: '1px solid var(--line)',
            maxWidth: '480px'
          }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                Founder & Principal
              </div>
              <div style={{ fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>Heru Ardiansyah</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                Focus
              </div>
              <div style={{ fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>Architecture + Parametric</div>
            </div>
          </div>
        </div>

        <div>
          <AxonModel />
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
            Four studies in<br />light, mass + air
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {[
            { id: '01', title: 'House for\nthe Long View', tag: 'Built', loc: 'Makassar, ID / 2025', bg: 'var(--canvas)' },
            { id: '02', title: 'Salt\nLibrary', tag: 'In Progress', loc: 'South Sulawesi, ID / 2025', bg: '#2b3b3e' },
            { id: '03', title: 'Parametric\nCanopy', tag: 'Research', loc: 'Rhino & Grasshopper / 2024', bg: '#223035' },
            { id: '04', title: 'The Quiet\nWorkshop', tag: 'Built', loc: 'Gowa, ID / 2024', bg: 'var(--canvas)' }
          ].map((item) => (
            <div key={item.id} style={{
              background: item.bg,
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
                  {item.id} / 04
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
        alignItems: 'start',
        marginTop: '30px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <img 
              src="/brand-logo-transparent.png" 
              alt="GradiEnt Studio Logo" 
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
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

          <h2 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(46px, 6vw, 84px)',
            fontWeight: 500,
            lineHeight: 0.88,
            letterSpacing: '-.05em'
          }}>
            Have a site<br />with <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>weather?</em>
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: '420px', marginTop: '20px' }}>
            Diskusikan rencana tapak, sayembara, atau eksplorasi arsitektur bersama GradiEnt Studio. Tinggalkan detail Anda di formulir untuk konsultasi langsung.
          </p>
          <div style={{
            marginTop: '30px',
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2ea44f', display: 'inline-block', boxShadow: '0 0 8px #2ea44f' }}></span>
            STUDIO TELEMETRY / VISITOR ANALYTICS: ACTIVE
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
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
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
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
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
            <span>Makassar, Indonesia</span>
          </div>
        </div>
      </section>
    </div>
  );
}
