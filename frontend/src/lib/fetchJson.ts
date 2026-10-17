export class HttpError extends Error {
  constructor(public readonly status: number) {
    super(`HTTP request failed with status ${status}`);
    this.name = 'HttpError';
  }
}

export async function fetchJson(
  url: string,
  init?: RequestInit,
): Promise<unknown> {
  const response = await fetch(url, init);
  if (!response.ok) throw new HttpError(response.status);
  return response.json();
}
