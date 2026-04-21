// Portal.jsx — the entry / hero (surreal, irreverente)

const Portal = ({
  onEnter,
  mode,
  setMode
}) => {
  const [hover, setHover] = React.useState(false);
  const [prov, setProv] = React.useState(0);
  const provs = window.SURREAL.provocacoes;
  React.useEffect(() => {
    const i = setInterval(() => setProv(p => (p + 1) % provs.length), 3200);
    return () => clearInterval(i);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    id: "portal",
    "data-screen-label": "Portal",
    style: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '140px 32px 80px',
      overflow: 'hidden',
      background: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-30%',
      backgroundImage: 'url(assets/bolacha.jpg)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      opacity: 0.12,
      filter: 'grayscale(1) contrast(1.3)',
      animation: 'spiralSpin 90s linear infinite',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(230,0,126,.38) 0%, rgba(228,50,43,.12) 42%, transparent 72%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.82) 100%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 28,
      left: 28,
      right: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-wordmark.png",
    alt: "Surreal",
    style: {
      height: 34,
      filter: 'invert(1)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "magenta"
  }, "DESDE 2019"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 14,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement(Eyebrow, null, "Botafogo \xB7 RJ"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      textAlign: 'center',
      maxWidth: 1100,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "magenta",
    size: "xs"
  }, "Card\xE1pio \xB7 Edi\xE7\xE3o 7 anos")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(72px, 14vw, 220px)',
      lineHeight: 0.82,
      color: 'var(--bone)',
      margin: '0 0 10px',
      textShadow: '0 0 48px rgba(230,0,126,.55)',
      letterSpacing: '-0.015em'
    }
  }, /*#__PURE__*/React.createElement("div", null, "um menu"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--surreal-red)',
      fontStyle: 'italic'
    }
  }, "surreal.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 'clamp(18px, 2.2vw, 26px)',
      color: 'var(--bone)',
      opacity: 0.88,
      margin: '22px auto 52px',
      maxWidth: 620,
      minHeight: 34,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    key: prov,
    style: {
      animation: 'fadeIn 600ms var(--ease-out-soft)'
    }
  }, "\"", provs[prov], "\"")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "ember",
    size: "xs"
  }, "escolha seu ato")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(ActChoice, {
    num: "I",
    label: "Quero comer",
    sub: "Entradas, sandu\xEDches, pratos, doces",
    color: "red",
    onClick: () => onEnter('comidas')
  }), /*#__PURE__*/React.createElement(ActChoice, {
    num: "II",
    label: "Quero beber",
    sub: "Drinks autorais, cl\xE1ssicos, vinhos",
    color: "magenta",
    onClick: () => onEnter('drinks')
  }), /*#__PURE__*/React.createElement(ActChoice, {
    num: "III",
    label: "Surpreenda-me",
    sub: "Um prato e um drink ao acaso",
    color: "ember",
    onClick: () => onEnter('random')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 50,
      display: 'flex',
      justifyContent: 'center',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onEnter('comidas'),
    style: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: 'var(--fg-muted)'
    }
  }, "\u2193 des\xE7a devagar"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 24,
      left: 28,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--surreal-red)',
      boxShadow: '0 0 8px var(--surreal-red)',
      animation: 'pulse 2.4s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--fg-muted)',
      letterSpacing: '0.15em'
    }
  }, "ABERTO \xB7 SEG\u2013QUI: 12H-16H / 18H-00H \xB7 SEX: 12H-16H / 18H-01H \xB7 SAB: 12H-01H \xB7 DOM: 12H-00H")), /*#__PURE__*/React.createElement("img", {
    src: "assets/mascot.png",
    alt: "",
    "aria-hidden": true,
    style: {
      position: 'absolute',
      bottom: 16,
      right: 20,
      height: 88,
      opacity: 0.92,
      zIndex: 3,
      animation: 'floatY 4.5s ease-in-out infinite'
    }
  }));
};
const ActChoice = ({
  num,
  label,
  sub,
  color,
  onClick
}) => {
  const [h, setH] = React.useState(false);
  const accent = color === 'red' ? 'var(--surreal-red)' : color === 'magenta' ? 'var(--neon-magenta)' : 'var(--ember)';
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: 240,
      minHeight: 160,
      padding: '22px 22px 22px',
      background: h ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
      border: `1px solid ${h ? accent : 'var(--border)'}`,
      borderRadius: 14,
      cursor: 'pointer',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      transition: 'all 260ms var(--ease-out-soft)',
      transform: h ? 'translateY(-3px)' : 'translateY(0)',
      boxShadow: h ? `0 0 28px ${color === 'red' ? 'rgba(228,50,43,.25)' : color === 'magenta' ? 'rgba(230,0,126,.3)' : 'rgba(242,142,28,.28)'}` : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      color: accent,
      lineHeight: 1
    }
  }, num), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      color: h ? accent : 'var(--bone)',
      transition: 'color 220ms'
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 24,
      lineHeight: 1.1,
      color: 'var(--bone)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--fg-muted)',
      lineHeight: 1.4,
      marginTop: 'auto'
    }
  }, sub));
};
window.Portal = Portal;