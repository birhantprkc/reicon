import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isChunkError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, isChunkError: false };

  static getDerivedStateFromError(error: Error): State {
    const msg = error?.message || '';
    const isChunkError =
      msg.includes('Failed to fetch') ||
      msg.includes('dynamically imported module') ||
      msg.includes('Importing a module script failed') ||
      msg.includes('Failed to load module script') ||
      msg.includes('Strict MIME type') ||
      msg.includes('text/html') ||
      error?.name === 'TypeError' ||
      error?.name === 'ChunkLoadError';

    return { hasError: true, error, isChunkError };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
    if (this.state.isChunkError) {
      const refreshed = sessionStorage.getItem('reicon_eb_refreshed') === 'true';
      if (!refreshed) {
        sessionStorage.setItem('reicon_eb_refreshed', 'true');
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-bg-base flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center bg-text-base/3 border border-text-base/8 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex items-center justify-center text-[#6C5CE7]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </div>
              <h1 className="text-xl font-serif font-bold text-text-base mb-2">
                {this.state.isChunkError ? 'New Version Available' : 'Something went wrong'}
              </h1>
              <p className="text-sm text-text-base/60 mb-6">
                {this.state.isChunkError
                  ? 'Reicon has just been updated with new features and improvements. Please reload to load the latest version.'
                  : 'An unexpected error occurred while loading this view.'}
              </p>
              <button
                onClick={() => {
                  sessionStorage.removeItem('reicon_chunk_refreshed');
                  sessionStorage.removeItem('reicon_eb_refreshed');
                  window.location.reload();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#6C5CE7] hover:bg-[#5a4bd1] text-white text-sm font-semibold transition-all shadow-[0_0_16px_rgba(108,92,231,0.3)] cursor-pointer"
              >
                Reload Application
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
