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
      <div className="relative w-full max-w-[520px] bg-bg-base border border-text-base/10 rounded-[20px] overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 transition-colors text-white/80 hover:text-white cursor-pointer"
        >
          <re-icon icon="x" size="14" color="currentColor" />
        </button>

        {/* Hero image */}
        <div className="relative aspect-[1200/500] bg-gradient-to-br from-[#6C5CE7]/30 to-[#6C5CE7]/5 overflow-hidden">
          <img
            src="/new-launch.png"
            alt="brands.reicon.dev"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/20 to-transparent" />
        </div>

        <div className="relative -mt-1 z-10 p-8 md:p-10 pt-6">
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
