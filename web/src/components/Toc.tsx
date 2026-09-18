import type { Heading } from '../content/manifest';

interface Props {
  headings: Heading[];
  pageId: string;
}

function Toc({ headings, pageId }: Props) {
  if (headings.length < 2) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <div className="toc-head">On this page</div>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#/${pageId}?h=${h.id}`}
          className={h.depth === 3 ? 'depth-3' : undefined}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

export default Toc;
