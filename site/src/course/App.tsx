import { useCallback, useEffect, useState } from 'react';
import { Languages, LogOut, Menu, Moon, Search as SearchIcon, Sun } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import PageView from './components/PageView';
import Calculator from './components/Calculator';
import SearchPanel from './components/SearchPanel';
import RiskGate from './components/RiskGate';
import SignIn from './components/SignIn';
import SetPassword from './components/SetPassword';
import Landing from './components/Landing';
import { hrefFor, navigate, replaceRoute, useRoute } from './lib/router';
import { useAuth } from './lib/auth';
import { ARRIVED_FROM_LINK } from './lib/supabase';
import { useStore } from './lib/store';
import { useTheme } from './lib/theme';
import { useRiskGate } from './lib/gate';
import { DIR, rememberLang, useStrings, type Lang } from './lib/i18n';
import { courseFor } from './content/manifest';
import { QUIZ_BY_PAGE } from './content/quiz';

function App() {
  const route = useRoute();
  const { lang, pageId, anchor, inferred } = route;
  const { t } = useStrings(lang);
  const {
    status,
    error: authError,
    busy,
    awaitingConfirmation,
    recovering,
    linkFailed,
    resetSent,
    passwordUpdated,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    sendReset,
    setNewPassword,
    finishRecovery,
    clearError,
  } = useAuth();
  const signedIn = status === 'signed-in';
  const { ready, completed, quizzes, failed, toggle, submit } = useStore(signedIn);
  const { theme, toggle: toggleTheme } = useTheme();
  const { acknowledged, acknowledge } = useRiskGate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const course = courseFor(lang);
  const isHome = pageId === '';
  // The public routes. Everything else is the course, which needs an account.
  const isSignIn = pageId === 'signin' || pageId === 'signup' || pageId === 'reset';
  const isCalculator = pageId === 'calculator';
  const meta = course.pageById.get(pageId);
  // A quiz page is titled by its paper ("Module 00 Quiz"), not by the generic
  // "Quiz" the course manifest carries for the slot.
  const pageTitle = QUIZ_BY_PAGE.get(pageId)?.title[lang] ?? meta?.title;

  // A URL with no language segment is rewritten to the canonical one, so every
  // page can be shared in the language it was read in.
  // An email link's landing waits until the client has started up: until then
  // the URL is Supabase's to read.
  const readingLink = ARRIVED_FROM_LINK && status === 'checking';
  useEffect(() => {
    if (inferred && !readingLink) replaceRoute(lang, pageId);
  }, [inferred, readingLink, lang, pageId]);

  // An email link that did not sign the reader in goes to the reset form,
  // which explains why and offers a fresh link. The spent code or error comes
  // out of the address bar, so a reload does not try it again.
  useEffect(() => {
    if (!linkFailed) return;
    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${hrefFor(lang, 'reset')}`,
    );
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, [linkFailed, lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = DIR[lang];
  }, [lang]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pageId, lang]);

  useEffect(() => {
    if (signedIn && isSignIn) replaceRoute(lang, '');
  }, [signedIn, isSignIn, lang]);

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
        : pageTitle
          ? `${pageTitle} · ${brand}`
          : brand;
  }, [isHome, isCalculator, pageTitle, t]);

  const onSearchNavigate = useCallback((id: string) => navigate(lang, id), [lang]);

  // Signing out is leaving, not an interrupted attempt to reach a page, so it
  // returns to the public home page rather than the sign-in form.
  const leave = useCallback(async () => {
    await signOut();
    navigate(lang, '');
  }, [signOut, lang]);

  const other: Lang = lang === 'en' ? 'ar' : 'en';
  const switchLang = () => {
    rememberLang(other);
    navigate(other, pageId);
  };

  const headerTitle = isHome
    ? t.heroTitle
    : isCalculator
      ? t.calculator
      : (pageTitle ?? t.notFound);

  // The course is behind an account, so the loss statistic sits on the public
  // sign-in screen: a visitor reads it before signing in, not after.
  if (status === 'checking') {
    return <div className="boot" aria-busy="true" />;
  }

  // A reset link signs the reader in. Choosing the new password comes before
  // anything else.
  if (recovering && signedIn) {
    return (
      <SetPassword
        lang={lang}
        busy={busy}
        error={authError}
        done={passwordUpdated}
        onSave={setNewPassword}
        onContinue={() => {
          finishRecovery();
          navigate(lang, '');
        }}
      />
    );
  }

  if (!signedIn) {
    // The home page is public; the course is not. A deep link into the course
    // shows the sign-in screen without changing the route, so signing in lands
    // the reader on the page they asked for.
    if (isHome) {
      return (
        <Landing
          lang={lang}
          onSignIn={() => navigate(lang, 'signin')}
          onCreate={() => navigate(lang, 'signup')}
          onSwitchLang={switchLang}
        />
      );
    }

    const initialMode = pageId === 'signup' ? 'up' : pageId === 'reset' ? 'reset' : 'in';

    return (
      <SignIn
        // Remounted when the route changes the form, e.g. a "reset" link
        // followed while the sign-in form is open.
        key={initialMode}
        lang={lang}
        busy={busy}
        error={authError}
        awaitingConfirmation={awaitingConfirmation}
        resetSent={resetSent}
        initialMode={initialMode}
        prompt={isSignIn ? null : t.landSignInPrompt}
        notice={linkFailed && pageId === 'reset' && !resetSent ? t.resetLinkExpired : null}
        onSignIn={signIn}
        onSignUp={signUp}
        onGoogle={signInWithGoogle}
        onSendReset={sendReset}
        onSwitchLang={switchLang}
        onClearError={clearError}
        onHome={() => navigate(lang, '')}
      />
    );
  }

  if (!acknowledged) {
    return <RiskGate lang={lang} onAcknowledge={acknowledge} onSwitchLang={switchLang} />;
  }

  if (!ready) {
    return <div className="boot" aria-busy="true" />;
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

          {/* One site: Pro is a section of it, a full page load away. */}
          <a className="icon-btn pro-link" href={`/pro/${lang}`} aria-label={t.proLinkLabel}>
            {t.proLink}
          </a>

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

          <button className="icon-btn" onClick={leave} aria-label={t.signOut}>
            <LogOut size={16} />
          </button>
        </header>

        {failed && (
          <div className="sync-warn" role="status">
            {t.syncFailed}
          </div>
        )}

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
              quizzes={quizzes}
              onSubmitQuiz={submit}
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
