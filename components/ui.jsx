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

// ========== i18n ==========
// Dicionário de strings de UI nos 3 idiomas.
// Textos de PRATOS, BEBIDAS, POEMAS vêm do data.json (editáveis pelo CMS).
// As strings daqui são do código (botões, rótulos, frases fixas) — editáveis só pelos .jsx.
const I18N_UI = {
  pt: {
    comidas: 'Comidas', bebidas: 'Bebidas',
    desde: 'DESDE 2019',
    edicao: 'Cardápio · Edição 7 anos',
    escolhaSeuAto: 'escolha seu ato',
    queroComer: 'Quero comer',
    queroComerSub: 'Entradas, sanduíches, pratos, doces',
    queroBeber: 'Quero beber',
    queroBeberSub: 'Drinks autorais, clássicos, vinhos',
    surpreendaMe: 'Surpreenda-me',
    surpreendaMeSub: 'Um prato e um drink ao acaso',
    descaDevagar: '↓ desça devagar',
    aberto: 'ABERTO · SEG–QUI 12H–00H · SEX 12H–01H · SÁB 12H–01H · DOM 12H–00H',
    abertoLong: 'ABERTO · SEG–QUI: 12H-16H / 18H-00H · SEX: 12H-16H / 18H-01H · SAB: 12H-01H · DOM: 12H-00H',
    cardapioComidas: 'Cardápio · Comidas 2026',
    cardapioBebidas: 'Cardápio · Bebidas 2026',
    headlineComidas: 'O que se come por aqui.',
    headlineBebidas: 'Entre o real e o imaginado.',
    subComidas: 'Cozinha autoral brasileira com licença poética. Toque um prato pra ouvir o poema inteiro.',
    subBebidas: 'No Surreal, a coquetelaria não acompanha a comida. Ela divide o protagonismo.',
    buscarPrato: 'buscar um prato...',
    filterAll: 'Tudo', filterChef: 'Chef', filterVeggie: 'Veggie', filterTeatro: 'Teatro',
    extraTitle: 'Deixe seu sanduíche ainda mais surreal',
    extraSub: 'complementos adicionais',
    cartaVinhos: 'Carta de vinhos',
    cartaVinhosSub: 'Por taça ou garrafa.',
    porTaca: 'Por taça',
    voltarPortal: '↑ portal',
    voltar: 'voltar',
    podeConter: 'pode conter',
    drink: 'Drink',
    cardapio: 'Cardápio',
    footerOnde: 'Onde',
    footerFale: 'Fale com a gente',
    footerAvisos: 'Avisos do portal',
    footerAvisosTexto: 'Alguns pratos podem conter lactose, glúten, nozes, pimenta ou outros ingredientes alergênicos. Qualquer restrição, avise nossa equipe antes de pedir.',
    footerPagamentos: 'Aceitamos dinheiro, pix, cartões e vouchers.',
    footerProcon: 'Procon 151 · Vigilância Sanitária 1746.',
    footerSeBeber: 'Se beber, não dirija.',
    footerTagline: 'Um portal sensorial em Botafogo. Beba com todos os sentidos.',
    footerSeg: 'Ter–Qui · 18h–00h',
    footerSex: 'Sex–Sáb · 18h–02h',
    footerDom: 'Dom–Seg · descansando',
    footerVersao: 'CARDÁPIO VIVO — VERSÃO 2026.04',
    fotoEmBreve: 'foto em breve',
    fecharTravessia: 'voltar',
  },
  en: {
    comidas: 'Food', bebidas: 'Drinks',
    desde: 'SINCE 2019',
    edicao: 'Menu · 7-Year Edition',
    escolhaSeuAto: 'choose your act',
    queroComer: 'I want to eat',
    queroComerSub: 'Starters, sandwiches, mains, desserts',
    queroBeber: 'I want to drink',
    queroBeberSub: 'Signature cocktails, classics, wines',
    surpreendaMe: 'Surprise me',
    surpreendaMeSub: 'A random dish and drink',
    descaDevagar: '↓ scroll slowly',
    aberto: 'OPEN · MON–THU 12H–00H · FRI 12H–01H · SAT 12H–01H · SUN 12H–00H',
    abertoLong: 'OPEN · MON–THU: 12PM-4PM / 6PM-12AM · FRI: 12PM-4PM / 6PM-1AM · SAT: 12PM-1AM · SUN: 12PM-12AM',
    cardapioComidas: 'Menu · Food 2026',
    cardapioBebidas: 'Menu · Drinks 2026',
    headlineComidas: 'What we eat around here.',
    headlineBebidas: 'Between the real and the imagined.',
    subComidas: 'Authorial Brazilian cuisine with poetic license. Tap a dish to hear the full poem.',
    subBebidas: 'At Surreal, the cocktails don\'t accompany the food. They share the spotlight.',
    buscarPrato: 'search a dish...',
    filterAll: 'All', filterChef: 'Chef', filterVeggie: 'Veggie', filterTeatro: 'Theater',
    extraTitle: 'Make your sandwich even more surreal',
    extraSub: 'additional toppings',
    cartaVinhos: 'Wine list',
    cartaVinhosSub: 'By the glass or bottle.',
    porTaca: 'By the glass',
    voltarPortal: '↑ portal',
    voltar: 'back',
    podeConter: 'may contain',
    drink: 'Drink',
    cardapio: 'Menu',
    footerOnde: 'Where',
    footerFale: 'Get in touch',
    footerAvisos: 'Portal notices',
    footerAvisosTexto: 'Some dishes may contain lactose, gluten, nuts, pepper or other allergens. If you have any restrictions, let our team know before ordering.',
    footerPagamentos: 'We accept cash, pix, cards and vouchers.',
    footerProcon: 'Procon 151 · Health Surveillance 1746.',
    footerSeBeber: 'Don\'t drink and drive.',
    footerTagline: 'A sensory portal in Botafogo. Drink with all your senses.',
    footerSeg: 'Tue–Thu · 6pm–12am',
    footerSex: 'Fri–Sat · 6pm–2am',
    footerDom: 'Sun–Mon · resting',
    footerVersao: 'LIVING MENU — VERSION 2026.04',
    fotoEmBreve: 'photo coming soon',
    fecharTravessia: 'back',
  },
  es: {
    comidas: 'Comidas', bebidas: 'Bebidas',
    desde: 'DESDE 2019',
    edicao: 'Menú · Edición 7 años',
    escolhaSeuAto: 'elige tu acto',
    queroComer: 'Quiero comer',
    queroComerSub: 'Entradas, sándwiches, platos, postres',
    queroBeber: 'Quiero beber',
    queroBeberSub: 'Cócteles de autor, clásicos, vinos',
    surpreendaMe: 'Sorpréndeme',
    surpreendaMeSub: 'Un plato y un trago al azar',
    descaDevagar: '↓ baja despacio',
    aberto: 'ABIERTO · LUN–JUE 12H–00H · VIE 12H–01H · SÁB 12H–01H · DOM 12H–00H',
    abertoLong: 'ABIERTO · LUN–JUE: 12H-16H / 18H-00H · VIE: 12H-16H / 18H-01H · SÁB: 12H-01H · DOM: 12H-00H',
    cardapioComidas: 'Menú · Comidas 2026',
    cardapioBebidas: 'Menú · Bebidas 2026',
    headlineComidas: 'Lo que se come por aquí.',
    headlineBebidas: 'Entre lo real y lo imaginado.',
    subComidas: 'Cocina brasileña de autor con licencia poética. Toca un plato para oír el poema entero.',
    subBebidas: 'En Surreal, la coctelería no acompaña a la comida. Comparte el protagonismo.',
    buscarPrato: 'buscar un plato...',
    filterAll: 'Todo', filterChef: 'Chef', filterVeggie: 'Veggie', filterTeatro: 'Teatro',
    extraTitle: 'Haz tu sándwich aún más surreal',
    extraSub: 'complementos adicionales',
    cartaVinhos: 'Carta de vinos',
    cartaVinhosSub: 'Por copa o botella.',
    porTaca: 'Por copa',
    voltarPortal: '↑ portal',
    voltar: 'volver',
    podeConter: 'puede contener',
    drink: 'Trago',
    cardapio: 'Menú',
    footerOnde: 'Dónde',
    footerFale: 'Habla con nosotros',
    footerAvisos: 'Avisos del portal',
    footerAvisosTexto: 'Algunos platos pueden contener lactosa, gluten, frutos secos, picante u otros alérgenos. Si tienes alguna restricción, avisa a nuestro equipo antes de pedir.',
    footerPagamentos: 'Aceptamos efectivo, pix, tarjetas y vales.',
    footerProcon: 'Procon 151 · Vigilancia Sanitaria 1746.',
    footerSeBeber: 'Si bebes, no conduzcas.',
    footerTagline: 'Un portal sensorial en Botafogo. Bebe con todos los sentidos.',
    footerSeg: 'Mar–Jue · 18h–00h',
    footerSex: 'Vie–Sáb · 18h–02h',
    footerDom: 'Dom–Lun · descansando',
    footerVersao: 'MENÚ VIVO — VERSIÓN 2026.04',
    fotoEmBreve: 'foto próximamente',
    fecharTravessia: 'volver',
  },
};

// Hook global pra língua atual + setter. Persiste em localStorage.
const LangContext = React.createContext(null);

const LangProvider = ({ children }) => {
  const [lang, setLangState] = React.useState(() => {
    if (typeof window === 'undefined') return 'pt';
    return window.localStorage.getItem('surreal_lang') || 'pt';
  });
  const setLang = (l) => {
    setLangState(l);
    try { window.localStorage.setItem('surreal_lang', l); } catch {}
    document.documentElement.setAttribute('lang', l === 'pt' ? 'pt-BR' : l);
  };
  React.useEffect(() => {
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : lang);
  }, [lang]);
  return React.createElement(LangContext.Provider, { value: { lang, setLang } }, children);
};

const useLang = () => React.useContext(LangContext) || { lang: 'pt', setLang: () => {} };

// Helper t() — traduz um VALOR de dado (vindo de data.json ou i18n).
// - Se for string/number/null: retorna ele mesmo (fallback).
// - Se for objeto {pt, en, es}: retorna a variante correta, com fallback pt.
// - Se for array: retorna ele mesmo (arrays não são traduzíveis diretamente).
const t = (v, lang = 'pt') => {
  if (v == null) return '';
  if (typeof v !== 'object') return v;
  if (Array.isArray(v)) return v;
  // Objeto: pode ser {pt, en, es} ou outro objeto qualquer
  if (Object.prototype.hasOwnProperty.call(v, 'pt') ||
      Object.prototype.hasOwnProperty.call(v, 'en') ||
      Object.prototype.hasOwnProperty.call(v, 'es')) {
    return v[lang] ?? v.pt ?? '';
  }
  return v;
};

// Helper uiT() — traduz uma chave de string da UI (do dicionário acima)
const uiT = (key, lang = 'pt') => {
  return I18N_UI[lang]?.[key] ?? I18N_UI.pt[key] ?? key;
};

// Componente seletor de idioma (flutuante, canto superior esquerdo)
const LangSwitcher = () => {
  const { lang, setLang } = useLang();
  const isMobile = useIsMobile();
  const options = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];
  return (
    <div style={{
      position: 'fixed',
      top: isMobile ? 14 : 20,
      left: isMobile ? 14 : 20,
      zIndex: 50,
      display: 'flex',
      gap: 4,
      padding: 3,
      borderRadius: 999,
      background: 'rgba(10,10,10,0.78)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid var(--border)',
    }}>
      {options.map(o => {
        const active = o.code === lang;
        return (
          <button
            key={o.code}
            onClick={() => setLang(o.code)}
            aria-label={'Change language to ' + o.label}
            aria-pressed={active}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: '0.2em',
              padding: '6px 10px',
              borderRadius: 999,
              border: 'none',
              background: active ? 'var(--surreal-red)' : 'transparent',
              color: active ? 'var(--bone)' : 'var(--fg-muted)',
              cursor: 'pointer',
              transition: 'all 180ms var(--ease-out-soft)',
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
};

Object.assign(window, {
  Eyebrow, Button, Chip, Tag, Price, Leader,
  useIsMobile,
  LangProvider, useLang, t, uiT, LangSwitcher, I18N_UI,
});
