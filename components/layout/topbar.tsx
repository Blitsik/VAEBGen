'use client';

const TABS = [
  { id: 'generator', label: 'Генератор' },
  { id: 'applications', label: 'Приложения' },
  { id: 'about', label: 'О проекте' },
];

interface TopbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onScrollTo: (id: string) => void;
}

export function Topbar({ activeTab, onTabChange, onScrollTo }: TopbarProps) {
  return (
    <header style={{
      position: 'sticky',
      top: 14,
      zIndex: 50,
      maxWidth: 1180,
      margin: '14px auto 0',
      padding: '0 20px',
    }}>
      <div style={{
        background: 'rgba(255,255,255,.78)',
        backdropFilter: 'blur(14px)',
        border: '1px solid var(--line)',
        borderRadius: 999,
        padding: '8px 10px 8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        gap: 12,
        flexWrap: 'wrap' as const,
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 14.5 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(145deg, var(--accent), var(--accent-deep))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', boxShadow: '0 6px 14px -6px rgba(67,38,196,.6)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 10h-.3A6 6 0 0 0 6.5 10.5 4 4 0 0 0 8 18h10a4 4 0 0 0 0-8z" fill="currentColor" fillOpacity=".9"/>
            </svg>
          </div>
          WARP Generator
        </div>

        {/* Nav tabs */}
        <nav style={{
          display: 'flex', gap: 2,
          background: 'var(--surface-2)',
          padding: 4, borderRadius: 999,
        }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                border: 'none',
                background: activeTab === tab.id ? 'var(--text)' : 'transparent',
                padding: '8px 16px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: '.2s',
                fontFamily: 'inherit',
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => onScrollTo('generator')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'linear-gradient(145deg, var(--accent), var(--accent-deep))',
            color: '#fff', border: 'none',
            padding: '9px 16px', borderRadius: 999,
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 8px 20px -8px rgba(67,38,196,.55)',
            transition: 'transform .15s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" />
          </svg>
          Создать конфиг
        </button>
      </div>
    </header>
  );
}
