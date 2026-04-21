function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ui.jsx — primitivos

const Eyebrow = ({
  children,
  color = 'muted',
  size = 'sm',
  style = {}
}) => {
  const colorMap = {
    muted: 'var(--fg-muted)',
    red: 'var(--surreal-red)',
    magenta: 'var(--neon-magenta)',
    ember: 'var(--ember)',
    bone: 'var(--bone)',
    ink: 'var(--ink)'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: size === 'xs' ? 10 : 12,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: colorMap[color],
      ...style
    }
  }, children);
};
const Button = ({
  variant = 'primary',
  children,
  onClick,
  style = {},
  ...rest
}) => {
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
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: 'var(--surreal-red)',
      color: 'var(--bone)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--bone)',
      borderColor: 'var(--bone)'
    },
    glow: {
      background: 'var(--ink)',
      color: 'var(--bone)',
      borderColor: 'var(--neon-magenta)',
      boxShadow: '0 0 24px rgba(230,0,126,.35)'
    },
    ember: {
      background: 'var(--ember)',
      color: 'var(--ink)'
    },
    ink: {
      background: 'var(--ink)',
      color: 'var(--bone)',
      borderColor: 'var(--border)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), children);
};
const Chip = ({
  active,
  children,
  onClick,
  color = 'red'
}) => {
  const activeBg = {
    red: 'var(--surreal-red)',
    magenta: 'var(--neon-magenta)',
    ember: 'var(--ember)'
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      padding: '10px 16px',
      borderRadius: 999,
      border: `1px solid ${active ? activeBg[color] : 'var(--border)'}`,
      background: active ? activeBg[color] : 'transparent',
      color: active ? color === 'ember' ? 'var(--ink)' : 'var(--bone)' : 'var(--fg-muted)',
      cursor: 'pointer',
      transition: 'all 180ms var(--ease-out-soft)',
      whiteSpace: 'nowrap'
    }
  }, children);
};

// Tag pill for allergen / category
const Tag = ({
  children,
  color = 'magenta'
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: 9,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    padding: '5px 10px',
    borderRadius: 999,
    background: color === 'magenta' ? 'rgba(230,0,126,.15)' : color === 'ember' ? 'rgba(242,142,28,.15)' : 'rgba(228,50,43,.15)',
    color: color === 'magenta' ? 'var(--neon-magenta)' : color === 'ember' ? 'var(--ember)' : 'var(--surreal-red)',
    border: `1px solid ${color === 'magenta' ? 'rgba(230,0,126,.35)' : color === 'ember' ? 'rgba(242,142,28,.35)' : 'rgba(228,50,43,.35)'}`
  }
}, children);

// Price token — mono, ember-warm
const Price = ({
  value,
  style = {}
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'var(--font-mono)',
    fontSize: 15,
    color: 'var(--ember)',
    fontWeight: 500,
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
    ...style
  }
}, "R$ ", value);

// Dotted leader (menu-paper classic)
const Leader = () => /*#__PURE__*/React.createElement("span", {
  "aria-hidden": true,
  style: {
    flex: 1,
    margin: '0 12px',
    borderBottom: '1px dotted var(--border)',
    transform: 'translateY(-6px)',
    minWidth: 24
  }
});
Object.assign(window, {
  Eyebrow,
  Button,
  Chip,
  Tag,
  Price,
  Leader
});