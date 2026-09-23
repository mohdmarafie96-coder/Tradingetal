export default function StatusTag({ status }: { status: string | null }) {
  if (!status) return <span className="muted">—</span>;
  return <span className={`tag tag-${status}`}>{status === 'requested' ? 'awaiting approval' : status}</span>;
}
