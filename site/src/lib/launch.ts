/**
 * Whether Pro is open to the public.
 *
 * While it is false, Pro is "coming soon":
 * - site/src/proxy.ts shows every /pro page as /pro/{lang}/soon to anyone who
 *   is not an admin, so admins can keep checking the real thing;
 * - the course's Pro links carry a "Soon" badge.
 * Opening Pro is this one line, plus a deploy.
 */
export const PRO_OPEN = false;
