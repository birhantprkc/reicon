import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditOnGitHub from '../components/usage/EditOnGitHub';
import { usageSidebarStyles } from '../components/usage/sidebar/styles';
import UsageRightSidebar from '../components/usage/sidebar/Right';

const NAV_ITEMS = {
  general: [
    { id: 'what-is-reicon', label: 'What is Reicon?' },
    { id: 'is-it-free', label: 'Is it completely free?' },
    { id: 'commercial-use', label: 'Can I use it commercially?' },
  ],
  technical: [
    { id: 'grid-size', label: 'What grid size is used?' },
    { id: 'icon-weights', label: 'How are weights handled?' },
    { id: 'tree-shaking', label: 'Does it support tree-shaking?' },
  ],
  design: [
    { id: 'figma-library', label: 'Is there a Figma library?' },
    { id: 'request-icon', label: 'How do I request an icon?' },
    { id: 'contributing', label: 'How do I contribute?' },
  ],
};

const ON_THIS_PAGE = [
  { id: 'what-is-reicon', label: 'What is Reicon?' },
  { id: 'is-it-free', label: 'Is it completely free?' },
  { id: 'commercial-use', label: 'Can I use it commercially?' },
  { id: 'grid-size', label: 'What grid size is used?' },
  { id: 'icon-weights', label: 'How are weights handled?' },
  { id: 'tree-shaking', label: 'Does it support tree-shaking?' },
  { id: 'figma-library', label: 'Is there a Figma library?' },
  { id: 'request-icon', label: 'How do I request an icon?' },
  { id: 'contributing', label: 'How do I contribute?' },
];

function Code({ children }: { children: string }) {
  return (
    <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">
      {children}
    </code>
  );
}

export default function FaqPage() {
  const [activeSection, setActiveSection] = useState('what-is-reicon');
  const [otpIndicatorStyle, setOtpIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const contentRef = useRef<HTMLDivElement>(null);
  const otpListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActiveSection(e.target.id); } },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );
    contentRef.current?.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!otpListRef.current) return;
    const activeEl = otpListRef.current.querySelector('.otp-item.active') as HTMLElement;
    if (activeEl) {
      setOtpIndicatorStyle({ top: activeEl.offsetTop + (activeEl.offsetHeight - 16) / 2, height: 16, opacity: 1 });
    } else {
      setOtpIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderNavItem = (item: { id: string; label: string }) => {
    const isActive = activeSection === item.id;
    return (
      <div key={item.id} onClick={() => scrollTo(item.id)} className={`sidebar-item ${isActive ? 'active' : ''}`}>
        <div className="sidebar-item-line" />
        {isActive ? <div className="sidebar-item-active-bar" /> : <div className="sidebar-item-hover-bar" />}
        <span className="sidebar-item-text">{item.label}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Helmet>
        <title>Frequently Asked Questions — Reicon | Free Open-Source Icons</title>
        <meta name="description" content="Frequently asked questions about Reicon icon library. License, Figma integration, VS Code extension, React, React Native, Vue, Svelte support, and contribution guidelines." />
        <link rel="canonical" href="https://reicon.dev/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reicon.dev/faq" />
        <meta property="og:site_name" content="Reicon" />
        <meta property="og:title" content="Frequently Asked Questions — Reicon" />
        <meta property="og:description" content="Frequently asked questions about Reicon icon library. License, Figma integration, VS Code extension, React, React Native, Vue, Svelte support, and contribution guidelines." />
        <meta property="og:image" content="https://reicon.dev/og-image.png?v=4" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reicon_dev" />
        <meta name="twitter:title" content="Frequently Asked Questions — Reicon" />
        <meta name="twitter:description" content="Frequently asked questions about Reicon icon library. License, Figma integration, React, React Native, Vue, Svelte support, and contribution guidelines." />
        <meta name="twitter:image" content="https://reicon.dev/og-image.png?v=4" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Reicon', 'item': 'https://reicon.dev' },
            { '@type': 'ListItem', 'position': 2, 'name': 'FAQ', 'item': 'https://reicon.dev/faq' },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'What is Reicon?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Reicon is a free, open-source icon library built with obsessive precision. Every icon is pixel-perfect and handcrafted — no auto-generation.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Is Reicon free to use?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, Reicon is completely free and open-source under the MIT license. You can use it in personal and commercial projects.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Does Reicon work with React, Vue, Svelte, and Figma?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, Reicon icons are available as SVGs with first-class support for React, React Native, Vue, Svelte, Figma, and other popular design and development tools. Install via npm with reicon-react, reicon-react-native, reicon-vue, or reicon-svelte.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How many icons does Reicon have?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Reicon has over 2,700 handcrafted SVG icons, each available in two weights: Outline and Filled. New icons are added regularly.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How do I install Reicon?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Install via npm with \'npm install reicon\' for JavaScript projects, \'npm install reicon-react\' for React, \'npm install reicon-react-native\' for React Native, or use the CDN script tag. Visit reicon.dev/usage for full installation instructions.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Is Reicon the same as ReIcon by Sordum?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'No. Reicon (reicon.dev) is a free, open-source SVG icon library for designers and developers. ReIcon by Sordum.org is a completely different product — a Windows utility for restoring desktop icon layouts. They are unrelated.'
              }
            }
          ]
        })}</script>
      </Helmet>

      <Header />

      <div className="flex flex-1 pt-14">
        <style>{usageSidebarStyles}</style>

        {/* Left sidebar */}
        <aside id="usage-sidebar" className="hidden lg:block" data-lenis-prevent>
          <div>
            <div className="sidebar-separator">
              <re-icon icon="compass" size="12" />
              <span>General</span>
            </div>
            <div>{NAV_ITEMS.general.map(renderNavItem)}</div>
          </div>
          <div className="mt-4">
            <div className="sidebar-separator">
              <re-icon icon="code" size="12" />
              <span>Technical</span>
            </div>
            <div>{NAV_ITEMS.technical.map(renderNavItem)}</div>
          </div>
          <div className="mt-4">
            <div className="sidebar-separator">
              <re-icon icon="palette" size="12" />
              <span>Design</span>
            </div>
            <div>{NAV_ITEMS.design.map(renderNavItem)}</div>
          </div>
        </aside>

        {/* Main content */}
        <main ref={contentRef} className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 xl:px-16 pt-14 lg:pt-8 pb-16 overflow-x-hidden">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-serif text-text-base mb-6">Frequently Asked Questions</h1>
            <p className="text-text-base/50 text-[15px] leading-[1.8] mb-12">
              Everything you need to know about Reicon. If your question isn't answered here, open a discussion on{' '}
              <a href="https://github.com/dqev/reicon" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:underline">GitHub</a> or contact us directly.
            </p>

            <hr className="border-text-base/6 mb-12" />

            {/* ── General ── */}
            <section id="what-is-reicon" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-text-base mb-4">What is Reicon?</h2>
              <p className="text-text-base/60 text-[15px] leading-[1.8]">
                Reicon is an open-source vector icon library designed for digital interfaces. It includes 2,700+ handcrafted, pixel-perfect SVG icons in Outline and Filled weights. Official packages are available for React (<Code>reicon-react</Code>), React Native (<Code>reicon-react-native</Code>), Vue 3 (<Code>reicon-vue</Code>), Svelte (<Code>reicon-svelte</Code>), and vanilla JavaScript, plus a CDN script for HTML pages.
              </p>
            </section>

            <hr className="border-text-base/6 mb-12" />

            <section id="is-it-free" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-text-base mb-4">Is Reicon completely free?</h2>
              <p className="text-text-base/60 text-[15px] leading-[1.8]">
                Yes, Reicon is 100% free and open-source under the{' '}
                <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:underline">MIT License</a>. Use it in personal, commercial, education, or open-source projects — no attribution required (though always appreciated!).
              </p>
            </section>

            <hr className="border-text-base/6 mb-12" />

            <section id="commercial-use" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-text-base mb-4">Can I use it in commercial projects?</h2>
              <p className="text-text-base/60 text-[15px] leading-[1.8]">
                Absolutely. Commercial use is fully allowed. Bundle Reicon into templates, websites, SaaS products, or mobile apps — even ones you charge for.
              </p>
            </section>

            <hr className="border-text-base/6 mb-12" />

            {/* ── Technical ── */}
            <section id="grid-size" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-text-base mb-4">What grid size is used?</h2>
              <p className="text-text-base/60 text-[15px] leading-[1.8]">
                Every icon is drawn on a strict <strong>24×24 pixel grid</strong> with predefined baseline strokes. This guarantees the icons stay pixel-perfect and sharp at any size, from 12px to large header formats.
              </p>
            </section>

            <hr className="border-text-base/6 mb-12" />

            <section id="icon-weights" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-text-base mb-4">How are weights handled?</h2>
              <p className="text-text-base/60 text-[15px] leading-[1.8]">Reicon does not auto-generate weights. Each is handcrafted:</p>
              <ul className="text-text-base/60 text-[15px] leading-[1.8] mt-4 space-y-2 list-disc list-inside">
                <li><strong>Outline:</strong> Clean stroked paths (default 1.5px). Customizable via the <Code>strokeWidth</Code> prop.</li>
                <li><strong>Filled:</strong> Custom solid silhouettes designed to match their outline counterparts for smooth state transitions (e.g. active nav tabs).</li>
              </ul>
            </section>

            <hr className="border-text-base/6 mb-12" />

            <section id="tree-shaking" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-text-base mb-4">Does it support tree-shaking?</h2>
              <p className="text-text-base/60 text-[15px] leading-[1.8]">
                Yes! All packages — <Code>reicon-react</Code>, <Code>reicon-react-native</Code>, <Code>reicon-vue</Code>, and <Code>reicon-svelte</Code> — are bundled as ES modules and declare <Code>"sideEffects": false</Code>. Modern bundlers (Vite, Webpack, Rollup, Metro) automatically include only the icons you actually import.
              </p>
            </section>

            <hr className="border-text-base/6 mb-12" />

            {/* ── Design ── */}
            <section id="figma-library" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-text-base mb-4">Is there a Figma library?</h2>
              <p className="text-text-base/60 text-[15px] leading-[1.8]">
                Yes! A community Figma file with all vector master components is maintained. Search for "Reicon" in the Figma Community to duplicate the official file and design with the same visual assets.
              </p>
            </section>

            <hr className="border-text-base/6 mb-12" />

            <section id="request-icon" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-text-base mb-4">How do I request a new icon?</h2>
              <p className="text-text-base/60 text-[15px] leading-[1.8]">
                Open an Issue on our{' '}
                <a href="https://github.com/dqev/reicon/issues" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:underline">GitHub Issues tracker</a>{' '}
                using the "Icon Request" template. We review requests weekly and design new sets based on popularity.
              </p>
            </section>

            <hr className="border-text-base/6 mb-12" />

            <section id="contributing" data-section className="mb-16 scroll-mt-24">
              <h2 className="text-xl font-serif text-text-base mb-4">How do I contribute?</h2>
              <p className="text-text-base/60 text-[15px] leading-[1.8]">
                We love contributions! You can help with code, type definitions, package updates, or new SVG icons. Read our contributing guide in the GitHub repository, fork the codebase, and open a Pull Request.
              </p>
            </section>

            <EditOnGitHub filePath="src/pages/Faq.tsx" />
          </div>
        </main>

        {/* Right sidebar */}
        <UsageRightSidebar
          onThisPage={ON_THIS_PAGE}
          activeSection={activeSection}
          otpIndicatorStyle={otpIndicatorStyle}
          otpListRef={otpListRef}
          onNavClick={scrollTo}
        />
      </div>

      <Footer />
    </div>
  );
}
