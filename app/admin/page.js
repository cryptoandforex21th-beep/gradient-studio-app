'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const adminFlag = sessionStorage.getItem('gradient_admin');
      if (adminFlag === '1') {
        setIsAdmin(true);
        fetchInquiries();
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    } catch (e) {
      console.log('Session error:', e);
      setLoading(false);
    }
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Error fetching inquiries:', error.message);
      } else if (data) {
        setInquiries(data);
      }
    } catch (e) {
      console.log('Fetch catch:', e);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem('gradient_admin');
      sessionStorage.removeItem('gradient_user_name');
    } catch (e) {}
    setIsAdmin(false);
    router.push('/login');
  };

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    try {
      const d = new Date(isoString);
      return d.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return String(isoString);
    }
  };

  if (!mounted) {
    return (
      <div style={{ maxWidth: '800px', margin: '80px auto', textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '12px' }}>
        Memuat sistem admin...
      </div>
    );
  }

  // Not authenticated view
  if (!isAdmin) {
    return (
      <div style={{
        maxWidth: '480px',
        margin: '80px auto 120px',
        padding: '40px',
        background: 'var(--paper-deep)',
        border: '1px solid var(--line)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'var(--accent)',
          margin: '0 auto 16px',
          boxShadow: '0 0 12px var(--accent)'
        }}></div>
        <h1 style={{
          fontFamily: 'var(--display)',
          fontSize: '32px',
          fontWeight: 600,
          marginBottom: '8px'
        }}>
          Akses Khusus Admin
        </h1>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          color: 'var(--ink-soft)',
          marginBottom: '28px',
          lineHeight: 1.6
        }}>
          Anda belum login sebagai Studio Admin. Silakan masuk terlebih dahulu untuk mengakses data konsultasi.
        </p>
        <Link
          href="/login"
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: 'var(--white)',
            padding: '12px 24px',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            fontWeight: 600
          }}
        >
          Masuk ke Halaman Login →
        </Link>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto 100px', padding: '0 20px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid var(--line)',
        paddingBottom: '24px',
        marginBottom: '36px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '6px'
          }}>
            Studio Control Center / Admin
          </div>
          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(36px, 5vw, 54px)',
            fontWeight: 600,
            lineHeight: 0.9,
            letterSpacing: '-.03em'
          }}>
            Panel Manajemen GradiEnt
          </h1>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            color: 'var(--ink-soft)',
            marginTop: '8px'
          }}>
            Principal: Heru Ardiansyah · Makassar, Indonesia
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={fetchInquiries}
            style={{
              padding: '8px 16px',
              border: '1px solid var(--line)',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              color: 'var(--ink)'
            }}
          >
            ↻ Refresh Data
          </button>
          <button
            onClick={logout}
            style={{
              padding: '8px 16px',
              background: 'var(--accent)',
              color: 'var(--white)',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              fontWeight: 600
            }}
          >
            Keluar Admin
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '18px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: 'var(--paper-deep)',
          border: '1px solid var(--line)',
          padding: '20px'
        }}>
          <div style={{ font: '10px var(--mono)', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
            Total Konsultasi Masuk
          </div>
          <div style={{ fontFamily: 'var(--display)', fontSize: '42px', fontWeight: 600, marginTop: '8px' }}>
            {inquiries.length}
          </div>
          <div style={{ font: '10px var(--mono)', color: 'var(--accent)', marginTop: '4px' }}>
            Tersimpan di Cloud Supabase
          </div>
        </div>

        <div style={{
          background: 'var(--paper-deep)',
          border: '1px solid var(--line)',
          padding: '20px'
        }}>
          <div style={{ font: '10px var(--mono)', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
            Database Status
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2ea44f', boxShadow: '0 0 8px #2ea44f' }}></span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 600 }}>CONNECTED</span>
          </div>
          <div style={{ font: '10px var(--mono)', color: 'var(--ink-soft)', marginTop: '10px' }}>
            Region: Singapore (ap-southeast-1)
          </div>
        </div>

        <div style={{
          background: 'var(--paper-deep)',
          border: '1px solid var(--line)',
          padding: '20px'
        }}>
          <div style={{ font: '10px var(--mono)', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
            Web Analytics Stream
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 600, marginTop: '12px', color: 'var(--accent)' }}>
            G-W4GTB1CP38
          </div>
          <div style={{ font: '10px var(--mono)', color: 'var(--ink-soft)', marginTop: '8px' }}>
            Google Analytics 4 Active
          </div>
        </div>
      </div>

      {/* Inquiries Section */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontFamily: 'var(--display)',
            fontSize: '28px',
            fontWeight: 600,
            letterSpacing: '-.02em'
          }}>
            Daftar Permintaan Konsultasi Klien
          </h2>
          <span style={{ font: '10px var(--mono)', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>
            Real-time Feed
          </span>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', font: '12px var(--mono)', color: 'var(--ink-soft)' }}>
            Memuat data dari Supabase...
          </div>
        ) : inquiries.length === 0 ? (
          <div style={{
            background: 'var(--paper-deep)',
            border: '1px dashed var(--line)',
            padding: '40px',
            textAlign: 'center',
            color: 'var(--ink-soft)',
            fontFamily: 'var(--mono)',
            fontSize: '12px'
          }}>
            Belum ada formulir konsultasi yang masuk. Formulir dari halaman depan akan otomatis tersimpan di sini!
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '14px' }}>
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                style={{
                  background: 'var(--paper-deep)',
                  border: '1px solid var(--line)',
                  padding: '20px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ font: '9px var(--mono)', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Nama Klien</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, marginTop: '2px' }}>{inq.name}</div>
                  <div style={{ font: '11px var(--mono)', color: 'var(--accent)', marginTop: '2px' }}>{inq.contact}</div>
                </div>

                <div>
                  <div style={{ font: '9px var(--mono)', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Kategori Proyek</div>
                  <div style={{ fontSize: '13px', marginTop: '2px' }}>{inq.project_type || inq.type}</div>
                  <div style={{ font: '11px var(--mono)', color: 'var(--ink-soft)', marginTop: '2px' }}>
                    {formatDate(inq.created_at)}
                  </div>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ font: '9px var(--mono)', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Catatan / Detail Lahan</div>
                  <p style={{ fontSize: '13px', lineHeight: 1.5, marginTop: '4px', color: 'var(--ink-soft)' }}>
                    {inq.notes || '(Tidak ada catatan khusus)'}
                  </p>
                </div>

                <div>
                  <a
                    href={`https://wa.me/${(inq.contact || '').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#25D366',
                      color: '#ffffff',
                      padding: '8px 14px',
                      fontFamily: 'var(--mono)',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}
                  >
                    Hubungi Klien →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
