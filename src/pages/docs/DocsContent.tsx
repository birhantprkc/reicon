import SectionHeader from '../../components/docs/SectionHeader';
import { FrameworkIcon } from '../../components/docs/framework/icons';
import { FRAMEWORKS } from '../../components/docs/framework/constants';
import DocsActionsBar from '../../components/docs/ActionsBar';

import { lazy, Suspense } from 'react';

const ReactDocs = lazy(() => import('./frameworks/ReactDocs'));
const ReactNativeDocs = lazy(() => import('./frameworks/ReactNativeDocs'));
const VueDocs = lazy(() => import('./frameworks/VueDocs'));
const SvelteDocs = lazy(() => import('./frameworks/SvelteDocs'));
const FlutterDocs = lazy(() => import('./frameworks/FlutterDocs'));
const CdnDocs = lazy(() => import('./frameworks/CdnDocs'));
const FigmaDocs = lazy(() => import('./guides/FigmaDocs'));
const VscodeDocs = lazy(() => import('./guides/VscodeDocs'));
const McpDocs = lazy(() => import('./guides/McpDocs'));
const SvgDocs = lazy(() => import('./guides/SvgDocs'));
import PropsTable from './reference/PropsTable';
import Weights from './reference/Weights';
import TypeScriptSection from './reference/TypeScriptSection';
import Accessibility from './guides/Accessibility';
import Styling from './guides/Styling';
import Performance from './guides/Performance';
import Troubleshooting from './guides/Troubleshooting';

interface Props {
  contentRef: React.RefObject<HTMLDivElement | null>;
  fwParam: string | undefined;
  framework: string;
  switchFramework: (fw: any) => void;
  copiedField: string | null;
  copyToClipboard: (text: string, field: string) => void;
  toastMessage: string | null;
  isStandaloneFramework: (fw: string) => boolean;
  copiedPage: boolean;
  openDropdown: boolean;
  openDropdownRef: React.RefObject<HTMLDivElement | null>;
  githubEditUrl: string;
  githubUrl: string;
  handleCopyPageMarkdown: () => void;
  setOpenDropdown: (v: boolean) => void;
  openInLLM: (platform: 'chatgpt' | 'claude' | 't3') => void;
  vanillaDocs: string;
  reactDocs: string;
  reactNativeDocs: string;
  vueDocs: string;
  svelteDocs: string;
  flutterDocs: string;
  figmaDocs: string;
  vscodeDocs: string;
  mcpDocs: string;
  svgDocs: string;
  propsDocs: string;
  weightsDocs: string;
  typescriptDocs: string;
  stylingDocs: string;
  accessibilityDocs: string;
  performanceDocs: string;
  troubleshootingDocs: string;
}

export default function DocsContent({
  contentRef,
  fwParam,
  framework,
  switchFramework,
  copiedField,
  copyToClipboard,
  toastMessage,
  isStandaloneFramework,
  copiedPage,
  openDropdown,
  openDropdownRef,
  githubEditUrl,
  githubUrl,
  handleCopyPageMarkdown,
  setOpenDropdown,
  openInLLM,
  vanillaDocs,
  reactDocs,
  reactNativeDocs,
  vueDocs,
  svelteDocs,
  flutterDocs,
  figmaDocs,
  vscodeDocs,
  mcpDocs,
  svgDocs,
  propsDocs,
  weightsDocs,
  typescriptDocs,
  stylingDocs,
  accessibilityDocs,
  performanceDocs,
  troubleshootingDocs,
}: Props) {
  return (
    <main ref={contentRef} className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 xl:px-16 pt-14 lg:pt-8 pb-36 lg:pb-8 overflow-x-hidden">
      <div className="max-w-3xl">

        {/* What is Reicon — shown on base /docs route */}
        {!fwParam && (
          <>
            <section id="what-is-reicon" data-section className="mb-12 scroll-mt-24">
              <SectionHeader id="what-is-reicon" title="What is Reicon?" level="h2" markdownContent={vanillaDocs} />
              <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
                Reicon is an open-source icon library that provides beautifully crafted vector (SVG) icons for digital projects.
                The library offers the core <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon</code> package for JavaScript and CDN, plus framework-specific packages for{' '}
                <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-react</code>,{' '}
                <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-react-native</code>,{' '}
                <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-vue</code>, and{' '}
                <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-svelte</code>.
              </p>
              <p className="text-text-base/60 text-[15px] leading-[1.8]">
                Every icon comes in two weights — Outline and Filled — and is fully customizable with size, color, and custom props.
                Icons are tree-shakeable when used with bundlers, ensuring minimal bundle size.
              </p>
            </section>
            <hr className="border-text-base/6 mb-12" />
          </>
        )}

        {/* Framework selector grid — shown on base /docs route */}
        {!fwParam ? (
          <section className="mb-12">
            <h2 className="text-lg font-serif text-text-base mb-6">Choose an Integration</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FRAMEWORKS.map((fw) => (
                <button
                  key={fw.id}
                  onClick={() => switchFramework(fw.id)}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-text-base/3 hover:bg-text-base/6 text-left transition-all border border-transparent hover:border-text-base/5 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-text-base/5 flex items-center justify-center text-lg shrink-0">
                    <FrameworkIcon id={fw.id} size={20} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-text-base mb-0.5">{fw.label}</h3>
                    <p className="text-[12px] text-text-base/40">View the {fw.label} integration guide</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <Suspense fallback={<div className="py-12 text-center text-sm text-text-base/40">Loading…</div>}>
            {framework === 'react' ? (
              <ReactDocs markdownContent={reactDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'react-native' ? (
              <ReactNativeDocs markdownContent={reactNativeDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'vue' ? (
              <VueDocs markdownContent={vueDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'svelte' ? (
              <SvelteDocs markdownContent={svelteDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'flutter' ? (
              <FlutterDocs markdownContent={flutterDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'figma' ? (
              <FigmaDocs markdownContent={figmaDocs} />
            ) : framework === 'vscode' ? (
              <VscodeDocs markdownContent={vscodeDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'mcp' ? (
              <McpDocs markdownContent={mcpDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : framework === 'svg' ? (
              <SvgDocs markdownContent={svgDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            ) : (
              <CdnDocs markdownContent={vanillaDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            )}
          </Suspense>
        )}

        {/* Shared docs sections — not shown for standalone frameworks */}
        {!isStandaloneFramework(framework) && (
          <>
            <hr className="border-text-base/6 mb-12" />
            <PropsTable markdownContent={propsDocs} />
            <hr className="border-text-base/6 mb-12" />
            <Weights markdownContent={weightsDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            <hr className="border-text-base/6 mb-12" />
            <TypeScriptSection markdownContent={typescriptDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            <hr className="border-text-base/6 mb-12" />
            <Styling markdownContent={stylingDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            <hr className="border-text-base/6 mb-12" />
            <Accessibility markdownContent={accessibilityDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            <hr className="border-text-base/6 mb-12" />
            <Performance markdownContent={performanceDocs} copiedField={copiedField} onCopy={copyToClipboard} />
            <hr className="border-text-base/6 mb-12" />
            <Troubleshooting markdownContent={troubleshootingDocs} copiedField={copiedField} onCopy={copyToClipboard} />
          </>
        )}

        <hr className="border-text-base/6 my-12" />

        <DocsActionsBar
          copiedPage={copiedPage}
          openDropdown={openDropdown}
          openDropdownRef={openDropdownRef}
          githubEditUrl={githubEditUrl}
          githubUrl={githubUrl}
          onCopyMarkdown={handleCopyPageMarkdown}
          onOpenDropdown={setOpenDropdown}
          onOpenInLLM={openInLLM}
        />

        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-[999] bg-[var(--dropdown-bg)] border border-text-base/8 text-text-base text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </main>
  );
}
