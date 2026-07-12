import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../components/ThemeContext';

import BrandsOverlay from './landing/BrandsOverlay';
import LaunchBanner from './landing/LaunchBanner';
import Hero from './landing/Hero';
import Features from './landing/Features';
import Integrations from './landing/Integrations';
import IconShowcase from './landing/IconShowcase';
import Playground from './landing/Playground';
import CTA from './landing/CTA';

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  const heroCardRef = useRef<HTMLDivElement>(null);
  const fixedNavRef = useRef<HTMLElement>(null);
  const [stars, setStars] = useState<number | null>(null);

  // Fetch GitHub stars
  useEffect(() => {
    fetch('https://api.github.com/repos/dqev/reicon')
      .then((r) => r.json())
      .then((d) => { if (d.stargazers_count) setStars(d.stargazers_count); })
      .catch(() => { });
  }, []);

  // Hero card parallax + sticky nav reveal
  useEffect(() => {
    const card = heroCardRef.current;
    const nav = fixedNavRef.current;
    if (!card || !nav) return;
    const tick = () => {
      const p = Math.min(window.scrollY / (window.innerHeight * 0.55), 1);
      card.style.transform = `scale(${1 - p * 0.11})`;
      card.style.opacity = String(1 - p * 0.13);
      nav.classList.toggle('nav-visible', window.scrollY > window.innerHeight * 0.65);
    };
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  // Scroll-reveal for sections
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-bg-base min-h-screen">
      <Helmet>
        <title>Reicon — Free Open-Source Icon Library for Designers & Developers</title>
        <meta name="description" content="Reicon is a free, open-source icon library with 2,700+ handcrafted, pixel-perfect SVG icons. Available for React, React Native, Vue, Svelte, Figma, VS Code, and the web. MIT licensed." />
        <link rel="canonical" href="https://reicon.dev/" />
        <meta name="keywords" content="free icon library, open source icons, SVG icons, React icons, React Native icons, Vue icons, Svelte icons, Figma icons, VS Code icons, web icons, pixel perfect icons, reicon" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Reicon — Free Open-Source Icon Library" />
        <meta property="og:description" content="Free, open-source SVG icon library with 2,700+ handcrafted icons for React, React Native, Vue, Svelte, Figma, VS Code, and the web." />
        <meta property="og:image" content="https://reicon.dev/og-image.png?v=4" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Reicon — Free Open-Source Icon Library" />
        <meta name="twitter:description" content="Free, open-source SVG icon library with 2,700+ handcrafted icons for React, React Native, Vue, Svelte, Figma, VS Code, and the web." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png?v=4" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="ai-content-declaration" content="human-curated" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "name": "Reicon Icon Library",
          "description": "A free, open-source SVG icon library with 2,700+ handcrafted, pixel-perfect icons in two weights (Outline and Filled).",
          "url": "https://reicon.dev",
          "license": "https://opensource.org/licenses/MIT",
          "creator": { "@type": "Person", "name": "Dev Chauhan", "url": "https://devchauhan.in" },
          "keywords": ["SVG icons", "React icons", "React Native icons", "Vue icons", "Svelte icons", "Figma icons", "open source", "MIT"],
          "isAccessibleForFree": true,
          "distribution": [
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon", "name": "reicon (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-react", "name": "reicon-react (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-react-native", "name": "reicon-react-native (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-vue", "name": "reicon-vue (npm)" },
            { "@type": "DataDownload", "encodingFormat": "application/zip", "contentUrl": "https://www.npmjs.com/package/reicon-svelte", "name": "reicon-svelte (npm)" },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to install and use Reicon icons",
          "description": "Install Reicon icons in a React, React Native, Vue, Svelte, or vanilla HTML project.",
          "totalTime": "PT2M",
          "step": [
            { "@type": "HowToStep", "name": "Install the package", "text": "Run 'npm install reicon-react' for React, 'npm install reicon-react-native' for React Native, 'npm install reicon-vue' for Vue 3, or 'npm install reicon-svelte' for Svelte.", "url": "https://reicon.dev/usage" },
            { "@type": "HowToStep", "name": "Import the icon", "text": "Import by name: import { Home } from 'reicon-react';", "url": "https://reicon.dev/usage" },
            { "@type": "HowToStep", "name": "Render with props", "text": "Render: <Home size={24} weight=\"Outline\" color=\"currentColor\" />", "url": "https://reicon.dev/usage" },
          ],
        })}</script>
      </Helmet>

      <Header
        ref={fixedNavRef}
        className="opacity-0 pointer-events-none transition-opacity duration-300 z-[200]"
      />

      <BrandsOverlay />

      <LaunchBanner />

      <Hero
        theme={theme}
        toggleTheme={toggleTheme}
        heroCardRef={heroCardRef}
        stars={stars}
      />

      <Features />

      <Playground theme={theme} />

      <Integrations />

      <IconShowcase theme={theme} />

      <CTA />

      <div className="h-5 md:h-12" />
      <Footer />
    </div>
  );
}
