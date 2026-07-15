import { useState, useEffect, useRef } from 'react';
import { Star, Sun, Moon } from 'reicon-react';
import ClayButton from '../../ui/Button';
import NavLinks from './NavLinks';

interface MobileMenuProps {
  stars: number | null;
  theme: string;
  toggleTheme: () => void;
}

export default function MobileMenu({ stars, theme, toggleTheme }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => setMenuOpen(false);

    document.addEventListener('mousedown', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  return (
    <div ref={menuRef} className="sm:hidden">
      <div className="flex items-center gap-1">
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-text-base/8 text-text-base/60 hover:text-text-base transition-all duration-150 cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 flex items-center justify-center text-text-base/60 hover:text-text-base transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-center gap-[5px]">
            <span
              className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                menuOpen ? 'translate-y-[3.25px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                menuOpen ? '-translate-y-[3.25px] -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </div>
      {menuOpen && (
        <div className="absolute left-0 right-0 top-14 bg-[var(--dropdown-bg)] backdrop-blur-xl px-4 pb-4 pt-2 flex flex-col gap-1 transition-colors duration-300">
          <NavLinks variant="mobile" onClick={() => setMenuOpen(false)} />
          <a
            href="https://github.com/dqev/reicon"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="text-text-base/60 hover:text-text-base text-sm py-2 transition-colors flex items-center gap-1.5"
          >
            GitHub
            {stars !== null && (
              <span className="flex items-center gap-0.5 text-text-base/40 text-[11px] font-medium border-l border-text-base/10 pl-1.5">
                <Star size={11} weight="Filled" color="#eab308" className="shrink-0 relative -top-[0.5px]" />
                {stars}
              </span>
            )}
          </a>
          <ClayButton to="/icons" variant="accent" size="sm" onClick={() => setMenuOpen(false)} className="w-full justify-center mt-1">
            <Star size={14} />
            Browse Icons
          </ClayButton>
        </div>
      )}
    </div>
  );
}
