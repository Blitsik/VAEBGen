import QRCode from 'qrcode';

/**
 * Генерирует QR как SVG строку — не требует Canvas.
 * Работает на Vercel Node.js runtime.
 */
export async function generateQR(text: string): Promise<string> {
  try {
    // toString с type:'svg' не использует Canvas — только чистый JS
    const svg = await QRCode.toString(text, {
      type: 'svg',
      margin: 2,
      color: { dark: '#191333', light: '#ffffff' },
      errorCorrectionLevel: 'M',
      width: 280,
    });
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  } catch (e) {
    console.error('[QR] error:', e);
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
