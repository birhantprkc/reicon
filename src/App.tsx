import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import SmoothScroll from './components/layout/SmoothScroll';
import CookieConsent from './components/layout/CookieConsent';
import BrandsOverlay from './pages/home/BrandsOverlay';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { ThemeProvider } from './components/layout/ThemeContext';

const HomePage = lazy(() => import('./pages/home/Home'));
const IconsPage = lazy(() => import('./pages/icons/IconsPage'));
const IconDetail = lazy(() => import('./pages/icon/IconDetail'));
const DocsPage = lazy(() => import('./pages/docs/DocsPage'));
const PackagesPage = lazy(() => import('./pages/packages/PackagesPage'));
const FaqPage = lazy(() => import('./pages/faq/FaqPage'));
const NotFound = lazy(() => import('./pages/not-found/NotFound'));
const Terms = lazy(() => import('./pages/terms/Terms'));
const Privacy = lazy(() => import('./pages/privacy/Privacy'));
const LicensePage = lazy(() => import('./pages/license/LicensePage'));
const PackPage = lazy(() => import('./pages/pack/PackPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      {!isHome && <Header />}
      <ErrorBoundary>
        <Suspense fallback={<div className="flex-1" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/icons" element={<IconsPage />} />
            <Route path="/icon/:name" element={<IconDetail />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/:framework" element={<DocsPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/license" element={<LicensePage />} />
            <Route path="/pack" element={<PackPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SmoothScroll>
          <ScrollToTop />
          <Layout />
          <CookieConsent />
          <BrandsOverlay />
        </SmoothScroll>
      </BrowserRouter>
    </ThemeProvider>
  );
}
