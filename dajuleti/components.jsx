// Shared UI primitives for DajUleti

const { useState, useEffect, useRef, useMemo } = React;

// ---------- ICONS (inline SVG, single stroke) ----------
const Icon = {
  search: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
  pin: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-7-7.58-7-13a7 7 0 1 1 14 0c0 5.42-7 13-7 13Z" /><circle cx="12" cy="9" r="2.5" /></svg>,
  clock: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  user: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" /></svg>,
  chat: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Z" /></svg>,
  plus: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>,
  arrow: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>,
  back: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 5l-7 7 7 7" /></svg>,
  star: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 14} height={p.size || 14} fill={p.fill || "currentColor"} stroke="none"><path d="M12 2 14.9 8.6 22 9.3l-5.4 4.7 1.7 7L12 17.3 5.7 21l1.7-7L2 9.3l7.1-.7Z" /></svg>,
  check: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17 19 7.5" /></svg>,
  camera: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h3l2-2h6l2 2h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="3.5" /></svg>,
  send: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>,
  bolt: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="currentColor" stroke="none"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" /></svg>,
  shield: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>,
  filter: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h18M6 12h12M10 19h4" /></svg>,
  close: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg>,
  google: (p = {}) => <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18}><path fill="#4285F4" d="M22 12.2c0-.8-.1-1.5-.2-2.2H12v4.3h5.6c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.8Z" /><path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7C4.4 19.7 7.9 22 12 22Z" /><path fill="#FBBC05" d="M6.2 13.6a6 6 0 0 1 0-3.6V7.3H2.7a10 10 0 0 0 0 9.3l3.5-3Z" /><path fill="#EA4335" d="M12 5.8c1.5 0 2.9.5 4 1.5l3-3C17.2 2.7 14.8 1.8 12 1.8 7.9 1.8 4.4 4 2.7 7.3l3.5 2.7C7 7.6 9.3 5.8 12 5.8Z" /></svg>
};

// ---------- AVATAR (initials, deterministic color) ----------
function Avatar({ user, size = 40 }) {
  const palette = ['#FFD400', '#FF7A1A', '#5BC0BE', '#7FB069', '#E07A5F', '#A78BFA', '#60A5FA'];
  const i = (user.id.charCodeAt(2) || 0) % palette.length;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: palette[i], color: '#0E0E10',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.36, flexShrink: 0,
      letterSpacing: '-0.02em'
    }}>
      {user.avatar}
    </div>);

}

// ---------- STARS ----------
function Stars({ value, size = 14 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: '#0E0E10' }}>
      <Icon.star size={size} />
      <span style={{ fontWeight: 600, fontSize: size }}>{value.toFixed(1)}</span>
    </div>);

}

// ---------- BUTTON ----------
function Button({ children, variant = 'primary', size = 'md', onClick, type, full, disabled, icon }) {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13, height: 34 },
    md: { padding: '11px 18px', fontSize: 14, height: 42 },
    lg: { padding: '14px 22px', fontSize: 15, height: 50 }
  };
  const variants = {
    primary: { background: 'var(--accent)', color: 'var(--accent-ink)', border: '1px solid var(--accent)' },
    dark: { background: 'var(--ink)', color: '#fff', border: '1px solid var(--ink)' },
    ghost: { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)' },
    danger: { background: 'transparent', color: '#C0392B', border: '1px solid #E8C4BE' },
    link: { background: 'transparent', color: 'var(--ink)', border: 'none', padding: 0, height: 'auto' }
  };
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizes[size], ...variants[variant],
        borderRadius: 999, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: full ? '100%' : undefined,
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'inherit', letterSpacing: '-0.005em',
        transition: 'transform 0.06s ease, filter 0.15s ease'
      }}
      onMouseDown={(e) => {if (!disabled) e.currentTarget.style.transform = 'scale(0.98)';}}
      onMouseUp={(e) => {e.currentTarget.style.transform = 'scale(1)';}}
      onMouseLeave={(e) => {e.currentTarget.style.transform = 'scale(1)';}}>
      
      {icon}
      {children}
    </button>);

}

// ---------- INPUT / TEXTAREA ----------
function Field({ label, hint, children }) {
  return (
    <label style={{ display: 'block' }}>
      {label && <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--ink)' }}>{label}</div>}
      {children}
      {hint && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{hint}</div>}
    </label>);

}

function Input({ value, onChange, placeholder, type, prefix, suffix }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      border: '1px solid var(--line)', borderRadius: 12, padding: '0 14px',
      background: '#fff', height: 46,
      transition: 'border-color 0.15s ease'
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ink)'}
    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--line)'}>
      
      {prefix}
      <input
        value={value} onChange={onChange} placeholder={placeholder} type={type || 'text'}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontSize: 14, fontFamily: 'inherit', color: 'var(--ink)',
          height: '100%'
        }} />
      
      {suffix}
    </div>);

}

function Textarea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      style={{
        width: '100%', border: '1px solid var(--line)', borderRadius: 12, padding: '12px 14px',
        background: '#fff', fontSize: 14, fontFamily: 'inherit', color: 'var(--ink)',
        outline: 'none', resize: 'vertical', lineHeight: 1.5
      }}
      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ink)'}
      onBlur={(e) => e.currentTarget.style.borderColor = 'var(--line)'} />);


}

// ---------- CATEGORY PILL ----------
function CategoryPill({ cat, active, onClick, size = 'md' }) {
  const sm = size === 'sm';
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: sm ? '6px 12px' : '8px 14px', borderRadius: 999,
        background: active ? 'var(--ink)' : '#fff',
        color: active ? '#fff' : 'var(--ink)',
        border: '1px solid ' + (active ? 'var(--ink)' : 'var(--line)'),
        fontSize: sm ? 12 : 13, fontWeight: 500, cursor: 'pointer',
        fontFamily: 'inherit', whiteSpace: 'nowrap'
      }}>
      
      <span style={{ fontSize: sm ? 14 : 16, filter: active ? 'grayscale(0.4)' : 'none' }}>{cat.emoji}</span>
      {cat.name}
    </button>);

}

// ---------- PHOTO PLACEHOLDER (striped) ----------
function PhotoPlaceholder({ label = 'foto', aspect = '4/3', radius = 12 }) {
  return (
    <div style={{
      aspectRatio: aspect, width: '100%',
      borderRadius: radius,
      background: 'repeating-linear-gradient(135deg, #F0EEE6 0 10px, #E8E5DD 10px 20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#7A776E', fontSize: 11, fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      letterSpacing: '0.05em', textTransform: 'uppercase'
    }}>
      {label}
    </div>);

}

// ---------- BADGE ----------
function Badge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: { bg: '#F4F2EC', fg: '#3A372F' },
    accent: { bg: 'var(--accent-soft)', fg: 'var(--ink)' },
    success: { bg: '#E3F1DD', fg: '#2D5A1F' },
    warn: { bg: '#FFE9D6', fg: '#7A4413' },
    danger: { bg: '#F7D7D2', fg: '#7A2417' },
    ink: { bg: 'var(--ink)', fg: '#fff' }
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 9px', borderRadius: 999,
      background: t.bg, color: t.fg,
      fontSize: 11, fontWeight: 600, letterSpacing: '0.01em',
      whiteSpace: 'nowrap'
    }}>
      {children}
    </span>);

}

// ---------- TOPNAV ----------
function TopNav({ route, go, signedIn, onSignOut }) {
  const linkStyle = (active) => ({
    fontSize: 14, fontWeight: 500, color: active ? 'var(--ink)' : 'var(--muted)',
    textDecoration: 'none', cursor: 'pointer',
    padding: '8px 0', position: 'relative'
  });
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px', borderBottom: '1px solid var(--line)',
      background: '#fff', position: 'sticky', top: 0, zIndex: 10
    }}>
      <div onClick={() => go('landing')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <Logo size={48} />
        <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
          daj<span style={{ color: 'var(--accent-fg)' }}>Uleti</span>
        </span>
      </div>

      {signedIn &&
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <a style={linkStyle(route === 'lista')} onClick={() => go('lista')}>Pretraži gigove</a>
          <a style={linkStyle(route === 'objavi')} onClick={() => go('objavi')}>Objavi gig</a>
          <a style={linkStyle(route === 'chat')} onClick={() => go('chat')}>Poruke</a>
        </div>
      }

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {signedIn ?
        <>
            <button onClick={() => go('profil')} style={{
            background: 'transparent', border: '1px solid var(--line)', borderRadius: 999,
            padding: '6px 6px 6px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
            fontFamily: 'inherit', color: 'var(--ink)', fontSize: 13, fontWeight: 500
          }}>
              Ti
              <Avatar user={USERS.u_me} size={28} />
            </button>
          </> :

        <>
            <Button variant="ghost" size="sm" onClick={() => go('auth')}>Prijavi se</Button>
            <Button variant="dark" size="sm" onClick={() => go('auth')}>Registracija</Button>
          </>
        }
      </div>
    </nav>);

}

// ---------- LOGO ----------
function Logo({ size = 56 }) {
  return (
    <img
      src={(window.__resources && window.__resources.logo) || 'assets/logo.png'}
      alt="DajUleti"
      width={size}
      height={size}
      style={{
        width: size, height: size,
        display: 'block',
        objectFit: 'contain',
      }}
    />
  );
}

Object.assign(window, {
  Icon, Avatar, Stars, Button, Field, Input, Textarea,
  CategoryPill, PhotoPlaceholder, Badge, TopNav, Logo
});