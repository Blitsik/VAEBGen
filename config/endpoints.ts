export interface EndpointOption {
  id: string;
  label: string;
  value: string;
}

// Все подсети WARP endpoints
const SUBNETS = [
  '162.159.192',
  '162.159.195',
  '8.6.112',
  '8.34.70',
  '8.34.146',
  '8.35.211',
  '8.39.125',
  '8.39.204',
  '8.39.214',
  '8.47.69',
  '188.114.96',
  '188.114.97',
  '188.114.98',
  '188.114.99',
];

const PORTS = [
  500, 854, 859, 864, 878, 880, 890, 891, 894, 903,
  908, 928, 934, 939, 942, 943, 945, 946, 955, 968,
  987, 988, 1002, 1010, 1014, 1018, 1070, 1074, 1180,
  1387, 1701, 1843, 2371, 2408, 2506, 3138, 3476, 3581,
  3854, 4177, 4198, 4233, 4500, 5279, 5956, 7103, 7152,
  7156, 7281, 7559, 8319, 8742, 8854, 8886,
];

export const ENDPOINTS: EndpointOption[] = [
  { id: 'random',   label: 'Случайный',       value: 'random' },
  { id: 'default',  label: 'По умолчанию',     value: '162.159.195.1:500' },
  { id: 'default2', label: 'Альтернативный',   value: 'engage.cloudflareclient.com:2408' },
  { id: 'custom',   label: 'Указать свой',     value: '' },
];

/** Генерирует случайный endpoint из полного пула WARP IP */
export function randomEndpoint(): string {
  const subnet = SUBNETS[Math.floor(Math.random() * SUBNETS.length)];
  const octet  = Math.floor(Math.random() * 256); // 0–255
  const port   = PORTS[Math.floor(Math.random() * PORTS.length)];
  return `${subnet}.${octet}:${port}`;
}

export function getEndpointValue(id: string, customValue?: string): string {
  if (id === 'custom')  return customValue?.trim() || 'engage.cloudflareclient.com:4500';
  if (id === 'random')  return randomEndpoint();
  const ep = ENDPOINTS.find((e) => e.id === id);
  return ep?.value || randomEndpoint();
}

export function getProxyUrl(_id: string): string | null { return null; }
export function isExternalEndpoint(_id: string): string | null { return null; }
