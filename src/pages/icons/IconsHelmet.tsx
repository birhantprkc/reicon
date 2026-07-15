import { Helmet } from 'react-helmet-async';

export default function IconsHelmet() {
  return (
    <Helmet>
      <title>Browse 2,700+ Free SVG Icons — Reicon Icon Library</title>
      <meta name="description" content="Browse and search 2,700+ free, open-source SVG icons. Copy React, Vue, Svelte, Figma, or VS Code code instantly. Filter by category, weight, and size." />
      <link rel="canonical" href="https://reicon.dev/icons" />
      <meta name="keywords" content="browse icons, search icons, SVG icons, free icons, icon library, outline icons, filled icons, Vue icons, React icons, Svelte icons, Figma icons, VS Code icons, reicon" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://reicon.dev/icons" />
      <meta property="og:site_name" content="Reicon" />
      <meta property="og:title" content="Browse 2,700+ Free Icons — Reicon" />
      <meta property="og:description" content="Browse and search 2,700+ free, open-source SVG icons. Copy React, Vue, Svelte, Figma, or VS Code code instantly." />
      <meta property="og:image" content="https://reicon.dev/og-image.png?v=4" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@reicon_dev" />
      <meta name="twitter:title" content="Browse 2,700+ Free Icons — Reicon" />
      <meta name="twitter:description" content="Browse and search 2,700+ free, open-source SVG icons. Copy React, Vue, Svelte, Figma, or VS Code code instantly." />
      <meta name="twitter:image" content="https://reicon.dev/og-image.png?v=4" />
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
