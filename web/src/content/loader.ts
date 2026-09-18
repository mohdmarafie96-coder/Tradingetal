const cache = new Map<string, Record<string, string>>();
const inFlight = new Map<string, Promise<Record<string, string>>>();

const chunkLoaders: Record<string, () => Promise<{ default: Record<string, string> }>> = {
  m00: () => import('./chunks/m00'),
  m01: () => import('./chunks/m01'),
  m02: () => import('./chunks/m02'),
  m03: () => import('./chunks/m03'),
  m04: () => import('./chunks/m04'),
  m05: () => import('./chunks/m05'),
  m06: () => import('./chunks/m06'),
  m07: () => import('./chunks/m07'),
  m08: () => import('./chunks/m08'),
  m09: () => import('./chunks/m09'),
  m10: () => import('./chunks/m10'),
  m11: () => import('./chunks/m11'),
  misc: () => import('./chunks/misc'),
  reference: () => import('./chunks/reference'),
  templates: () => import('./chunks/templates'),
};

export function getCached(chunk: string): Record<string, string> | null {
  return cache.get(chunk) ?? null;
}

export async function loadChunk(chunk: string): Promise<Record<string, string>> {
  const cached = cache.get(chunk);
  if (cached) return cached;

  const pending = inFlight.get(chunk);
  if (pending) return pending;

  const loader = chunkLoaders[chunk];
  if (!loader) throw new Error(`Unknown content chunk: ${chunk}`);

  const promise = loader().then((mod) => {
    cache.set(chunk, mod.default);
    inFlight.delete(chunk);
    return mod.default;
  });
  inFlight.set(chunk, promise);
  return promise;
}
