const ORBIT_INNER = ['home', 'star', 'heart', 'search', 'settings', 'bell'];
const ORBIT_MIDDLE = ['camera', 'cloud', 'lightning', 'palette', 'code', 'eye', 'bookmark', 'gift'];
const ORBIT_OUTER = ['compass', 'mic', 'wifi', 'pen', 'folder', 'lamp', 'clock', 'calendar', 'flag', 'rocket'];

function OrbitRing({ icons, className, counterClassName, size }: {
    icons: string[];
    className: string;
    counterClassName: string;
    size: string;
}) {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative ${size} aspect-square ${className}`}>
                {icons.map((name, i) => {
                    const rad = ((360 / icons.length) * i * Math.PI) / 180;
                    const x = 50 + 50 * Math.cos(rad);
                    const y = 50 + 50 * Math.sin(rad);
                    return (
                        <div key={name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: `${y}%`, left: `${x}%` }}>
                            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl bg-text-base/4 border border-text-base/6 flex items-center justify-center ${counterClassName}`}>
                                <re-icon icon={name} size={18} color="currentColor" className="text-text-base/50" weight="outline" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function IconShowcase({ theme }: { theme: string }) {
    return (
        <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13 overflow-hidden">
            <div className="text-center mb-10 px-5">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Icon Library</div>
                <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">2700+ icons. Every one handcrafted.</h2>
                <p className="text-[15px] text-text-base/45 leading-[1.65] max-w-[490px] mx-auto">
                    From UI essentials to expressive details — find exactly what you need.
                </p>
            </div>

            <div className="relative w-full aspect-square max-w-[520px] mx-auto [mask-image:radial-gradient(circle,black_40%,transparent_72%)]">
                {/* Center logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        <img src={theme === 'dark' ? '/icon-light.webp' : '/icon-dark.webp'} alt="Reicon" className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                </div>

                {/* Ring guides */}
                {['38%', '62%', '88%'].map((w, i) => (
                    <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="aspect-square rounded-full border border-[#6C5CE7]/[0.12]" style={{ width: w, opacity: 1 - i * 0.03 }} />
                    </div>
                ))}

                <OrbitRing icons={ORBIT_INNER} size="w-[38%]" className="animate-orbit-slow" counterClassName="animate-orbit-counter-slow" />
                <OrbitRing icons={ORBIT_MIDDLE} size="w-[62%]" className="animate-orbit-mid" counterClassName="animate-orbit-counter-mid" />
                <OrbitRing icons={ORBIT_OUTER} size="w-[88%]" className="animate-orbit-fast" counterClassName="animate-orbit-counter-fast" />
            </div>
        </section>
    );
}
