// Main App for DajUleti prototype

const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "yellow",
  "tone": "warm",
  "density": "comfy"
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  yellow: { '--accent': '#FFD400', '--accent-soft': '#FFF3B5', '--accent-fg': '#8A6A00', '--accent-ink': '#0E0E10' },
  orange: { '--accent': '#FF7A1A', '--accent-soft': '#FFE2CD', '--accent-fg': '#B8470A', '--accent-ink': '#FFFFFF' },
  red:    { '--accent': '#FF3D3D', '--accent-soft': '#FFD9D9', '--accent-fg': '#A02020', '--accent-ink': '#FFFFFF' },
  green:  { '--accent': '#3DDC84', '--accent-soft': '#D2F4DE', '--accent-fg': '#1F6E3E', '--accent-ink': '#0E0E10' },
};

const TONE_MAP = {
  warm:    { '--paper-warm': '#F8F4EC', '--line': '#E8E3D5', '--muted': '#6E6A60', '--ink': '#1A1814' },
  cool:    { '--paper-warm': '#F2F4F8', '--line': '#E1E5EC', '--muted': '#5F6873', '--ink': '#101418' },
  neutral: { '--paper-warm': '#F6F6F4', '--line': '#E5E5E0', '--muted': '#666564', '--ink': '#141414' },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useStateA('landing');
  const [ctx, setCtx] = useStateA({});
  const [signedIn, setSignedIn] = useStateA(false);
  const [appState, setAppState] = useStateA({ applied: [] });

  function go(r, c = {}) {
    if (!signedIn && r !== 'landing' && r !== 'auth') {
      setCtx({ ...c, _intended: r });
      setRoute('auth');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    setRoute(r);
    setCtx(c);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function handleSignIn() {
    setSignedIn(true);
    const intended = ctx._intended;
    if (intended) {
      setCtx(c => { const { _intended, ...rest } = c; return rest; });
      setRoute(intended);
    } else {
      setRoute('lista');
    }
  }

  // Apply CSS vars
  useEffectA(() => {
    const root = document.documentElement;
    const vars = { ...ACCENT_MAP[tweaks.accent], ...TONE_MAP[tweaks.tone] };
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [tweaks.accent, tweaks.tone]);

  return (
    <div style={{
      fontFamily: '"Manrope", -apple-system, sans-serif',
      color: 'var(--ink)', background: '#fff',
      minHeight: '100vh',
      fontSize: tweaks.density === 'compact' ? 13 : 14,
    }}>
      <TopNav route={route} go={go} signedIn={signedIn} onSignOut={() => setSignedIn(false)}/>

      {route === 'landing' && <LandingPage go={go}/>}
      {route === 'auth'    && <AuthPage    go={go} onSignIn={handleSignIn}/>}
      {route === 'lista'   && <ListaPage   go={go} ctx={ctx}/>}
      {route === 'detalj'  && <DetaljPage  go={go} ctx={ctx} appState={appState} setAppState={setAppState}/>}
      {route === 'objavi'  && <ObjaviPage  go={go}/>}
      {route === 'profil'  && <ProfilPage  go={go} appState={appState}/>}
      {route === 'chat'    && <ChatPage    go={go} ctx={ctx} appState={appState}/>}

      <DajUletiTweaks tweaks={tweaks} setTweak={setTweak}/>
    </div>
  );
}

function DajUletiTweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Vizualni stil">
        <TweakColor
          label="Accent"
          value={tweaks.accent === 'yellow' ? '#FFD400' : tweaks.accent === 'orange' ? '#FF7A1A' : tweaks.accent === 'red' ? '#FF3D3D' : '#3DDC84'}
          options={['#FFD400', '#FF7A1A', '#FF3D3D', '#3DDC84']}
          onChange={(hex) => {
            const key = hex === '#FFD400' ? 'yellow' : hex === '#FF7A1A' ? 'orange' : hex === '#FF3D3D' ? 'red' : 'green';
            setTweak('accent', key);
          }}
        />
        <TweakRadio
          label="Ton podloge"
          value={tweaks.tone}
          options={[
            { value: 'warm',    label: 'Topli' },
            { value: 'cool',    label: 'Hladni' },
            { value: 'neutral', label: 'Neutralni' },
          ]}
          onChange={v => setTweak('tone', v)}
        />
      </TweakSection>
      <TweakSection label="Gustoća">
        <TweakRadio
          label="Tekst"
          value={tweaks.density}
          options={[
            { value: 'compact', label: 'Kompaktan' },
            { value: 'comfy',   label: 'Komotan' },
          ]}
          onChange={v => setTweak('density', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
