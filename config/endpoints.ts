export interface EndpointOption {
  id: string;
  label: string;
  value: string;
  flag?: string;
  /** URL прокси-сервера для регистрации в Cloudflare (вместо прямого запроса) */
  proxyUrl?: string;
}

export const ENDPOINTS: EndpointOption[] = [
  {
    id: 'default',
    label: 'По умолчанию',
    value: '162.159.195.1:500',
  },
  {
    id: 'default2',
    label: 'Альтернативный',
    value: 'engage.cloudflareclient.com:2408',
  },
  {
    id: 'custom',
    label: 'Указать свой адрес',
    value: '',
  },
  {
    id: 'server-de',
    label: 'Германия',
    value: 'engage.cloudflareclient.com:2408',
    flag: 'DE',
    proxyUrl: 'https://warp-endpoint-de.vercel.app/api/warp',
  },
];

export function getEndpointValue(id: string, customValue?: string): string {
  if (id === 'custom') return customValue || 'engage.cloudflareclient.com:4500';
  const ep = ENDPOINTS.find((e) => e.id === id);
  return ep?.value || 'engage.cloudflareclient.com:4500';
}

export function getProxyUrl(id: string): string | null {
  const ep = ENDPOINTS.find((e) => e.id === id);
  return ep?.proxyUrl ?? null;
}

export function isExternalEndpoint(id: string): string | null {
  return null; // tg-ссылки убраны
}
