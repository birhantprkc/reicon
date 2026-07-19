import { Helmet } from 'react-helmet-async';

export default function DocsHelmet() {
  return (
    <Helmet>
      <title>Docs — Reicon</title>
      <meta name="description" content="Get started with Reicon. Install and use icons in React, Vue, Svelte, Flutter, Figma, VS Code, MCP, and more." />
      <link rel="canonical" href="https://reicon.dev/docs" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://reicon.dev/docs" />
      <meta property="og:site_name" content="Reicon" />
      <meta property="og:title" content="Docs — Reicon" />
      <meta property="og:description" content="Get started with Reicon. Install and use icons in React, Vue, Svelte, Flutter, Figma, VS Code, MCP, and more." />
      <meta property="og:image" content="https://reicon.dev/og/docs.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@reicon_dev" />
      <meta name="twitter:title" content="Docs — Reicon" />
      <meta name="twitter:description" content="Get started with Reicon. Install and use icons in React, Vue, Svelte, Flutter, Figma, VS Code, MCP, and more." />
      <meta name="twitter:image" content="https://reicon.dev/og/docs.jpg" />
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
