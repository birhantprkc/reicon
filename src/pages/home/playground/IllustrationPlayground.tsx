import { useState, useEffect, useMemo } from 'react';
import { Restart } from 'reicon-react';
import {
  IllustrationItem,
  loadFeaturedIllustrations,
  getIllustrationUrl,
} from '../../../lib/illustration-data';

const GRID_COUNT = 80;

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'object', label: 'Objects' },
  { id: 'people', label: 'People' },
  { id: 'scene', label: 'Scenes' },
  { id: 'mark', label: 'Marks' },
];

export default function IllustrationPlayground({ theme }: { theme: string }) {
  const isDark = theme === 'dark';
  const [allItems, setAllItems] = useState<IllustrationItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSlug, setSelectedSlug] = useState('3d-printer');
  const [size, setSize] = useState(90);

  // Load featured items (fixed deterministic order)
  useEffect(() => {
    loadFeaturedIllustrations().then((data) => {
      setAllItems(data);
      if (data.length > 0) {
        setSelectedSlug(data[0].slug);
      }
    });
  }, []);

  // Filter items predictably by category
  const displayItems = useMemo(() => {
    if (activeCategory === 'all') return allItems.slice(0, GRID_COUNT);
    return allItems.filter((i) => i.category === activeCategory).slice(0, GRID_COUNT);
  }, [allItems, activeCategory]);

  const selectedItem = useMemo(() => {
    return (
      allItems.find((i) => i.slug === selectedSlug) || {
        slug: selectedSlug,
        title: selectedSlug.replace(/-/g, ' '),
        name: selectedSlug.replace(/-/g, ' '),
        category: 'object',
        subcategory: 'misc',
      }
    );
  }, [allItems, selectedSlug]);

  const previewUrl = getIllustrationUrl(selectedSlug);

  const reset = () => {
    setSize(90);
    setActiveCategory('all');
  };

  return (
    <div className="bg-text-base/3 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden">
      <div className="grid lg:grid-cols-[300px_1fr]">
        {/* Left Column: Preview & Controls */}
        <div className="p-5 lg:p-6 lg:border-r border-b lg:border-b-0 border-text-base/6 flex flex-col gap-4">
          {/* Preview Box */}
          <div className="flex flex-col">
            <div className="relative w-full aspect-square max-w-[220px] mx-auto bg-text-base/2 border border-text-base/8 rounded-2xl flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden z-0"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, var(--border-muted) 1px, transparent 1px), linear-gradient(to bottom, var(--border-muted) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: 'center center',
                }}
              />
              <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-text-base/35 tabular-nums select-none z-10">
                {size}px
              </span>

              {/* Crisp Illustration Image Preview */}
              <div className="flex items-center justify-center p-4 relative z-10">
                <img
                  src={previewUrl}
                  alt={selectedItem.name}
                  style={{ width: size, height: size }}
                  className={`object-contain max-w-full max-h-full transition-all duration-200 ${
                    isDark ? 'invert brightness-150' : ''
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-[15px] font-serif font-semibold text-text-base truncate capitalize">
                {selectedItem.name}
              </span>
              <code className="text-[10px] text-text-base/40 bg-text-base/4 border border-text-base/6 rounded px-1.5 py-0.5 font-mono">
                {selectedItem.slug}
              </code>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4 pt-2 border-t border-text-base/6">
            {/* Category Filter Pills */}
            <div>
              <label className="text-[13px] text-text-base/50 mb-2 block">Category</label>
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer shrink-0 ${
                      activeCategory === cat.id
                        ? 'bg-[#9B8AFB] text-white font-semibold'
                        : 'bg-text-base/4 text-text-base/60 hover:text-text-base'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Slider */}
            <div>
              <div className="flex items-center justify-between text-[13px] text-text-base/50 mb-2">
                <span>Size</span>
                <span className="font-mono text-[12px]">{size}px</span>
              </div>
              <input
                type="range"
                min="60"
                max="180"
                step="10"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-[#9B8AFB] cursor-pointer"
              />
            </div>

            {/* Reset Button */}
            <div className="pt-2 border-t border-text-base/6">
              <button
                type="button"
                onClick={reset}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-text-base/4 hover:bg-text-base/8 text-text-base/60 hover:text-text-base text-[12px] font-medium transition-colors cursor-pointer"
              >
                <Restart size={14} />
                <span>Reset Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Illustrations Grid */}
        <div className="p-3 sm:p-4 flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-[0.08em] text-text-base/30 font-semibold">
                Illustrations ({displayItems.length})
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 border-l border-t border-text-base/4 max-w-full overflow-hidden rounded-xl">
              {displayItems.map((item) => {
                const url = getIllustrationUrl(item.slug);
                const isSelected = item.slug === selectedSlug;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setSelectedSlug(item.slug)}
                    title={item.name}
                    className={`aspect-square flex items-center justify-center p-2 border-r border-b border-text-base/4 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#9B8AFB]/15'
                        : 'hover:bg-text-base/3'
                    }`}
                  >
                    <img
                      src={url}
                      alt={item.name}
                      loading="lazy"
                      className={`w-9 h-9 object-contain opacity-80 hover:opacity-100 transition-all ${
                        isDark ? 'invert brightness-150' : ''
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
