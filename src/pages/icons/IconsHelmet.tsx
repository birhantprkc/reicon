import { Helmet } from 'react-helmet-async';

export default function IconsHelmet() {
  return (
    <Helmet>
      <title>Icons — Reicon</title>
      <meta name="description" content="Browse 2,700+ free, open-source SVG icons. Filter by category, copy code for React, Vue, Svelte, and HTML." />
      <link rel="canonical" href="https://reicon.dev/icons" />
      <meta name="keywords" content="free icons, SVG icons, icon library, browse icons, outline icons, filled icons, reicon" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://reicon.dev/icons" />
      <meta property="og:site_name" content="Reicon" />
      <meta property="og:title" content="Icons — Reicon" />
      <meta property="og:description" content="Browse 2,700+ free, open-source SVG icons. Filter by category, copy code for React, Vue, Svelte, and HTML." />
      <meta property="og:image" content="https://reicon.dev/og/icons.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@reicon_dev" />
      <meta name="twitter:title" content="Icons — Reicon" />
      <meta name="twitter:description" content="Browse 2,700+ free, open-source SVG icons. Filter by category, copy code for React, Vue, Svelte, and HTML." />
      <meta name="twitter:image" content="https://reicon.dev/og/icons.jpg" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
          { "@type": "ListItem", "position": 2, "name": "Icons", "item": "https://reicon.dev/icons" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Reicon Icon Library",
        "description": "Browse and search 2700+ free, open-source SVG icons.",
        "url": "https://reicon.dev/icons",
        "isPartOf": { "@type": "WebSite", "name": "Reicon", "url": "https://reicon.dev" }
      })}</script>
    </Helmet>
  );
}
