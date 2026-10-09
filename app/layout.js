import './globals.css';
import './gradient_preview.css';
import Script from 'next/script';
import LayoutShell from '../components/LayoutShell';

export const metadata = {
  metadataBase: new URL('https://gradientarch.tech'),
  title: 'GradiEnt Studio — Arsitektur & Desain Spasial Makassar',
  description: 'GradiEnt Studio, praktik arsitektur dan desain spasial di Makassar oleh Heru Ardiansyah. Konsep ruang kontekstual, studi tapak dan pencahayaan alami, serta pemodelan 3D.',
  openGraph: {
    type: 'website',
    title: 'GradiEnt Studio — Arsitektur & Desain Spasial Makassar',
    description: 'GradiEnt Studio, praktik arsitektur dan desain spasial di Makassar oleh Heru Ardiansyah. Konsep ruang kontekstual, studi tapak dan pencahayaan alami, serta pemodelan 3D.',
    images: ['/assets/courtyard-concept.png'],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-W4GTB1CP38"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W4GTB1CP38');
            `,
          }}
        />
      </head>
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
