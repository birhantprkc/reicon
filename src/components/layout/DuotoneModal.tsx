import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredConsent } from './cookie-consent/storage';
import duotoneSampleMap from '../../data/duotone-modal-sample.json';

const MODAL_SEEN_KEY = 'reicon_duotone_modal_seen_v1';

export default function DuotoneModal() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const checkAndShowModal = () => {
    try {
      if (localStorage.getItem(MODAL_SEEN_KEY) === 'true') return;
    } catch { }

    setVisible(true);
    requestAnimationFrame(() => setAnimateIn(true));
  };

  useEffect(() => {
    // If cookie consent is already handled, show modal after brief delay
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      const timer = setTimeout(() => checkAndShowModal(), 1200);
      return () => clearTimeout(timer);
    }

    // Otherwise, listen for when cookie consent is accepted or declined
    const handleDismissed = () => {
      setTimeout(() => checkAndShowModal(), 600);
    };

    window.addEventListener('reicon-cookie-consent-dismissed', handleDismissed);
    return () => window.removeEventListener('reicon-cookie-consent-dismissed', handleDismissed);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  const dismiss = () => {
    try { localStorage.setItem(MODAL_SEEN_KEY, 'true'); } catch { }
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 350);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
          animateIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Center Modal Card */}
      <div
        className={`relative max-w-md w-full bg-[var(--dropdown-bg)] border border-text-base/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animateIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-text-base/5 hover:bg-text-base/10 flex items-center justify-center text-text-base/50 hover:text-text-base transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <re-icon icon="x" size="14" color="currentColor" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6C5CE7]/15 border border-[#6C5CE7]/30 text-[11px] font-bold uppercase tracking-wider text-[#6C5CE7] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] animate-pulse" />
          Beta Release
        </div>

        {/* Content */}
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-base mb-2 leading-tight">
          New Duotone Variant Available
        </h3>

        <p className="text-xs sm:text-sm text-text-base/60 leading-relaxed mb-6">
          Explore over 1,200+ duotone icons with dual-opacity layering. Designed for modern web and mobile applications.
        </p>

        {/* Duotone Icon Samples */}
        <div className="flex items-center justify-center gap-3 p-3.5 mb-6 rounded-2xl bg-text-base/3 border border-text-base/6">
          {['home', 'star', 'folder', 'heart', 'user', 'bell'].map((name) => {
            const rawCode = (duotoneSampleMap as Record<string, string>)[name] || '';
            const svgHtml = rawCode ? rawCode.replace(/fill="#[A-Fa-f0-9]{6}"/gi, 'fill="currentColor"') : '';
            return (
              <div
                key={name}
                className="flex items-center justify-center text-text-base/85 hover:text-text-base transition-transform hover:scale-110 p-1"
                title={name}
              >
                {svgHtml ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 sm:w-[26px] sm:h-[26px]"
                    dangerouslySetInnerHTML={{ __html: svgHtml }}
                  />
                ) : (
                  <re-icon icon={name} size="24" color="currentColor" className="w-6 h-6 sm:w-[26px] sm:h-[26px]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Link
            to="/icons?weight=duotone"
            onClick={dismiss}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-text-base text-bg-base font-semibold text-xs sm:text-sm hover:opacity-90 transition-all cursor-pointer text-center"
          >
            <span>Explore Duotone Icons</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <button
            onClick={dismiss}
            className="px-4 py-3 rounded-xl bg-text-base/5 hover:bg-text-base/10 text-text-base/60 hover:text-text-base text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
