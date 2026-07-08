// eslint-disable-next-line @typescript-eslint/no-require-imports
const QRCodeSVG = require('qrcode-svg');

/**
 * Генерирует QR-код как SVG — не требует Canvas, работает на Vercel Edge/Node.
 * Возвращает data URL с SVG.
 */
export async function generateQR(text: string): Promise<string> {
  try {
    const qr = new QRCodeSVG({
      content: text,
      width: 280,
      height: 280,
      color: '#191333',
      background: '#ffffff',
      ecl: 'M',
      padding: 2,
      join: true,
    });
    const svg = qr.svg();
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  } catch (e) {
    console.error('QR generation error:', e);
    return fallbackSVG();
  }
}

export function unsupportedQR(formatName: string): string {
  return fallbackSVG(formatName);
}

function fallbackSVG(label = 'QR код недоступен'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#f4f1fb"/>
    <text x="100" y="105" text-anchor="middle" font-family="system-ui" font-size="12" fill="#a89fc0">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
