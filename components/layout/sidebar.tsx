'use client';

import Image from 'next/image';
import { FaGithub } from "react-icons/fa";

const GITHUB_URL = 'https://github.com/nellimonix/warp-config-generator-vercel';

function SidebarLink({ href, icon, children }: {
  href: string; icon: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius-md)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--text)] transition-all">
      <div className="w-8 h-8 rounded-lg bg-[var(--surface-3)] flex items-center justify-center shrink-0 text-[var(--text-muted)]">
        {icon}
      </div>
      <span className="flex-1 text-[13px]">{children}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--text-dim)]">
        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" />
      </svg>
    </a>
  );
}

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-1.5 lg:bg-[var(--surface)] lg:rounded-[var(--radius-lg)] lg:p-4 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">

      <div className="w-full rounded-[var(--radius-md)] overflow-hidden mb-1">
        <Image
          src="/img1.png"
          alt="Project banner"
          width={260}
          height={160}
          className="w-full h-auto object-cover"
        />
      </div>

      <SidebarLink href={GITHUB_URL} icon={<FaGithub />}>
        GitHub
      </SidebarLink>

      <div className="flex-1 min-h-[16px]" />
    </aside>
  );
}
