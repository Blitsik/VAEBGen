'use client';

import { useState, useEffect } from 'react';
import { useGenerator } from '@/hooks/use-generator';
import { isCommunityDns } from '@/config/dns';
import { CONFIG_FORMATS } from '@/config/formats';
import { DNS_PROVIDERS } from '@/config/dns';
import { ENDPOINTS } from '@/config/endpoints';
import { ServicePicker } from './service-picker';
import type { ServiceEntry } from '@/types';
import type { ConfigFormat, DeviceType, SiteMode } from '@/types';



interface Props { services: ServiceEntry[]; }

interface DropdownItem { id: string; label: string; }

function Dropdown({ label, value, options, onChange }: {
  label: string; value: string; options: DropdownItem[]; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const cur = options.find((o) => o.id === value);

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => setOpen((o) => !o)} style={{
        background: open ? '#fff' : 'var(--surface-2)',
        border: `1px solid ${open ? 'var(--accent)' : 'transparent'}`,
        boxShadow: open ? '0 0 0 4px var(--accent-soft)' : 'none',
        borderRadius: 'var(--radius-md)', padding: '13px 16px',
        cursor: 'pointer', transition: '.15s', userSelect: 'none' as const,
      }}>
        <p style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 600, margin: '0 0 3px' }}>{label}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700 }}>{cur?.label ?? value}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none', color: open ? 'var(--accent-deep)' : 'var(--text-dim)', flexShrink: 0 }}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>
      {open && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 'calc(100% + 6px)',
          zIndex: 20, background: '#fff', border: '1px solid var(--line)',
          borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)',
          padding: 6, maxHeight: 210, overflow: 'auto',
        }}>
          {options.map((opt) => (
            <button key={opt.id} onClick={() => { onChange(opt.id); setOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: opt.id === value ? 'var(--accent-soft)' : 'none',
                border: 'none', padding: '10px 12px', borderRadius: 10,
                fontSize: 13.5, cursor: 'pointer',
                color: opt.id === value ? 'var(--accent-deep)' : 'var(--text)',
                fontWeight: opt.id === value ? 700 : 400, fontFamily: 'inherit',
              }}>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button onClick={() => onChange(!checked)} style={{
        width: 40, height: 23, borderRadius: 999,
        background: checked ? 'linear-gradient(145deg,var(--accent),var(--accent-deep))' : 'var(--surface-3)',
        position: 'relative', cursor: 'pointer', flexShrink: 0, transition: '.2s', border: 'none',
      }}>
        <span style={{
          position: 'absolute', top: 2.5,
          left: checked ? 19.5 : 2.5,
          width: 18, height: 18, borderRadius: '50%',
          background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.25)', transition: '.2s',
        }} />
      </button>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}

export function GeneratorPanel({ services }: Props) {
  const gen = useGenerator();
  const { state } = gen;
  const [advOpen, setAdvOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleCopy = async () => {
    const ok = await gen.copyConfig();
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  const configText = state.result ? atob(state.result.configBase64) : '';
  const hasQR = false; // QR отключён

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', padding: 34,
    }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 22px' }}>Параметры соединения</h3>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16,
        opacity: state.isGenerated ? .5 : 1,
        pointerEvents: state.isGenerated ? 'none' : 'auto',
      }} className="field-grid">
        <Dropdown label="Формат конфигурации" value={state.configFormat}
          options={CONFIG_FORMATS.map((f) => ({ id: f.id, label: f.name }))}
          onChange={(v) => gen.set('configFormat', v as ConfigFormat)} />
        <Dropdown label="Настройки соединения" value={state.deviceType}
          options={[{ id: 'awg15', label: 'AmneziaWG 1.5' }]}
          onChange={(v) => gen.set('deviceType', v as DeviceType)} />
        <Dropdown label="DNS" value={state.dnsId}
          options={DNS_PROVIDERS.map((d) => ({ id: d.id, label: d.isCommunity ? `${d.label} •` : d.label }))}
          onChange={gen.setDnsId} />
        <Dropdown label="Тип конфигурации" value={state.siteMode}
          options={[
            { id: 'all', label: 'Все сайты' },
            { id: 'specific', label: isCommunityDns(state.dnsId) ? 'Определенные сайты (недоступно)' : 'Определенные сайты' },
          ]}
          onChange={(v) => gen.setSiteMode(v as SiteMode)} />
        <Dropdown label="Конечная точка" value={state.endpointId}
          options={ENDPOINTS.filter(e => e.id !== 'custom').map((e) => ({ id: e.id, label: e.label }))}
          onChange={gen.setEndpoint} />
      </div>

      {/* Service picker */}
      {state.siteMode === 'specific' && !isCommunityDns(state.dnsId) && !state.isGenerated && (
        <ServicePicker services={services} selected={state.selectedServices} onToggle={gen.toggleService} />
      )}

      {/* Exclude LAN */}
      {state.siteMode === 'all' && !state.isGenerated && (
        <div style={{ padding: '6px 2px 22px' }}>
          <Toggle checked={state.excludeLan} onChange={(v) => gen.set('excludeLan', v)} label="Исключить локальную сеть (LAN) из тоннеля" />
        </div>
      )}

      {/* Advanced settings */}
      {!state.isGenerated && (
        <>
          <button onClick={() => setAdvOpen((o) => !o)} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13.5, fontWeight: 700, color: 'var(--text-muted)',
            padding: '0 0 20px', fontFamily: 'inherit', transition: '.15s',
          }}>
            Дополнительные настройки
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              style={{ transition: 'transform .2s', transform: advOpen ? 'rotate(180deg)' : 'none' }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          {advOpen && (
            <div style={{
              marginBottom: 18, padding: '14px 16px',
              background: 'var(--surface-2)', borderRadius: 'var(--radius-md)',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <Toggle checked={state.ipv6} onChange={(v) => gen.set('ipv6', v)} label="IPv6" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' as const }}>
                <Toggle checked={state.keepaliveEnabled} onChange={(v) => gen.set('keepaliveEnabled', v)} label="PersistentKeepalive" />
                {state.keepaliveEnabled && (
                  <input type="text" inputMode="numeric" maxLength={5}
                    value={state.keepaliveValue}
                    onChange={(e) => gen.set('keepaliveValue', e.target.value.replace(/\D/g, ''))}
                    placeholder="25"
                    style={{
                      width: 56, height: 32, background: 'var(--surface-3)',
                      borderRadius: 8, border: 'none', textAlign: 'center',
                      fontSize: 13, color: 'var(--text)', outline: 'none', fontFamily: 'inherit',
                    }} />
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Toggle checked={state.customI1Enabled} onChange={(v) => gen.set('customI1Enabled', v)} label="Собственный I1" />
                {state.customI1Enabled && (
                  <input type="text" value={state.customI1Domain}
                    onChange={(e) => gen.set('customI1Domain', e.target.value)}
                    placeholder="Введите домен (например, google.com)"
                    style={{
                      width: '100%', height: 36, background: 'var(--surface-3)',
                      borderRadius: 10, border: 'none', padding: '0 12px',
                      fontSize: 13, color: 'var(--text)', outline: 'none', fontFamily: 'inherit',
                    }} />
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Generate / Reset button */}
      {!state.isGenerated ? (
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={gen.handleGenerate} disabled={state.isLoading} style={{
            flex: 1, height: 56, border: 'none', borderRadius: 'var(--radius-md)',
            cursor: state.isLoading ? 'wait' : 'pointer',
            background: 'linear-gradient(145deg, var(--accent), var(--accent-deep))',
            color: '#fff', fontSize: 15, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: '0 16px 32px -14px rgba(67,38,196,.6)',
            transition: 'transform .15s', opacity: state.isLoading ? .7 : 1,
            fontFamily: 'inherit',
          }}>
            {state.isLoading ? (
              <>
                <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeDasharray="40" strokeLinecap="round" />
                </svg>
                Генерируем...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" />
                </svg>
                Сгенерировать конфигурацию
              </>
            )}
          </button>
          <button onClick={() => setShowTutorial(true)} style={{
            height: 56, padding: '0 18px', border: '1px solid var(--line)',
            borderRadius: 'var(--radius-md)', cursor: 'pointer',
            background: 'var(--surface-2)', color: 'var(--text-muted)',
            fontSize: 13, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 7,
            transition: '.15s', fontFamily: 'inherit', whiteSpace: 'nowrap' as const,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-3)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Туториал
          </button>
        </div>
      ) : (
        <button onClick={gen.reset} style={{
          width: '100%', height: 56, border: '1px solid var(--line)',
          borderRadius: 'var(--radius-md)', cursor: 'pointer',
          background: 'var(--surface-2)', color: 'var(--text-muted)',
          fontSize: 14, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: '.15s', fontFamily: 'inherit',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Сгенерировать заново
        </button>
      )}

      {/* Error */}
      {state.error && (
        <div style={{
          marginTop: 12, padding: '12px 14px',
          background: 'rgba(239,68,68,.08)', borderRadius: 10,
          fontSize: 13, color: '#ef4444',
        }}>{state.error}</div>
      )}

      {/* Result block */}
      {state.isGenerated && state.result && (
        <div className="animate-in" style={{
          marginTop: 20, background: 'var(--surface-2)',
          border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '20px 22px',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{
              fontSize: 12.5, fontWeight: 700, color: 'var(--green)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Конфигурация готова
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={gen.downloadConfig} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'linear-gradient(145deg, var(--accent), var(--accent-deep))',
                border: 'none', borderRadius: 10, padding: '7px 14px',
                fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
                color: '#fff', fontFamily: 'inherit',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Скачать
              </button>
              <button onClick={handleCopy} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#fff', border: '1px solid var(--line)', borderRadius: 10,
                padding: '7px 12px', fontSize: 12.5, fontWeight: 700,
                cursor: 'pointer', color: 'var(--text-muted)', fontFamily: 'inherit',
              }}>
                {copied ? 'Скопировано ✓' : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    Копировать
                  </>
                )}
              </button>
              {/* QR кнопка — только для AmneziaWG */}
              {hasQR && (
                <button onClick={() => setShowQR(v => !v)} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: showQR ? 'var(--accent-soft)' : '#fff',
                  border: `1px solid ${showQR ? 'var(--accent)' : 'var(--line)'}`,
                  borderRadius: 10, padding: '7px 12px',
                  fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
                  color: showQR ? 'var(--accent-deep)' : 'var(--text-muted)',
                  fontFamily: 'inherit',
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                    <rect x="2" y="14" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="14" width="3.5" height="3.5" rx=".5" fill="currentColor"/>
                    <rect x="19.5" y="18" width="2.5" height="4" rx=".5" fill="currentColor"/>
                    <rect x="14" y="19.5" width="4" height="2.5" rx=".5" fill="currentColor"/>
                  </svg>
                  QR
                </button>
              )}
            </div>
          </div>

          {/* QR код */}
          {showQR && hasQR && (
            <QRBlock configText={configText} />
          )}

          {/* Config text */}
          <pre style={{
            margin: 0, fontSize: 12.5, lineHeight: 1.7, color: '#4a3f66',
            whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            fontFamily: "'JetBrains Mono', monospace",
          }}>{configText}</pre>
        </div>
      )}

      {/* Tutorial modal */}
      {showTutorial && (
        <div onClick={() => setShowTutorial(false)} style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(25,19,51,.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div onClick={(e) => e.stopPropagation()} className="animate-in" style={{
            background: 'var(--surface)', borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)', padding: 28,
            maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Как использовать</h3>
              <button onClick={() => setShowTutorial(false)} style={{
                background: 'var(--surface-2)', border: 'none', borderRadius: 8,
                width: 32, height: 32, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <img src="/info1.png" alt="Туториал шаг 1" style={{ width: '100%', borderRadius: 'var(--radius-md)' }} />
              <img src="/info2.png" alt="Туториал шаг 2" style={{ width: '100%', borderRadius: 'var(--radius-md)' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// QR через fetch+blob — работает без ограничений на длину URL
function QRBlock({ configText }: { configText: string }) {
  const [blobUrl, setBlobUrl] = useState<string>('');

  useEffect(() => {
    if (!configText) return;
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&ecc=M&data=${encodeURIComponent(configText)}`;
    fetch(url)
      .then(r => r.blob())
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);
      })
      .catch(console.error);
    return () => { if (blobUrl) URL.revokeObjectURL(blobUrl); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configText]);

  return (
    <div className="animate-in" style={{
      marginBottom: 16, display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 12,
      background: '#fff', borderRadius: 'var(--radius-md)',
      padding: '20px 16px', border: '1px solid var(--line)',
    }}>
      {blobUrl ? (
        <img src={blobUrl} alt="QR код" width={240} height={240} style={{ borderRadius: 8 }} />
      ) : (
        <div style={{ width: 240, height: 240, background: 'var(--surface-2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--text-dim)' }}>
          Загрузка QR...
        </div>
      )}
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
          Сканируйте в AmneziaWG
        </p>
        <p style={{ margin: 0, fontSize: 11.5, color: 'var(--text-dim)' }}>
          Откройте приложение → + → Сканировать QR-код
        </p>
      </div>
    </div>
  );
}
