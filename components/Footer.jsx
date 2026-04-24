// Footer.jsx — visita, instagram, rodapé

const Footer = () => {
  const i = window.SURREAL.info;
  const horarios = window.SURREAL.horarios || [];
  const { lang } = useLang();
  return (
    <section id="visit" data-screen-label="Footer" style={{
      background: 'var(--ink)',
      padding: '80px 32px 40px',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gap: 40,
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          paddingBottom: 40,
          borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <img src="assets/logo-wordmark.png" alt="Surreal"
                 style={{ height: 44, filter: 'invert(1)', marginBottom: 18 }} />
            <p style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 18, color: 'var(--bone)', opacity: 0.85,
              margin: 0, maxWidth: 300,
            }}>
              {uiT('footerTagline', lang)}
            </p>
          </div>
          <div>
            <Eyebrow color="magenta">{uiT('footerOnde', lang)}</Eyebrow>
            <div style={{ marginTop: 14, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--bone)', lineHeight: 1.7 }}>
              <div>{t(i.address, lang)}</div>
              <div style={{ marginTop: 10 }}>
                {horarios.map((h, idx) => (
                  <div key={idx} style={{ color: 'var(--fg-muted)' }}>
                    {t(h.dias, lang)} · {h.horas}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Eyebrow color="magenta">{uiT('footerFale', lang)}</Eyebrow>
            <div style={{ marginTop: 14, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--bone)', lineHeight: 1.7 }}>
              <div>{i.instagram}</div>
              <div>{i.site}</div>
            </div>
          </div>
          <div>
            <Eyebrow color="magenta">{uiT('footerAvisos', lang)}</Eyebrow>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'var(--fg-muted)', lineHeight: 1.55, marginTop: 12,
            }}>
              {uiT('footerAvisosTexto', lang)}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 11,
              color: 'var(--fg-faint)', lineHeight: 1.55, marginTop: 10,
            }}>
              {uiT('footerPagamentos', lang)}<br />
              {uiT('footerProcon', lang)}<br />
              {uiT('footerSeBeber', lang)}
            </p>
          </div>
        </div>
        <div style={{
          paddingTop: 22,
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--fg-faint)', letterSpacing: '0.18em',
        }}>
          <span>© SURREAL · MMXXVI</span>
          <span>{uiT('footerVersao', lang)}</span>
        </div>
      </div>
    </section>
  );
};

window.Footer = Footer;
