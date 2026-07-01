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

      {/* Banner */}
      <div style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        position: 'relative',
        height: 150,
        background: 'linear-gradient(160deg, var(--accent-deep), var(--accent) 55%, #c9a6ff)',
        boxShadow: 'var(--shadow-md)',
      }}>
        <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="40" cy="30" r="70" fill="#ffffff22" />
          <circle cx="290" cy="130" r="90" fill="#ffffff18" />
          <path d="M20 100 C 90 40, 200 160, 300 60" stroke="#ffffff55" strokeWidth="2" fill="none" strokeDasharray="2 8" />
        </svg>
        <div style={{ position: 'absolute', left: 20, bottom: 16, color: '#fff' }}>
          <b style={{ display: 'block', fontFamily: "'Unbounded', sans-serif", fontSize: 14 }}>WARP Generator</b>
          <span style={{ fontSize: 11.5, opacity: .85 }}>Cloudflare WARP конфиги</span>
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
