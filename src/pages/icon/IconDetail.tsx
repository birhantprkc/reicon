import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import TypeTable from '../../components/docs/TypeTable';
import useIconDetail from './useIconDetail';
import IconPreview from './IconPreview';
import IconActions from './IconActions';
import CodeTabs from './CodeTabs';
import SeoHelmet from './SeoHelmet';
import RelatedIcons from './RelatedIcons';
import Mockup, { AppNavMockup, ButtonsMockup, StatMockup, ToastMockup, InputMockup, MobileBarMockup } from './Mockups';
import { EASE } from './utils';

export default function IconDetail() {
  const {
    name, copiedField, activeWeight, previewSize, toast, exportSize,
    codeTab, setCodeTab, iconCategory, contributorGithub, useCustomColor, customColor,
    isColorPickerOpen, pascalName, fw, relatedIcons,
    setCopiedField, setActiveWeight, setPreviewSize,
    setExportSize, setUseCustomColor, setCustomColor, setIsColorPickerOpen,
    flashToast, handleCopy, handleCopySvg,
    handleDownloadSvg, handleDownloadPng, handleDownloadWebp,
    reset, CODE_TABS, activeTab,
    pageTitle, pageDesc, pageUrl,
  } = useIconDetail();

  return (
    <div className="flex-1">
      <SeoHelmet
        pageTitle={pageTitle}
        pageDesc={pageDesc}
        pageUrl={pageUrl}
        pascalName={pascalName}
        iconCategory={iconCategory}
        name={name}
      />

      <main className="flex-1 w-full overflow-x-hidden">
        <div className="max-w-[1160px] mx-auto px-5 md:px-10 pt-32 pb-8 md:pt-32 md:pb-10">
          <div className="flex items-center justify-between mb-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-text-base/40 min-w-0">
              <Link to="/" className="hover:text-text-base/70 transition-colors shrink-0">Reicon</Link>
              <span className="text-text-base/20 shrink-0" aria-hidden="true">/</span>
              <Link to="/icons" className="hover:text-text-base/70 transition-colors shrink-0">Icons</Link>
              {iconCategory && (
                <>
                  <span className="text-text-base/20 shrink-0" aria-hidden="true">/</span>
                  <span className="text-text-base/50 shrink-0 hidden sm:inline">{iconCategory}</span>
                  <span className="text-text-base/20 shrink-0 hidden sm:inline" aria-hidden="true">/</span>
                </>
              )}
              {!iconCategory && (
                <>
                  <span className="text-text-base/20 shrink-0" aria-hidden="true">/</span>
                </>
              )}
              <span className="text-text-base/70 truncate" aria-current="page">{pascalName}</span>
            </nav>

            <Link
              to="/icons"
              className="shrink-0 ml-4 flex items-center gap-1.5 text-[12.5px] text-text-base/40 hover:text-text-base/80 bg-text-base/4 hover:bg-text-base/8 border border-text-base/8 rounded-lg px-3 py-1.5 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              <span>Back</span>
            </Link>
          </div>

          <h1 className="sr-only">{pascalName} icon — Reicon</h1>

          <div className="grid lg:grid-cols-[380px_minmax(0,1fr)] gap-5 lg:gap-7">
            <IconPreview
              pascalName={pascalName}
              iconCategory={iconCategory}
              contributorGithub={contributorGithub}
              name={name}
              activeWeight={activeWeight}
              previewSize={previewSize}
              useCustomColor={useCustomColor}
              customColor={customColor}
              onSetActiveWeight={setActiveWeight}
              onSetPreviewSize={setPreviewSize}
              onReset={reset}
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
              className="flex flex-col gap-5 min-w-0"
            >
              <IconActions
                pascalName={pascalName}
                name={name}
                activeWeight={activeWeight}
                exportSize={exportSize}
                useCustomColor={useCustomColor}
                customColor={customColor}
                isColorPickerOpen={isColorPickerOpen}
                copiedField={copiedField}
                onCopy={handleCopy}
                onCopySvg={handleCopySvg}
                onDownloadSvg={handleDownloadSvg}
                onDownloadPng={handleDownloadPng}
                onDownloadWebp={handleDownloadWebp}
                onSetExportSize={setExportSize}
                onSetUseCustomColor={setUseCustomColor}
                onSetCustomColor={setCustomColor}
                onSetIsColorPickerOpen={setIsColorPickerOpen}
              />

              <CodeTabs
                codeTab={codeTab}
                setCodeTab={setCodeTab}
                copiedField={copiedField}
                handleCopy={handleCopy}
                CODE_TABS={CODE_TABS}
                activeTab={activeTab}
                pascalName={pascalName}
                name={name || ''}
                fw={fw}
              />

              <div>
                <h3 className="text-[11px] font-medium text-text-base/40 uppercase tracking-wider mb-3">Props</h3>
                <TypeTable rows={[
                  { prop: 'size', type: 'number | string', default: '24', description: 'Icon size in pixels' },
                  { prop: 'color', type: 'string', default: 'currentColor', description: 'Any valid CSS color' },
                  { prop: 'weight', type: '"Outline" | "Filled"', default: 'Outline', description: 'Icon weight' },
                  { prop: 'className?', type: 'string', default: null, description: 'Extra CSS classes' },
                ]} />
              </div>
            </motion.div>
          </div>

          <section className="mt-16">
            <div className="border-t border-text-base/8 pt-12 mb-8 text-center">
              <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">In context</div>
              <h2 className="font-serif text-[clamp(20px,2.6vw,30px)] text-text-base">See the {pascalName} icon in real UI</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Mockup i={0}><AppNavMockup name={name} pascalName={pascalName} weight={activeWeight} /></Mockup>
              <Mockup i={1}><ButtonsMockup name={name} weight={activeWeight} /></Mockup>
              <Mockup i={2}><StatMockup name={name} weight={activeWeight} /></Mockup>
              <Mockup i={3}><ToastMockup name={name} weight={activeWeight} /></Mockup>
              <Mockup i={4}><InputMockup name={name} weight={activeWeight} /></Mockup>
              <Mockup i={5}><MobileBarMockup name={name} weight={activeWeight} /></Mockup>
            </div>
          </section>
        </div>

        {relatedIcons.length > 0 && (
          <RelatedIcons relatedIcons={relatedIcons} />
        )}
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4"
          >
            <div className="bg-[var(--dropdown-bg)] border border-text-base/8 text-text-base/80 text-[13px] px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap">
              <svg className="w-3.5 h-3.5 text-[#6C5CE7] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
