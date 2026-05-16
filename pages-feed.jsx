// LISTA + DETALJ pages

const { useState: useStateF, useMemo: useMemoF } = React;

function ListaPage({ go, ctx }) {
  const isMobile = useIsMobile();
  const [cat, setCat] = useStateF(ctx?.category || 'all');
  const [city, setCity] = useStateF('');
  const [q, setQ] = useStateF('');
  const [sort, setSort] = useStateF('najnoviji');

  const filtered = useMemoF(() => {
    return GIGS.filter(g => {
      if (cat !== 'all' && g.cat !== cat) return false;
      if (city && g.city !== city) return false;
      if (q && !(g.title.toLowerCase().includes(q.toLowerCase()) || g.desc.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
  }, [cat, city, q, sort]);

  return (
    <div style={{ background: 'var(--paper-warm)', minHeight: 'calc(100vh - 67px)' }}>
      {/* HEADER STRIP */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--line)', padding: isMobile ? '20px 16px 16px' : '28px 32px 22px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 18, flexWrap: 'wrap', gap: 14 }}>
            <div>
              <h1 style={{ fontSize: isMobile ? 26 : 36, letterSpacing: '-0.025em', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                Tko treba pomoć?
              </h1>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: '6px 0 0' }}>
                {filtered.length} {filtered.length === 1 ? 'aktivan gig' : 'aktivnih gigova'} — ažurirano prije par sekundi
              </p>
            </div>
            <Button variant="dark" onClick={() => go('objavi')} icon={<Icon.plus size={16}/>}>
              Objavi svoj gig
            </Button>
          </div>

          {/* Search + filters */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 200px 180px', gap: 10, marginBottom: 18 }}>
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Traži: 'selidba', 'IKEA', 'pas'…"
              prefix={<Icon.search size={16}/>}/>
            <PlacePicker value={city} onChange={setCity} includeAll allLabel="Sva mjesta"/>
            <select value={sort} onChange={e => setSort(e.target.value)} style={selectStyle}>
              <option value="najnoviji">Najnoviji</option>
              <option value="cijena-desc">Cijena: najviše</option>
              <option value="cijena-asc">Cijena: najniže</option>
            </select>
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => setCat('all')} style={{
              padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              border: '1px solid ' + (cat === 'all' ? 'var(--ink)' : 'var(--line)'),
              background: cat === 'all' ? 'var(--ink)' : '#fff',
              color:      cat === 'all' ? '#fff' : 'var(--ink)',
              fontFamily: 'inherit',
            }}>Sve kategorije</button>
            {CATEGORIES.map(c => (
              <CategoryPill key={c.id} cat={c} active={cat === c.id} onClick={() => setCat(c.id)}/>
            ))}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '18px 16px 60px' : '28px 32px 80px' }}>
        {filtered.length === 0 ? (
          <EmptyState/>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: isMobile ? 14 : 18 }}>
            {filtered.map(g => <GigCard key={g.id} gig={g} go={go}/>)}
          </div>
        )}
      </div>
    </div>
  );
}

const selectStyle = {
  border: '1px solid var(--line)', borderRadius: 12, padding: '0 14px',
  height: 46, fontSize: 14, fontFamily: 'inherit', background: '#fff',
  color: 'var(--ink)', outline: 'none', cursor: 'pointer',
};

function GigCard({ gig, go }) {
  const cat = CATEGORIES.find(c => c.id === gig.cat);
  const poster = USERS[gig.poster];
  return (
    <article onClick={() => go('detalj', { gigId: gig.id })} style={{
      background: '#fff', border: '1px solid var(--line)', borderRadius: 18,
      overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column',
      transition: 'transform 0.12s ease, box-shadow 0.15s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(14,14,16,0.06)';}}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none';}}
    >
      <div style={{ position: 'relative' }}>
        <PhotoPlaceholder label={cat.name} aspect="16/10" radius={0}/>
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 11px', borderRadius: 999,
            background: '#fff', color: 'var(--ink)',
            fontSize: 11, fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}>
            <span>{cat.emoji}</span>{cat.name}
          </span>
        </div>
        {gig.urgency === 'Hitno' && (
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <Badge tone="warn"><Icon.bolt size={11}/> Hitno</Badge>
          </div>
        )}
      </div>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: 16, lineHeight: 1.35, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
          {gig.title}
        </h3>
        <p style={{ margin: '8px 0 14px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.45,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {gig.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          <Badge><Icon.pin size={11}/> {gig.city} · {gig.area}</Badge>
          <Badge><Icon.clock size={11}/> {gig.urgency}</Badge>
        </div>
        <div style={{
          marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar user={poster} size={26}/>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{poster.name}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon.star size={10}/> {poster.rating.toFixed(1)} · {poster.jobs} poslova
              </div>
            </div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            {gig.price} €
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div style={{
      padding: '80px 20px', textAlign: 'center',
      background: '#fff', borderRadius: 20, border: '1px dashed var(--line)',
    }}>
      <div style={{ fontSize: 44, marginBottom: 14 }}>🤔</div>
      <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', margin: 0, letterSpacing: '-0.02em' }}>
        Još nema gigova s tim filterima.
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 8 }}>
        Probaj malo širu pretragu, ili živni za malo — ljudi objavljuju non-stop.
      </p>
    </div>
  );
}

// ---------- DETALJ ----------
function DetaljPage({ go, ctx, appState, setAppState }) {
  const isMobile = useIsMobile();
  const gig = GIGS.find(g => g.id === ctx?.gigId) || GIGS[0];
  const cat = CATEGORIES.find(c => c.id === gig.cat);
  const poster = USERS[gig.poster];
  const applied = appState.applied.includes(gig.id);

  const [showApply, setShowApply] = useStateF(false);
  const [msg, setMsg] = useStateF('Bok! Možda vam mogu pomoć — imam iskustva s ovim. Kad bi mogli krenuti?');

  function uleti() {
    setAppState({ ...appState, applied: [...appState.applied, gig.id] });
    setShowApply(false);
    setTimeout(() => go('chat', { gigId: gig.id, withUser: gig.poster }), 400);
  }

  return (
    <div style={{ background: 'var(--paper-warm)', minHeight: 'calc(100vh - 67px)', paddingBottom: 60 }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: isMobile ? '14px 16px 0' : '20px 32px 0' }}>
        <button onClick={() => go('lista')} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--muted)', fontSize: 13, fontFamily: 'inherit', padding: 0,
        }}>
          <Icon.back size={14}/> Natrag na listu
        </button>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: isMobile ? '14px 16px' : '20px 32px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: isMobile ? 20 : 32 }}>
        {/* LEFT */}
        <div>
          {/* photos */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '1fr 1fr', gap: 8, height: isMobile ? 240 : 360, marginBottom: isMobile ? 18 : 28 }}>
            <div style={{ gridRow: '1 / 3' }}>
              <PhotoPlaceholder label={`${cat.name} — foto 1`}/>
            </div>
            <PhotoPlaceholder label="foto 2"/>
            <PhotoPlaceholder label="foto 3"/>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            <Badge tone="accent"><span style={{ fontSize: 12 }}>{cat.emoji}</span> {cat.name}</Badge>
            <Badge><Icon.pin size={11}/> {gig.city} · {gig.area}</Badge>
            <Badge><Icon.clock size={11}/> {gig.urgency}</Badge>
            <Badge>Objavljeno {gig.posted}</Badge>
          </div>

          <h1 style={{ fontSize: isMobile ? 24 : 32, letterSpacing: '-0.025em', fontWeight: 800, margin: '6px 0 14px', lineHeight: 1.15, color: 'var(--ink)' }}>
            {gig.title}
          </h1>

          <div style={{ fontSize: 15, lineHeight: 1.65, color: '#3A3A3F', whiteSpace: 'pre-line' }}>
            {gig.desc}
          </div>

          {/* What's included */}
          <div style={{ marginTop: 32, padding: 22, borderRadius: 16, border: '1px solid var(--line)', background: '#fff' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
              Što očekivati
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
              <FactRow label="Procijenjeno trajanje" value="2–3 sata"/>
              <FactRow label="Broj ljudi" value="2 osobe"/>
              <FactRow label="Alat" value="Donijeti svoj"/>
              <FactRow label="Plaćanje" value="Dogovor uz kavu"/>
            </div>
          </div>

          {/* Safety note */}
          <div style={{
            marginTop: 18, padding: '14px 18px', borderRadius: 12,
            background: 'var(--paper-warm)', border: '1px solid var(--line)',
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <Icon.shield size={18}/>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ink)' }}>Sigurnost prvo.</strong> Pričaj kroz chat dok se ne dogovorite. Nemoj slaći osobne podatke ili plaćati unaprijed izvan aplikacije.
            </div>
          </div>
        </div>

        {/* RIGHT — sticky panel */}
        <aside>
          <div style={{
            position: isMobile ? 'static' : 'sticky', top: 90,
            background: '#fff', borderRadius: 20, border: '1px solid var(--line)',
            padding: isMobile ? 20 : 24, boxShadow: '0 4px 20px rgba(14,14,16,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.03em' }}>{gig.price} €</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>fiksno</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 18 }}>
              Plaćanje uz kavu · escrow stigne uskoro
            </div>

            {applied ? (
              <div style={{
                background: 'var(--accent-soft)', borderRadius: 14, padding: 16, marginBottom: 14,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2D9D5F', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon.check size={16}/>
                </div>
                <div style={{ fontSize: 13 }}>
                  <strong>Uletio si!</strong><br/>
                  <span style={{ color: 'var(--muted)' }}>{poster.name} će vidjeti tvoju poruku.</span>
                </div>
              </div>
            ) : (
              <Button variant="primary" size="lg" full onClick={() => setShowApply(true)}>
                Uleti na ovaj gig →
              </Button>
            )}

            {applied && (
              <Button variant="dark" size="md" full onClick={() => go('chat', { gigId: gig.id, withUser: gig.poster })}>
                Otvori chat
              </Button>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, fontSize: 12, color: 'var(--muted)', marginTop: 14 }}>
              <span>✨ {gig.interested} već javila</span>
              <span>·</span>
              <span>⏱ {gig.posted}</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '20px 0' }}/>

            {/* Poster card */}
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
              Naručitelj
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <Avatar user={poster} size={48}/>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>{poster.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon.star size={11}/> {poster.rating.toFixed(1)} · {poster.jobs} poslova
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
              <Mini label="Grad" value={poster.city}/>
              <Mini label="Član od" value={poster.since}/>
            </div>
          </div>
        </aside>
      </div>

      {showApply && (
        <ApplyModal poster={poster} gig={gig} msg={msg} setMsg={setMsg} onClose={() => setShowApply(false)} onSubmit={uleti}/>
      )}
    </div>
  );
}

function FactRow({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginTop: 2 }}>{value}</div>
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div style={{ padding: '8px 10px', background: 'var(--paper-warm)', borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginTop: 2 }}>{value}</div>
    </div>
  );
}

function ApplyModal({ gig, poster, msg, setMsg, onClose, onSubmit }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(14,14,16,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
      animation: 'fadeIn 0.15s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 20, width: 480, maxWidth: '92vw',
        padding: 28, animation: 'slideUp 0.2s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-fg)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Javi se na gig
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              {gig.title}
            </h2>
          </div>
          <button onClick={onClose} style={{
            background: 'var(--paper-warm)', border: 'none', borderRadius: 999,
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            color: 'var(--ink)',
          }}><Icon.close size={14}/></button>
        </div>

        <div style={{
          background: 'var(--paper-warm)', borderRadius: 12, padding: 14, marginBottom: 18,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <Avatar user={poster} size={36}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{poster.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              <Icon.star size={10}/> {poster.rating.toFixed(1)} · {poster.jobs} poslova
            </div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>{gig.price} €</div>
        </div>

        <Field label="Tvoja poruka" hint="Reci zašto si dobra opcija — iskustvo, alat, dostupnost.">
          <Textarea value={msg} onChange={e => setMsg(e.target.value)} rows={5}/>
        </Field>

        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <Button variant="ghost" full onClick={onClose}>Odustani</Button>
          <Button variant="primary" full onClick={onSubmit} icon={<Icon.send size={14}/>}>
            Pošalji — uleti!
          </Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ListaPage, DetaljPage });
