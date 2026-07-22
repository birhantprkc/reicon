import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, HandHeart, Search3, Book3, Confetti2, Sun, Moon } from 'reicon-react';
import { SiJavascript, SiReact } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import Background from '../../components/layout/Background';
import ClayButton from '../../components/ui/Button';
import { FigmaIcon, VscodeIcon, VueIcon, SvelteIcon, McpIcon, FlutterIcon } from './icons';
import BuyMeACoffeeIcon from '../../components/ui/BuyMeACoffeeIcon';

interface Props {
    theme: string;
    toggleTheme: () => void;
    heroCardRef: React.RefObject<HTMLDivElement | null>;
    stars: number | null;
}

export default function Hero({ theme, toggleTheme, heroCardRef, stars }: Props) {
    const [newIconCount, setNewIconCount] = useState(0);
    useEffect(() => {
        import('../../data/new-icons-added.json').then(m => {
            setNewIconCount((m.default as string[]).length);
        });
    }, []);

    return (
        <div className="relative min-h-screen flex items-start justify-center pt-[10px]">
            <div
                ref={heroCardRef}
                className="sticky top-[10px] w-[calc(100%-20px)] mx-[10px] h-[calc(100vh-20px)] rounded-[18px] overflow-hidden origin-top will-change-transform"
                style={{ transformOrigin: 'top center' }}
            >
                <Background />

                <div className="absolute inset-0 z-[2] flex flex-col justify-between p-[18px] md:p-[26px_40px]">
                    {/* Top bar */}
                    <div className="relative flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 text-text-base font-semibold text-[15px]">
                            <img src={theme === 'dark' ? '/icon-light.webp' : '/icon-dark.webp'} alt="Reicon" loading="lazy" className="w-5 h-5" />
                            Reicon
                        </Link>
                        <nav className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
                            <Link to="/docs" className="text-[13px] text-text-base/60 hover:text-text-base transition-colors">Docs</Link>
                            <Link to="/icons" className="text-[13px] text-text-base/60 hover:text-text-base transition-colors">Icons</Link>
                            <Link to="/packages" className="text-[13px] text-text-base/60 hover:text-text-base transition-colors">Packages</Link>
                        </nav>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-lg hover:bg-white/10 text-text-base/80 hover:text-text-base transition-colors cursor-pointer"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <Sun size={15} color="currentColor" /> : <Moon size={15} color="currentColor" />}
                            </button>
                            <div className="hidden md:flex gap-2">
                                <Link
                                    to="/support"
                                    className="text-[13px] text-text-base/80 border border-white/20 bg-white/5 backdrop-blur-lg rounded-full px-4 py-[7px] hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                    <BuyMeACoffeeIcon size={15} />
                                    Support
                                </Link>
                                <a
                                    href="https://github.com/dqev/reicon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[13px] text-text-base/80 border border-white/20 bg-white/5 backdrop-blur-lg rounded-full px-4 py-[7px] hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                    GitHub
                                    {stars !== null && (
                                        <span className="flex items-center gap-0.5 text-text-base/50 text-[11px] font-medium border-l border-white/15 pl-1.5">
                                            <Star size={11} weight="Filled" color="#eab308" className="shrink-0 relative -top-[0.5px]" />
                                            {stars}
                                        </span>
                                    )}
                                </a>
                                <ClayButton to="/icons" variant="primary" size="sm">Browse Icons</ClayButton>
                            </div>
                        </div>
                    </div>

                    {/* Center content */}
                    <div className="text-center px-3">
                        <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
                            <div className="inline-flex items-center gap-[6px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-[14px] py-[6px] text-[12px] text-text-base/90">
                                <HandHeart size={16} color="currentColor" />
                                Handcrafted & Open Source
                            </div>
                            <Link
                                to="/icons?new=true"
                                className="inline-flex items-center gap-[6px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-[14px] py-[6px] text-[12px] text-text-base/90 hover:bg-white/8 transition-colors"
                            >
                                <span className="w-[6px] h-[6px] bg-[#6C5CE7] rounded-full shrink-0 animate-pulse" />
                                {newIconCount} New Icons Added
                                <Confetti2 size={15} color="currentColor" />
                            </Link>
                        </div>

                        <h1 className="font-serif text-[clamp(30px,6.2vw,76px)] font-semibold text-text-base leading-[1.08] tracking-[-0.02em] mb-4">
                            The icon library<br />designers actually want.
                        </h1>
                        <p className="text-[clamp(13px,1.45vw,18px)] text-text-base/60 leading-[1.65] max-w-[480px] mx-auto mb-7">
                            Precision-crafted, open-source SVG icons for React, Vue, Svelte, Figma, and the web. Pixel-perfect. No auto-generation.
                        </p>
                        <div className="flex items-center justify-center gap-[10px] flex-wrap">
                            <ClayButton to="/icons" variant="primary">
                                <Search3 size={16} />
                                Browse Icons
                            </ClayButton>
                            <Link to="/docs" className="bg-white/10 text-text-base text-[14px] px-6 py-3 rounded-full border border-white/20 backdrop-blur-lg flex items-center gap-[6px] hover:bg-white/15 transition-colors">
                                <Book3 size={16} color="currentColor" />
                                Docs Guide
                            </Link>
                        </div>

                        {/* Integrations row */}
                        <div className="mt-14 flex flex-col items-center justify-center gap-3.5 select-none">
                            <span className="text-[10px] tracking-[0.15em] text-text-base/35 dark:text-text-base/30 uppercase font-semibold">Integrations</span>
                            <div className="flex items-center justify-center gap-4 sm:gap-7 flex-wrap max-w-[600px]">
                                <Link to="/docs/react" title="React" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                                    <SiReact className="text-[#61DAFB]/70 hover:text-[#61DAFB] transition-colors" size={18} />
                                    <span className="hidden sm:inline">React</span>
                                </Link>
                                <Link to="/docs/react-native" title="React Native" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                                    <FaReact className="text-[#61DAFB]/60 hover:text-[#61DAFB] transition-colors" size={17} />
                                    <span className="hidden sm:inline">React Native</span>
                                </Link>
                                <Link to="/docs/vue" title="Vue 3" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                                    <VueIcon size={17} />
                                    <span className="hidden sm:inline">Vue</span>
                                </Link>
                                <Link to="/docs/svelte" title="Svelte" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                                    <SvelteIcon size={16} />
                                    <span className="hidden sm:inline">Svelte</span>
                                </Link>
                                <Link to="/docs/vanilla" title="Vanilla JavaScript" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                                    <SiJavascript className="text-[#F7DF1E]/80 hover:text-[#F7DF1E] transition-colors" size={16} />
                                    <span className="hidden sm:inline">JavaScript</span>
                                </Link>
                                <Link to="/docs/figma" title="Figma" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                                    <FigmaIcon size={16} />
                                    <span className="hidden sm:inline">Figma</span>
                                </Link>
                                <Link to="/docs/vscode" title="VS Code" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                                    <VscodeIcon size={17} />
                                    <span className="hidden sm:inline">VS Code</span>
                                </Link>
                                <Link to="/docs/mcp" title="MCP Server" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                                    <McpIcon size={16} />
                                    <span className="hidden sm:inline">MCP Server</span>
                                </Link>
                                <Link to="/docs/flutter" title="Flutter" className="flex items-center gap-1.5 text-text-base/50 hover:text-text-base/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-[13px] font-medium">
                                    <FlutterIcon size={14} />
                                    <span className="hidden sm:inline">Flutter</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex items-end justify-center sm:justify-between">
                        <div className="flex gap-[26px]">
                            {[{ num: '2700+', label: 'Icons' }, { num: '2', label: 'Weights' }, { num: 'MIT', label: 'License' }].map((s) => (
                                <div key={s.label}>
                                    <div className="font-serif text-[19px] font-semibold text-text-base leading-[1.2]">{s.num}</div>
                                    <div className="text-[11px] text-text-base/45">{s.label}</div>
                                </div>
                            ))}
                        </div>
                        <a href="https://fluidshader.vercel.app/" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 text-[15px] text-text-base/50 hover:text-text-base/70 transition-colors cursor-pointer">
                            Shader by <re-icon icon="palette" size={13}></re-icon> Fluid Shader
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
