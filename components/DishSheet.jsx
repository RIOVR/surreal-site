// DishSheet.jsx — modal com detalhe do prato/drink

const DishSheet = ({ item, type = 'dish', onClose }) => {
  const isMobile = useIsMobile();
  React.useEffect(() => {
    if (!item) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item]);

  if (!item) return null;
  const isDrink = type === 'drink';
  const accent = isDrink ? 'var(--neon-magenta)' : 'var(--surreal-red)';

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,.82)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? 10 : 24,
      animation: 'fadeIn 240ms var(--ease-out-soft)',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'var(--ink-80)',
        border: '1px solid var(--border)',
        borderRadius: 18,
        maxWidth: 920, width: '100%',
        maxHeight: isMobile ? '94vh' : '88vh',
        overflow: isMobile ? 'auto' : 'hidden',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)',
        animation: 'driftUp 380ms var(--ease-out-soft)',
        boxShadow: `0 0 80px ${isDrink ? 'rgba(230,0,126,.2)' : 'rgba(228,50,43,.18)'}`,
      }}>
        <div style={{
          position: 'relative',
          background: 'var(--ink)',
          minHeight: isMobile ? 240 : 360,
          maxHeight: isMobile ? '40vh' : 'none',
          aspectRatio: isMobile ? '4/3' : 'auto',
        }}>
          {item.photo
            ? <img src={item.photo} alt={item.nome}
                   style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ width: '100%', height: '100%' }}>
                <PlaceholderBig glyph={isDrink ? '◉' : '✦'} accent={accent} />
              </div>
          }
          {/* Gradient protection */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent 45%)',
          }} />
          <div style={{
            position: 'absolute', left: 20, bottom: 16,
            display: 'flex', gap: 8, flexWrap: 'wrap',
          }}>
            {item.tag && <Tag color={isDrink ? 'magenta' : 'ember'}>{item.tag}</Tag>}
            {item.base && <Tag color="ember">{item.base}</Tag>}
            {item.ml && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                padding: '5px 10px', borderRadius: 999,
                background: 'rgba(0,0,0,0.5)', color: 'var(--bone)',
                border: '1px solid var(--border)', letterSpacing: '0.1em',
              }}>{item.ml}ML</span>
            )}
          </div>
        </div>

        <div style={{
          padding: isMobile ? '24px 22px 28px' : '36px 34px',
          overflow: isMobile ? 'visible' : 'auto',
          display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 18,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Eyebrow color={isDrink ? 'magenta' : 'red'}>
              {isDrink ? 'Drink' : item.tipo || 'Cardápio'}
            </Eyebrow>
            <button onClick={onClose} style={{
              background: 'transparent', border: '1px solid var(--border)',
              borderRadius: '50%', width: 34, height: 34,
              color: 'var(--bone)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, lineHeight: 1, flexShrink: 0,
            }}>×</button>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 48,
            lineHeight: 0.96,
            color: 'var(--bone)', margin: 0,
            letterSpacing: '-0.01em',
            wordBreak: 'break-word',
          }}>{item.nome}</h3>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 14,
            color: 'var(--fg-muted)', lineHeight: 1.55, margin: 0,
          }}>{item.desc}</p>

          {item.poema && item.poema.length > 0 && (
            <blockquote style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 18, lineHeight: 1.45,
              color: 'var(--bone)',
              borderLeft: `2px solid ${accent}`,
              padding: '4px 0 4px 18px',
              margin: '6px 0',
            }}>
              {item.poema.map((l, i) => <div key={i}>{l}</div>)}
            </blockquote>
          )}

          {item.alerg && item.alerg.length > 0 && (
            <div>
              <Eyebrow color="muted" size="xs">pode conter</Eyebrow>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                {item.alerg.map(a => (
                  <span key={a} style={{
                    fontFamily: 'var(--font-body)', fontSize: 11,
                    padding: '5px 10px', borderRadius: 999,
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    color: 'var(--fg-muted)', letterSpacing: '0.05em',
                  }}>{a}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{
            marginTop: 'auto', paddingTop: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            borderTop: '1px solid var(--border)',
          }}>
            <Price value={item.preco} style={{ fontSize: 22 }} />
            <button onClick={onClose} style={{
              background: accent, border: 'none',
              color: 'var(--bone)',
              padding: '12px 22px', borderRadius: 999,
              fontFamily: 'var(--font-body)', fontSize: 11,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              fontWeight: 600, cursor: 'pointer',
            }}>fechar travessia</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaceholderBig = ({ glyph, accent }) => (
  <div style={{
    width: '100%', height: '100%',
    background: 'var(--wine)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: '-10%',
      backgroundImage: 'url(assets/bolacha.jpg)',
      backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      opacity: 0.18, filter: 'grayscale(1) contrast(1.2)',
      animation: 'spiralSpin 80s linear infinite',
    }} />
    <div style={{
      fontFamily: 'var(--font-display)', fontSize: 140,
      color: accent, opacity: 0.85, position: 'relative',
      textShadow: `0 0 30px ${accent}`,
    }}>{glyph}</div>
  </div>
);

window.DishSheet = DishSheet;
