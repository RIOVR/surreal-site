// Tweaks.jsx — painel de Tweaks (toolbar)

const TweaksPanel = ({ open, cfg, setCfg, onClose }) => {
  if (!open) return null;

  const update = (k, v) => {
    const next = { ...cfg, [k]: v };
    setCfg(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, zIndex: 120,
      width: 300, background: 'var(--ink-80)',
      border: '1px solid var(--border)', borderRadius: 14,
      padding: 18, boxShadow: '0 24px 48px rgba(0,0,0,.6)',
      fontFamily: 'var(--font-body)',
      animation: 'driftUp 260ms var(--ease-out-soft)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Eyebrow color="magenta">Tweaks</Eyebrow>
        <button onClick={onClose} style={{
          background: 'transparent', border: '1px solid var(--border)',
          borderRadius: '50%', width: 26, height: 26,
          color: 'var(--bone)', cursor: 'pointer', fontSize: 14,
        }}>×</button>
      </div>

      <TweakRow label="Densidade">
        {['editorial', 'lista'].map(v => (
          <Chip key={v} active={cfg.density === v} onClick={() => update('density', v)}>{v}</Chip>
        ))}
      </TweakRow>

      <TweakRow label="Hero">
        {['portal', 'direto'].map(v => (
          <Chip key={v} active={cfg.hero === v} onClick={() => update('hero', v)}>{v}</Chip>
        ))}
      </TweakRow>

      <TweakRow label="Cor dos drinks">
        {[
          { id: 'magenta', label: 'magenta', c: 'var(--neon-magenta)' },
          { id: 'ember',   label: 'ember',   c: 'var(--ember)' },
          { id: 'red',     label: 'red',     c: 'var(--surreal-red)' },
        ].map(s => (
          <button key={s.id} onClick={() => update('drinkAccent', s.id)} style={{
            width: 24, height: 24, borderRadius: '50%',
            background: s.c,
            border: cfg.drinkAccent === s.id ? '2px solid var(--bone)' : '1px solid var(--border)',
            cursor: 'pointer', padding: 0,
          }} title={s.label} />
        ))}
      </TweakRow>

      <TweakRow label="Espiral">
        {['ativa', 'quieta'].map(v => (
          <Chip key={v} active={cfg.spiral === v} onClick={() => update('spiral', v)}>{v}</Chip>
        ))}
      </TweakRow>
    </div>
  );
};

const TweakRow = ({ label, children }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{
      fontFamily: 'var(--font-body)', fontSize: 10,
      letterSpacing: '0.22em', textTransform: 'uppercase',
      color: 'var(--fg-muted)', marginBottom: 8,
    }}>{label}</div>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

window.TweaksPanel = TweaksPanel;
