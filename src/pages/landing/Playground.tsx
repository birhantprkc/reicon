import { useState, useEffect, useMemo } from 'react';
import { Copy, Restart } from 'reicon-react';
import { HexColorPicker } from 'react-colorful';
import iconNamesData from '../../../scripts/icon-names.json';

const ALL_ICON_NAMES = Object.keys(iconNamesData);
const CONSISTENCY_COUNT = 80;
const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function getShuffledIcons() {
    const shuffled = [...ALL_ICON_NAMES];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, CONSISTENCY_COUNT);
}

function ColorPicker({ color, onChange, theme }: { color: string; onChange: (c: string) => void; theme: string }) {
    const isLight = theme === 'light';
    const presets = isLight
        ? ['#111111', '#6C5CE7', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#06b6d4']
        : ['#ffffff', '#6C5CE7', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#06b6d4'];
    const safeColor = HEX_RE.test(color) ? color : (isLight ? '#111111' : '#ffffff');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <label className="text-[13px] text-text-base/50 mb-2 block">Color</label>
            <div className="grid grid-cols-8 gap-1.5 mb-2">
                {presets.map((c) => (
                    <button
                        key={c}
                        onClick={() => onChange(c)}
                        aria-label={`Set color ${c}`}
                        title={c}
                        className={`w-full aspect-square rounded-md transition-transform hover:scale-110 cursor-pointer ${color.toLowerCase() === c.toLowerCase()
                            ? 'ring-2 ring-text-base/70 ring-offset-2 ring-offset-bg-base'
                            : 'border border-text-base/15'
                            }`}
                        style={{ backgroundColor: c }}
                    />
                ))}
            </div>
            <div className="flex items-center gap-1.5 relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Pick a custom color"
                    className="w-9 h-9 shrink-0 rounded-lg border border-text-base/10 cursor-pointer bg-transparent flex items-center justify-center hover:bg-text-base/5"
                >
                    <span className="w-5 h-5 rounded-md border border-text-base/20 shadow-sm" style={{ backgroundColor: safeColor }} />
                </button>
                <input
                    type="text"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    spellCheck={false}
                    className="flex-1 min-w-0 bg-text-base/5 border border-text-base/10 rounded-lg px-3 py-2 text-[13px] text-text-base/70 font-mono outline-none focus:border-text-base/20 uppercase"
                />
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <div className="absolute left-0 bottom-full mb-2 z-50 bg-[var(--dropdown-bg)] border border-text-base/8 rounded-xl p-3.5 shadow-lg flex flex-col gap-2.5 min-w-[200px]">
                            <HexColorPicker color={safeColor} onChange={onChange} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function Playground({ theme }: { theme: string }) {
    const initialShuffled = useMemo(() => getShuffledIcons(), []);
    const [icons, setIcons] = useState<string[]>(initialShuffled);
    const [selected, setSelected] = useState(() => initialShuffled[0] || 'home');
    const isLight = theme === 'light';
    const [color, setColor] = useState(isLight ? '#111111' : '#ffffff');
    const [size, setSize] = useState(32);
    const [weight, setWeight] = useState<'outline' | 'filled'>('outline');

    useEffect(() => {
        if (color === '#ffffff' && theme === 'light') setColor('#111111');
        else if (color === '#111111' && theme === 'dark') setColor('#ffffff');
    }, [theme, color]);

    useEffect(() => {
        let active = true;
        function filterIcons() {
            if (!active) return;
            if (typeof window !== 'undefined' && (window as any).Reicon?.icons) {
                const available = (window as any).Reicon.icons as string[];
                const availableSet = new Set(available);
                const filtered = initialShuffled.filter((n) => availableSet.has(n));
                if (filtered.length < CONSISTENCY_COUNT && available.length > 0) {
                    const remaining = available.filter((n) => !filtered.includes(n));
                    const shuffled = [...remaining];
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }
                    filtered.push(...shuffled.slice(0, CONSISTENCY_COUNT - filtered.length));
                }
                const finalIcons = filtered.slice(0, CONSISTENCY_COUNT);
                setIcons(finalIcons);
                if (!availableSet.has(selected) && finalIcons.length > 0) setSelected(finalIcons[0]);
            } else if (typeof window !== 'undefined') {
                setTimeout(filterIcons, 50);
            }
        }
        filterIcons();
        return () => { active = false; };
    }, [initialShuffled, selected]);

    const displayColor = HEX_RE.test(color) ? color : (isLight ? '#111111' : '#ffffff');
    const pascalName = (iconNamesData as Record<string, string>)[selected] || selected;
    const reset = () => { setColor(isLight ? '#111111' : '#ffffff'); setSize(32); setWeight('outline'); };

    return (
        <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
            <div className="text-center mb-10">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Playground</div>
                <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">Pick one. Make it yours.</h2>
                <p className="text-[15px] text-text-base/45 leading-[1.65] max-w-[490px] mx-auto">
                    Same grid, same rhythm across every icon. Choose one, then tweak color, size, and weight.
                </p>
            </div>

            <div className="bg-text-base/3 rounded-[14px] overflow-hidden">
                <div className="grid lg:grid-cols-[300px_1fr]">
                    {/* Left — preview + controls */}
                    <div className="p-5 lg:p-6 lg:border-r border-b lg:border-b-0 border-text-base/6 flex flex-col">
                        {/* Preview canvas */}
                        <div className="relative w-full aspect-square max-w-[220px] mx-auto bg-text-base/2 border border-text-base/6 rounded-xl flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none" style={{
                                backgroundImage: 'linear-gradient(to right, var(--border-muted) 1px, transparent 1px), linear-gradient(to bottom, var(--border-muted) 1px, transparent 1px)',
                                backgroundSize: 'calc(100%/12) calc(100%/12)',
                                maskImage: 'radial-gradient(circle at center, #000 62%, transparent 92%)',
                                WebkitMaskImage: 'radial-gradient(circle at center, #000 62%, transparent 92%)',
                            }} />
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(108,92,231,0.12), transparent 58%)' }} />
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" fill="none">
                                <rect x="9" y="9" width="82" height="82" rx="7" stroke="var(--border-base)" strokeWidth="0.5" strokeDasharray="2.5 2.5" />
                                <rect x="32" y="14" width="36" height="72" rx="7" stroke="#6C5CE7" strokeOpacity="0.16" strokeWidth="0.5" />
                                <rect x="14" y="32" width="72" height="36" rx="7" stroke="#6C5CE7" strokeOpacity="0.16" strokeWidth="0.5" />
                                <line x1="50" y1="5" x2="50" y2="95" stroke="#6C5CE7" strokeOpacity="0.28" strokeWidth="0.4" />
                                <line x1="5" y1="50" x2="95" y2="50" stroke="#6C5CE7" strokeOpacity="0.28" strokeWidth="0.4" />
                            </svg>
                            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#6C5CE7]/35" />
                            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#6C5CE7]/35" />
                            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#6C5CE7]/35" />
                            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#6C5CE7]/35" />
                            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[7.5px] font-mono text-[#6C5CE7]/45 select-none tracking-wider">24<span className="text-text-base/20"> × </span>24</span>
                            <span className="absolute bottom-2 right-3 text-[8px] font-mono text-text-base/30 tabular-nums select-none">{size}px</span>
                            <span className="absolute bottom-2 left-3 text-[8px] font-mono text-text-base/25 select-none lowercase">{weight}</span>
                            <re-icon icon={selected} size={96} weight={weight} color={displayColor} />
                        </div>

                        <div className="w-full mt-5 flex items-center justify-between">
                            <span className="text-[14px] text-text-base font-semibold">{pascalName}</span>
                            <span className="text-[11px] text-text-base/30 bg-text-base/4 border border-text-base/6 rounded px-2 py-0.5 font-mono">{selected}</span>
                        </div>

                        <div className="w-full mt-6 pt-5 border-t border-text-base/6 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] uppercase tracking-[0.08em] text-text-base/30 font-semibold">Controls</span>
                                <button onClick={reset} className="w-7 h-7 flex items-center justify-center rounded-md text-text-base/30 hover:text-text-base/60 hover:bg-text-base/5 transition-colors cursor-pointer" title="Reset" aria-label="Reset controls">
                                    <Restart size={16} />
                                </button>
                            </div>

                            <ColorPicker color={color} onChange={setColor} theme={theme} />

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-[13px] text-text-base/50">Size</label>
                                    <span className="text-[13px] text-text-base/30 font-mono">{size}px</span>
                                </div>
                                <input type="range" min={16} max={48} value={size} onChange={(e) => setSize(Number(e.target.value))}
                                    className="w-full h-1.5 rounded-full appearance-none bg-text-base/10 accent-[#6C5CE7] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6C5CE7] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(108,92,231,0.5)]"
                                />
                            </div>

                            <div>
                                <label className="text-[13px] text-text-base/50 mb-2 block">Weight</label>
                                <div className="flex gap-2">
                                    {(['outline', 'filled'] as const).map((w) => (
                                        <button key={w} onClick={() => setWeight(w)}
                                            className={`flex-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${weight === w
                                                ? 'bg-[#6C5CE7]/15 text-[#6C5CE7] border border-[#6C5CE7]/30'
                                                : 'bg-text-base/5 text-text-base/40 border border-text-base/10 hover:text-text-base/60'
                                                }`}
                                        >
                                            {w.charAt(0).toUpperCase() + w.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right — icon grid */}
                    <div className="p-3 sm:p-4">
                        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 border-l border-t border-text-base/4">
                            {icons.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => setSelected(name)}
                                    title={(iconNamesData as Record<string, string>)[name] || name}
                                    className={`aspect-square flex items-center justify-center border-r border-b transition-colors cursor-pointer ${name === selected
                                        ? 'bg-[#6C5CE7]/10 border-[#6C5CE7]/25'
                                        : 'border-text-base/4 hover:bg-text-base/3'
                                        }`}
                                >
                                    <re-icon icon={name} size={size} weight={weight} color={displayColor} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
