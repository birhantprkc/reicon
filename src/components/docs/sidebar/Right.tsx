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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-text-base/60">
                    <path d="M3.75 18c-0.2125 0 -0.390585 -0.07235 -0.53425 -0.217C3.071915 17.6385 3 17.45935 3 17.2455c0 -0.21365 0.071915 -0.39135 0.21575 -0.533C3.359415 16.57085 3.5375 16.5 3.75 16.5h10.5c0.2125 0 0.39065 0.07235 0.5345 0.217 0.14365 0.1445 0.2155 0.32365 0.2155 0.5375 0 0.21365 -0.07185 0.39135 -0.2155 0.533 -0.14385 0.14165 -0.322 0.2125 -0.5345 0.2125h-10.5Zm0 -5.25c-0.2125 0 -0.390585 -0.07235 -0.53425 -0.217C3.071915 12.3885 3 12.20935 3 11.9955c0 -0.21365 0.071915 -0.39135 0.21575 -0.533 0.143665 -0.14165 0.32175 -0.2125 0.53425 -0.2125h16.5c0.2125 0 0.39065 0.07235 0.5345 0.217 0.14365 0.1445 0.2155 0.32365 0.2155 0.5375 0 0.21365 -0.07185 0.39135 -0.2155 0.533 -0.14385 0.14165 -0.322 0.2125 -0.5345 0.2125h-16.5Zm0 -5.25c-0.2125 0 -0.390585 -0.07235 -0.53425 -0.217C3.071915 7.1385 3 6.95935 3 6.7455c0 -0.21365 0.071915 -0.39135 0.21575 -0.533C3.359415 6.07085 3.5375 6 3.75 6h16.5c0.2125 0 0.39065 0.07235 0.5345 0.217 0.14365 0.1445 0.2155 0.32365 0.2155 0.5375 0 0.21365 -0.07185 0.39135 -0.2155 0.533 -0.14385 0.14165 -0.322 0.2125 -0.5345 0.2125h-16.5Z"/>
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
