/**
 * QR-генератор через qrserver.com.
 * Работает с серверного Node.js на Vercel без npm зависимостей.
 */
export async function generateQR(text: string): Promise<string> {
  try {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&ecc=M&data=${encodeURIComponent(text)}`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': 'WarpGenerator/2.0' },
    });
    if (!res.ok) throw new Error(`qrserver HTTP ${res.status}`);
    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('image')) throw new Error(`unexpected content-type: ${contentType}`);
    const buf = await res.arrayBuffer();
    if (buf.byteLength < 100) throw new Error('response too small');
    const b64 = Buffer.from(buf).toString('base64');
    return `data:image/png;base64,${b64}`;
  } catch (e) {
    console.error('[QR] failed:', e);
    return fallbackSVG();
  }
}

export function unsupportedQR(_formatName: string): string {
  return fallbackSVG();
}

function fallbackSVG(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60"><rect width="200" height="60" fill="#f4f1fb"/><text x="100" y="35" text-anchor="middle" font-family="system-ui" font-size="12" fill="#a89fc0">QR код недоступен</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
