export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(path) {
  return `${getApiBaseUrl()}${path}`;
}

export function normalizeItems(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === 'object') {
    const candidate = data.results || data.items || data.data || data.records;
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
}
