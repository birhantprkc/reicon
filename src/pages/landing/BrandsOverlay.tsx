import { useState } from 'react';
import { ArrowRightUp } from 'reicon-react';

const STORAGE_KEY = 'reicon-brands-overlay-v1';

export default function BrandsOverlay() {
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'dismissed'; }
    catch { return false; }
  });

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try { localStorage.setItem(STORAGE_KEY, 'dismissed'); } catch {}
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg-base/70 backdrop-blur-xl" />

      {/* Card */}
      <div className="relative w-full max-w-[560px] bg-bg-base border border-text-base/10 rounded-[20px] overflow-hidden shadow-2xl">
        {/* Decorative gradient blob */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#6C5CE7]/20 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#6C5CE7]/10 blur-[70px] pointer-events-none" />

        <div className="relative z-10 p-8 md:p-10">
          {/* Close button */}
          <button
            onClick={dismiss}
            aria-label="Close"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-text-base/5 hover:bg-text-base/10 transition-colors text-text-base/40 hover:text-text-base/70 cursor-pointer"
          >
            <re-icon icon="x" size="14" color="currentColor" />
          </button>

          {/* Label */}
          <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-3">
            New Launch
          </div>

          {/* Heading */}
          <h2 className="font-serif text-[clamp(22px,3.2vw,36px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">
            Introducing{' '}
            <span className="text-[#6C5CE7]">brands.reicon.dev</span>
          </h2>

          <p className="text-[14px] text-text-base/45 leading-[1.65] mb-7">
            4,900+ brand logos in three variants — Outline, Filled, and Color. Now available for free under the MIT license.
          </p>

          {/* Stats */}
          <div className="flex gap-6 mb-8 pb-7 border-b border-text-base/8">
            <div>
              <div className="font-serif text-[22px] font-semibold text-text-base leading-[1.2]">4,900+</div>
              <div className="text-[11px] text-text-base/45">Brand logos</div>
            </div>
            <div>
              <div className="font-serif text-[22px] font-semibold text-text-base leading-[1.2]">3</div>
              <div className="text-[11px] text-text-base/45">Variants</div>
            </div>
            <div>
              <div className="font-serif text-[22px] font-semibold text-text-base leading-[1.2]">MIT</div>
              <div className="text-[11px] text-text-base/45">License</div>
            </div>
          </div>

          {/* Brand pills */}
          <div className="flex flex-wrap gap-2 mb-7">
            {['Google', 'Apple', 'Microsoft', 'Meta', 'Amazon', 'Netflix', 'Spotify', 'Figma', 'GitHub', 'Notion'].map((name) => (
              <span key={name} className="text-[11px] font-medium text-text-base/45 bg-text-base/5 px-3 py-1.5 rounded-full">
                {name}
              </span>
            ))}
            <span className="text-[11px] font-medium text-[#6C5CE7] bg-[#6C5CE7]/10 px-3 py-1.5 rounded-full">
              +4,900
            </span>
          </div>

          {/* CTA */}
          <a
            href="https://brands.reicon.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#6C5CE7] text-white text-[14px] font-medium px-6 py-3 rounded-full hover:bg-[#6C5CE7]/90 active:scale-[0.97] transition-all cursor-pointer"
          >
            Browse 4,900+ Brands
            <ArrowRightUp size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
