// MenuView.jsx — the main menu browser (comidas + bebidas as tabs)

const MenuView = ({ openDish, openDrink, initialTab = 'comidas', density = 'editorial', onChangeTab }) => {
  const [tab, setTab] = React.useState(initialTab);
  const isMobile = useIsMobile();
  const { lang } = useLang();
  React.useEffect(() => { setTab(initialTab); }, [initialTab]);

  const changeTab = (tv) => { setTab(tv); onChangeTab && onChangeTab(tv); };

  return (
    <section id="menu" data-screen-label="Menu" style={{
      background: 'var(--ink)',
      padding: isMobile ? '40px 0 90px' : '60px 0 120px',
      position: 'relative',
    }}>
      {/* Tab strip */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'rgba(10,10,10,0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
        padding: isMobile ? '12px 16px' : '16px 32px',
        display: 'flex',
        gap: isMobile ? 14 : 24,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <TabSwitch active={tab === 'comidas'} onClick={() => changeTab('comidas')} accent="red">
          {uiT('comidas', lang)}
        </TabSwitch>
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--fg-faint)', fontSize: 18 }}>×</span>
        <TabSwitch active={tab === 'drinks'} onClick={() => changeTab('drinks')} accent="magenta">
          {uiT('bebidas', lang)}
        </TabSwitch>
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: isMobile ? '0 18px' : '0 32px' }}>
        {tab === 'comidas' && <ComidasView openDish={openDish} density={density} />}
        {tab === 'drinks' && <BebidasView openDrink={openDrink} density={density} />}
      </div>
    </section>
  );
};

const TabSwitch = ({ active, onClick, accent, children }) => {
  const accentColor = accent === 'magenta' ? 'var(--neon-magenta)' : 'var(--surreal-red)';
  const isMobile = useIsMobile();
  return (
    <button onClick={onClick} style={{
      fontFamily: 'var(--font-display)',
      fontSize: isMobile ? 26 : 36,
      lineHeight: 1,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: active ? accentColor : 'var(--fg-muted)',
      transition: 'color 220ms var(--ease-out-soft)',
      padding: '6px 4px',
      borderBottom: active ? `3px solid ${accentColor}` : '3px solid transparent',
      letterSpacing: '-0.01em',
    }}>{children}</button>
  );
};

// ====================== COMIDAS ======================
const ComidasView = ({ openDish, density }) => {
  const secoes = window.SURREAL.secoes.comidas;
  const menu = window.SURREAL.menu;
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const isMobile = useIsMobile();
  const { lang } = useLang();

  const filters = [
    { id: 'all', label: uiT('filterAll', lang) },
    { id: 'chef', label: uiT('filterChef', lang) },
    { id: 'veggie', label: uiT('filterVeggie', lang) },
  ];

  const match = (d) => {
    if (search) {
      const q = search.toLowerCase();
      const nomeStr = (t(d.nome, lang) || '').toLowerCase();
      const descStr = (t(d.desc, lang) || '').toLowerCase();
      if (!nomeStr.includes(q) && !descStr.includes(q)) return false;
    }
    if (filter === 'all') return true;
    if (filter === 'chef') return d.tag === 'Chef';
    if (filter === 'veggie') return d.alerg && (d.alerg.includes('vegano') || d.alerg.includes('veggie'));
    return true;
  };

  return (
    <div style={{ paddingTop: isMobile ? 36 : 56 }}>
      {/* Intro + filter row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
        alignItems: isMobile ? 'stretch' : 'end',
        gap: isMobile ? 20 : 32,
        marginBottom: isMobile ? 32 : 40,
      }}>
        <div>
          <Eyebrow color="red">{uiT('cardapioComidas', lang)}</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 9vw, 88px)',
            lineHeight: 0.92,
            color: 'var(--bone)',
            margin: '16px 0 12px',
          }}>{uiT('headlineComidas', lang)}</h2>
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: isMobile ? 17 : 20, color: 'var(--fg-muted)', maxWidth: 520, margin: 0,
          }}>
            {uiT('subComidas', lang)}
          </p>
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: 12,
          alignItems: isMobile ? 'stretch' : 'flex-end',
          width: isMobile ? '100%' : 'auto',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            border: '1px solid var(--border)', borderRadius: 999,
            background: 'var(--ink-80)', padding: '6px 14px',
            width: isMobile ? '100%' : 240,
          }}>
            <span style={{ color: 'var(--fg-faint)', fontSize: 14, marginRight: 8 }}>⌕</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={uiT('buscarPrato', lang)}
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--bone)', flex: 1,
                fontFamily: 'var(--font-body)', fontSize: 13,
              }} />
          </div>
          <div style={{
            display: 'flex', gap: 6, flexWrap: 'wrap',
            justifyContent: isMobile ? 'flex-start' : 'flex-end',
          }}>
            {filters.map(f => (
              <Chip key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Atalhos por categoria — ordem da página */}
      <QuickNav items={[
        { id: 'sec-entradas',    label: uiT('navEntradas', lang) },
        { id: 'sec-sanduiches',  label: uiT('navSanduiches', lang) },
        { id: 'sec-principais',  label: uiT('navPratos', lang) },
        { id: 'sec-sobremesas',  label: uiT('navSobremesas', lang) },
      ]} />

      {/* Sections */}
      {secoes.map((sec, idx) => {
        const dishes = menu.filter(d => d.secao === sec.id && match(d));
        if (dishes.length === 0) return null;
        return (
          <React.Fragment key={sec.id}>
            <div id={`sec-${sec.id}`} style={{ marginBottom: sec.id === 'sanduiches' ? 24 : 88 }}>
              <SectionHeader num={`0${idx + 1}`} title={t(sec.nome, lang)} subtitle={t(sec.subtitle, lang)} color="red" />
              {density === 'editorial' ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(290px, 1fr))',
                  gap: isMobile ? 20 : 28,
                }}>
                  {dishes.map(d => <DishCard key={d.id} dish={d} onClick={openDish} />)}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {dishes.map((d, i) => (
                    <DishRow key={d.id} dish={d} onClick={openDish}
                             last={i === dishes.length - 1} />
                  ))}
                </div>
              )}
            </div>

            {/* Extras aparecem logo abaixo dos sanduíches — são complementos dele */}
            {sec.id === 'sanduiches' && (
              <div style={{
                marginBottom: 88, padding: '28px 32px',
                border: '1px solid var(--border)', borderRadius: 14,
                background: 'var(--ink-80)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                  <Eyebrow color="ember">{uiT('extraTitle', lang)}</Eyebrow>
                  <span style={{
                    fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                    fontSize: 13, color: 'var(--fg-muted)',
                  }}>{uiT('extraSub', lang)}</span>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: 14, marginTop: 14,
                }}>
                  {window.SURREAL.extras.map((x, xi) => (
                    <div key={xi} style={{
                      display: 'flex', alignItems: 'baseline', gap: 8,
                      paddingBottom: 8, borderBottom: '1px dotted var(--border)',
                    }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--bone)' }}>
                        {t(x.item, lang)}
                      </span>
                      <Leader />
                      <Price value={x.preco} style={{ fontSize: 13 }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ---------- QuickNav ----------
// Atalho horizontal pra ancoras na seção de bebidas.
// Compensa altura da tab strip sticky pra a seção alvo não ficar atrás dela.
const QuickNav = ({ items }) => {
  const isMobile = useIsMobile();
  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Mede dinamicamente a altura da tab strip sticky pra fazer offset
    const stickyBar = document.querySelector('#menu > div'); // primeiro filho de #menu = tab strip
    const offset = (stickyBar ? stickyBar.getBoundingClientRect().height : 60) + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };
  return (
    <div style={{
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: isMobile ? 28 : 32,
      paddingBottom: 22,
      borderBottom: '1px dotted var(--border)',
    }}>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => scrollToAnchor(item.id)}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            padding: '9px 16px',
            borderRadius: 999,
            border: '1px solid var(--neon-magenta)',
            background: 'transparent',
            color: 'var(--bone)',
            cursor: 'pointer',
            transition: 'all 180ms var(--ease-out-soft)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--neon-magenta)';
            e.currentTarget.style.color = 'var(--bone)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--bone)';
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

// ====================== BEBIDAS ======================
const BebidasView = ({ openDrink, density }) => {
  const secoes = window.SURREAL.secoes.drinks;
  const bebidas = window.SURREAL.bebidas;
  const vinhos = window.SURREAL.vinhos;
  const [base, setBase] = React.useState('all');
  const isMobile = useIsMobile();
  const { lang } = useLang();

  const bases = ['all', 'Gin', 'Vodka', 'Whisky', 'Tequila', 'Cachaça', 'Rum', 'Zero', 'Cerveja', 'Soft'];
  const filtered = base === 'all' ? bebidas : bebidas.filter(b => b.base === base);

  return (
    <div style={{ paddingTop: isMobile ? 36 : 56 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
        alignItems: isMobile ? 'stretch' : 'end',
        gap: isMobile ? 20 : 32,
        marginBottom: isMobile ? 28 : 32,
      }}>
        <div>
          <Eyebrow color="magenta">{uiT('cardapioBebidas', lang)}</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 9vw, 88px)',
            lineHeight: 0.92,
            color: 'var(--bone)',
            margin: '16px 0 12px',
          }}>{uiT('headlineBebidas', lang)}</h2>
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: isMobile ? 17 : 20, color: 'var(--fg-muted)', maxWidth: 640, margin: 0,
          }}>
            {uiT('subBebidas', lang)}
          </p>
        </div>
      </div>

      {/* Atalhos de navegação por categoria — ordem segue a sequência física da página */}
      <QuickNav items={[
        { id: 'bsec-leves', label: uiT('navDrinks', lang) },
        { id: 'bsec-chopp', label: uiT('navCervejas', lang) },
        { id: 'bsec-soft',  label: uiT('navSoftDrinks', lang) },
        { id: 'vinhos',     label: uiT('navVinhos', lang) },
      ]} />

      {/* Base filter */}
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap',
        marginBottom: 56, paddingBottom: 20,
        borderBottom: '1px solid var(--border)',
      }}>
        {bases.map(b => (
          <Chip key={b} active={base === b} onClick={() => setBase(b)} color="magenta">
            {b === 'all' ? uiT('filterAll', lang) : b}
          </Chip>
        ))}
      </div>

      {secoes.map((sec, idx) => {
        const drinks = filtered.filter(b => b.secao === sec.id);
        if (drinks.length === 0) return null;
        const isAutoral = sec.id === 'leves' || sec.id === 'intensos' || sec.id === 'sem-alcool';
        return (
          <div key={sec.id} id={`bsec-${sec.id}`} style={{ marginBottom: 80 }}>
            <SectionHeader
              num={`0${idx + 1}`}
              title={t(sec.nome, lang)}
              subtitle={t(sec.subtitle, lang)}
              color="magenta"
            />
            {isAutoral ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: isMobile ? 16 : 20,
              }}>
                {drinks.map(d => <DrinkCard key={d.id} drink={d} onClick={openDrink} />)}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {drinks.map((d, i) => (
                  <DrinkRow key={d.id} drink={d}
                            last={i === drinks.length - 1}
                            onClick={d.poema && d.poema.length ? openDrink : undefined} />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Wine list */}
      <div id="vinhos" style={{ marginTop: 56, marginBottom: 40 }}>
        <SectionHeader num="09" title={uiT('cartaVinhos', lang)} subtitle={uiT('cartaVinhosSub', lang)} color="magenta" />
        <WineList vinhos={vinhos} />
      </div>
    </div>
  );
};

// Section header
const SectionHeader = ({ num, title, subtitle, color = 'red' }) => {
  const accent = color === 'magenta' ? 'var(--neon-magenta)' : 'var(--surreal-red)';
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', gap: 20,
      paddingBottom: 16, marginBottom: 32,
      borderBottom: '1px solid var(--border)',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 13,
        color: accent, letterSpacing: '0.2em',
      }}>{num}</span>
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 3.4vw, 44px)',
          lineHeight: 1, color: 'var(--bone)',
          margin: 0,
        }}>{title}</h3>
        {subtitle && <div style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 15, color: 'var(--fg-muted)',
          marginTop: 6,
        }}>{subtitle}</div>}
      </div>
    </div>
  );
};

// ---------- Dish editorial card ----------
const DishCard = ({ dish, onClick }) => {
  const [h, setH] = React.useState(false);
  const placeholder = !dish.photo;
  const { lang } = useLang();
  const nome = t(dish.nome, lang);
  const tipo = t(dish.tipo, lang);
  const poemaArr = t(dish.poema, lang) || [];
  return (
    <button
      onClick={() => onClick(dish)}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: 'transparent', border: 'none', padding: 0,
        cursor: 'pointer', textAlign: 'left',
        display: 'flex', flexDirection: 'column', gap: 14,
        transition: 'transform 260ms var(--ease-out-soft)',
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{
        position: 'relative', aspectRatio: '4/5',
        borderRadius: 14, overflow: 'hidden',
        background: placeholder ? 'var(--ink-80)' : 'var(--ink)',
        border: '1px solid var(--border)',
      }}>
        {placeholder ? <PlaceholderArt name={nome} /> :
          <img src={dish.photo} alt={nome}
               style={{ width: '100%', height: '100%', objectFit: 'cover',
                        filter: h ? 'brightness(1.08)' : 'brightness(1)',
                        transition: 'filter 320ms' }} />
        }
        {dish.tag && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            fontFamily: 'var(--font-body)', fontWeight: 600,
            fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
            padding: '6px 10px', borderRadius: 999,
            background: dish.tag === 'Chef' ? 'rgba(0,0,0,.6)' : 'var(--surreal-red)',
            color: dish.tag === 'Chef' ? 'var(--ember)' : 'var(--bone)',
            border: dish.tag === 'Chef' ? '1px solid var(--ember)' : 'none',
            backdropFilter: 'blur(6px)',
          }}>{dish.tag}</span>
        )}
        <span style={{
          position: 'absolute', bottom: 12, right: 12,
          fontFamily: 'var(--font-mono)', fontSize: 10,
          padding: '4px 10px', borderRadius: 999,
          background: 'rgba(0,0,0,0.6)', color: 'var(--bone)',
          border: '1px solid var(--border)',
          letterSpacing: '0.12em',
        }}>{tipo}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
        <div style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 22, lineHeight: 1.08, color: 'var(--bone)',
        }}>{nome}</div>
        <Price value={dish.preco} />
      </div>
      {poemaArr[0] && (
        <div style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 13, color: 'var(--fg-muted)',
          lineHeight: 1.5,
        }}>"{poemaArr[0]}"</div>
      )}
    </button>
  );
};

// Compact row variant (list density)
const DishRow = ({ dish, onClick, last }) => {
  const { lang } = useLang();
  return (
  <button onClick={() => onClick(dish)} style={{
    background: 'transparent', border: 'none',
    textAlign: 'left', cursor: 'pointer',
    display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 18,
    alignItems: 'baseline',
    padding: '18px 0',
    borderBottom: last ? 'none' : '1px solid var(--border)',
  }}>
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 11,
      color: 'var(--fg-faint)', letterSpacing: '0.15em',
      minWidth: 48,
    }}>{t(dish.tipo, lang)}</span>
    <div>
      <div style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        fontSize: 20, color: 'var(--bone)',
        marginBottom: 4,
      }}>{t(dish.nome, lang)} {dish.tag && <Tag color="ember">{dish.tag}</Tag>}</div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 13,
        color: 'var(--fg-muted)', lineHeight: 1.5,
      }}>{t(dish.desc, lang)}</div>
    </div>
    <Price value={dish.preco} />
  </button>
  );
};

// ---------- Drink card (autoral) ----------
const DrinkCard = ({ drink, onClick }) => {
  const [h, setH] = React.useState(false);
  const { lang } = useLang();
  const nome = t(drink.nome, lang);
  const desc = t(drink.desc, lang);
  const poemaArr = t(drink.poema, lang) || [];
  return (
    <button
      onClick={() => onClick(drink)}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? 'rgba(230,0,126,0.04)' : 'var(--ink-80)',
        border: `1px solid ${h ? 'var(--neon-magenta)' : 'var(--border)'}`,
        borderRadius: 14,
        padding: '22px 20px 20px',
        cursor: 'pointer', textAlign: 'left',
        display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'all 240ms var(--ease-out-soft)',
        boxShadow: h ? '0 0 24px rgba(230,0,126,0.2)' : 'none',
        minHeight: 220,
      }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: 4,
      }}>
        <div style={{
          display: 'flex', gap: 6, flexWrap: 'wrap',
        }}>
          {drink.tag && <Tag color={drink.secao === 'sem-alcool' ? 'ember' : 'magenta'}>{drink.tag}</Tag>}
          {drink.ml && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--fg-muted)', letterSpacing: '0.1em',
              padding: '5px 8px', border: '1px solid var(--border)', borderRadius: 999,
            }}>{drink.ml}ML</span>
          )}
        </div>
        <Price value={drink.preco} />
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 28, lineHeight: 0.98,
        color: 'var(--bone)',
      }}>{nome}</div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 12,
        color: 'var(--fg-muted)', lineHeight: 1.5,
      }}>{desc}</div>
      {poemaArr[0] && (
        <div style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 13, color: 'var(--neon-magenta-soft, #FF3DA0)',
          opacity: 0.88, lineHeight: 1.45,
          marginTop: 'auto', paddingTop: 8,
        }}>"{poemaArr[0]}"</div>
      )}
    </button>
  );
};

// Drink classic row
const DrinkRow = ({ drink, last, onClick }) => {
  const { lang } = useLang();
  return (
  <div onClick={onClick ? () => onClick(drink) : undefined} style={{
    display: 'grid', gridTemplateColumns: '1fr auto', gap: 18,
    padding: '16px 0',
    alignItems: 'baseline',
    borderBottom: last ? 'none' : '1px solid var(--border)',
    cursor: onClick ? 'pointer' : 'default',
  }}>
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 18, color: 'var(--bone)',
        }}>{t(drink.nome, lang)}</span>
        {drink.ml && <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--fg-faint)', letterSpacing: '0.1em',
        }}>{drink.ml}ML</span>}
      </div>
      {drink.desc && <div style={{
        fontFamily: 'var(--font-body)', fontSize: 13,
        color: 'var(--fg-muted)', marginTop: 4,
      }}>{t(drink.desc, lang)}</div>}
    </div>
    <Price value={drink.preco} />
  </div>
  );
};

// ---------- Wine list ----------
// Estrutura visual:
//   VINÍCOLA · País
//     Tinto
//       - Vinho 1 ........... R$ XX
//         notas...
//       - Vinho 2 ........... R$ XX
//     Branco
//       - ...
//     Rosé
//       - ...
//
// "Taça de vinho" (sem vinícola) aparece num bloco "Por taça" no início.
const WineList = ({ vinhos }) => {
  const isMobile = useIsMobile();
  const { lang } = useLang();

  // Vinhos sem vinicola (ex: "Taça de vinho") → bloco separado "Por taça"
  const semVinicola = vinhos.filter(v => !v.vinicola);

  // Vinhos com vinicola → agrupar por vinicola → subagrupar por tipo
  // Preserva ordem de aparição
  const vinicolaOrder = [];
  const byVinicola = {};
  vinhos.forEach(v => {
    if (!v.vinicola) return;
    if (!byVinicola[v.vinicola]) {
      byVinicola[v.vinicola] = { pais: v.pais, byTipo: {}, tipoOrder: [] };
      vinicolaOrder.push(v.vinicola);
    }
    const block = byVinicola[v.vinicola];
    const tipo = v.tipo || '—';
    if (!block.byTipo[tipo]) {
      block.byTipo[tipo] = [];
      block.tipoOrder.push(tipo);
    }
    block.byTipo[tipo].push(v);
  });

  const renderWineRow = (v, isLast) => (
    <div key={v.id} style={{
      padding: '14px 0',
      borderBottom: isLast ? 'none' : '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 16, color: 'var(--bone)',
        }}>{t(v.nome, lang)}</span>
        <Leader />
        <Price value={v.preco} style={{ fontSize: 13 }} />
      </div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 12,
        color: 'var(--fg-muted)', marginTop: 4,
        lineHeight: 1.45,
      }}>{t(v.desc, lang)}</div>
    </div>
  );

  return (
    <div>
      {/* Bloco "Por taça" (vinhos sem vinícola) */}
      {semVinicola.length > 0 && (
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <Eyebrow color="ember">{uiT('porTaca', lang)}</Eyebrow>
          <div style={{ marginTop: 14 }}>
            {semVinicola.map((v, i) =>
              renderWineRow(v, i === semVinicola.length - 1)
            )}
          </div>
        </div>
      )}

      {/* Grid de vinícolas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: isMobile ? 36 : 48,
      }}>
        {vinicolaOrder.map(vinicola => {
          const block = byVinicola[vinicola];
          return (
            <div key={vinicola}>
              {/* Header da vinícola — nome grande + país discreto */}
              <div style={{
                paddingBottom: 12,
                marginBottom: 18,
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  lineHeight: 1.1,
                  color: 'var(--bone)',
                  letterSpacing: '-0.005em',
                }}>{vinicola}</div>
                {block.pais && (
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 14,
                    color: 'var(--ember)',
                    marginTop: 4,
                    letterSpacing: '0.04em',
                  }}>{block.pais}</div>
                )}
              </div>

              {/* Subgrupos por tipo */}
              {block.tipoOrder.map((tipo, ti) => {
                const items = block.byTipo[tipo];
                return (
                  <div key={tipo} style={{ marginBottom: ti === block.tipoOrder.length - 1 ? 0 : 22 }}>
                    <Eyebrow color="muted">{tipoVinhoT(tipo, lang)}</Eyebrow>
                    <div style={{ marginTop: 8 }}>
                      {items.map((v, i) =>
                        renderWineRow(v, i === items.length - 1)
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---------- Placeholder art when photo is missing ----------
const PlaceholderArt = ({ name }) => {
  const { lang } = useLang();
  const safeName = typeof name === 'string' ? name : (name && (name.pt || name.en || name.es) || 'Surreal');
  // hash name to pick a treatment
  const hash = safeName.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const variants = [
    { bg: 'var(--surreal-red-ink)', ink: 'var(--bone)', glyph: '✦' },
    { bg: 'var(--wine)', ink: 'var(--ember-soft)', glyph: '◉' },
    { bg: 'var(--ink-60)', ink: 'var(--neon-magenta)', glyph: '◎' },
    { bg: 'var(--ember)', ink: 'var(--ink)', glyph: '✶' },
    { bg: 'var(--ink-80)', ink: 'var(--absinthe)', glyph: '❍' },
  ];
  const v = variants[hash % variants.length];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: v.bg, color: v.ink,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 20, padding: 24, textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* faint spiral behind */}
      <div style={{
        position: 'absolute', inset: '-20%',
        backgroundImage: 'url(assets/bolacha.png)',
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.1, filter: 'grayscale(1) contrast(1.2)',
        animation: 'spiralSpin 120s linear infinite',
      }} />
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 72,
        lineHeight: 1, opacity: 0.9, position: 'relative',
      }}>{v.glyph}</span>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: 10,
        letterSpacing: '0.3em', textTransform: 'uppercase',
        opacity: 0.6, position: 'relative',
      }}>{uiT('fotoEmBreve', lang)}</span>
    </div>
  );
};

Object.assign(window, { MenuView, DishCard, DrinkCard });
