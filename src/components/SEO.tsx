import { Helmet } from "react-helmet-async";

const SITE_NAME = "Acadexa";
const SITE_URL = "https://acadexa.vercel.app";
const DEFAULT_IMAGE = "/axadexabanner.png";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noindex?: boolean;
  keywords?: string;
  jsonLd?: Record<string, unknown>;
}

export function SEO({
  title,
  description = "Acadexa is an open-source educational resource archive for UIU CSE students. Browse playlists, notes, question banks and study resources.",
  image = DEFAULT_IMAGE,
  url,
  noindex = false,
  keywords,
  jsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - UIU CSE Academic Resource Hub`;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  const defaultKeywords = "UIU, UIU acadex, UIU CSE, United International University, CSE resources, CSE courses, UIU course materials, UIU study resources, Bangladesh university, CSE notes, CSE playlists, question banks UIU";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="Acadexa" />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
