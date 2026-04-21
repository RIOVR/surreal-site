// ui.jsx — primitivos

const Eyebrow = ({ children, color = 'muted', size = 'sm', style = {} }) => {
  const colorMap = {
    muted: 'var(--fg-muted)',
    red: 'var(--surreal-red)',
    magenta: 'var(--neon-magenta)',
    ember: 'var(--ember)',
    bone: 'var(--bone)',
    ink: 'var(--ink)',
  };
  return (
    <span style={{
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: size === 'xs' ? 10 : 12,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: colorMap[color],
      ...style,
    }}>{children}</span>
  );
};

const Button = ({ variant = 'primary', children, onClick, style = {}, ...rest }) => {
  const base = {
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    padding: '14px 26px',
    borderRadius: 999,
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 220ms var(--ease-out-soft)',
    whiteSpace: 'nowrap',
  };
  const variants = {
    primary: { background: 'var(--surreal-red)', color: 'var(--bone)' },
    ghost:   { background: 'transparent', color: 'var(--bone)', borderColor: 'var(--bone)' },
    glow:    { background: 'var(--ink)', color: 'var(--bone)', borderColor: 'var(--neon-magenta)', boxShadow: '0 0 24px rgba(230,0,126,.35)' },
    ember:   { background: 'var(--ember)', color: 'var(--ink)' },
    ink:     { background: 'var(--ink)', color: 'var(--bone)', borderColor: 'var(--border)' },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }} {...rest}>{children}</button>
  );
};

const Chip = ({ active, children, onClick, color = 'red' }) => {
  const activeBg = { red: 'var(--surreal-red)', magenta: 'var(--neon-magenta)', ember: 'var(--ember)' };
  return (
    <button onClick={onClick} style={{
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      padding: '10px 16px',
      borderRadius: 999,
      border: `1px solid ${active ? activeBg[color] : 'var(--border)'}`,
      background: active ? activeBg[color] : 'transparent',
      color: active ? (color === 'ember' ? 'var(--ink)' : 'var(--bone)') : 'var(--fg-muted)',
      cursor: 'pointer',
      transition: 'all 180ms var(--ease-out-soft)',
      whiteSpace: 'nowrap',
    }}>{children}</button>
  );
};

// Tag pill for allergen / category
const Tag = ({ children, color = 'magenta' }) => (
  <span style={{
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: 9,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    padding: '5px 10px',
    borderRadius: 999,
    background: color === 'magenta' ? 'rgba(230,0,126,.15)' : color === 'ember' ? 'rgba(242,142,28,.15)' : 'rgba(228,50,43,.15)',
    color: color === 'magenta' ? 'var(--neon-magenta)' : color === 'ember' ? 'var(--ember)' : 'var(--surreal-red)',
    border: `1px solid ${color === 'magenta' ? 'rgba(230,0,126,.35)' : color === 'ember' ? 'rgba(242,142,28,.35)' : 'rgba(228,50,43,.35)'}`,
  }}>{children}</span>
);

// Price token — mono, ember-warm
const Price = ({ value, style = {} }) => (
  <span style={{
    fontFamily: 'var(--font-mono)',
    fontSize: 15,
    color: 'var(--ember)',
    fontWeight: 500,
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
    ...style,
  }}>R$ {value}</span>
);

// Dotted leader (menu-paper classic)
const Leader = () => (
  <span aria-hidden style={{
    flex: 1,
    margin: '0 12px',
    borderBottom: '1px dotted var(--border)',
    transform: 'translateY(-6px)',
    minWidth: 24,
  }} />
);

// Hook responsivo compartilhado — retorna true quando a tela for <= breakpoint
const useIsMobile = (breakpoint = 860) => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
};

Object.assign(window, { Eyebrow, Button, Chip, Tag, Price, Leader, useIsMobile });
