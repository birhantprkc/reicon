import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
    const msg = error?.message || '';
    if (
      msg.includes('Failed to fetch dynamically imported module') ||
      msg.includes('Importing a module script failed') ||
      msg.includes('text/html')
    ) {
      const refreshed = sessionStorage.getItem('reicon_eb_refreshed') === 'true';
      if (!refreshed) {
        sessionStorage.setItem('reicon_eb_refreshed', 'true');
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-bg-base flex items-center justify-center">
          <div className="text-center px-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="text-lg font-serif text-text-base mb-2">Something went wrong</h1>
            <p className="text-sm text-text-base/50 mb-6">The page failed to load. Please try refreshing.</p>
            <button onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-[#6C5CE7] text-white text-sm font-medium hover:bg-[#5a4bd1] transition-colors cursor-pointer">
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
