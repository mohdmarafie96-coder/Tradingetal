'use client';

import dynamic from 'next/dynamic';

/**
 * The course reads window.location.hash and localStorage from its first render,
 * so it renders in the browser only. Nothing useful is lost: it was a
 * browser-rendered app before the move as well.
 */
const App = dynamic(() => import('./App'), { ssr: false });

export default function CourseMount() {
  return <App />;
}
