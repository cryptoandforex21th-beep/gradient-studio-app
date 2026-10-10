import './globals.css';
import './gradient_preview.css';
import Script from 'next/script';
import LayoutShell from '../components/LayoutShell';
import { SITE_URL, getJsonLdSchemas } from '../lib/agentContent';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'GradiEnt Studio',
  title: 'GradiEnt Studio — Architectural Design, 3D Spatial Modeling & Daylighting Studio (Makassar)',
  description:
    'GradiEnt Studio by Heru Ardiansyah in Makassar, Indonesia: Architectural design studio, tropical daylighting analysis, 3D spatial modeling platform, DED engineering documentation, and MCP/REST spatial APIs.',
  keywords: [
    'GradiEnt Studio',
    'GradiEnt Studio Makassar',
    'Architectural Design Studio',
    '3D Spatial Modeling Platform',
    'Tropical Daylighting Analysis',
    'Arsitektur Makassar',
    'Desain Spasial',
    'Heru Ardiansyah',
    'Detailed Engineering Design DED',
    'Architecture MCP Server'
  ],
  authors: [{ name: 'Heru Ardiansyah', url: 'https://www.linkedin.com/in/heru-ardiansyah-84a97343a/' }],
  creator: 'Heru Ardiansyah',
  publisher: 'GradiEnt Studio',
  alternates: {
    canonical: SITE_URL,
    types: {
      'text/markdown': SITE_URL
    }
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'GradiEnt Studio',
    locale: 'id_ID',
    title: 'GradiEnt Studio — Architectural Design, 3D Spatial Modeling & Daylighting Studio',
    description:
      'GradiEnt Studio, praktik arsitektur, analisis pencahayaan alami tropis, dan platform pemodelan spasial 3D di Makassar oleh Heru Ardiansyah.',
    images: [
      {
        url: `${SITE_URL}/assets/courtyard-concept.png`,
        width: 1672,
        height: 941,
        alt: 'GradiEnt Studio — Architectural Design & 3D Spatial Modeling'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GradiEnt Studio — Architectural Design & 3D Spatial Modeling Studio',
    description:
      'Architectural design practice, tropical daylighting analysis, and 3D spatial modeling platform in Makassar by Heru Ardiansyah.',
    images: [`${SITE_URL}/assets/courtyard-concept.png`]
  }
};

export default function RootLayout({ children }) {
  const { organizationSchema, softwareAppSchema, webSiteSchema } = getJsonLdSchemas();

  return (
    <html lang="id">
      <head>
        <link rel="llms-txt" href={`${SITE_URL}/llms.txt`} />
        <link rel="service-desc" href={`${SITE_URL}/openapi.json`} type="application/json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
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
