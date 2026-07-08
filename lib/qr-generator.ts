/**
 * QR-генератор через Google Charts API (стабильно работает с сервера).
 * Fallback — встроенная SVG заглушка.
 */
export async function generateQR(text: string): Promise<string> {
  try {
    const url = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chld=M|2&chl=${encodeURIComponent(text)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    const b64 = Buffer.from(buf).toString('base64');
    return `data:image/png;base64,${b64}`;
  } catch (e) {
    console.error('[QR] Google Charts failed, trying qrserver:', e);
    // Второй fallback — qrserver.com
    try {
      const url2 = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(text)}`;
      const res2 = await fetch(url2, { signal: AbortSignal.timeout(6000) });
      if (!res2.ok) throw new Error(`HTTP ${res2.status}`);
      const buf2 = await res2.arrayBuffer();
      const b64_2 = Buffer.from(buf2).toString('base64');
      return `data:image/png;base64,${b64_2}`;
    } catch (e2) {
      console.error('[QR] qrserver also failed:', e2);
      return fallbackSVG();
    }
  }
}

export function unsupportedQR(_formatName: string): string {
  return fallbackSVG();
}

function fallbackSVG(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60"><rect width="200" height="60" fill="#f4f1fb"/><text x="100" y="35" text-anchor="middle" font-family="system-ui" font-size="12" fill="#a89fc0">QR код недоступен</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
