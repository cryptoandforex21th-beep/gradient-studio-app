'use client';

import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <Link href="/" className="brand">
          <img 
            src="/assets/brand-logo.png" 
            alt="Logo GradiEnt" 
            width="40" 
            height="40" 
          />
          <span>GradiEnt<span className="brand-studio">STUDIO</span></span>
        </Link>
        <button 
          className="back-top" 
          onClick={scrollToTop} 
          type="button" 
          aria-label="Kembali ke atas"
        >
          Ke atas
        </button>
      </div>

      <div className="footer-links">
        <div>
          <span className="footer-heading">JELAJAHI</span>
          <Link href="/#explorations">Studi Desain</Link>
          <Link href="/#services">Layanan</Link>
          <Link href="/#process">Tahapan Kerja</Link>
          <Link href="/#studio">Studio</Link>
        </div>

        <div>
          <span className="footer-heading">TERHUBUNG</span>
          <a href="https://instagram.com/heruardiansyah_" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/heru-ardiansyah-84a97343a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/cryptoandforex21th-beep" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>

        <div>
          <span className="footer-heading">PORTAL</span>
          <Link href="/login">Masuk Akun</Link>
          <Link href="/register">Registrasi</Link>
          <Link href="/dashboard">Portal Klien</Link>
        </div>

        <div className="footer-address">
          <span className="footer-heading">LOKASI</span>
          <p>
            Makassar, Sulawesi Selatan<br />
            Indonesia · WITA (UTC+8)
          </p>
          <a href="mailto:heruardiansyah2one@gmail.com">heruardiansyah2one@gmail.com</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 GradiEnt Studio. Seluruh hak cipta dilindungi.</span>
        <div>
          <Link href="/privacy">Kebijakan Privasi</Link>
          <Link href="/terms">Ketentuan Layanan</Link>
        </div>
      </div>
    </footer>
  );
}
