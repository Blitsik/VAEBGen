'use client';

import Image from 'next/image';

const TG_URL = 'https://t.me/vaeb_ai';

const SERVICES_LIST = [
  'Discord','Telegram','YouTube','Instagram','Twitter (X)',
  'WhatsApp','Signal','Proton','Patreon','Canva','Modrinth','Facebook',
];

export function Sidebar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Info images instead of banner */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <Image src="/info1.png" alt="Инструкция 1" width={340} height={200} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <Image src="/info2.png" alt="Инструкция 2" width={340} height={200} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </div>

      {/* Telegram link */}
      <a href={TG_URL} target="_blank" rel="noopener noreferrer" style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 'var(--radius-md)', padding: '14px 16px',
        boxShadow: 'var(--shadow-sm)', textDecoration: 'none', color: 'var(--text)',
        transition: '.15s',
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--line)';
          e.currentTarget.style.transform = 'none';
        }}
      >
        <div style={{
          width: 38, height: 38, borderRadius: 11,
          background: 'var(--surface-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          overflow: 'hidden',
        }}>
          <Image src="/tg.jpg" alt="Telegram" width={38} height={38} style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700 }}>Telegram</div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 600 }}>@vaeb_ai</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M7 17L17 7M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      {/* Services */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)', padding: 20, boxShadow: 'var(--shadow-sm)',
      }}>
        <h4 style={{
          margin: '0 0 14px', fontSize: 13, fontWeight: 700,
          color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em',
        }}>Работает с сервисами</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SERVICES_LIST.map((s) => (
            <span key={s} style={{
              fontSize: 11.5, fontWeight: 600,
              background: 'var(--surface-2)', color: 'var(--text-muted)',
              padding: '6px 10px', borderRadius: 999, border: '1px solid var(--line)',
            }}>{s}</span>
          ))}
        </div>
      </div>

    </div>
  );
}
