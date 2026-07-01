export function Footer() {
  return (
    <footer style={{
      marginTop: 60, padding: '34px 20px 30px',
      textAlign: 'center', color: 'var(--text-dim)', fontSize: 12.5,
    }}>
      © {new Date().getFullYear()} ·{' '}
      <a
        href="https://t.me/vaeb_ai"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'var(--text-muted)', fontWeight: 700, textDecoration: 'none' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-deep)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        Telegram
      </a>
    </footer>
  );
}
