// Portal.jsx — the entry / hero (surreal, irreverente)

const Portal = ({ onEnter, mode, setMode }) => {
  const [hover, setHover] = React.useState(false);
  const [prov, setProv] = React.useState(0);
  const provs = window.SURREAL.provocacoes;
  const isMobile = useIsMobile();
  React.useEffect(() => {
    const i = setInterval(() => setProv(p => (p + 1) % provs.length), 3200);
    return () => clearInterval(i);
  }, []);

  return (
    <section id="portal" data-screen-label="Portal" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '100px 18px 130px' : '140px 32px 80px',
      overflow: 'hidden',
      background: 'var(--ink)',
    }}>
      {/* Spiral */}
      <div style={{
        position: 'absolute', inset: '-30%',
        backgroundImage: 'url(assets/bolacha.jpg)',
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.12, filter: 'grayscale(1) contrast(1.3)',
        animation: 'spiralSpin 90s linear infinite',
        pointerEvents: 'none',
      }} />
      {/* Magenta glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(230,0,126,.38) 0%, rgba(228,50,43,.12) 42%, transparent 72%)',
        pointerEvents: 'none',
      }} />
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.82) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top chrome */}
      <div style={{
        position: 'absolute',
        top: isMobile ? 16 : 28,
        left: isMobile ? 16 : 28,
        right: isMobile ? 16 : 28,
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 10 : 0,
        zIndex: 3,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="assets/logo-wordmark.png" alt="Surreal"
               style={{ height: isMobile ? 28 : 34, filter: 'invert(1)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Eyebrow color="magenta">DESDE 2019</Eyebrow>
          <span style={{ width: 1, height: 14, background: 'var(--border)' }} />
          <Eyebrow>Botafogo · RJ</Eyebrow>
        </div>
      </div>

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 1100, zIndex: 2 }}>
        <div style={{ marginBottom: 26 }}>
          <Eyebrow color="magenta" size="xs">Cardápio · Edição 7 anos</Eyebrow>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(72px, 14vw, 220px)',
          lineHeight: 0.82,
          color: 'var(--bone)',
          margin: '0 0 10px',
          textShadow: '0 0 48px rgba(230,0,126,.55)',
          letterSpacing: '-0.015em',
        }}>
          <div>um menu</div>
          <div style={{ color: 'var(--surreal-red)', fontStyle: 'italic' }}>surreal.</div>
        </h1>

        <div style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(18px, 2.2vw, 26px)',
          color: 'var(--bone)',
          opacity: 0.88,
          margin: '22px auto 52px',
          maxWidth: 620,
          minHeight: 34,
          position: 'relative',
        }}>
          <span key={prov} style={{ animation: 'fadeIn 600ms var(--ease-out-soft)' }}>
            "{provs[prov]}"
          </span>
        </div>

        {/* Ato choice — instead of "book a table", user picks their hunger */}
        <div style={{ marginBottom: 28 }}>
          <Eyebrow color="ember" size="xs">escolha seu ato</Eyebrow>
        </div>

        <div style={{
          display: 'flex',
          gap: isMobile ? 12 : 16,
          justifyContent: 'center',
          flexWrap: 'wrap',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'flex-start',
          marginBottom: 18,
          maxWidth: isMobile ? 360 : 'none',
          marginLeft: isMobile ? 'auto' : undefined,
          marginRight: isMobile ? 'auto' : undefined,
        }}>
          <ActChoice
            num="I"
            label="Quero comer"
            sub="Entradas, sanduíches, pratos, doces"
            color="red"
            onClick={() => onEnter('comidas')}
          />
          <ActChoice
            num="II"
            label="Quero beber"
            sub="Drinks autorais, clássicos, vinhos"
            color="magenta"
            onClick={() => onEnter('drinks')}
          />
          <ActChoice
            num="III"
            label="Surpreenda-me"
            sub="Um prato e um drink ao acaso"
            color="ember"
            onClick={() => onEnter('random')}
          />
        </div>

        <div style={{ marginTop: 50, display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          <button onClick={() => onEnter('comidas')} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 11,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'var(--fg-muted)',
          }}>
            ↓ desça devagar
          </button>
        </div>
      </div>

      {/* Bottom-left — small credit line */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? 18 : 24,
        left: isMobile ? 14 : 28,
        right: isMobile ? 14 : 'auto',
        display: 'flex', alignItems: 'center', gap: 10, zIndex: 3,
        flexWrap: 'wrap',
        justifyContent: isMobile ? 'center' : 'flex-start',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--surreal-red)',
          boxShadow: '0 0 8px var(--surreal-red)',
          animation: 'pulse 2.4s ease-in-out infinite',
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: isMobile ? 8 : 10,
          color: 'var(--fg-muted)',
          letterSpacing: isMobile ? '0.1em' : '0.15em',
          lineHeight: 1.4,
          textAlign: isMobile ? 'center' : 'left',
        }}>
          {isMobile
            ? 'ABERTO · SEG–QUI 12H–00H · SEX 12H–01H · SÁB 12H–01H · DOM 12H–00H'
            : 'ABERTO · SEG–QUI: 12H-16H / 18H-00H · SEX: 12H-16H / 18H-01H · SAB: 12H-01H · DOM: 12H-00H'}
        </span>
      </div>

      {/* Bottom-right mascot corner — escondido no mobile pra não sobrepor a barra de horário */}
      {!isMobile && (
        <img src="assets/mascot.png" alt="" aria-hidden
             style={{
               position: 'absolute', bottom: 16, right: 20,
               height: 88, opacity: 0.92, zIndex: 3,
               animation: 'floatY 4.5s ease-in-out infinite',
             }} />
      )}
    </section>
  );
};

const ActChoice = ({ num, label, sub, color, onClick }) => {
  const [h, setH] = React.useState(false);
  const isMobile = useIsMobile();
  const accent = color === 'red' ? 'var(--surreal-red)'
               : color === 'magenta' ? 'var(--neon-magenta)'
               : 'var(--ember)';
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: isMobile ? '100%' : 240,
        minHeight: isMobile ? 110 : 160,
        padding: isMobile ? '18px 20px' : '22px 22px 22px',
        background: h ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${h ? accent : 'var(--border)'}`,
        borderRadius: 14,
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex', flexDirection: 'column', gap: 10,
        transition: 'all 260ms var(--ease-out-soft)',
        transform: h ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: h ? `0 0 28px ${color === 'red' ? 'rgba(228,50,43,.25)' : color === 'magenta' ? 'rgba(230,0,126,.3)' : 'rgba(242,142,28,.28)'}` : 'none',
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 28,
          color: accent, lineHeight: 1,
        }}>{num}</span>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 18,
          color: h ? accent : 'var(--bone)',
          transition: 'color 220ms',
        }}>→</span>
      </div>
      <div style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        fontSize: 24, lineHeight: 1.1,
        color: 'var(--bone)',
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 12,
        color: 'var(--fg-muted)', lineHeight: 1.4, marginTop: 'auto',
      }}>{sub}</div>
    </button>
  );
};

window.Portal = Portal;
