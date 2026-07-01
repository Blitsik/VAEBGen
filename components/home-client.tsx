'use client';

import { useState, useRef } from 'react';
import { Topbar } from '@/components/layout/topbar';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import { AboutTab } from '@/components/generator/about-tab';
import { GeneratorPanel } from '@/components/generator/generator-panel';
import type { ServiceEntry } from '@/types';

interface HomeClientProps {
  services: ServiceEntry[];
}

export function HomeClient({ services }: HomeClientProps) {
  const [activeTab, setActiveTab] = useState('generator');
  const generatorRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    if (id === 'generator') {
      setActiveTab('generator');
      setTimeout(() => generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  };

  return (
    <div>
      <Topbar activeTab={activeTab} onTabChange={setActiveTab} onScrollTo={scrollTo} />

      <main style={{ paddingTop: 26 }}>

        {/* ---- HERO ---- */}
        {activeTab === 'generator' && (
          <section style={{ margin: '16px auto 0', maxWidth: 1180, padding: '0 20px' }}>
            <div style={{
              background: 'var(--surface)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--line)', boxShadow: 'var(--shadow-md)',
              padding: '56px 52px',
              display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 20, alignItems: 'center',
              position: 'relative', overflow: 'hidden',
            }} className="hero-card">
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontSize: 11.5, fontWeight: 700, letterSpacing: '.14em',
                  textTransform: 'uppercase' as const, color: 'var(--accent-deep)',
                  background: 'var(--accent-soft)', padding: '6px 12px 6px 8px',
                  borderRadius: 999, marginBottom: 22,
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%', background: 'var(--green)',
                    boxShadow: '0 0 0 3px rgba(31,180,122,.18)',
                  }} />
                  CLOUDFLARE WARP · WIREGUARD · AMNEZIAWG
                </div>
                <h1 style={{
                  fontSize: 52, lineHeight: 1.02, letterSpacing: '-.01em',
                  margin: '0 0 20px', fontWeight: 800,
                  fontFamily: "'Unbounded', sans-serif",
                }}>
                  <span style={{ display: 'block' }}>Свой тоннель</span>
                  <span style={{
                    display: 'block',
                    background: 'linear-gradient(100deg, var(--accent-deep), var(--accent) 60%, #c48bff)',
                    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                  }}>за десять секунд</span>
                </h1>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 460, margin: '0 0 30px' }}>
                  Настройте протокол, DNS и тип маршрутизации — и получите готовый конфиг WireGuard или AmneziaWG для любого устройства. Без регистрации, без логов.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                  <button onClick={() => scrollTo('generator')} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 9,
                    background: 'linear-gradient(145deg, var(--accent), var(--accent-deep))',
                    color: '#fff', border: 'none', padding: '15px 26px', borderRadius: 16,
                    fontSize: 14.5, fontWeight: 700, cursor: 'pointer',
                    boxShadow: '0 14px 30px -12px rgba(67,38,196,.55)',
                    transition: 'transform .15s, box-shadow .15s', fontFamily: 'inherit',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" />
                    </svg>
                    Сгенерировать конфигурацию
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 26, marginTop: 34 }}>
                  {[['2','протокола'],['27+','сервисов в обходе'],['0','логов и учёток']].map(([b, s]) => (
                    <div key={s}>
                      <b style={{ display: 'block', fontFamily: "'Unbounded', sans-serif", fontSize: 19, fontWeight: 700 }}>{b}</b>
                      <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <HeroArt />
            </div>
          </section>
        )}

        {/* ---- FEATURES ---- */}
        {activeTab === 'generator' && (
          <section style={{ margin: '18px auto 0', maxWidth: 1180, padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }} className="feat-grid">
              {FEATURES.map((f, i) => (
                <div key={i} style={{
                  background: 'var(--surface)', border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-lg)', padding: '30px 26px 34px',
                  boxShadow: 'var(--shadow-sm)', transition: 'transform .2s, box-shadow .2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  <div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 12, color: 'var(--text-dim)', marginBottom: 18 }}>0{i + 1}</div>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, marginBottom: 20,
                    background: 'var(--surface-2)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: 'var(--accent-deep)',
                  }} dangerouslySetInnerHTML={{ __html: f.icon }} />
                  <h4 style={{ fontSize: 16.5, margin: '0 0 8px', fontWeight: 700 }}>{f.title}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---- GENERATOR ---- */}
        {activeTab === 'generator' && (
          <section id="generator" ref={generatorRef} style={{ margin: '0 auto', maxWidth: 1180, padding: '0 20px' }}>
            <div style={{ margin: '64px 0 20px', textAlign: 'center' }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 10px', fontFamily: "'Unbounded', sans-serif" }}>Настройки конфигурации</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: 0 }}>Заполните параметры ниже — конфигурация соберётся мгновенно.</p>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start',
            }} className="gen-grid">
              <GeneratorPanel services={services} />
              <Sidebar />
            </div>
          </section>
        )}

        {/* ---- APPLICATIONS / ABOUT ---- */}
        {(activeTab === 'applications' || activeTab === 'about') && (
          <section style={{ margin: '0 auto', maxWidth: 1180, padding: '0 20px' }}>
            <AboutTab />
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}

function HeroArt() {
  return (
    <div style={{ position: 'relative', height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute', top: 2, right: 8, width: 96, height: 96, borderRadius: '50%',
        border: '1.5px dashed var(--line)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', textAlign: 'center',
      }}>
        <span style={{ fontSize: 9, color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '.05em' }}>UPTIME</span>
        <b style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 15, marginTop: 2, color: 'var(--green)' }}>99.9%</b>
      </div>
      <svg viewBox="0 0 340 340" width="100%" height="100%" style={{ maxWidth: 340 }}>
        <defs>
          <linearGradient id="tunnelGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6c4cf0" />
            <stop offset="100%" stopColor="#c48bff" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9b7bfa" stopOpacity=".35" />
            <stop offset="100%" stopColor="#9b7bfa" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="170" cy="170" r="150" fill="url(#glow)" />
        <circle cx="170" cy="170" r="118" fill="none" stroke="#e5ddf6" strokeWidth="1.5" strokeDasharray="2 8" />
        <circle cx="170" cy="170" r="150" fill="none" stroke="#e5ddf6" strokeWidth="1" />
        <g>
          <rect x="34" y="146" width="60" height="48" rx="14" fill="#fff" stroke="var(--line)" strokeWidth="1.5" />
          <rect x="50" y="160" width="28" height="20" rx="4" fill="none" stroke="#4326c4" strokeWidth="2" />
          <circle cx="64" cy="170" r="3" fill="#4326c4" />
        </g>
        <g>
          <rect x="246" y="146" width="60" height="48" rx="14" fill="#fff" stroke="var(--line)" strokeWidth="1.5" />
          <path d="M262 176c-6 0-9-4-9-8 0-4 3-7 7-8 1-5 6-8 11-8 5 0 9 3 10 8 5 0 8 4 8 8 0 4-3 8-8 8h-19z" fill="none" stroke="#4326c4" strokeWidth="2" />
        </g>
        <path d="M94 170 C 130 130, 210 130, 246 170" fill="none" stroke="url(#tunnelGrad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 10" />
        <circle r="5" fill="#6c4cf0">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M94 170 C 130 130, 210 130, 246 170" />
        </circle>
        <circle cx="170" cy="150" r="16" fill="#fff" stroke="var(--line)" strokeWidth="1.5" />
        <path d="M170 143l6 3v5c0 3.5-2.6 6-6 7.5-3.4-1.5-6-4-6-7.5v-5l6-3z" fill="none" stroke="#4326c4" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const FEATURES = [
  {
    title: 'Выберите протокол',
    desc: 'WireGuard для скорости или AmneziaWG для дополнительной маскировки трафика — переключается одним кликом.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  },
  {
    title: 'Настройте DNS и тип',
    desc: 'Укажите DNS-резолвер и выберите, весь трафик заворачивать в тоннель или только выбранные сервисы.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" stroke-width="1.6"/></svg>',
  },
  {
    title: 'Скачайте конфиг',
    desc: 'Готовый файл сразу можно импортировать в клиент — ключи генерируются локально, ничего не сохраняется на сервере.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
];
