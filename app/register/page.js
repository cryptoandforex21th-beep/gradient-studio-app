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
      const redirectUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/dashboard` 
        : 'https://gradientstudioapp.vercel.app/dashboard';

      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            phone: formData.phone
          },
          emailRedirectTo: redirectUrl
        }
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        setSuccess('Pendaftaran berhasil! Mengalihkan ke Dashboard...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setSuccess('Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi, lalu masuk ke akun.');
        setTimeout(() => {
          router.push('/login?registered=1');
        }, 2000);
      }
    } catch (err) {
      setError('Terjadi kendala saat mendaftar. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    setLoading(true);
    try {
      const redirectUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/dashboard` 
        : 'https://gradientstudioapp.vercel.app/dashboard';

      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });
      if (oauthError) throw oauthError;
    } catch (err) {
      setError(err.message || 'Gagal mendaftar dengan Google. Pastikan Google Auth aktif di Supabase.');
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
        marginBottom: '28px'
      }}>
        Terhubung langsung ke Cloud Database Supabase GradiEnt Studio
      </p>

      {/* Google Sign Up Button */}
      <div style={{ marginBottom: '24px' }}>
        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            padding: '12px 16px',
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            color: 'var(--ink)',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: loading ? 'wait' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Daftar Cepat dengan Google
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '20px 0 16px',
          gap: '12px'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink-soft)', letterSpacing: '.1em', textTransform: 'uppercase' }}>atau isi form manual</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
        </div>
      </div>

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
