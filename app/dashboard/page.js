'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function ClientDashboard() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  
  // Profile Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [company, setCompany] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Client Consultations
  const [myInquiries, setMyInquiries] = useState([]);

  useEffect(() => {
    fetchUserProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        populateUserData(session.user);
        setLoading(false);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const populateUserData = async (u) => {
    setUser(u);
    const meta = u.user_metadata || {};
    setFullName(meta.full_name || meta.name || u.email?.split('@')[0] || '');
    setPhone(meta.phone || '');
    setCity(meta.city || 'Makassar');
    setCompany(meta.company || '');
    setBio(meta.bio || '');
    setAvatarUrl(meta.avatar_url || meta.picture || '');

    const { data: inqData } = await supabase
      .from('inquiries')
      .select('*')
      .or(`contact.ilike.%${u.email}%,name.ilike.%${meta.full_name || meta.name || u.email}%`)
      .order('created_at', { ascending: false });

    if (inqData) {
      setMyInquiries(inqData);
    }
  };

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        // If coming from an auth callback URL (hash with access_token or query code), wait for Supabase to parse
        if (typeof window !== 'undefined' && (window.location.hash.includes('access_token') || window.location.search.includes('code'))) {
          return;
        }
        if (sessionStorage.getItem('gradient_admin') === '1') {
          router.push('/admin');
          return;
        }
        router.push('/login');
        return;
      }

      await populateUserData(session.user);
    } catch (err) {
      console.log('Dashboard load notice:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, atau WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Optimize & resize image locally using canvas (max 300x300)
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        setAvatarUrl(dataUrl);
        setSavedMsg('Foto profil dipilih dari komputer! Klik "Simpan Perubahan Data Diri" di bawah untuk mengunci.');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone,
          city,
          company,
          bio,
          avatar_url: avatarUrl
        }
      });

      if (error) {
        setSavedMsg('Gagal menyimpan: ' + error.message);
      } else {
        setSavedMsg('Profil dan data diri berhasil diperbarui di Cloud Supabase!');
        setTimeout(() => setSavedMsg(''), 4000);
      }
    } catch (err) {
      setSavedMsg('Terjadi kendala saat menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    try {
      sessionStorage.removeItem('gradient_admin');
      localStorage.removeItem('gradient_guest');
    } catch (e) {}
    router.push('/');
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--ink-soft)' }}>
        Memuat Portal Klien GradiEnt...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '960px', margin: '40px auto 100px', padding: '0 20px' }}>
      
      {/* Hidden File Picker for Local PC Storage */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Top Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--line)',
        paddingBottom: '24px',
        marginBottom: '36px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>
            Portal Klien / Client Workspace
          </div>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(34px, 4.5vw, 50px)', fontWeight: 600, letterSpacing: '-.03em' }}>
            Profil & Status Proyek
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            href="/#contact"
            style={{
              padding: '9px 16px',
              background: 'var(--accent)',
              color: 'var(--white)',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              fontWeight: 600
            }}
          >
            + Konsultasi Baru
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: '9px 14px',
              border: '1px solid var(--line)',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)'
            }}
          >
            Keluar
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        
        {/* Left Column: Profile Card & Edit Form */}
        <div style={{
          background: 'var(--paper-deep)',
          border: '1px solid var(--line)',
          padding: '28px'
        }}>
          {/* Avatar Header with Local Upload Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', borderBottom: '1px solid var(--line)', paddingBottom: '20px' }}>
            <div
              onClick={() => fileInputRef.current?.click()}
              title="Klik untuk memilih foto dari penyimpanan laptop"
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: avatarUrl ? `url(${avatarUrl}) center/cover` : 'var(--canvas)',
                color: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--display)',
                fontSize: '28px',
                fontWeight: 600,
                border: '2px solid var(--accent)',
                flexShrink: 0,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {!avatarUrl && (fullName[0]?.toUpperCase() || user?.email[0]?.toUpperCase())}
              <div style={{
                position: 'absolute',
                bottom: 0,
                insetInline: 0,
                background: 'rgba(0,0,0,0.65)',
                color: 'var(--white)',
                fontSize: '8px',
                fontFamily: 'var(--mono)',
                textAlign: 'center',
                padding: '3px 0',
                letterSpacing: '.06em'
              }}>
                GANTI
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--display)', fontSize: '24px', fontWeight: 600 }}>
                {fullName || 'Klien GradiEnt'}
              </div>
              <div style={{ font: '11px var(--mono)', color: 'var(--ink-soft)', marginTop: '2px' }}>
                {user?.email}
              </div>
              
              {/* Button: Local Device File Picker */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  marginTop: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  padding: '6px 12px',
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  transition: 'all .2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
              >
                <span>📷 Upload dari Laptop</span>
              </button>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSaveProfile} style={{ display: 'grid', gap: '16px' }}>
            <h3 style={{ font: '11px var(--mono)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Data Diri Klien
            </h3>

            <div>
              <label style={{ display: 'block', font: '9px var(--mono)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '5px' }}>
                Nama Lengkap / Instansi
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--ink)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', font: '9px var(--mono)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '5px' }}>
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                style={{ width: '100%', padding: '10px 12px', background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--ink)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', font: '9px var(--mono)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '5px' }}>
                  Kota / Domisili
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Makassar"
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--ink)', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', font: '9px var(--mono)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '5px' }}>
                  Perusahaan / Instansi
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="(Opsional)"
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--ink)', fontSize: '13px', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', font: '9px var(--mono)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '5px' }}>
                Preferensi Desain / Kebutuhan Ruang
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Contoh: Menyukai desain tropis modern dengan pencahayaan alami dan material ramah lingkungan..."
                style={{ width: '100%', padding: '10px 12px', background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--ink)', fontSize: '13px', outline: 'none', resize: 'vertical' }}
              />
            </div>

            {savedMsg && (
              <div style={{
                font: '11px var(--mono)',
                padding: '10px',
                background: savedMsg.includes('Gagal') ? 'rgba(217, 56, 56, 0.1)' : 'rgba(46, 164, 79, 0.1)',
                color: savedMsg.includes('Gagal') ? '#d93838' : '#2ea44f',
                border: '1px solid currentColor',
                lineHeight: 1.5
              }}>
                {savedMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: '12px',
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: saving ? 'wait' : 'pointer'
              }}
            >
              {saving ? 'Menyimpan ke Cloud...' : 'Simpan Perubahan Data Diri →'}
            </button>
          </form>
        </div>

        {/* Right Column: Inquiries History & Studio Contacts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Consultation Tracking */}
          <div style={{
            background: 'var(--paper-deep)',
            border: '1px solid var(--line)',
            padding: '28px'
          }}>
            <h3 style={{ font: '11px var(--mono)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>
              Riwayat Pengajuan Konsultasi
            </h3>

            {myInquiries.length === 0 ? (
              <div style={{ padding: '24px', background: 'var(--paper)', border: '1px dashed var(--line)', textAlign: 'center', color: 'var(--ink-soft)', font: '12px var(--mono)', lineHeight: 1.6 }}>
                Anda belum mengajukan formulir konsultasi.<br />
                <Link href="/#contact" style={{ color: 'var(--accent)', textDecoration: 'underline', marginTop: '8px', display: 'inline-block' }}>
                  Ajukan konsultasi sekarang →
                </Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {myInquiries.map((item) => (
                  <div key={item.id} style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ font: '10px var(--mono)', color: 'var(--accent)', textTransform: 'uppercase' }}>
                        {item.project_type}
                      </span>
                      <span style={{ font: '9px var(--mono)', padding: '2px 6px', background: 'rgba(46, 164, 79, 0.1)', color: '#2ea44f', textTransform: 'uppercase' }}>
                        {item.status || 'Terkirim'}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', lineHeight: 1.4, color: 'var(--ink)' }}>
                      {item.notes || '(Tanpa detail tambahan)'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Contact with Principal */}
          <div style={{
            background: 'var(--canvas)',
            color: 'var(--white)',
            border: '1px solid var(--line)',
            padding: '28px'
          }}>
            <div style={{ font: '10px var(--mono)', color: 'var(--blueprint)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Kontak Langsung Principal
            </div>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '26px', fontWeight: 600, marginBottom: '12px' }}>
              Heru Ardiansyah
            </h3>
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--blueprint)', opacity: 0.8, marginBottom: '20px' }}>
              Ada kebutuhan revisi gambar, koordinasi sayembara, atau jadwal pertemuan studio?
            </p>
            <a
              href="https://wa.me/6285143628550?text=Halo%20Heru,%20saya%20klien%20dari%20portal%20GradiEnt%20Studio"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#ffffff',
                padding: '10px 18px',
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              Chat via WhatsApp Studio →
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
