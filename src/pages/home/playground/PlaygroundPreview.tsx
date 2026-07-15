export default function PlaygroundPreview({
    selected,
    size,
    weight,
    displayColor,
    pascalName,
}: {
    selected: string;
    size: number;
    weight: 'outline' | 'filled';
    displayColor: string;
    pascalName: string;
}) {
    return (
        <div className="flex flex-col">
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
        </div>
    );
}
