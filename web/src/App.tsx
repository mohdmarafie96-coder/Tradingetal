import { useCallback, useEffect, useState } from 'react';
import { Menu, Moon, Search as SearchIcon, Sun } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import PageView from './components/PageView';
import Calculator from './components/Calculator';
import SearchPanel from './components/SearchPanel';
import RiskGate from './components/RiskGate';
import Toc from './components/Toc';
import { navigate, useRoute } from './lib/router';
import { useProgress } from './lib/progress';
import { useTheme } from './lib/theme';
import { useRiskGate } from './lib/gate';
import { pageById } from './content/manifest';

function App() {
  const route = useRoute();
  const { completed, toggle } = useProgress();
  const { theme, toggle: toggleTheme } = useTheme();
  const { acknowledged, acknowledge } = useRiskGate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { pageId, anchor } = route;
  const isHome = pageId === '';
  const isCalculator = pageId === 'calculator';
  const meta = pageById.get(pageId);

  useEffect(() => {
    setMenuOpen(false);
  }, [pageId]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const title = isHome
      ? 'CFD Trading Fundamentals'
      : isCalculator
        ? 'Calculator · CFD Trading Fundamentals'
        : meta
          ? `${meta.title} · CFD Trading Fundamentals`
          : 'CFD Trading Fundamentals';
    document.title = title;
  }, [isHome, isCalculator, meta]);

  const onSearchNavigate = useCallback((id: string) => navigate(id), []);

  const headerTitle = isHome
    ? 'CFD Trading Fundamentals'
    : isCalculator
      ? 'Calculator'
      : (meta?.title ?? 'Not found');

  if (!acknowledged) {
    return <RiskGate onAcknowledge={acknowledge} />;
  }

  return (
    <div className="shell">
      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}

      <Sidebar
        activeId={isHome ? '' : pageId}
        completed={completed}
        open={menuOpen}
        onNavigate={() => setMenuOpen(false)}
      />

      <div className="main">
        <header className="topbar">
          <button
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
          >
            <Menu size={18} />
          </button>

          <div className="topbar-title">{headerTitle}</div>
          <div className="topbar-spacer" />

          <button
            className="search-trigger"
            onClick={() => setSearchOpen(true)}
            aria-label="Search the course"
          >
            <SearchIcon size={15} />
            <span>Search</span>
            <kbd className="kbd">⌘K</kbd>
          </button>

          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </header>

        <div className="content">
          {isHome ? (
            <Home completed={completed} />
          ) : isCalculator ? (
            <Calculator />
          ) : (
            <>
              <PageView
                pageId={pageId}
                anchor={anchor}
                completed={completed}
                onToggleComplete={toggle}
              />
              {meta && <Toc headings={meta.headings} pageId={pageId} />}
            </>
          )}
        </div>
      </div>

      {searchOpen && (
        <SearchPanel onClose={() => setSearchOpen(false)} onNavigate={onSearchNavigate} />
      )}
    </div>
  );
}

export default App;
