import { useCallback, useEffect, useState } from 'react';
import { Languages, Menu, Moon, Search as SearchIcon, Sun } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import PageView from './components/PageView';
import Calculator from './components/Calculator';
import SearchPanel from './components/SearchPanel';
import RiskGate from './components/RiskGate';
import { hrefFor, navigate, replaceRoute, useRoute } from './lib/router';
import { useProgress } from './lib/progress';
import { useTheme } from './lib/theme';
import { useRiskGate } from './lib/gate';
import { DIR, rememberLang, useStrings, type Lang } from './lib/i18n';
import { courseFor } from './content/manifest';

function App() {
  const route = useRoute();
  const { lang, pageId, anchor, inferred } = route;
  const { t } = useStrings(lang);
  const { completed, toggle } = useProgress();
  const { theme, toggle: toggleTheme } = useTheme();
  const { acknowledged, acknowledge } = useRiskGate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const course = courseFor(lang);
  const isHome = pageId === '';
  const isCalculator = pageId === 'calculator';
  const meta = course.pageById.get(pageId);

  // A URL with no language segment is rewritten to the canonical one, so every
  // page can be shared in the language it was read in.
  useEffect(() => {
    if (inferred) replaceRoute(lang, pageId);
  }, [inferred, lang, pageId]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = DIR[lang];
  }, [lang]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pageId, lang]);

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
    const brand = 'Trading et al.';
    document.title = isHome
      ? `${t.heroTitle} · ${brand}`
      : isCalculator
        ? `${t.calculator} · ${brand}`
        : meta
          ? `${meta.title} · ${brand}`
          : brand;
  }, [isHome, isCalculator, meta, t]);

  const onSearchNavigate = useCallback((id: string) => navigate(lang, id), [lang]);

  const other: Lang = lang === 'en' ? 'ar' : 'en';
  const switchLang = () => {
    rememberLang(other);
    navigate(other, pageId);
  };

  const headerTitle = isHome
    ? t.heroTitle
    : isCalculator
      ? t.calculator
      : (meta?.title ?? t.notFound);

  if (!acknowledged) {
    return <RiskGate lang={lang} onAcknowledge={acknowledge} onSwitchLang={switchLang} />;
  }

  return (
    <div className="shell">
      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}

      <Sidebar
        lang={lang}
        activeId={pageId}
        completed={completed}
        open={menuOpen}
        onNavigate={() => setMenuOpen(false)}
      />

      <div className="main">
        <header className="topbar">
          <button
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={t.openNav}
            aria-expanded={menuOpen}
          >
            <Menu size={18} />
          </button>

          <div className="topbar-title">{headerTitle}</div>
          <div className="topbar-spacer" />

          <button
            className="search-trigger"
            onClick={() => setSearchOpen(true)}
            aria-label={t.search}
          >
            <SearchIcon size={15} />
            <span>{t.search}</span>
            <kbd className="kbd">&#8984;K</kbd>
          </button>

          <button className="icon-btn lang-btn" onClick={switchLang} aria-label={t.switchLang}>
            <Languages size={15} />
            <span>{other === 'ar' ? 'العربية' : 'EN'}</span>
          </button>

          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.toLight : t.toDark}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </header>

        <div className="content">
          {isHome ? (
            <Home lang={lang} completed={completed} />
          ) : isCalculator ? (
            <Calculator lang={lang} />
          ) : (
            <PageView
              lang={lang}
              pageId={pageId}
              anchor={anchor}
              completed={completed}
              onToggleComplete={toggle}
            />
          )}
        </div>
      </div>

      {searchOpen && (
        <SearchPanel
          lang={lang}
          onClose={() => setSearchOpen(false)}
          onNavigate={onSearchNavigate}
        />
      )}
    </div>
  );
}

export { hrefFor };
export default App;
