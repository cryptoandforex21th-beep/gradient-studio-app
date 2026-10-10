import './globals.css';
import './gradient_preview.css';
import Script from 'next/script';
import LayoutShell from '../components/LayoutShell';
import { SITE_URL, getJsonLdSchemas } from '../lib/agentContent';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'GradiEnt Studio Architectural Design 3D Modeling',
  title: 'GradiEnt Studio Architectural Design 3D Modeling & Daylighting Studio (Makassar)',
  description:
    'GradiEnt Studio Architectural Design 3D Modeling (https://gradientarch.tech) by Heru Ardiansyah in Makassar, Indonesia: Architectural design studio, tropical daylighting analysis, 3D spatial modeling platform, DED engineering documentation, REST API v1, CLI tool, and MCP server.',
  keywords: [
    'GradiEnt Studio Architectural Design 3D Modeling',
    'GradiEnt Studio Architectural Design',
    'GradiEnt Studio',
    'GradiEnt Studio Makassar',
    'GradiEnt Studio API',
    'GradiEnt Studio MCP Server',
    'GradiEnt Studio CLI',
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
  publisher: 'GradiEnt Studio Architectural Design 3D Modeling',
  alternates: {
    canonical: SITE_URL,
    types: {
      'text/markdown': SITE_URL
    }
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'GradiEnt Studio Architectural Design 3D Modeling',
    locale: 'id_ID',
    title: 'GradiEnt Studio Architectural Design 3D Modeling & Daylighting Studio',
    description:
      'GradiEnt Studio Architectural Design 3D Modeling (gradientarch.tech), praktik arsitektur, analisis pencahayaan alami tropis, dan platform pemodelan spasial 3D di Makassar oleh Heru Ardiansyah.',
    images: [
      {
        url: `${SITE_URL}/assets/courtyard-concept.png`,
        width: 1672,
        height: 941,
        alt: 'GradiEnt Studio Architectural Design 3D Modeling'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GradiEnt Studio Architectural Design 3D Modeling Studio',
    description:
      'GradiEnt Studio Architectural Design 3D Modeling: tropical daylighting analysis, 3D spatial modeling platform, and DED studio in Makassar by Heru Ardiansyah.',
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
        <link rel="service-doc" href={`${SITE_URL}/docs`} />
        <link rel="help" href={`${SITE_URL}/docs`} />
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
