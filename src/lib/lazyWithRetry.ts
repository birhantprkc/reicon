import { lazy, ComponentType } from 'react';

/**
 * Wraps React.lazy to automatically reload with cache-busting when a dynamic import fails
 * due to Cloudflare deployment chunk updates (e.g. "Failed to fetch dynamically imported module").
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    const pageHasBeenRefreshed = sessionStorage.getItem('reicon_chunk_refreshed') === 'true';

    try {
      const component = await componentImport();
      sessionStorage.removeItem('reicon_chunk_refreshed');
      sessionStorage.removeItem('reicon_eb_refreshed');
      return component;
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : String(error);
      const isChunkError =
        errMessage.includes('Failed to fetch') ||
        errMessage.includes('dynamically imported module') ||
        errMessage.includes('Importing a module script failed') ||
        errMessage.includes('Failed to load module script') ||
        errMessage.includes('Strict MIME type') ||
        errMessage.includes('text/html') ||
        (error as { name?: string })?.name === 'ChunkLoadError';

      if (isChunkError && !pageHasBeenRefreshed) {
        sessionStorage.setItem('reicon_chunk_refreshed', 'true');
        const cleanPath = window.location.pathname;
        window.location.href = `${cleanPath}?v=${Date.now()}`;
        return new Promise<{ default: T }>(() => {});
      }

      throw error;
    }
  });
}
