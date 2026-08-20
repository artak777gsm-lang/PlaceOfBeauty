import { Helmet } from "react-helmet-async";

const SITE_URL = "https://placeof.beauty";
const DEFAULT_IMAGE = "https://placeof.beauty/og-image.jpg";
const DEFAULT_SUFFIX = " | Place of Beauty Grodzisk Mazowiecki";

export default function SEO({
  title,
  titleSuffix = DEFAULT_SUFFIX,
  description,
  keywords,
  path = "/",
  image = DEFAULT_IMAGE,
  imageAlt,
  type = "website",
  jsonLd = null,
}) {
  const fullTitle = title
    ? `${title}${titleSuffix}`
    : "Place of Beauty — Salon Kosmetyczny Grodzisk Mazowiecki";
  const url = `${SITE_URL}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content="Place of Beauty" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

      {blocks.map((block, i) => (
        <script type="application/ld+json" key={`ld-${i}`}>
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
