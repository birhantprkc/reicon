import { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Sun, Moon } from 'reicon-react';
import ClayButton from '../components/ClayButton';
import { useTheme } from './ThemeContext';

interface HeaderProps {
  className?: string;
}

const Header = forwardRef<HTMLElement, HeaderProps>(function Header({ className = '' }, ref) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/dqev/reicon')
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e: MouseEvent) => {
      const header = ref && 'current' in ref ? ref.current : null;
      if (header && !header.contains(e.target as Node)) {
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
  }, [menuOpen, ref]);

  return (
    <header ref={ref} className={`fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] backdrop-blur-xl transition-colors duration-300 ${className}`}>
      <div className="flex items-center justify-between h-14 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <img src={theme === 'dark' ? '/icon-light.webp' : '/icon-dark.webp'} alt="Reicon" className="w-4 h-4" />
          <span className="text-text-base font-semibold text-base">Reicon</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-2">
          <Link to="/icons" className="text-text-base/60 hover:text-text-base text-sm transition-colors px-3 py-1.5">
            Icons
          </Link>
          <Link to="/usage" className="text-text-base/60 hover:text-text-base text-sm transition-colors px-3 py-1.5">
            Usage
          </Link>
          <Link to="/packages" className="text-text-base/60 hover:text-text-base text-sm transition-colors px-3 py-1.5">
            Packages
          </Link>
          <Link to="/faq" className="text-text-base/60 hover:text-text-base text-sm transition-colors px-3 py-1.5">
            FAQ
          </Link>
          <a
            href="https://github.com/dqev/reicon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-base/60 hover:text-text-base text-sm transition-colors px-3 py-1.5 mr-2 flex items-center gap-1"
          >
            GitHub
            {stars !== null && (
              <span className="flex items-center gap-0.5 text-text-base/40 text-[11px] font-medium border-l border-text-base/10 pl-1.5 ml-0.5">
                <Star size={11} weight="Filled" color="#eab308" className="shrink-0 relative -top-[0.5px]" />
                {stars}
              </span>
            )}
          </a>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-text-base/8 text-text-base/60 hover:text-text-base transition-all duration-150 cursor-pointer mr-1"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <ClayButton to="/icons" variant="accent" size="sm">
            <Star size={14} />
            Browse Icons
          </ClayButton>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1">
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
              <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? 'translate-y-[3.25px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? '-translate-y-[3.25px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-[var(--dropdown-bg)] backdrop-blur-xl px-4 pb-4 pt-2 flex flex-col gap-1 transition-colors duration-300">
          <Link
            to="/icons"
            onClick={() => setMenuOpen(false)}
            className="text-text-base/60 hover:text-text-base text-sm py-2 transition-colors"
          >
            Icons
          </Link>
          <Link
            to="/usage"
            onClick={() => setMenuOpen(false)}
            className="text-text-base/60 hover:text-text-base text-sm py-2 transition-colors"
          >
            Usage
          </Link>
          <Link
            to="/packages"
            onClick={() => setMenuOpen(false)}
            className="text-text-base/60 hover:text-text-base text-sm py-2 transition-colors"
          >
            Packages
          </Link>
          <Link
            to="/faq"
            onClick={() => setMenuOpen(false)}
            className="text-text-base/60 hover:text-text-base text-sm py-2 transition-colors"
          >
            FAQ
          </Link>
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
    </header>
  );
});

export default Header;
