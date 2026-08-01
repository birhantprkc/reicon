import { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Sun, Moon } from 'reicon-react';
import ClayButton from '../../ui/Button';
import { useTheme } from '../ThemeContext';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';

import BuyMeACoffeeIcon from '../../ui/BuyMeACoffeeIcon';

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
        <Link
          to="/"
          className="flex items-center gap-2 text-text-base font-semibold text-[14px] bg-text-base/[0.04] backdrop-blur-lg rounded-full px-3.5 h-[34px] hover:bg-text-base/10 transition-all duration-150 shadow-2xs shrink-0"
        >
          <img src={theme === 'dark' ? '/icon-light.webp' : '/icon-dark.webp'} alt="Reicon" loading="lazy" className="w-4.5 h-4.5" />
          <span>Reicon</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2">
          <NavLinks variant="desktop" />
          <Link
            to="/support"
            className="hidden lg:inline-flex items-center gap-1.5 text-[13px] font-medium bg-text-base/[0.04] hover:bg-text-base/10 text-text-base rounded-full px-4 h-[34px] transition-all duration-150 shadow-2xs"
            title="Support Reicon"
          >
            <BuyMeACoffeeIcon size={15} />
            <span>Support</span>
          </Link>
          <a
            href="https://github.com/dqev/reicon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-base/80 hover:text-text-base text-[13px] font-medium bg-text-base/[0.04] hover:bg-text-base/10 rounded-full px-4 h-[34px] flex items-center gap-1.5 transition-all duration-150 shadow-2xs"
          >
            GitHub
            {stars !== null && (
              <span className="flex items-center gap-1 text-text-base/60 text-[11px] font-medium border-l border-text-base/20 pl-2 ml-0.5">
                <Star size={11} weight="Filled" color="#eab308" className="shrink-0 relative -top-[0.5px]" />
                {stars}
              </span>
            )}
          </a>
          <button
            onClick={toggleTheme}
            className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-text-base/[0.04] hover:bg-text-base/10 text-text-base/70 hover:text-text-base transition-all duration-150 cursor-pointer shadow-2xs"
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
