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

  const handleGoogleLogin = async () => {
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
      setError(err.message || 'Gagal masuk dengan Google. Pastikan Google Auth aktif di Supabase.');
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

      {/* Google Login for Client */}
      {role === 'guest' && (
        <div style={{ marginBottom: '24px' }}>
          <button
            type="button"
            onClick={handleGoogleLogin}
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
            Masuk dengan Google
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '20px 0 16px',
            gap: '12px'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink-soft)', letterSpacing: '.1em', textTransform: 'uppercase' }}>atau login email</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
          </div>
        </div>
      )}

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
            {role === 'admin' ? 'ID Pengguna / Email Admin' : 'Alamat Email Terdaftar'}
          </label>
          <input
            type={role === 'admin' ? 'text' : 'email'}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={role === 'admin' ? 'Masukkan ID Admin' : 'nama@email.com'}
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
