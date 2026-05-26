export function getAssetUrl(path: string) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // ensure base URL ends with a slash
  // @ts-ignore
  let base = import.meta.env?.BASE_URL || '/';
  if (!base.endsWith('/')) {
    base += '/';
  }
  
  return `${base}${cleanPath}`;
}
