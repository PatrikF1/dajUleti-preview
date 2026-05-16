// PROFIL + CHAT pages

const { useState: useStateP, useRef: useRefP, useEffect: useEffectP } = React;

function ProfilPage({ go, appState }) {
  const [tab, setTab] = useStateP('javio');
  const me = USERS.u_me;

  const myApps = MY_APPLICATIONS.concat(
    appState.applied.filter(id => !MY_APPLICATIONS.some(a => a.gigId === id))
      .map(id => ({ gigId: id, status: 'na čekanju', when: 'upravo sad' }))
  );

  return (
    <div style={{ background: 'var(--paper-warm)', minHeight: 'calc(100vh - 67px)' }}>
      {/* Profile header */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--line)', padding: '40px 32px 30px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ position: 'relative' }}>
            <Avatar user={me} size={88}/>
            <div style={{
              position: 'absolute', bottom: -2, right: -2,
              background: '#fff', borderRadius: '50%', padding: 4,
              border: '2px solid #fff',
            }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--ink)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon.check size={12}/>
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: 30, fontWeight: 800, margin: 0, letterSpacing: '-0.025em', color: 'var(--ink)' }}>
                {me.name}
              </h1>
              <Badge tone="ink"><Icon.shield size={10}/> Verificiran</Badge>
            </div>
            <div style={{ display: 'flex', gap: 18, fontSize: 13, color: 'var(--muted)' }}>
              <span><Icon.pin size={12}/> {me.city}</span>
              <span><Icon.star size={12}/> {me.rating.toFixed(1)} · {me.jobs} poslova</span>
              <span><Icon.clock size={12}/> Član od {me.since}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" size="sm">Uredi profil</Button>
            <Button variant="dark" size="sm" onClick={() => go('objavi')} icon={<Icon.plus size={14}/>}>
              Novi gig
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ maxWidth: 1100, margin: '28px auto 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <Stat label="Obavljenih poslova" value="12"/>
          <Stat label="Prosječna ocjena" value="4.9★"/>
          <Stat label="Response rate" value="98%"/>
          <Stat label="Zarada (mjesec)" value="240 €"/>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 32px' }}>
        <div style={{ display: 'flex', gap: 6, borderBottom: '1px solid var(--line)', marginBottom: 24 }}>
          {[
            { id: 'javio',   label: 'Gigovi na koje sam se javio', count: myApps.length },
            { id: 'moji',    label: 'Moji objavljeni',              count: MY_POSTED.length },
            { id: 'ocjene',  label: 'Ocjene',                       count: MY_RATINGS.length },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '12px 4px', marginRight: 22,
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: tab === t.id ? 700 : 500,
              color: tab === t.id ? 'var(--ink)' : 'var(--muted)',
              borderBottom: '2px solid ' + (tab === t.id ? 'var(--ink)' : 'transparent'),
              marginBottom: -1, fontFamily: 'inherit',
            }}>
              {t.label} <span style={{ color: 'var(--muted)', fontWeight: 500 }}>({t.count})</span>
            </button>
          ))}
        </div>

        {tab === 'javio'  && <TabJavio   apps={myApps} go={go}/>}
        {tab === 'moji'   && <TabMoji    go={go}/>}
        {tab === 'ocjene' && <TabOcjene/>}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ padding: 16, background: 'var(--paper-warm)', borderRadius: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginTop: 4 }}>
        {value}
      </div>
    </div>
  );
}

function TabJavio({ apps, go }) {
  if (apps.length === 0) return <EmptyTab text="Još se nisi javio ni na jedan gig." cta="Pretraži gigove" onCta={() => go('lista')}/>;
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {apps.map(a => {
        const gig = GIGS.find(g => g.id === a.gigId);
        if (!gig) return null;
        const cat = CATEGORIES.find(c => c.id === gig.cat);
        const tone = a.status === 'prihvaćeno' ? 'success' : 'neutral';
        return (
          <div key={a.gigId} onClick={() => go('detalj', { gigId: gig.id })} style={{
            background: '#fff', borderRadius: 16, border: '1px solid var(--line)',
            padding: 18, display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
            transition: 'transform 0.1s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
          >
            <div style={{
              width: 50, height: 50, borderRadius: 12, background: cat.color + '33',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>{cat.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <strong style={{ fontSize: 15, color: 'var(--ink)' }}>{gig.title}</strong>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 12 }}>
                <span>{gig.city} · {gig.area}</span>
                <span>Prijava {a.when}</span>
              </div>
            </div>
            <Badge tone={tone}>{a.status === 'prihvaćeno' && <Icon.check size={11}/>} {a.status}</Badge>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', minWidth: 64, textAlign: 'right' }}>
              {gig.price} €
            </div>
            {a.status === 'prihvaćeno' && (
              <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); go('chat', { gigId: gig.id, withUser: gig.poster }); }}>
                Chat
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TabMoji({ go }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {MY_POSTED.map(p => {
        const gig = GIGS.find(g => g.id === p.gigId);
        const cat = CATEGORIES.find(c => c.id === gig.cat);
        return (
          <div key={p.gigId} style={{
            background: '#fff', borderRadius: 16, border: '1px solid var(--line)', padding: 20,
            display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 16, alignItems: 'center',
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: 12, background: cat.color + '33',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>{cat.emoji}</div>
            <div>
              <strong style={{ fontSize: 16, color: 'var(--ink)' }}>{gig.title}</strong>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                {gig.city} · {gig.area} · <strong style={{ color: 'var(--ink)' }}>{gig.price} €</strong>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <Badge tone="success">● {p.status}</Badge>
                <Badge>{p.interested} zainteresiranih</Badge>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Button variant="primary" size="sm">Pogledaj ponude</Button>
              <Button variant="ghost" size="sm">Uredi</Button>
            </div>
          </div>
        );
      })}
      <button onClick={() => go('objavi')} style={{
        padding: 22, borderRadius: 16, border: '1.5px dashed var(--line)',
        background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        color: 'var(--muted)', fontSize: 14,
      }}>
        <Icon.plus size={16}/> Objavi novi gig
      </button>
    </div>
  );
}

function TabOcjene() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {MY_RATINGS.map((r, i) => {
        const u = USERS[r.from];
        return (
          <div key={i} style={{
            background: '#fff', borderRadius: 16, border: '1px solid var(--line)', padding: 22,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <Avatar user={u} size={36}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{u.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{r.when}</div>
              </div>
              <div style={{ display: 'flex', gap: 1 }}>
                {[1,2,3,4,5].map(n => (
                  <Icon.star key={n} size={16} fill={n <= r.stars ? '#FFC107' : '#E8E5DD'}/>
                ))}
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#3A3A3F', lineHeight: 1.5 }}>"{r.text}"</p>
          </div>
        );
      })}
    </div>
  );
}

function EmptyTab({ text, cta, onCta }) {
  return (
    <div style={{ padding: 60, textAlign: 'center', background: '#fff', borderRadius: 20, border: '1px dashed var(--line)' }}>
      <p style={{ fontSize: 15, color: 'var(--muted)', margin: '0 0 16px' }}>{text}</p>
      <Button variant="dark" onClick={onCta}>{cta}</Button>
    </div>
  );
}

// ====================== CHAT ======================
function ChatPage({ go, ctx, appState }) {
  // Build list of threads: anyone "me" applied to + the default one
  const threads = useMemoChat(() => {
    const ids = new Set(['g1', ...appState.applied, 'g3']);
    return [...ids].map(gigId => {
      const gig = GIGS.find(g => g.id === gigId);
      if (!gig) return null;
      return {
        gigId,
        gig,
        other: USERS[gig.poster],
        lastMessage: gigId === 'g1' ? CHAT_THREAD.messages[CHAT_THREAD.messages.length-1].text : 'Početak razgovora…',
        unread: gigId === 'g1' ? 2 : 0,
      };
    }).filter(Boolean);
  }, [appState.applied]);

  const initialId = ctx?.gigId || threads[0]?.gigId || 'g1';
  const [activeId, setActiveId] = useStateP(initialId);
  const active = threads.find(t => t.gigId === activeId) || threads[0];

  return (
    <div style={{ background: 'var(--paper-warm)', height: 'calc(100vh - 67px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '20px 32px 0', width: '100%' }}>
        <h1 style={{ fontSize: 28, letterSpacing: '-0.025em', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
          Poruke
        </h1>
      </div>

      <div style={{ maxWidth: 1180, margin: '20px auto 0', padding: '0 32px 20px', width: '100%', flex: 1, minHeight: 0 }}>
        <div style={{
          background: '#fff', borderRadius: 20, border: '1px solid var(--line)',
          display: 'grid', gridTemplateColumns: '320px 1fr', height: '100%', overflow: 'hidden',
        }}>
          {/* Thread list */}
          <div style={{ borderRight: '1px solid var(--line)', overflow: 'auto' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)' }}>
              <Input placeholder="Traži razgovor…" prefix={<Icon.search size={14}/>}/>
            </div>
            {threads.map(t => (
              <ThreadRow key={t.gigId} t={t} active={t.gigId === activeId} onClick={() => setActiveId(t.gigId)}/>
            ))}
          </div>

          {/* Active conversation */}
          {active ? <Conversation thread={active} go={go}/> : <NoChat/>}
        </div>
      </div>
    </div>
  );
}

function useMemoChat(fn, deps) { return React.useMemo(fn, deps); }

function ThreadRow({ t, active, onClick }) {
  const cat = CATEGORIES.find(c => c.id === t.gig.cat);
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', padding: '14px 16px',
      background: active ? 'var(--paper-warm)' : '#fff',
      border: 'none', borderBottom: '1px solid var(--line)',
      cursor: 'pointer', fontFamily: 'inherit',
      display: 'flex', gap: 12, alignItems: 'flex-start',
    }}>
      <Avatar user={t.other} size={42}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <strong style={{ fontSize: 14, color: 'var(--ink)' }}>{t.other.name}</strong>
          {t.unread > 0 && (
            <span style={{
              background: 'var(--accent)', color: 'var(--ink)', fontSize: 10, fontWeight: 700,
              padding: '2px 6px', borderRadius: 999, minWidth: 18, textAlign: 'center',
            }}>{t.unread}</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 500, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <span style={{ marginRight: 4 }}>{cat.emoji}</span>{t.gig.title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {t.lastMessage}
        </div>
      </div>
    </button>
  );
}

function Conversation({ thread, go }) {
  const [draft, setDraft] = useStateP('');
  const [extra, setExtra] = useStateP([]);
  const [showDone, setShowDone] = useStateP(false);
  const scrollRef = useRefP(null);

  const isLive = thread.gigId === 'g1';
  const baseMsgs = isLive ? CHAT_THREAD.messages : [
    { from: USERS.u_me.id, text: 'Bok! Možda vam mogu pomoć — javljam se na ovaj gig.', t: 'sad' },
  ];
  const msgs = baseMsgs.concat(extra);

  useEffectP(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs.length]);

  function send() {
    if (!draft.trim()) return;
    setExtra([...extra, { from: 'u_me', text: draft.trim(), t: 'sad' }]);
    setDraft('');
    // mock reply
    setTimeout(() => {
      setExtra(e => [...e, { from: thread.other.id, text: 'Super, javljam se za 5 min!', t: 'sad' }]);
    }, 1400);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* Header */}
      <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 14 }}>
        <Avatar user={thread.other} size={40}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{thread.other.name}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            <Icon.star size={10}/> {thread.other.rating.toFixed(1)} · {thread.other.jobs} poslova
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => go('detalj', { gigId: thread.gigId })}>
          Otvori gig
        </Button>
        <Button variant="primary" size="sm" onClick={() => setShowDone(true)}>
          Posao gotov ✓
        </Button>
      </div>

      {/* Gig context banner */}
      <div style={{
        padding: '12px 22px', background: 'var(--paper-warm)', borderBottom: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ fontSize: 18 }}>{CATEGORIES.find(c => c.id === thread.gig.cat).emoji}</span>
        <div style={{ flex: 1, fontSize: 13 }}>
          <strong style={{ color: 'var(--ink)' }}>{thread.gig.title}</strong>
          <span style={{ color: 'var(--muted)', marginLeft: 8 }}>· {thread.gig.city} · {thread.gig.area}</span>
        </div>
        <strong style={{ fontSize: 16, color: 'var(--ink)' }}>{thread.gig.price} €</strong>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SystemMsg text="Razgovor započet — budite pristojni i ne razmjenjujte osobne podatke dok se ne dogovorite."/>
        {msgs.map((m, i) => <Bubble key={i} m={m} other={thread.other}/>)}
      </div>

      {/* Composer */}
      <div style={{ padding: '14px 22px', borderTop: '1px solid var(--line)', display: 'flex', gap: 10, alignItems: 'center' }}>
        <Input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Napiši poruku…"
        />
        <Button variant="dark" onClick={send} icon={<Icon.send size={14}/>}>Pošalji</Button>
      </div>

      {showDone && <DoneModal thread={thread} onClose={() => setShowDone(false)}/>}
    </div>
  );
}

function Bubble({ m, other }) {
  const me = m.from === 'u_me';
  return (
    <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', gap: 8 }}>
      {!me && <Avatar user={other} size={28}/>}
      <div style={{
        maxWidth: '70%',
        background: me ? 'var(--ink)' : '#F4F2EC',
        color: me ? '#fff' : 'var(--ink)',
        padding: '10px 14px',
        borderRadius: me ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        fontSize: 14, lineHeight: 1.45,
      }}>
        {m.text}
        <div style={{ fontSize: 10, marginTop: 4, opacity: 0.55, textAlign: 'right' }}>{m.t}</div>
      </div>
    </div>
  );
}

function SystemMsg({ text }) {
  return (
    <div style={{
      alignSelf: 'center', maxWidth: '85%', textAlign: 'center',
      fontSize: 12, color: 'var(--muted)', background: 'var(--paper-warm)',
      padding: '6px 14px', borderRadius: 999,
    }}>{text}</div>
  );
}

function NoChat() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: 'var(--muted)' }}>
      <Icon.chat size={32}/>
      <div style={{ fontSize: 14 }}>Odaberi razgovor s lijeve strane.</div>
    </div>
  );
}

function DoneModal({ thread, onClose }) {
  const [step, setStep] = useStateP(1);
  const [stars, setStars] = useStateP(5);
  const [text, setText] = useStateP('');

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(14,14,16,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 20, width: 460, maxWidth: '92vw', padding: 28,
      }}>
        {step === 1 ? (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              Posao gotov?
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: '8px 0 22px', lineHeight: 1.5 }}>
              Potvrdi da je sve odrađeno — onda obje strane ocijenite. Sljedeća verzija će imati i automatsko escrow plaćanje.
            </p>
            <div style={{ background: 'var(--paper-warm)', borderRadius: 12, padding: 14, marginBottom: 22 }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>Dogovorena cijena</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{thread.gig.price} €</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="ghost" full onClick={onClose}>Još ne</Button>
              <Button variant="primary" full onClick={() => setStep(2)}>Da, gotovo</Button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              Ocijeni {thread.other.name}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: '8px 0 22px' }}>
              Kako je prošlo? Tvoja ocjena pomaze drugima.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 18 }}>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setStars(n)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
                }}>
                  <Icon.star size={36} fill={n <= stars ? '#FFC107' : '#E8E5DD'}/>
                </button>
              ))}
            </div>
            <Textarea rows={3} placeholder="Napiši koju (opcionalno)" value={text} onChange={e => setText(e.target.value)}/>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <Button variant="ghost" full onClick={onClose}>Kasnije</Button>
              <Button variant="primary" full onClick={onClose}>Pošalji ocjenu</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ProfilPage, ChatPage });
