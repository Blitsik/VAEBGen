import QRCode from 'qrcode';

/**
 * Генерирует QR-код локально (без внешних API).
 * Возвращает data URL картинки PNG в base64.
 */
export async function generateQR(text: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: 300,
      margin: 2,
      color: {
        dark: '#191333',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
    return dataUrl;
  } catch {
    return fallbackSVG();
  }
}

export function unsupportedQR(formatName: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#f4f1fb"/>
    <text x="100" y="105" text-anchor="middle" font-family="system-ui" font-size="12" fill="#a89fc0">${formatName} — QR не поддерживается</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function fallbackSVG(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#f4f1fb"/>
    <text x="100" y="105" text-anchor="middle" font-family="system-ui" font-size="12" fill="#a89fc0">QR код недоступен</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
