// Footer.jsx — visita, instagram, rodapé

const Footer = () => {
  const i = window.SURREAL.info;
  return /*#__PURE__*/React.createElement("section", {
    id: "visit",
    "data-screen-label": "Footer",
    style: {
      background: 'var(--ink)',
      padding: '80px 32px 40px',
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 40,
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      paddingBottom: 40,
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-wordmark.png",
    alt: "Surreal",
    style: {
      height: 44,
      filter: 'invert(1)',
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 18,
      color: 'var(--bone)',
      opacity: 0.85,
      margin: 0,
      maxWidth: 300
    }
  }, "Um portal sensorial em Botafogo. Beba com todos os sentidos.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "magenta"
  }, "Onde"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--bone)',
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", null, i.address), /*#__PURE__*/React.createElement("div", null, i.neighborhood || 'Botafogo · Rio de Janeiro'), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg-muted)',
      marginTop: 8
    }
  }, "Ter\u2013Qui \xB7 18h\u201300h"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg-muted)'
    }
  }, "Sex\u2013S\xE1b \xB7 18h\u201302h"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg-faint)'
    }
  }, "Dom\u2013Seg \xB7 descansando"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "magenta"
  }, "Fale com a gente"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--bone)',
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", null, i.instagram), /*#__PURE__*/React.createElement("div", null, i.site))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "magenta"
  }, "Avisos do portal"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--fg-muted)',
      lineHeight: 1.55,
      marginTop: 12
    }
  }, "Alguns pratos podem conter lactose, gl\xFAten, nozes, pimenta ou outros ingredientes alerg\xEAnicos. Qualquer restri\xE7\xE3o, avise nossa equipe antes de pedir."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--fg-faint)',
      lineHeight: 1.55,
      marginTop: 10
    }
  }, "Aceitamos dinheiro, pix, cart\xF5es e vouchers.", /*#__PURE__*/React.createElement("br", null), "Procon 151 \xB7 Vigil\xE2ncia Sanit\xE1ria 1746.", /*#__PURE__*/React.createElement("br", null), "Se beber, n\xE3o dirija."))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 22,
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--fg-faint)',
      letterSpacing: '0.18em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 SURREAL \xB7 MMXXVI"), /*#__PURE__*/React.createElement("span", null, "CARD\xC1PIO VIVO \u2014 VERS\xC3O 2026.04"))));
};
window.Footer = Footer;