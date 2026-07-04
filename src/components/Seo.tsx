import React from "react";
import { Helmet } from "react-helmet-async";

export interface SeoProps {
  title: string;
  description: string;
  type?: string;
  name?: string;
  url?: string;
  image?: string;
}

export const Seo: React.FC<SeoProps> = ({ title, description, type, name, url, image }) => {
  const fullTitle = `${title} | Soil - Rural Ops Tools`;
  const canonicalUrl = url ? `https://soil.ruralopstools.com${url}` : "https://soil.ruralopstools.com";
  const defaultImage = "https://soil.ruralopstools.com/og-image.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": fullTitle,
    "description": description,
    "url": canonicalUrl
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="soil test interpretation, fertilizer recommendation, nutrient removal, cost per nutrient, lime requirement, rural ops tools, farming" />
      <meta name="author" content="Rural Ops Tools" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Facebook & Open Graph tags */}
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={name || "@ruralopstools"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};
