// OBJAVI page — multi-step form

const { useState: useStateC } = React;

function ObjaviPage({ go }) {
  const isMobile = useIsMobile();
  const [step, setStep] = useStateC(1);
  const [data, setData] = useStateC({
    title: '', desc: '', cat: '', city: 'Zagreb', area: '', price: '', urgency: 'Ovaj tjedan',
  });

  function update(k, v) { setData(d => ({ ...d, [k]: v })); }

  const validation = {
    1: { ok: !!data.cat,                                           why: 'Odaberi kategoriju' },
    2: { ok: data.title.trim().length >= 3 && data.desc.trim().length >= 10,
         why: data.title.trim().length < 3 ? 'Dodaj naslov (barem 3 znaka)'
            : data.desc.trim().length < 10 ? 'Dodaj malo opisa (barem 10 znakova)'
            : '' },
    3: { ok: !!data.city,                                          why: 'Odaberi grad ili općinu' },
    4: { ok: Number(data.price) > 0,                              why: 'Upiši cijenu' },
  }[step];
  const canNext = validation.ok;

  if (step === 5) return <ObjaviSuccess data={data} go={go}/>;

  return (
    <div style={{ background: 'var(--paper-warm)', minHeight: 'calc(100vh - 67px)', padding: isMobile ? '20px 16px 60px' : '32px 32px 80px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? 20 : 28 }}>
          <button onClick={() => step > 1 ? setStep(step - 1) : go('landing')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'var(--muted)', fontSize: 13, fontFamily: 'inherit', padding: 0, marginBottom: 16,
          }}>
            <Icon.back size={14}/> {step > 1 ? 'Korak natrag' : 'Početna'}
          </button>
          <h1 style={{ fontSize: isMobile ? 28 : 36, letterSpacing: '-0.025em', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
            Objavi gig.
          </h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', margin: '8px 0 0' }}>
            Četiri kratka koraka. Manje od 60 sekundi.
          </p>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{
              flex: 1, height: 4, borderRadius: 999,
              background: n <= step ? 'var(--ink)' : 'var(--line)',
              transition: 'background 0.25s',
            }}/>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--line)', padding: isMobile ? 20 : 32 }}>
          {step === 1 && <Step1 data={data} update={update} isMobile={isMobile}/>}
          {step === 2 && <Step2 data={data} update={update} isMobile={isMobile}/>}
          {step === 3 && <Step3 data={data} update={update} isMobile={isMobile}/>}
          {step === 4 && <Step4 data={data} update={update}/>}
        </div>

        {/* Footer nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22, gap: 14, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}>
            korak {step} od 4
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {!canNext && validation.why && (
              <span style={{ fontSize: 13, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E0A816' }}/>
                {validation.why}
              </span>
            )}
            <Button variant="primary" size="lg" disabled={!canNext} onClick={() => setStep(step + 1)}>
              {step === 4 ? 'Objavi gig' : 'Dalje'} <Icon.arrow size={14}/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step1({ data, update, isMobile }) {
  return (
    <>
      <StepHeader n="01" title="Što ti treba?" sub="Odaberi kategoriju koja najbolje opisuje posao."/>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 10 }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => update('cat', c.id)} style={{
            padding: 20, borderRadius: 14, cursor: 'pointer', textAlign: 'left',
            background: data.cat === c.id ? c.color + '22' : '#fff',
            border: '1.5px solid ' + (data.cat === c.id ? 'var(--ink)' : 'var(--line)'),
            display: 'flex', flexDirection: 'column', gap: 10,
            fontFamily: 'inherit', transition: 'all 0.12s ease',
          }}>
            <span style={{ fontSize: 32 }}>{c.emoji}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{c.name}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function Step2({ data, update, isMobile }) {
  const titleOk = data.title.trim().length >= 3;
  const descOk  = data.desc.trim().length  >= 10;
  return (
    <>
      <StepHeader n="02" title="O čemu se radi?" sub="Kratak naslov i par rečenica. Budi konkretan — brže ćeš dobiti dobre ponude."/>
      <div style={{ display: 'grid', gap: 16 }}>
        <Field
          label="Naslov"
          hint={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {titleOk
                ? <><span style={{ color: '#2D9D5F' }}>✓</span> super</>
                : <>min. 3 znaka</>}
              <span style={{ color: 'var(--muted)' }}>· {data.title.length}/60</span>
            </span>
          }
        >
          <Input value={data.title} onChange={e => update('title', e.target.value.slice(0, 60))} placeholder="npr. Pomoć oko selidbe iz garsonijere"/>
        </Field>
        <Field
          label="Opi nam što ti treba"
          hint={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {descOk
                ? <><span style={{ color: '#2D9D5F' }}>✓</span> dovoljno</>
                : <>Napiši barem par riječi (min. 10 znakova)</>}
              <span style={{ color: 'var(--muted)' }}>· {data.desc.length} znakova</span>
            </span>
          }
        >
          <Textarea value={data.desc} onChange={e => update('desc', e.target.value)} rows={6} placeholder="Selim se s 3. kata bez lifta na 1. kat u drugoj zgradi. Cca 2-3h posla, krevet + kauč + frizider + kutije..."/>
        </Field>
        <Field label="Fotke (opcionalno)">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 10 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                aspectRatio: '1', borderRadius: 12,
                border: '1.5px dashed var(--line)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                color: 'var(--muted)', cursor: 'pointer', background: 'var(--paper-warm)',
              }}>
                <Icon.camera size={20}/>
                <span style={{ fontSize: 11 }}>Dodaj sliku</span>
              </div>
            ))}
          </div>
        </Field>
      </div>
    </>
  );
}

function Step3({ data, update, isMobile }) {
  return (
    <>
      <StepHeader n="03" title="Gdje?" sub="Odaberi mjesto — točnu adresu razmijenite kroz chat."/>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
        <Field label="Grad ili općina">
          <PlacePicker value={data.city} onChange={v => update('city', v)} placeholder="Odaberi mjesto…"/>
        </Field>
        <Field label="Kvart / adresa (opcionalno)">
          <Input value={data.area} onChange={e => update('area', e.target.value)} placeholder="npr. Trešnjevka"/>
        </Field>
      </div>
      <div style={{ marginTop: 22 }}>
        <Field label="Kad?">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 8 }}>
            {['Hitno', 'Danas', 'Ovaj tjedan', 'Fleksibilno'].map(u => (
              <button key={u} onClick={() => update('urgency', u)} style={{
                padding: '12px', borderRadius: 12, cursor: 'pointer',
                border: '1.5px solid ' + (data.urgency === u ? 'var(--ink)' : 'var(--line)'),
                background: data.urgency === u ? 'var(--ink)' : '#fff',
                color: data.urgency === u ? '#fff' : 'var(--ink)',
                fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
              }}>{u}</button>
            ))}
          </div>
        </Field>
      </div>
    </>
  );
}

function Step4({ data, update }) {
  const cat = CATEGORIES.find(c => c.id === data.cat);
  return (
    <>
      <StepHeader n="04" title="Koliko nudiš?" sub="Fiksna cijena. Možeš dogovoriti drugačije kroz chat."/>
      <Field label="Cijena (€)">
        <Input
          value={data.price}
          onChange={e => update('price', e.target.value.replace(/\D/g, ''))}
          placeholder="50"
          type="text"
          suffix={<span style={{ fontSize: 16, color: 'var(--muted)', fontWeight: 600 }}>€</span>}
        />
      </Field>

      {/* preview */}
      <div style={{ marginTop: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
          Pregled
        </div>
        <div style={{
          padding: 18, borderRadius: 16, border: '1px solid var(--line)',
          background: 'var(--paper-warm)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            {cat && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 999, background: cat.color + '33',
                fontSize: 11, fontWeight: 600, color: 'var(--ink)',
              }}>
                <span>{cat.emoji}</span>{cat.name}
              </span>
            )}
            <Badge>{data.urgency}</Badge>
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)', lineHeight: 1.35, marginBottom: 6 }}>
            {data.title || <span style={{ color: 'var(--muted)' }}>Naslov giga...</span>}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>
            {data.city} {data.area && '· ' + data.area}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>
            {data.price || '0'} €
          </div>
        </div>
      </div>
    </>
  );
}

function StepHeader({ n, title, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-fg)', fontFamily: '"JetBrains Mono", ui-monospace, monospace', marginBottom: 8 }}>
        {n}
      </div>
      <h2 style={{ fontSize: 24, letterSpacing: '-0.02em', fontWeight: 800, margin: '0 0 6px', color: 'var(--ink)' }}>
        {title}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
        {sub}
      </p>
    </div>
  );
}

function ObjaviSuccess({ data, go }) {
  return (
    <div style={{ background: 'var(--paper-warm)', minHeight: 'calc(100vh - 67px)', padding: '60px 32px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', color: 'var(--ink)',
        }}>
          <Icon.check size={32}/>
        </div>
        <h1 style={{ fontSize: 36, letterSpacing: '-0.025em', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
          Gig je live! 🎉
        </h1>
        <p style={{ fontSize: 16, color: 'var(--muted)', margin: '14px 0 28px', lineHeight: 1.55 }}>
          Pratimo te — javit ćemo čim se netko javi. Obično traje 15-60 minuta da netko uleti.
        </p>

        <div style={{
          padding: 18, borderRadius: 14, background: '#fff', border: '1px solid var(--line)',
          textAlign: 'left', marginBottom: 24,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
            Tvoj gig
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>
            {data.title}
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            {data.city} · {data.area} — <strong style={{ color: 'var(--ink)' }}>{data.price} €</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <Button variant="ghost" onClick={() => go('profil')}>Vidi u profilu</Button>
          <Button variant="dark" onClick={() => go('lista')}>Pretraži i druge gigove</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ObjaviPage });
