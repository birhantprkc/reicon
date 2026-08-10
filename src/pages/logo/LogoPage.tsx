import { useState, useEffect, useDeferredValue, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import LogoHelmet from './LogoHelmet';
import LogoSidebar from './LogoSidebar';
import LogoSearchBar from './LogoSearchBar';
import IconCount from '../icons/IconCount';
import LogoGrid from './LogoGrid';
import LoadMoreButton from '../../components/ui/LoadMoreButton';
import { SortOption } from '../../components/ui/DesktopFilterDropdown';
import {
  LogoItem,
  loadLogoGroup,
  searchLogos,
} from '../../lib/logo-data';

const BATCH_SIZE = 120;

export default function LogoPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = searchParams.get('category') || 'all';
  const initialQ = searchParams.get('q') || '';
  const initialSize = searchParams.get('size') || '36';

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [activeSize, setActiveSize] = useState(initialSize);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const deferredSearchQuery = useDeferredValue(searchQuery);

  const [items, setItems] = useState<LogoItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<LogoItem[]>([]);
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('az');

  // Sync state when searchParams change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const q = searchParams.get('q') || '';
    const sz = searchParams.get('size') || '36';

    setActiveCategory(cat);
    setSearchQuery(q);
    setActiveSize(sz);
  }, [searchParams]);

  // Load items when category changes
  useEffect(() => {
    let cancelled = false;
    setReady(false);

    loadLogoGroup(activeCategory).then((list) => {
      if (!cancelled) {
        setItems(list);
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [activeCategory]);

  // Filter items when search query changes
  useEffect(() => {
    let cancelled = false;
    if (!deferredSearchQuery.trim()) {
      setFilteredItems(items);
      return;
    }

    searchLogos(deferredSearchQuery, items).then((matched) => {
      if (!cancelled) {
        setFilteredItems(matched);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [deferredSearchQuery, items]);

  const sortedItems = useMemo(() => {
    if (sortBy === 'za') return [...filteredItems].sort((a, b) => b.name.localeCompare(a.name));
    return [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredItems, sortBy]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(BATCH_SIZE);

    const newParams = new URLSearchParams(searchParams);
    if (category !== 'all') {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSizeChange = (size: string) => {
    setActiveSize(size);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('size', size);
    setSearchParams(newParams, { replace: true });
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(BATCH_SIZE);

    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setVisibleCount(BATCH_SIZE);

    const newParams = new URLSearchParams(searchParams);
    newParams.delete('q');
    setSearchParams(newParams, { replace: true });
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + BATCH_SIZE);
  };

  const visibleItems = useMemo(() => {
    return sortedItems.slice(0, visibleCount);
  }, [sortedItems, visibleCount]);

  const displaySize = parseInt(activeSize, 10) || 36;

  return (
    <div className="flex-1">
      <LogoHelmet
        title={
          activeCategory !== 'all'
            ? `${activeCategory} Brand Logos - Vector SVG | Reicon`
            : '4,900+ Brand Logos - High Quality SVG & PNG Vectors | Reicon'
        }
        description={`Explore clean vector SVG brand logos for ${activeCategory === 'all' ? 'top tech companies and global brands' : activeCategory}. Free download and instant code copy.`}
      />

      <div className="flex flex-1 pt-14 px-4 md:px-10">
        <LogoSidebar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          activeSize={activeSize}
          onSizeChange={handleSizeChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
        />

        <main className={`flex-1 py-4 md:py-6 px-0 md:pr-0 ${sidebarCollapsed ? 'md:pl-0' : 'md:pl-6'} transition-all duration-300 ease-in-out`}>
          <LogoSearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onFilterClick={() => setSidebarOpen(true)}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <IconCount count={sortedItems.length} ready={ready} />

          <LogoGrid
            items={visibleItems}
            displaySize={displaySize}
            ready={ready}
            searchQuery={searchQuery}
            onSearchClear={handleSearchClear}
          />

          {ready && filteredItems.length > 0 && (
            <LoadMoreButton
              visibleCount={visibleCount}
              totalCount={filteredItems.length}
              onLoadMore={handleLoadMore}
              itemType="logos"
            />
          )}
        </main>
      </div>
    </div>
  );
}
