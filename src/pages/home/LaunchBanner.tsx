import { useState } from 'react';

const BANNER_KEY = 'reicon-pump-banner-v3';
const CA = 'C7eur8CFg8VhTofcPcG3eEHfCDeCSY7GTn2ntEfLpump';
const SHORT_CA = `${CA.slice(0, 6)}...${CA.slice(-6)}`;
const PUMP_URL = `https://pump.fun/coin/${CA}`;

export default function LaunchBanner() {
    const [dismissed, setDismissed] = useState(() => {
        try { return localStorage.getItem(BANNER_KEY) === 'dismissed'; }
        catch { return false; }
    });
    const [copied, setCopied] = useState(false);

    if (dismissed) return null;

    const dismiss = () => {
        setDismissed(true);
        try { localStorage.setItem(BANNER_KEY, 'dismissed'); } catch { }
    };

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(CA);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative z-[60] w-full flex items-center justify-center pt-2.5 pb-1 px-4 pointer-events-auto">
            <div className="relative inline-flex items-center gap-2 sm:gap-2.5 bg-text-base/[0.04] backdrop-blur-lg border border-text-base/8 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-1.5 shadow-2xs text-[12px] sm:text-[13px] font-medium text-text-base max-w-full">
                
                {/* Status indicator */}
                <span className="flex items-center gap-1.5 font-semibold text-text-base/90 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>$REICON live!</span>
                </span>

                <span className="text-text-base/20">•</span>

                {/* CA Copy */}
                <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 font-mono text-[11px] bg-text-base/5 hover:bg-text-base/12 px-2 py-0.5 rounded-full text-text-base/80 hover:text-text-base transition-colors cursor-pointer"
                    title="Click to copy contract address"
                >
                    <span className="text-text-base/40 font-sans text-[10px]">CA:</span>
                    <span>{SHORT_CA}</span>
                    {copied ? (
                        <span className="text-emerald-500 font-sans text-[10px] font-bold">✓</span>
                    ) : (
                        <svg className="w-2.5 h-2.5 text-text-base/40 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    )}
                </button>

                <span className="hidden md:inline text-text-base/20">•</span>

                <span className="hidden md:inline text-text-base/60 text-[12px]">
                    Thanking for the love ❤️
                </span>

                <span className="text-text-base/20">•</span>

                {/* Buy Link */}
                <a
                    href={PUMP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-base font-semibold hover:opacity-75 transition-opacity underline underline-offset-2 decoration-text-base/20 text-[11px] sm:text-[12px] shrink-0"
                >
                    Buy on pump.fun ↗
                </a>

                {/* Close button inside pill */}
                <button
                    onClick={dismiss}
                    aria-label="Dismiss banner"
                    className="text-text-base/35 hover:text-text-base transition-colors cursor-pointer ml-1 p-0.5 rounded-full hover:bg-text-base/10"
                >
                    <re-icon icon="x" size="12" color="currentColor" />
                </button>
            </div>
        </div>
    );
}




