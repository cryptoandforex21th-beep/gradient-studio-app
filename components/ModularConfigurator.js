'use client';

import { useState } from 'react';

const MODULES = [
  { id: 'm1', name: 'Compact Studio', size: '24 m²', basePrice: 185000000, desc: 'Ideal untuk ruang kerja arsitektur, paviliun tamu, atau glamping ADU.' },
  { id: 'm2', name: 'One-Bedroom Villa', size: '48 m²', basePrice: 340000000, desc: 'Unit modular standar GradiEnt: 1 KT, kamar mandi ensuite, dan open kitchen.' },
  { id: 'm3', name: 'Double Module Residence', size: '96 m²', basePrice: 620000000, desc: 'Konfigurasi 2 modul interlocking: 2 KT, ruang keluarga lapang, dan dek transisi.' },
  { id: 'm4', name: 'Commercial Pop-Up / Cafe', size: '36 m²', basePrice: 275000000, desc: 'Fasad kaca komersial geser penuh untuk coffee bar, gallery, atau butik.' },
];

const FINISHES = [
  { id: 'f1', name: 'Charred Shou Sugi Ban', extra: 0, desc: 'Kayu bakar tradisional Jepang, tahan rayap & iklim pesisir Makassar.' },
  { id: 'f2', name: 'Natural Teak & Cedar Slats', extra: 18000000, desc: 'Kisi-kisi kayu jati & cedar alami dengan finishing oil matte.' },
  { id: 'f3', name: 'Anodized Dark Aluminum', extra: 28000000, desc: 'Fasad metal standing-seam arsitektural tahan karat selamanya.' },
];

const ADDONS = [
  { id: 'a1', name: 'Solar PV Rooftop 4.8 kW', price: 45000000, desc: 'Sistem tenaga surya mandiri energi bersih harian.' },
  { id: 'a2', name: 'Smart Climate & Sensor Lux', price: 25000000, desc: 'Otomasi sensor cahaya dan ventilasi pasif hemat energi.' },
  { id: 'a3', name: 'Extended Teak Deck & Steps', price: 35000000, desc: 'Teras kayu luar ruangan seluas 18 m² dengan pencahayaan step LED.' },
];

export default function ModularConfigurator() {
  const [selectedModule, setSelectedModule] = useState(MODULES[1]);
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  const [selectedAddons, setSelectedAddons] = useState(['a1']);
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const calculateTotal = () => {
    let total = selectedModule.basePrice + selectedFinish.extra;
    selectedAddons.forEach((id) => {
      const addon = ADDONS.find((a) => a.id === id);
      if (addon) total += addon.price;
    });
    return total;
  };

  const formatIDR = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const handleSendConfig = async (e) => {
    e.preventDefault();
    if (!leadName || !leadContact) {
      alert('Mohon isi nama dan nomor WhatsApp Anda.');
      return;
    }

    setIsSubmitting(true);
    const addonsList = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const summaryText = `[KONFIGURASI MODULAR 3D] Modul: ${selectedModule.name} (${selectedModule.size}) | Fasad: ${selectedFinish.name} | Add-on: ${addonsList || 'None'} | Estimasi: ${formatIDR(calculateTotal())}`;

    // 1. Sync to Notion CRM Database
    try {
      await fetch('/api/notion/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          contact: leadContact,
          type: `Modular Unit: ${selectedModule.name}`,
          notes: summaryText
        })
      });
    } catch (err) {
      console.log('Notion sync notice:', err);
    }

    // 2. Open WhatsApp Direct
    const waMessage = `Halo GradiEnt Studio!\nSaya *${leadName}* (${leadContact}) baru saja membuat simulasi konfigurasi ruang modular 3D di website:\n\n• *Tipe Modul:* ${selectedModule.name} (${selectedModule.size})\n• *Fasad Eksterior:* ${selectedFinish.name}\n• *Fitur Tambahan:* ${addonsList || '-'}\n• *Estimasi Rencana:* ${formatIDR(calculateTotal())}\n\nMohon feedback dan jadwal konsultasi tapak bersama tim GradiEnt Studio. Terima kasih!`;
    window.open(`https://wa.me/6285143628550?text=${encodeURIComponent(waMessage)}`, '_blank');

    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  return (
    <section id="configurator" style={{
      padding: '80px 0',
      borderTop: '1px solid var(--line)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '40px'
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
            gap: '8px'
          }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--accent)' }}></span>
            Interactive Configurator / 02
          </div>
          <h2 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(36px, 4.5vw, 60px)',
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: '-.04em',
            margin: '10px 0 0'
          }}>
            Flexible Modular Solutions<br />
            for Every Site.
          </h2>
        </div>
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          color: 'var(--ink-soft)',
          maxWidth: '320px',
          lineHeight: 1.5
        }}>
          Konfigurasi ukuran unit, spesifikasi fasad kayu, dan sistem energi modular arsitektur Anda dengan kalkulasi transparan secara real-time.
        </div>
      </div>

      {/* Main Split Grid: Left Config Options, Right Summary Card */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '30px'
      }}>
        {/* LEFT COLUMN: Controls */}
        <div style={{ display: 'grid', gap: '28px' }}>
          {/* Step 1: Select Module Size */}
          <div>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '12px'
            }}>
              01 // Pilih Skala & Tipe Modul
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
              {MODULES.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedModule(m)}
                  style={{
                    padding: '14px',
                    background: selectedModule.id === m.id ? 'var(--paper-deep)' : 'var(--paper)',
                    border: selectedModule.id === m.id ? '1px solid var(--accent)' : '1px solid var(--line)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 600, color: 'var(--ink)' }}>
                      {m.name}
                    </span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--accent)', padding: '2px 6px', background: 'rgba(232,151,88,0.1)' }}>
                      {m.size}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-soft)', marginTop: '8px', lineHeight: 1.4 }}>
                    {m.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Select Facade Finish */}
          <div>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '12px'
            }}>
              02 // Material & Fasad Eksterior
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              {FINISHES.map((f) => (
                <div
                  key={f.id}
                  onClick={() => setSelectedFinish(f)}
                  style={{
                    padding: '12px 16px',
                    background: selectedFinish.id === f.id ? 'var(--paper-deep)' : 'var(--paper)',
                    border: selectedFinish.id === f.id ? '1px solid var(--accent)' : '1px solid var(--line)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--body)', fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>
                      {f.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-soft)', marginTop: '2px' }}>
                      {f.desc}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: f.extra === 0 ? 'var(--ink-soft)' : 'var(--accent)' }}>
                    {f.extra === 0 ? 'Standard' : `+${formatIDR(f.extra)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Add-on Upgrades */}
          <div>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '12px'
            }}>
              03 // Sistem Tambahan (Optional Upgrades)
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              {ADDONS.map((a) => {
                const isChecked = selectedAddons.includes(a.id);
                return (
                  <div
                    key={a.id}
                    onClick={() => toggleAddon(a.id)}
                    style={{
                      padding: '12px 16px',
                      background: isChecked ? 'var(--paper-deep)' : 'var(--paper)',
                      border: isChecked ? '1px solid var(--accent)' : '1px solid var(--line)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ cursor: 'pointer', accentColor: 'var(--accent)' }}
                      />
                      <div>
                        <div style={{ fontFamily: 'var(--body)', fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>
                          {a.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--ink-soft)', marginTop: '2px' }}>
                          {a.desc}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--accent)' }}>
                      +{formatIDR(a.price)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Architectural Summary Card */}
        <div style={{
          background: 'var(--canvas)',
          color: 'var(--white)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '480px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '24px' }}>
              <div>
                <div style={{ font: '10px var(--mono)', color: 'var(--blueprint)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Configuration Summary
                </div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '24px', fontWeight: 500, marginTop: '4px' }}>
                  {selectedModule.name}
                </div>
              </div>
              <div style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                padding: '4px 10px',
                border: '1px solid rgba(255,255,255,0.3)',
                textTransform: 'uppercase'
              }}>
                {selectedModule.size}
              </div>
            </div>

            {/* Spec Breakdown */}
            <div style={{ display: 'grid', gap: '14px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent-soft)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Base Structure & Prefab:</span>
                <span style={{ color: '#fff' }}>{formatIDR(selectedModule.basePrice)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Facade Treatment:</span>
                <span style={{ color: '#fff' }}>{selectedFinish.name} ({formatIDR(selectedFinish.extra)})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Add-on Systems:</span>
                <span style={{ color: '#fff' }}>{selectedAddons.length} Fitur Terpilih</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Fabrication Lead Time:</span>
                <span style={{ color: '#fff' }}>45 — 60 Hari Kalender</span>
              </div>
            </div>

            {/* Big Total Price (Awwwards Style) */}
            <div style={{
              margin: '30px 0 20px',
              padding: '20px 0',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              borderBottom: '1px solid rgba(255,255,255,0.12)'
            }}>
              <div style={{ font: '10px var(--mono)', color: 'var(--blueprint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Estimated Investment (All-In Architectural Package)
              </div>
              <div style={{
                fontFamily: 'var(--display)',
                fontSize: 'clamp(32px, 3.5vw, 44px)',
                fontWeight: 600,
                color: 'var(--accent)',
                lineHeight: 1.1,
                marginTop: '6px'
              }}>
                {formatIDR(calculateTotal())}
              </div>
              <div style={{ font: '9px var(--mono)', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                *Termasuk gambar kerja DED, fabrikasi modular, & instalasi struktur tapak.
              </div>
            </div>
          </div>

          {/* Direct Consultation Submission */}
          <form onSubmit={handleSendConfig} style={{ display: 'grid', gap: '10px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <input
                type="text"
                placeholder="Nama Anda *"
                required
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                style={{
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontFamily: 'var(--body)',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
              <input
                type="text"
                placeholder="No WhatsApp *"
                required
                value={leadContact}
                onChange={(e) => setLeadContact(e.target.value)}
                style={{
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontFamily: 'var(--body)',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                padding: '12px 16px',
                border: 'none',
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'opacity 0.2s'
              }}
            >
              <span>{isSubmitting ? 'Menyinkronkan...' : 'Kirim Rencana ke Tim GradiEnt Studio'}</span>
              <span>→</span>
            </button>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              font: '9px var(--mono)',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase'
            }}>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#22c55e' }}></span>
              Tersinkronisasi otomatis ke Notion CRM & WhatsApp
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
