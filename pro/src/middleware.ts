import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/lib/supabase/config';
import { LANGS, type Lang } from '@/lib/i18n';

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
 * Refreshes the Supabase session on every navigation and writes the rotated
 * cookies back onto the response. Without this a server component would read an
 * expired token and bounce a signed-in user to the sign-in screen.
 */
export async function middleware(request: NextRequest) {
  // Every rendered route lives under a language segment — that is what lets the
  // root layout put lang and dir on the document element, which the shared
  // tokens need for the Arabic type. So / never renders; it redirects.
  const { pathname } = request.nextUrl;
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLang(request)}`;
    return NextResponse.redirect(url);
  }

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
