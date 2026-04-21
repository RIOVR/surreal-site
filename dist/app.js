// app.jsx — root da aplicação
// Referencia componentes globais definidos em dist/*.js: Portal, MenuView, DishSheet, Footer, TweaksPanel, Button, Eyebrow, etc.

const App = () => {
  const [sheet, setSheet] = React.useState(null); // { item, type }
  const [tab, setTab] = React.useState('comidas');
  const [cfg, setCfg] = React.useState(window.__TWEAK_DEFAULTS__);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const [showTop, setShowTop] = React.useState(false);
  React.useEffect(() => {
    document.body.setAttribute('data-spiral', cfg.spiral);
    document.body.setAttribute('data-hero', cfg.hero);
  }, [cfg]);
  React.useEffect(() => {
    const onMsg = e => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const openDish = d => setSheet({
    item: d,
    type: 'dish'
  });
  const openDrink = d => setSheet({
    item: d,
    type: 'drink'
  });
  const enter = choice => {
    if (choice === 'random') {
      const dishes = window.SURREAL.menu;
      const d = dishes[Math.floor(Math.random() * dishes.length)];
      openDish(d);
      setTab('comidas');
    } else {
      setTab(choice);
    }
    setTimeout(() => {
      const el = document.getElementById('menu');
      if (el) window.scrollTo({
        top: el.offsetTop - 10,
        behavior: 'smooth'
      });
    }, 50);
  };
  const backToPortal = () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, cfg.hero === 'portal' ? /*#__PURE__*/React.createElement(Portal, {
    onEnter: enter
  }) : /*#__PURE__*/React.createElement(DirectHero, {
    onPick: enter
  }), /*#__PURE__*/React.createElement(MenuView, {
    openDish: openDish,
    openDrink: openDrink,
    initialTab: tab,
    onChangeTab: setTab,
    density: cfg.density
  }), /*#__PURE__*/React.createElement(Footer, null), showTop && /*#__PURE__*/React.createElement("button", {
    className: "float-back-top",
    onClick: backToPortal
  }, "\u2191 portal"), /*#__PURE__*/React.createElement(DishSheet, {
    item: sheet ? sheet.item : null,
    type: sheet ? sheet.type : 'dish',
    onClose: () => setSheet(null)
  }), /*#__PURE__*/React.createElement(TweaksPanel, {
    open: tweaksOpen,
    cfg: cfg,
    setCfg: setCfg,
    onClose: () => setTweaksOpen(false)
  }));
};

// Hero alternativo — versão compacta
const DirectHero = ({
  onPick
}) => /*#__PURE__*/React.createElement("section", {
  "data-screen-label": "Direct Hero",
  style: {
    background: 'var(--ink)',
    padding: '140px 32px 40px',
    borderBottom: '1px solid var(--border)',
    position: 'relative',
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement("div", {
  "data-spiralbg": true,
  style: {
    position: 'absolute',
    top: '-50%',
    right: '-25%',
    width: '90%',
    height: '200%',
    backgroundImage: 'url(assets/bolacha.jpg)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    opacity: 0.08,
    filter: 'grayscale(1) contrast(1.3)',
    animation: 'spiralSpin 100s linear infinite',
    pointerEvents: 'none'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    top: 26,
    left: 28
  }
}, /*#__PURE__*/React.createElement("img", {
  src: "assets/logo-wordmark.png",
  alt: "Surreal",
  style: {
    height: 32,
    filter: 'invert(1)'
  }
})), /*#__PURE__*/React.createElement("div", {
  style: {
    maxWidth: 1240,
    margin: '0 auto',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: 40,
    alignItems: 'end'
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
  color: "magenta"
}, "Card\xE1pio 2026 \xB7 Botafogo, Rio"), /*#__PURE__*/React.createElement("h1", {
  style: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(56px, 9vw, 140px)',
    lineHeight: 0.86,
    color: 'var(--bone)',
    margin: '14px 0 0'
  }
}, "card\xE1pio ", /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--surreal-red)',
    fontStyle: 'italic'
  }
}, "surreal."))), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontSize: 20,
    color: 'var(--fg-muted)',
    paddingBottom: 20
  }
}, "\"Beba com todos os sentidos.\"", /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 10,
    marginTop: 20
  }
}, /*#__PURE__*/React.createElement(Button, {
  variant: "primary",
  onClick: () => onPick('comidas')
}, "Comidas"), /*#__PURE__*/React.createElement(Button, {
  variant: "glow",
  onClick: () => onPick('drinks')
}, "Bebidas")))));
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
