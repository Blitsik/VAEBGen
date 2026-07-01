export interface EndpointOption {
  id: string;
  label: string;
  value: string;
  flag?: string;
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
    id: 'random',
    label: '🌍 Случайный',
    value: 'random',
  },
  {
    id: 'ep-de',
    label: 'Германия',
    value: '162.159.192.1:2408',
    flag: 'DE',
  },
  {
    id: 'ep-nl',
    label: 'Нидерланды',
    value: '162.159.192.9:2408',
    flag: 'NL',
  },
  {
    id: 'ep-fi',
    label: 'Финляндия',
    value: '162.159.192.5:2408',
    flag: 'FI',
  },
  {
    id: 'ep-pl',
    label: 'Польша',
    value: '162.159.195.5:2408',
    flag: 'PL',
  },
  {
    id: 'ep-fr',
    label: 'Франция',
    value: '162.159.195.9:2408',
    flag: 'FR',
  },
  {
    id: 'ep-us',
    label: 'США',
    value: '162.159.193.1:2408',
    flag: 'US',
  },
  {
    id: 'ep-gb',
    label: 'Великобритания',
    value: '162.159.193.5:2408',
    flag: 'GB',
  },
  {
    id: 'ep-lv',
    label: 'Латвия',
    value: '162.159.195.100:2408',
    flag: 'LV',
  },
  {
    id: 'ep-se',
    label: 'Швеция',
    value: '162.159.192.100:2408',
    flag: 'SE',
  },
  {
    id: 'ep-ch',
    label: 'Швейцария',
    value: '188.114.96.1:2408',
    flag: 'CH',
  },
  {
    id: 'ep-at',
    label: 'Австрия',
    value: '188.114.97.1:2408',
    flag: 'AT',
  },
];

// Все IP кроме служебных (default, custom, random)
const RANDOM_POOL = ENDPOINTS.filter((e) => e.flag);

export function getEndpointValue(id: string, customValue?: string): string {
  if (id === 'custom') return customValue || 'engage.cloudflareclient.com:4500';
  if (id === 'random') {
    const pick = RANDOM_POOL[Math.floor(Math.random() * RANDOM_POOL.length)];
    return pick.value;
  }
  const ep = ENDPOINTS.find((e) => e.id === id);
  return ep?.value || 'engage.cloudflareclient.com:4500';
}

export function getProxyUrl(id: string): string | null {
  const ep = ENDPOINTS.find((e) => e.id === id);
  return ep?.proxyUrl ?? null;
}

export function isExternalEndpoint(id: string): string | null {
  return null;
}
