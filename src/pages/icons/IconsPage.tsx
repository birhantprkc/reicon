import { useState, useEffect, useMemo, useDeferredValue } from 'react';
import { useIconSearch } from '../../hooks/useIconSearch';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import IconsHelmet from './IconsHelmet';
import IconSearchBar from './IconSearchBar';
import IconCount from './IconCount';
import IconGrid from './IconGrid';
import LoadingScreen from '../../components/ui/LoadingScreen';
import { loadIconData } from '../../lib/icon-data';
import { waitForReicon } from '../../lib/reicon-loader';

const LS_ICONS = 'reicon-icons-cache';
const LS_MAP = 'reicon-map-cache';

const BATCH_SIZE = 60;

function loadCache(): { icons: string[]; categoryMap: Record<string, string> } {
  try {
    const i = localStorage.getItem(LS_ICONS);
    const m = localStorage.getItem(LS_MAP);
    return {
      icons: i ? JSON.parse(i) : [],
      categoryMap: m ? JSON.parse(m) : {},
    };
  } catch {
    return { icons: [], categoryMap: {} };
  }
}

function saveCache(icons: string[], categoryMap: Record<string, string>) {
  try {
    localStorage.setItem(LS_ICONS, JSON.stringify(icons));
    localStorage.setItem(LS_MAP, JSON.stringify(categoryMap));
  } catch { }
}

export default function IconsPage() {
  const [searchParams] = useSearchParams();
  const cached = useMemo(() => loadCache(), []);
  const [allIcons, setAllIcons] = useState<string[]>(() => cached.icons);
  const [searchQuery, setSearchQuery] = useState('');
  
  const initialSet = searchParams.get('category') || searchParams.get('set') || 'all';
  const initialStyle = useMemo(() => {
    const w = searchParams.get('weight')?.toLowerCase();
    if (w === 'filled') return 'Filled';
    if (w === 'outline') return 'Outline';
    return 'All';
  }, [searchParams]);

  const [activeSet, setActiveSet] = useState(initialSet);
  const [activeStyle, setActiveStyle] = useState(initialStyle);
  const [activeSize, setActiveSize] = useState('32');
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>(() => cached.categoryMap);
  const [showNew, setShowNew] = useState(searchParams.get('new') === 'true');
  const [ready, setReady] = useState(() => cached.icons.length > 0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newIconsSet, setNewIconsSet] = useState<Set<string> | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const w = searchParams.get('weight')?.toLowerCase();
    if (w === 'filled') setActiveStyle('Filled');
    else if (w === 'outline') setActiveStyle('Outline');
    
    const cat = searchParams.get('category') || searchParams.get('set');
    if (cat) setActiveSet(cat);

    if (searchParams.get('new') === 'true') setShowNew(true);
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [iconData] = await Promise.all([loadIconData(), waitForReicon()]);
        if (cancelled) return;
        setNewIconsSet(new Set(iconData.newIcons));
        if (window.Reicon?.icons) {
          setAllIcons(window.Reicon.icons);
          saveCache(window.Reicon.icons, window.Reicon.categoryMap);
          setCategoryMap(window.Reicon.categoryMap);
        }
        setReady(true);
      } catch {
        if (!cancelled) setLoadError('Failed to load icon data');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const deferredQuery = useDeferredValue(searchQuery);
  const searchResults = useIconSearch(searchQuery, 500);

  const filteredIcons = useMemo(() => {
    let icons = allIcons;
    if (showNew && newIconsSet) {
      icons = icons.filter((name) => newIconsSet.has(name));
    }
    if (activeSet !== 'all' && Object.keys(categoryMap).length > 0) {
      icons = icons.filter((name) => categoryMap[name] === activeSet);
    }
    const q = deferredQuery.trim().toLowerCase();
    if (q) {
      const ranked = new Map(searchResults.map((r, i) => [r.name, i]));
      icons = icons
        .filter((name) => ranked.has(name))
        .sort((a, b) => (ranked.get(a) ?? Infinity) - (ranked.get(b) ?? Infinity));
    }
    return icons;
  }, [deferredQuery, allIcons, activeSet, categoryMap, showNew, searchResults]);

  useEffect(() => {
    if (window.Reicon?.preload && filteredIcons.length > 0) {
      const namesToPreload = activeStyle === 'All'
        ? filteredIcons.slice(0, BATCH_SIZE / 2)
        : filteredIcons.slice(0, BATCH_SIZE);
      window.Reicon.preload(namesToPreload);
    }
  }, [filteredIcons, activeStyle]);

  const displaySize = parseInt(activeSize) || 32;
  const displayWeight = activeStyle === 'Filled' ? 'filled' : 'outline';

  if (loadError) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-sm">{loadError}</p>
        <button onClick={() => window.location.reload()} className="text-sm text-[#6C5CE7] hover:underline cursor-pointer">Retry</button>
      </div>
    );
  }

  if (!ready && allIcons.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex-1">
      <IconsHelmet />

      <div className="flex flex-1 pt-14">
        <Sidebar
          activeSet={activeSet}
          onSetChange={setActiveSet}
          activeStyle={activeStyle}
          onStyleChange={setActiveStyle}
          activeSize={activeSize}
          onSizeChange={setActiveSize}
          showNew={showNew}
          onNewToggle={setShowNew}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6">
          <IconSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterClick={() => setSidebarOpen(true)}
          />

          <IconCount count={filteredIcons.length} ready={ready} />

          <IconGrid
            filteredIcons={filteredIcons}
            activeStyle={activeStyle}
            displaySize={displaySize}
            displayWeight={displayWeight}
            ready={ready}
            searchQuery={searchQuery}
            onSearchClear={() => setSearchQuery('')}
          />
        </main>
      </div>
    </div>
  );
}
