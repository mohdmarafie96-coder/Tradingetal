import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/lib/supabase/config';
import { LANGS, isLang, type Lang } from '@/lib/i18n';
import { PRO_OPEN } from '@/lib/launch';

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
/** The retired Pro deployment. Anything that still reaches it moves to the one site. */
const RETIRED_HOST = /^tradingetal-pro[.-]/;
const SITE_ORIGIN = 'https://tradingetal.vercel.app';

/**
 * Next 16 calls this file proxy.ts; middleware.ts still works but is deprecated.
 *
 * One site, three areas:
 *   /         the course — a client app with hash routes (#/en/m03/...), so a
 *             saved lesson link keeps working and never reaches this function
 *   /pro/...  Pro, under a language segment
 *   /admin    the admin console
 *
 * Refreshes the Supabase session on every navigation and writes the rotated
 * cookies back onto the response. Without this a server component would read an
 * expired token and bounce a signed-in user to the sign-in screen.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (RETIRED_HOST.test(request.headers.get('host') ?? '')) {
    // Old Pro links were /en, /ar/signin... — they live under /pro now.
    const first = pathname.split('/')[1] ?? '';
    const path = isLang(first) ? `/pro${pathname}` : pathname;
    return NextResponse.redirect(`${SITE_ORIGIN}${path}${search}`, 308);
  }

  const segments = pathname.split('/');
  const first = segments[1] ?? '';

  // Bare /en or /ar, from the days Pro had its own address.
  if (isLang(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/pro${pathname}`;
    return NextResponse.redirect(url);
  }

  // Pro and the privacy policy sit under a language segment: that is what lets
  // their root layouts put lang and dir on the document element, which the
  // shared tokens need for the Arabic type. /pro, /pro/signin and /privacy get
  // one.
  if ((first === 'pro' || first === 'privacy') && !isLang(segments[2] ?? '')) {
    const rest = segments.slice(2).filter(Boolean).join('/');
    const url = request.nextUrl.clone();
    url.pathname = `/${first}/${preferredLang(request)}${rest ? `/${rest}` : ''}`;
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Until Pro opens, every Pro address shows the coming-soon page, except to
  // an admin. It is a rewrite, not a redirect, so the address stays as asked
  // and opening Pro changes nothing a visitor has bookmarked.
  if (!PRO_OPEN && first === 'pro' && segments[3] !== 'soon') {
    const admin = user ? (await supabase.rpc('is_admin')).data === true : false;
    if (!admin) {
      const url = request.nextUrl.clone();
      url.pathname = `/pro/${segments[2]}/soon`;
      const rewrite = NextResponse.rewrite(url, { request });
      for (const cookie of response.cookies.getAll()) rewrite.cookies.set(cookie);
      return rewrite;
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)'],
};
