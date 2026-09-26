'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('guest'); // 'guest' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (role === 'admin') {
        // Fast local admin check OR Supabase auth with admin email
        if (
          (email === 'gradient_admin' && password === 'Studio2026!') ||
          (email === 'heruardiansyah2one@gmail.com' && password === 'Studio2026!')
        ) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('gradient_admin', '1');
            sessionStorage.setItem('gradient_user_name', 'Heru Ardiansyah (Admin)');
          }
          setSuccess('Login Admin Berhasil! Mengalihkan ke panel...');
          setTimeout(() => {
            router.push('/admin');
          }, 800);
          return;
        }

        // Try standard Supabase auth
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (authError) {
          setError(authError.message || 'Username atau password admin salah.');
          return;
        }

        if (typeof window !== 'undefined') {
          sessionStorage.setItem('gradient_admin', '1');
          sessionStorage.setItem('gradient_user_name', data.user?.user_metadata?.full_name || 'Admin');
        }
        setSuccess('Login Admin Berhasil! Mengalihkan...');
        setTimeout(() => {
          router.push('/admin');
        }, 800);

      } else {
        // Client / Guest Login via Supabase
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (authError) {
          setError(authError.message === 'Invalid login credentials' 
            ? 'Email atau kata sandi salah. Silakan periksa kembali.' 
            : authError.message);
          return;
        }

        const fullName = data.user?.user_metadata?.full_name || email.split('@')[0];
        if (typeof window !== 'undefined') {
          localStorage.setItem('gradient_guest', JSON.stringify({
            email: data.user?.email,
            name: fullName,
            phone: data.user?.user_metadata?.phone || ''
          }));
        }

        setSuccess(`Selamat datang kembali, ${fullName}! Mengalihkan ke Dashboard...`);
        setTimeout(() => {
          router.push('/dashboard');
        }, 800);
      }
    } catch (err) {
      setError('Terjadi kendala saat login. Silakan coba lagi.');
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
        Masuk ke Portal
      </div>
      <p style={{
        fontFamily: 'var(--mono)',
        fontSize: '11px',
        color: 'var(--ink-soft)',
        letterSpacing: '.06em',
        marginBottom: '32px'
      }}>
        GradiEnt Studio / Cloud Supabase Authentication
      </p>

      {/* Role Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--line)',
        marginBottom: '28px'
      }}>
        <button
          type="button"
          onClick={() => { setRole('guest'); setError(''); setSuccess(''); }}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            padding: '10px 18px',
            color: role === 'guest' ? 'var(--accent)' : 'var(--ink-soft)',
            borderBottom: role === 'guest' ? '2px solid var(--accent)' : '2px solid transparent',
            marginBottom: '-1px',
            fontWeight: role === 'guest' ? 600 : 400
          }}
        >
          Klien / Pengunjung
        </button>
        <button
          type="button"
          onClick={() => { setRole('admin'); setError(''); setSuccess(''); }}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            padding: '10px 18px',
            color: role === 'admin' ? 'var(--accent)' : 'var(--ink-soft)',
            borderBottom: role === 'admin' ? '2px solid var(--accent)' : '2px solid transparent',
            marginBottom: '-1px',
            fontWeight: role === 'admin' ? 600 : 400
          }}
        >
          Studio Admin
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} style={{ display: 'grid', gap: '16px' }}>
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
            {role === 'admin' ? 'Email / Username Admin' : 'Alamat Email Terdaftar'}
          </label>
          <input
            type={role === 'admin' ? 'text' : 'email'}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={role === 'admin' ? 'gradient_admin atau heruardiansyah2one@gmail.com' : 'nama@email.com'}
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
            Kata Sandi
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
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
          {loading ? 'Memverifikasi...' : `Masuk ${role === 'admin' ? 'sebagai Admin' : 'ke Akun'} →`}
        </button>
      </form>

      {/* Switch to Register */}
      {role === 'guest' && (
        <div style={{
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid var(--line)',
          textAlign: 'center',
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          color: 'var(--ink-soft)'
        }}>
          Belum punya akun klien?{' '}
          <Link href="/register" style={{ color: 'var(--accent)', textDecoration: 'underline', fontWeight: 600 }}>
            Daftar di sini
          </Link>
        </div>
      )}
    </div>
  );
}
