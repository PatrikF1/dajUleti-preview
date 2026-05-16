// LANDING + AUTH pages

const { useState: useStateL } = React;

function LandingPage({ go }) {
  return (
    <div style={{ background: '#fff' }}>
      {/* HERO */}
      <section style={{
        background: 'var(--paper-warm)',
        borderBottom: '1px solid var(--line)',
        padding: '80px 32px 60px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 12px', borderRadius: 999, background: '#fff',
                border: '1px solid var(--line)', marginBottom: 24,
                fontSize: 12, fontWeight: 600, color: 'var(--ink)',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2D9D5F' }} />
                Beta — besplatno prvih 6 mjeseci
              </div>
              <h1 style={{
                fontSize: 68, lineHeight: 1.02, letterSpacing: '-0.035em',
                fontWeight: 800, margin: 0, color: 'var(--ink)',
              }}>
                Treba ti pomoć?<br/>
                <span style={{
                  background: 'var(--accent)',
                  padding: '0 12px', borderRadius: 12, marginLeft: -6,
                  display: 'inline-block', transform: 'rotate(-1deg)',
                }}>Netko će uletit.</span>
              </h1>
              <p style={{
                fontSize: 19, lineHeight: 1.5, color: 'var(--muted)',
                marginTop: 28, marginBottom: 36, maxWidth: 480,
              }}>
                Selidba, sitni majstor, čišćenje, vrt, čuvanje — objavi gig i netko iz tvog grada će uletit. Bez gnjaže, bez ugovora, bez komplikacija.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button variant="dark"  size="lg" onClick={() => go('objavi')} icon={<Icon.plus size={18}/>}>
                  Objavi gig
                </Button>
                <Button variant="ghost" size="lg" onClick={() => go('lista')} icon={<Icon.search size={18}/>}>
                  Pogledaj gigove
                </Button>
              </div>
              <div style={{ display: 'flex', gap: 28, marginTop: 36, color: 'var(--muted)', fontSize: 13 }}>
                <div><strong style={{ color: 'var(--ink)', fontSize: 18 }}>1.847</strong>&nbsp; aktivnih korisnika</div>
                <div><strong style={{ color: 'var(--ink)', fontSize: 18 }}>523</strong>&nbsp; gigova obavljeno</div>
                <div><strong style={{ color: 'var(--ink)', fontSize: 18 }}>4.8★</strong>&nbsp; prosjek</div>
              </div>
            </div>

            {/* Hero card stack */}
            <div style={{ position: 'relative', minHeight: 440 }}>
              <HeroCard
                style={{ position: 'absolute', top: 0, right: 40, transform: 'rotate(3deg)', zIndex: 1 }}
                cat={CATEGORIES[2]} title="Generalka stana 60m²" city="Zagreb · Maksimir" price={90} interested={6}
              />
              <HeroCard
                style={{ position: 'absolute', top: 90, right: 0, transform: 'rotate(-2deg)', zIndex: 3 }}
                cat={CATEGORIES[0]} title="Pomoć oko selidbe iz garsonijere" city="Zagreb · Trešnjevka" price={80} interested={4} featured
              />
              <HeroCard
                style={{ position: 'absolute', top: 220, right: 60, transform: 'rotate(2deg)', zIndex: 2 }}
                cat={CATEGORIES[1]} title="Ko će mi sastaviti IKEA PAX?" city="Split · Bol" price={35} interested={2}
              />
              <HeroCard
                style={{ position: 'absolute', top: 320, right: 20, transform: 'rotate(-1deg)', zIndex: 4 }}
                cat={CATEGORIES[4]} title="Čuvanje dva mačka 5 dana" city="Zagreb · Centar" price={70} interested={9}
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 44, letterSpacing: '-0.03em', fontWeight: 800, margin: 0, lineHeight: 1.05, color: 'var(--ink)' }}>
              Od ideje do<br/>obavljenog posla.
            </h2>
            <div style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 340 }}>
              Tri koraka, pet minuta. Isti tok ako tražiš ili nudiš — jedan profil za oboje.
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <Step n="01" title="Objavi ili pretraži" body="Opiši što ti treba ili pregledaj što ljudi traže u tvom gradu. Bez registracije za pregled."/>
            <Step n="02" title="Uleti i dogovori se" body="Klik na 'Uleti' — javi se naručitelju kroz chat. Dogovorite vrijeme i cijenu uz kavu."/>
            <Step n="03" title="Obavi i ocijenite se" body="Posao završen — obje strane se ocijene. Plus jedan posao u profilu, gradiš ugled."/>
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section style={{ padding: '0 32px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            padding: 40, borderRadius: 24,
            background: 'var(--ink)', color: '#fff',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
              Što ljudi traže
            </div>
            <h2 style={{ fontSize: 36, letterSpacing: '-0.03em', fontWeight: 800, margin: 0, marginBottom: 32 }}>
              Šest kategorija za početak.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => go('lista', { category: c.id })} style={{
                  textAlign: 'left', padding: '20px 22px', borderRadius: 16,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 14,
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  <span style={{ fontSize: 28 }}>{c.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
                      {[42, 31, 28, 19, 24, 8][CATEGORIES.indexOf(c)]} aktivnih
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 32px 100px', background: 'var(--paper-warm)', borderTop: '1px solid var(--line)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            position: 'relative',
            background: 'var(--accent)',
            borderRadius: 32,
            padding: '64px 56px',
            border: '2px solid var(--ink)',
            boxShadow: '8px 8px 0 var(--ink)',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 32,
            overflow: 'visible',
          }}>
            <div style={{ zIndex: 2, position: 'relative' }}>
              <h2 style={{ fontSize: 52, letterSpacing: '-0.035em', fontWeight: 800, margin: 0, color: 'var(--ink)', lineHeight: 1.02 }}>
                Spreman uletit?
              </h2>
              <p style={{ fontSize: 17, color: 'var(--ink)', opacity: 0.75, marginTop: 16, marginBottom: 28, maxWidth: 420 }}>
                Registracija traje 30 sekundi. Bez kartice, bez nikakvih obveza.
              </p>
              <Button variant="dark" size="lg" onClick={() => go('auth')}>
                Napravi profil — besplatno
              </Button>
            </div>
            <div style={{
              position: 'relative',
              width: 280, height: 280,
              flexShrink: 0,
            }}>
              <img
                src={(window.__resources && window.__resources.logo) || 'assets/logo.png'}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: -40, right: -40,
                  width: 360, height: 360,
                  transform: 'rotate(-8deg)',
                  filter: 'drop-shadow(4px 6px 0 rgba(14,14,16,0.15))',
                  pointerEvents: 'none',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--line)', padding: '40px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo size={40}/>
            <span style={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              daj<span style={{ color: 'var(--accent-fg)' }}>Uleti</span>
            </span>
            <span style={{ color: 'var(--muted)', fontSize: 13, marginLeft: 16 }}>© 2026</span>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'var(--muted)' }}>
            <a style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>O nama</a>
            <a style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Pravila</a>
            <a style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Privatnost</a>
            <a style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Kontakt</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroCard({ style, cat, title, city, price, interested, featured }) {
  return (
    <div style={{
      ...style,
      width: 320, padding: 18, borderRadius: 18,
      background: '#fff',
      border: featured ? '2px solid var(--ink)' : '1px solid var(--line)',
      boxShadow: featured ? '0 12px 32px rgba(14,14,16,0.12)' : '0 6px 18px rgba(14,14,16,0.06)',
      fontFamily: 'inherit',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', borderRadius: 999,
          background: cat.color + '33', color: 'var(--ink)',
          fontSize: 11, fontWeight: 600,
        }}>
          <span>{cat.emoji}</span>{cat.name}
        </span>
        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)' }}>{price} €</div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--muted)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon.pin size={12}/> {city}
        </span>
        <span>{interested} zainteresiranih</span>
      </div>
    </div>
  );
}

function Step({ n, title, body }) {
  return (
    <div style={{
      padding: 28, borderRadius: 20,
      border: '1px solid var(--line)', background: '#fff',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-fg)', fontFamily: '"JetBrains Mono", ui-monospace, monospace', marginBottom: 14 }}>
        {n}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>
        {body}
      </div>
    </div>
  );
}

// ---------- AUTH ----------
function AuthPage({ go, onSignIn }) {
  const [mode, setMode] = useStateL('login');
  const [email, setEmail] = useStateL('');
  const [password, setPassword] = useStateL('');
  const [name, setName] = useStateL('');
  const [city, setCity] = useStateL('Zagreb');
  const [accept, setAccept] = useStateL(false);

  const canSubmit = mode === 'login'
    ? email && password
    : email && password && name && accept;

  function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onSignIn();
  }

  return (
    <div style={{ background: 'var(--paper-warm)', minHeight: 'calc(100vh - 67px)', padding: '60px 32px' }}>
      <div style={{ maxWidth: 440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Logo size={96}/>
          <h1 style={{ fontSize: 28, letterSpacing: '-0.025em', fontWeight: 800, margin: '16px 0 6px', color: 'var(--ink)' }}>
            {mode === 'login' ? 'Bok, opet!' : 'Daj uleti.'}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>
            {mode === 'login' ? 'Prijavi se da nastaviš.' : 'Registracija je besplatna i traje 30 sekundi.'}
          </p>
        </div>

        <div style={{
          background: '#fff', borderRadius: 20, padding: 28,
          border: '1px solid var(--line)',
        }}>
          {/* Tabs */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            background: 'var(--paper-warm)', padding: 4, borderRadius: 999, marginBottom: 22,
          }}>
            {['login','register'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: '8px', borderRadius: 999, border: 'none', cursor: 'pointer',
                background: mode === m ? '#fff' : 'transparent',
                color: 'var(--ink)', fontWeight: 600, fontSize: 13, fontFamily: 'inherit',
                boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}>
                {m === 'login' ? 'Prijava' : 'Registracija'}
              </button>
            ))}
          </div>

          <Button variant="ghost" full icon={<Icon.google/>} onClick={onSignIn}>
            Nastavi s Googleom
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', color: 'var(--muted)', fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }}/>
            ili e-mail
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }}/>
          </div>

          <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
            {mode === 'register' && (
              <Field label="Ime">
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Tvoje ime"/>
              </Field>
            )}
            <Field label="E-mail">
              <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="ti@email.hr" type="email"/>
            </Field>
            <Field label="Lozinka">
              <Input value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password"/>
            </Field>
            {mode === 'register' && (
              <>
                <Field label="Grad ili općina">
                  <PlacePicker value={city} onChange={setCity} placeholder="Odaberi mjesto…"/>
                </Field>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={accept} onChange={e => setAccept(e.target.checked)} style={{ marginTop: 3, accentColor: 'var(--ink)' }}/>
                  <span>Imam 18+ i slažem se s <a style={{ color: 'var(--ink)', fontWeight: 600 }}>Pravilima korištenja</a> i <a style={{ color: 'var(--ink)', fontWeight: 600 }}>Privatnošću</a>.</span>
                </label>
              </>
            )}
            <Button type="submit" variant="primary" size="lg" full disabled={!canSubmit}>
              {mode === 'login' ? 'Prijavi se' : 'Otvori profil'}
            </Button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <a onClick={() => go('landing')} style={{ fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>
            ← Natrag na početnu
          </a>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LandingPage, AuthPage });
