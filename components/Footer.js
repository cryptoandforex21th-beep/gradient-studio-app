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
          <Link href="/about">Tentang Studio</Link>
          <Link href="/contact">Kontak</Link>
        </div>

        <div>
          <span className="footer-heading">DEVELOPER & AI</span>
          <Link href="/docs">Dokumentasi API & MCP</Link>
          <a href="/llms.txt">LLMs Manifest (llms.txt)</a>
          <a href="/openapi.json">OpenAPI 3.1 Spec</a>
          <a href="/.well-known/mcp">MCP Server Endpoint</a>
        </div>

        <div>
          <span className="footer-heading">PORTAL & SOSIAL</span>
          <Link href="/login">Masuk Akun</Link>
          <Link href="/dashboard">Portal Klien</Link>
          <a href="https://www.linkedin.com/in/heru-ardiansyah-84a97343a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/cryptoandforex21th-beep" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>

        <div className="footer-address">
          <span className="footer-heading">LOKASI</span>
          <p>
            Jl. Perintis Kemerdekaan, Tamalanrea<br />
            Makassar, Sulawesi Selatan 90245 · WITA
          </p>
          <a href="mailto:heruardiansyah2one@gmail.com">heruardiansyah2one@gmail.com</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 GradiEnt Studio. Seluruh hak cipta dilindungi.</span>
        <div>
          <Link href="/about">Tentang</Link>
          <Link href="/contact">Kontak</Link>
          <Link href="/docs">API & MCP</Link>
          <Link href="/privacy">Kebijakan Privasi</Link>
          <Link href="/terms">Ketentuan Layanan</Link>
        </div>
      </div>
    </footer>
  );
}
