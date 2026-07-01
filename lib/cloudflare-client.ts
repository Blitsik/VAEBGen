import type { CloudflareRegisterResponse, CloudflareWarpResponse } from '@/types';

const BASE_URL = 'https://api.cloudflareclient.com/v0i1909051800';

const DEFAULT_HEADERS = {
  'User-Agent': 'okhttp/3.12.1',
  'Content-Type': 'application/json',
};

export async function registerClient(
  publicKey: string,
  proxyUrl?: string | null
): Promise<{ id: string; token: string }> {
  // Если задан proxyUrl — регистрируемся через внешний endpoint (нужный регион)
  if (proxyUrl) {
    return registerViaProxy(publicKey, proxyUrl);
  }

  const body = {
    install_id: '',
    tos: new Date().toISOString(),
    key: publicKey,
    fcm_token: '',
    type: 'ios',
    locale: 'en_US',
  };

  const res = await fetch(`${BASE_URL}/reg`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Registration failed: HTTP ${res.status}`);

  const data = (await res.json()) as CloudflareRegisterResponse;

  if (!data.result?.id || !data.result?.token) {
    throw new Error('Invalid registration response');
  }

  return { id: data.result.id, token: data.result.token };
}

/**
 * Регистрация через внешний Vercel-прокси.
 * Прокси сам стучится в Cloudflare из своего региона и возвращает id + token.
 */
async function registerViaProxy(
  publicKey: string,
  proxyUrl: string
): Promise<{ id: string; token: string }> {
  const res = await fetch(proxyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicKey }),
  });

  if (!res.ok) throw new Error(`Proxy registration failed: HTTP ${res.status}`);

  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.error || 'Proxy returned error');
  }

  // Прокси возвращает id и token напрямую из Cloudflare
  if (!data.id || !data.token) {
    throw new Error('Proxy did not return id/token');
  }

  return { id: data.id, token: data.token };
}

export async function enableWarp(
  clientId: string,
  token: string
): Promise<CloudflareWarpResponse> {
  const res = await fetch(`${BASE_URL}/reg/${clientId}`, {
    method: 'PATCH',
    headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${token}` },
    body: JSON.stringify({ warp_enabled: true }),
  });

  if (!res.ok) throw new Error(`Enable WARP failed: HTTP ${res.status}`);

  const data = (await res.json()) as CloudflareWarpResponse;

  if (!data.result?.config?.peers?.[0] || !data.result?.config?.interface) {
    throw new Error('Invalid WARP config response');
  }

  return data;
}
