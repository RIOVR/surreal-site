// Footer.jsx — visita, instagram, rodapé

const Footer = () => {
  const i = window.SURREAL.info;
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
              Um portal sensorial em Botafogo.
              Beba com todos os sentidos.
            </p>
          </div>
          <div>
            <Eyebrow color="magenta">Onde</Eyebrow>
            <div style={{ marginTop: 14, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--bone)', lineHeight: 1.7 }}>
              <div>{i.address}</div>
              <div>{i.neighborhood || 'Botafogo · Rio de Janeiro'}</div>
              <div style={{ color: 'var(--fg-muted)', marginTop: 8 }}>Ter–Qui · 18h–00h</div>
              <div style={{ color: 'var(--fg-muted)' }}>Sex–Sáb · 18h–02h</div>
              <div style={{ color: 'var(--fg-faint)' }}>Dom–Seg · descansando</div>
            </div>
          </div>
          <div>
            <Eyebrow color="magenta">Fale com a gente</Eyebrow>
            <div style={{ marginTop: 14, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--bone)', lineHeight: 1.7 }}>
              <div>{i.instagram}</div>
              <div>{i.site}</div>
            </div>
          </div>
          <div>
            <Eyebrow color="magenta">Avisos do portal</Eyebrow>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'var(--fg-muted)', lineHeight: 1.55, marginTop: 12,
            }}>
              Alguns pratos podem conter lactose, glúten, nozes, pimenta ou outros ingredientes alergênicos. Qualquer restrição, avise nossa equipe antes de pedir.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 11,
              color: 'var(--fg-faint)', lineHeight: 1.55, marginTop: 10,
            }}>
              Aceitamos dinheiro, pix, cartões e vouchers.<br />
              Procon 151 · Vigilância Sanitária 1746.<br />
              Se beber, não dirija.
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
          <span>CARDÁPIO VIVO — VERSÃO 2026.04</span>
        </div>
      </div>
    </section>
  );
};

window.Footer = Footer;
