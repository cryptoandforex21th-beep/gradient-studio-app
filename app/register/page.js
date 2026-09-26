'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            phone: formData.phone
          }
        }
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      setSuccess('Pendaftaran berhasil! Akun Anda telah terdaftar di database Supabase GradiEnt Studio.');
      setTimeout(() => {
        router.push('/login?registered=1');
      }, 1500);
    } catch (err) {
      setError('Terjadi kendala saat mendaftar. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '520px',
      margin: '60px auto 100px',
      padding: '40px clamp(20px, 4vw, 44px)',
      background: 'var(--paper-deep)',
      border: '1px solid var(--line)',
      color: 'var(--ink)'
    }}>
      {/* Back Link */}
      <Link href="/" style={{
        fontFamily: 'var(--mono)',
        fontSize: '10px',
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '24px'
      }}>
        ← Kembali ke Beranda
      </Link>

      <div style={{
        fontFamily: 'var(--display)',
        fontSize: 'clamp(32px, 4vw, 46px)',
        fontWeight: 600,
        lineHeight: 0.95,
        letterSpacing: '-.03em',
        marginBottom: '8px'
      }}>
        Daftar Akun Klien
      </div>
      <p style={{
        fontFamily: 'var(--mono)',
        fontSize: '11px',
        color: 'var(--ink-soft)',
        letterSpacing: '.06em',
        marginBottom: '32px'
      }}>
        Terhubung langsung ke Cloud Database Supabase GradiEnt Studio
      </p>

      {/* Form */}
      <form onSubmit={handleRegister} style={{ display: 'grid', gap: '16px' }}>
        <div>
          <label style={{
            display: 'block',
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            marginBottom: '6px'
          }}>
            Nama Lengkap / Instansi *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Heru Ardiansyah"
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              fontFamily: 'var(--body)',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            marginBottom: '6px'
          }}>
            Alamat Email Aktif *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="nama@email.com"
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              fontFamily: 'var(--body)',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            marginBottom: '6px'
          }}>
            Nomor WhatsApp *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="085143628550"
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              fontFamily: 'var(--body)',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            marginBottom: '6px'
          }}>
            Kata Sandi *
          </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Minimal 6 karakter"
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              fontFamily: 'var(--body)',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            marginBottom: '6px'
          }}>
            Ulangi Kata Sandi *
          </label>
          <input
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Ketik ulang kata sandi"
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              fontFamily: 'var(--body)',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {error && (
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            color: '#d93838',
            padding: '10px 14px',
            background: 'rgba(217, 56, 56, 0.08)',
            border: '1px solid rgba(217, 56, 56, 0.2)'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            color: '#2ea44f',
            padding: '10px 14px',
            background: 'rgba(46, 164, 79, 0.08)',
            border: '1px solid rgba(46, 164, 79, 0.2)'
          }}>
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: 'var(--accent)',
            color: 'var(--white)',
            padding: '13px',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginTop: '8px',
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'wait' : 'pointer'
          }}
        >
          {loading ? 'Mendaftarkan Akun...' : 'Buat Akun Klien Baru →'}
        </button>
      </form>

      {/* Switch to Login */}
      <div style={{
        marginTop: '28px',
        paddingTop: '20px',
        borderTop: '1px solid var(--line)',
        textAlign: 'center',
        fontFamily: 'var(--mono)',
        fontSize: '11px',
        color: 'var(--ink-soft)'
      }}>
        Sudah memiliki akun?{' '}
        <Link href="/login" style={{ color: 'var(--accent)', textDecoration: 'underline', fontWeight: 600 }}>
          Masuk di sini
        </Link>
      </div>
    </div>
  );
}
