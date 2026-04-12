export function buildCacheKey(params: Record<string, unknown>): string {
  const normalized: Record<string, unknown> = {};
  Object.keys(params)
    .sort()
    .forEach((key) => {
      const value = params[key];
      if (value === undefined || value === null || value === "") return;
      normalized[key] = Array.isArray(value) ? [...value].sort() : value;
    });
  return JSON.stringify(normalized);
}
