import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/lib/supabase/config';
import { LANGS, isLang, type Lang } from '@/lib/i18n';

/** First language the browser asks for that we actually publish in. */
function preferredLang(request: NextRequest): Lang {
  const header = request.headers.get('accept-language') ?? '';
  for (const part of header.split(',')) {
    const tag = part.split(';')[0].trim().toLowerCase().split('-')[0];
    const hit = LANGS.find((l) => l === tag);
    if (hit) return hit;
  }
  return 'en';
}

/**
 * Next 16 calls this file proxy.ts; middleware.ts still works but is deprecated.
 *
 * Refreshes the Supabase session on every navigation and writes the rotated
 * cookies back onto the response. Without this a server component would read an
 * expired token and bounce a signed-in user to the sign-in screen.
 */
export async function proxy(request: NextRequest) {
  // Every rendered route lives under a language segment — that is what lets the
  // root layout put lang and dir on the document element, which the shared
  // tokens need for the Arabic type. A path that does not start with one is
  // given one: / becomes /en, and /signin (as an email link might send) becomes
  // /en/signin rather than an unstyled 404 with no layout to render in.
  // /api stays unprefixed — route handlers do not render a document.
  const { pathname } = request.nextUrl;
  const first = pathname.split('/')[1] ?? '';
  if (first !== 'api' && !isLang(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLang(request)}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  // not-found.tsx gets no route params, so it reads the language back from this.
  request.headers.set('x-pathname', pathname);

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) response.cookies.set(name, value, options);
      },
    },
  });

  // getUser, not getSession: this call is what actually refreshes the token.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)'],
};
