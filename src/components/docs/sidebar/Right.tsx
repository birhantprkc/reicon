import { useRef } from 'react';

interface PageSection { id: string; label: string }

interface Props {
    onThisPage: PageSection[];
    activeSection: string;
    otpIndicatorStyle: { top: number; height: number; opacity: number };
    otpListRef: React.RefObject<HTMLUListElement | null>;
    onNavClick: (id: string) => void;
}

export default function DocsRightSidebar({
    onThisPage, activeSection, otpIndicatorStyle, otpListRef, onNavClick,
}: Props) {
    return (
        <aside id="otp-sidebar" className="hidden xl:block" data-lenis-prevent>
            <div className="otp-header">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-base/60">
                    <line x1="21" y1="10" x2="3" y2="10" />
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="14" x2="3" y2="14" />
                    <line x1="21" y1="18" x2="3" y2="18" />
                </svg>
                <span>On this page</span>
            </div>
            <div className="relative">
                <div
                    className="otp-indicator"
                    style={{
                        top: `${otpIndicatorStyle.top}px`,
                        height: `${otpIndicatorStyle.height}px`,
                        opacity: otpIndicatorStyle.opacity,
                    }}
                />
                <ul className="otp-list" ref={otpListRef}>
                    {onThisPage.map((s) => (
                        <li key={s.id} className={`otp-item ${activeSection === s.id ? 'active' : ''}`}>
                            <button onClick={() => onNavClick(s.id)} className="otp-button">
                                {s.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
