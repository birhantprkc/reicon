import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const socials = [
  {
    href: 'https://github.com/dqev/reicon', label: 'GitHub',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  },
  {
    href: 'https://www.linkedin.com/company/reicon-dev', label: 'LinkedIn',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  },
  {
    href: 'https://www.npmjs.com/package/reicon-react', label: 'npm',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12V7.334zm3.333 6.666H4v-4h1.333v4h1.333v-5.333H3.333zm5.334 0H10v-4h1.333v4h1.337v-5.333H8.667zm5.333-5.333v6.666H16v-4h1.333v4h1.333v-4h1.333v4h1.337v-6.666z"/></svg>
  },
  {
    href: 'https://bsky.app/profile/reicondev.bsky.social', label: 'Bluesky',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.112 0 1.608 0 4.586c0 .745.268 4.866 1.029 5.822 1.567 1.965 5.343 2.716 8.478 2.444-1.21.366-4.318 1.416-5.313 3.688-.476 1.09.309 2.628 3.633 3.902 2.368.907 5.143 2.156 5.143 4.067v.012c0 .84.192 1.279.51 1.279.38 0 .51-.49.51-1.28v-.01c0-1.91 2.775-3.16 5.143-4.067 3.324-1.274 4.11-2.812 3.633-3.902-.995-2.272-4.103-3.322-5.313-3.688 3.135.272 6.911-.479 8.478-2.444.761-.956 1.03-5.077 1.03-5.822 0-2.978-2.567-3.474-5.202-1.787-2.752 1.942-5.71 5.881-6.798 7.995z"/></svg>
  },
];

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative z-10 mt-auto overflow-hidden text-text-base" role="contentinfo">

      <div className="px-6 pb-8">
        <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-1">
              <img src={theme === 'dark' ? '/icon-light.webp' : '/icon-dark.webp'} alt="Reicon" loading="lazy" className="w-4 h-4" />
              <span className="text-text-base font-medium text-sm">Reicon</span>
            </Link>
            <span className="text-[11.5px] text-text-base/60">
              Designed & developed by{' '}
              <a href="https://devchauhan.in" target="_blank" rel="noopener noreferrer" className="text-text-base/80 hover:text-text-base transition-colors cursor-pointer">
                @devchauhan
              </a>
              {' • '}
              Icons by{' '}
              <a href="https://solar-icons.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-text-base/80 hover:text-text-base transition-colors cursor-pointer">
                Solar Icons
              </a>
              {' & '}
              <a href="https://zappicon.com" target="_blank" rel="noopener noreferrer" className="text-text-base/80 hover:text-text-base transition-colors cursor-pointer">
                Zappicon
              </a>
            </span>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px]">
            <Link to="/icons" className="text-text-base/70 hover:text-text-base transition-colors">Icons</Link>
            <Link to="/docs" className="text-text-base/70 hover:text-text-base transition-colors">Docs</Link>
            <Link to="/faq" className="text-text-base/70 hover:text-text-base transition-colors">FAQ</Link>
            <Link to="/terms" className="text-text-base/70 hover:text-text-base transition-colors">Terms</Link>
            <Link to="/privacy" className="text-text-base/70 hover:text-text-base transition-colors">Privacy</Link>
            <Link to="/license" className="text-text-base/70 hover:text-text-base transition-colors">License</Link>
            <a href="mailto:hello@reicon.dev" className="text-text-base/70 hover:text-text-base transition-colors cursor-pointer">Contact</a>
          </nav>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-3">
              {socials.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-text-base/40 hover:text-text-base transition-colors cursor-pointer"
                >
                  {icon}
                </a>
              ))}
            </div>
            <div className="text-[11px] text-text-base/50">
              © {new Date().getFullYear()} Reicon. MIT License.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
