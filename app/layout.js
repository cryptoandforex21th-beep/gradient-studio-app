import './globals.css';
import Script from 'next/script';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'GradiEnt — Architecture & Spatial Studio',
  description: 'Tactile Architectural Practice by Heru Ardiansyah. Climate, parametric form, and spatial harmony.',
  openGraph: {
    type: 'website',
    title: 'GradiEnt — Architecture & Spatial Studio',
    description: 'Tactile Architectural Practice by Heru Ardiansyah. Climate, parametric form, and spatial harmony.',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
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
        <div className="site">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
