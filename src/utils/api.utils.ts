const API_BASE = "http://localhost:3000";

async function parseJsonSafely(response: Response): Promise<any> {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await parseJsonSafely(response);

  if (!response.ok) {
    const message = data?.error || "Request failed";
    throw new Error(message);
  }

  return data as T;
}

export function getApiBase(): string {
  return API_BASE;
}
