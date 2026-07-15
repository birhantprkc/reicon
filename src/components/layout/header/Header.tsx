import { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Sun, Moon } from 'reicon-react';
import ClayButton from '../../ui/Button';
import { useTheme } from '../ThemeContext';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  className?: string;
}

const Header = forwardRef<HTMLElement, HeaderProps>(function Header({ className = '' }, ref) {
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

  return (
    <header ref={ref} className={`fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] backdrop-blur-xl transition-colors duration-300 ${className}`}>
      <div className="flex items-center justify-between h-14 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <img src={theme === 'dark' ? '/icon-light.webp' : '/icon-dark.webp'} alt="Reicon" loading="lazy" className="w-4 h-4" />
          <span className="text-text-base font-semibold text-base">Reicon</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2">
          <NavLinks variant="desktop" />
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

        <MobileMenu stars={stars} theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
});

export default Header;
