import { Helmet } from 'react-helmet-async';

export default function DocsHelmet() {
  return (
    <Helmet>
      <title>Docs & Documentation — Reicon Icons</title>
      <meta name="description" content="Integrate Reicon icons into your project. Complete documentation for Vanilla JS, React, React Native, Vue, Svelte, Figma, VS Code, MCP Server, and direct SVG integration." />
      <link rel="canonical" href="https://reicon.dev/docs" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://reicon.dev/docs" />
      <meta property="og:site_name" content="Reicon" />
      <meta property="og:title" content="Docs & Documentation — Reicon" />
      <meta property="og:description" content="Integrate Reicon icons into your project. Complete documentation for Vanilla JS, React, React Native, Vue, Svelte, Figma, VS Code, MCP Server, and direct SVG integration." />
      <meta property="og:image" content="https://reicon.dev/og-image.png?v=4" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@reicon_dev" />
      <meta name="twitter:title" content="Docs & Documentation — Reicon" />
      <meta name="twitter:description" content="Integrate Reicon icons into your project. Complete documentation for React, React Native, Vue, Svelte, MCP Server, and more." />
      <meta name="twitter:image" content="https://reicon.dev/og-image.png?v=4" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Reicon", "item": "https://reicon.dev" },
          { "@type": "ListItem", "position": 2, "name": "Docs", "item": "https://reicon.dev/docs" },
        ],
      })}</script>
    </Helmet>
  );
}
