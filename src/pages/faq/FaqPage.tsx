import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import EditOnGitHub from '../../components/docs/EditOnGitHub';
import { docsSidebarStyles } from '../../components/docs/sidebar/styles';
import DocsRightSidebar from '../../components/docs/sidebar/Right';
import FaqHelmet from './FaqHelmet';
import FaqCategory from './FaqCategory';

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

const FAQ_CATEGORIES = [
  {
    id: 'general',
    title: 'General',
    icon: 'compass',
    items: [
      {
        id: 'what-is-reicon',
        question: 'What is Reicon?',
        answer: (
          <p>
            Reicon is an open-source vector icon library designed for digital interfaces. It includes 2,700+ handcrafted, pixel-perfect SVG icons in Outline and Filled weights. Official packages are available for React (<Code>reicon-react</Code>), React Native (<Code>reicon-react-native</Code>), Vue 3 (<Code>reicon-vue</Code>), Svelte (<Code>reicon-svelte</Code>), and vanilla JavaScript, plus a CDN script for HTML pages.
          </p>
        ),
      },
      {
        id: 'is-it-free',
        question: 'Is Reicon completely free?',
        answer: (
          <p>
            Yes, Reicon is 100% free and open-source under the{' '}
            <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:underline">MIT License</a>. Use it in personal, commercial, education, or open-source projects — no attribution required (though always appreciated!).
          </p>
        ),
      },
      {
        id: 'commercial-use',
        question: 'Can I use it in commercial projects?',
        answer: (
          <p>
            Absolutely. Commercial use is fully allowed. Bundle Reicon into templates, websites, SaaS products, or mobile apps — even ones you charge for.
          </p>
        ),
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technical',
    icon: 'code',
    items: [
      {
        id: 'grid-size',
        question: 'What grid size is used?',
        answer: (
          <p>
            Every icon is drawn on a strict <strong>24×24 pixel grid</strong> with predefined baseline strokes. This guarantees the icons stay pixel-perfect and sharp at any size, from 12px to large header formats.
          </p>
        ),
      },
      {
        id: 'icon-weights',
        question: 'How are weights handled?',
        answer: (
          <>
            <p>Reicon does not auto-generate weights. Each is handcrafted:</p>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li><strong>Outline:</strong> Clean stroked paths (default 1.5px). Customizable via the <Code>strokeWidth</Code> prop.</li>
              <li><strong>Filled:</strong> Custom solid silhouettes designed to match their outline counterparts for smooth state transitions (e.g. active nav tabs).</li>
            </ul>
          </>
        ),
      },
      {
        id: 'tree-shaking',
        question: 'Does it support tree-shaking?',
        answer: (
          <p>
            Yes! All packages — <Code>reicon-react</Code>, <Code>reicon-react-native</Code>, <Code>reicon-vue</Code>, and <Code>reicon-svelte</Code> — are bundled as ES modules and declare <Code>"sideEffects": false</Code>. Modern bundlers (Vite, Webpack, Rollup, Metro) automatically include only the icons you actually import.
          </p>
        ),
      },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    icon: 'palette',
    items: [
      {
        id: 'figma-library',
        question: 'Is there a Figma library?',
        answer: (
          <p>
            Yes! A community Figma file with all vector master components is maintained. Search for "Reicon" in the Figma Community to duplicate the official file and design with the same visual assets.
          </p>
        ),
      },
      {
        id: 'request-icon',
        question: 'How do I request a new icon?',
        answer: (
          <p>
            Open an Issue on our{' '}
            <a href="https://github.com/dqev/reicon/issues" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:underline">GitHub Issues tracker</a>{' '}
            using the "Icon Request" template. We review requests weekly and design new sets based on popularity.
          </p>
        ),
      },
      {
        id: 'contributing',
        question: 'How do I contribute?',
        answer: (
          <p>
            We love contributions! You can help with code, type definitions, package updates, or new SVG icons. Read our contributing guide in the GitHub repository, fork the codebase, and open a Pull Request.
          </p>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  const [activeSection, setActiveSection] = useState('what-is-reicon');
  const [otpIndicatorStyle, setOtpIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
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

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_CATEGORIES;
    const q = searchQuery.toLowerCase();
    return FAQ_CATEGORIES
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) => item.question.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

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
    <motion.div
      className="flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <FaqHelmet />

      <div className="flex flex-1 pt-14">
        <style>{docsSidebarStyles}</style>

        {/* Left sidebar */}
        <aside id="docs-sidebar" className="hidden lg:block" data-lenis-prevent>
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
            <p className="text-text-base/50 text-[15px] leading-[1.8] mb-8">
              Everything you need to know about Reicon. If your question isn't answered here, open a discussion on{' '}
              <a href="https://github.com/dqev/reicon" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:underline">GitHub</a> or contact us directly.
            </p>

            <div className="relative mb-10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-base/30"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2.5 bg-text-base/4 border border-text-base/10 rounded-lg text-[14px] text-text-base placeholder:text-text-base/25 outline-none focus:border-text-base/25 transition-colors"
              />
            </div>

            {filteredCategories.map((category) => (
              <FaqCategory
                key={category.id}
                title={category.title}
                icon={category.icon}
                items={category.items}
                openItems={openItems}
                onToggle={toggleItem}
              />
            ))}

            <EditOnGitHub filePath="src/pages/faq/FaqPage.tsx" />
          </div>
        </main>

        {/* Right sidebar */}
        <DocsRightSidebar
          onThisPage={ON_THIS_PAGE}
          activeSection={activeSection}
          otpIndicatorStyle={otpIndicatorStyle}
          otpListRef={otpListRef}
          onNavClick={scrollTo}
        />
      </div>

    </motion.div>
  );
}
