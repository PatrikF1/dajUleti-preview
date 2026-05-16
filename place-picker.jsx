// PlacePicker — searchable typeahead za 556 mjesta u HR

const { useState: useStatePP, useRef: useRefPP, useEffect: useEffectPP, useMemo: useMemoPP } = React;

function PlacePicker({
  value,            // string place name or '' / 'Sva mjesta'
  onChange,         // (name) => void
  placeholder = 'Odaberi grad ili općinu…',
  includeAll = false,   // show "Sva mjesta" option (for filters)
  allLabel  = 'Sva mjesta',
  size = 'md',
}) {
  const [open, setOpen] = useStatePP(false);
  const [q, setQ] = useStatePP('');
  const wrapRef = useRefPP(null);
  const inputRef = useRefPP(null);

  // Close on outside click
  useEffectPP(() => {
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffectPP(() => {
    if (open && inputRef.current) setTimeout(() => inputRef.current.focus(), 30);
  }, [open]);

  // Filtered list
  const results = useMemoPP(() => {
    const query = q.trim().toLowerCase();
    if (!query) return null; // null = show popular + grouped browse
    // Diacritic-insensitive sort
    const stripped = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd');
    return PLACES
      .filter(p => {
        const n = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd');
        return n.includes(stripped);
      })
      .slice(0, 80);
  }, [q]);

  const displayValue = value || '';
  const isAll = includeAll && (!value || value === allLabel);

  // size variants
  const triggerHeight = size === 'sm' ? 38 : 46;
  const triggerFont = size === 'sm' ? 13 : 14;

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', height: triggerHeight,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '0 14px', borderRadius: 12,
          border: '1px solid ' + (open ? 'var(--ink)' : 'var(--line)'),
          background: '#fff', cursor: 'pointer', fontFamily: 'inherit',
          fontSize: triggerFont, color: 'var(--ink)', textAlign: 'left',
        }}
      >
        <Icon.pin size={14}/>
        <span style={{ flex: 1, color: displayValue ? 'var(--ink)' : 'var(--muted)' }}>
          {isAll ? allLabel : (displayValue || placeholder)}
        </span>
        <svg width="10" height="10" viewBox="0 0 10 10" style={{ opacity: 0.5, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
          background: '#fff', borderRadius: 14,
          border: '1px solid var(--line)',
          boxShadow: '0 12px 36px rgba(14,14,16,0.12)',
          zIndex: 50, overflow: 'hidden',
          animation: 'slideUp 0.15s ease',
        }}>
          {/* Search */}
          <div style={{ padding: 10, borderBottom: '1px solid var(--line)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0 12px', height: 38, borderRadius: 10,
              background: 'var(--paper-warm)',
            }}>
              <Icon.search size={14}/>
              <input
                ref={inputRef}
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder={`Pretraži ${PLACES_COUNT.gradovi} gradova i ${PLACES_COUNT.opcine} općina…`}
                style={{
                  flex: 1, border: 'none', outline: 'none', background: 'transparent',
                  fontSize: 13, fontFamily: 'inherit', color: 'var(--ink)',
                }}
              />
              {q && (
                <button onClick={() => setQ('')} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: 'var(--muted)', padding: 4, display: 'flex',
                }}>
                  <Icon.close size={12}/>
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div style={{ maxHeight: 340, overflow: 'auto' }}>
            {results === null ? (
              <BrowseDefault includeAll={includeAll} allLabel={allLabel} value={value} onPick={pick}/>
            ) : results.length === 0 ? (
              <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
                Nema rezultata za „{q}"
              </div>
            ) : (
              <>
                <div style={sectionLabelStyle}>
                  {results.length} {results.length === 1 ? 'rezultat' : results.length < 5 ? 'rezultata' : 'rezultata'}
                </div>
                {results.map(p => (
                  <PlaceRow key={p.key} place={p} selected={p.name === value} onPick={pick}/>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

  function pick(name) {
    onChange(name);
    setOpen(false);
    setQ('');
  }
}

const sectionLabelStyle = {
  padding: '10px 16px 6px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
  color: 'var(--muted)', textTransform: 'uppercase',
  background: '#fff', position: 'sticky', top: 0,
};

function PlaceRow({ place, selected, onPick }) {
  return (
    <button
      type="button"
      onClick={() => onPick(place.name)}
      style={{
        width: '100%', textAlign: 'left',
        padding: '9px 16px',
        background: selected ? 'var(--paper-warm)' : 'transparent',
        border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 13, color: 'var(--ink)',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--paper-warm)'}
      onMouseLeave={e => e.currentTarget.style.background = selected ? 'var(--paper-warm)' : 'transparent'}
    >
      <span style={{
        fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
        padding: '2px 6px', borderRadius: 4,
        background: place.type === 'grad' ? 'var(--ink)' : 'var(--line)',
        color: place.type === 'grad' ? '#fff' : 'var(--ink)',
        textTransform: 'uppercase', minWidth: 48, textAlign: 'center',
      }}>
        {place.type === 'grad' ? 'Grad' : 'Općina'}
      </span>
      <span style={{ flex: 1, fontWeight: selected ? 600 : 500 }}>{place.name}</span>
      <span style={{ fontSize: 11, color: 'var(--muted)' }}>{place.cnt}</span>
      {selected && <Icon.check size={14}/>}
    </button>
  );
}

function BrowseDefault({ includeAll, allLabel, value, onPick }) {
  return (
    <>
      {includeAll && (
        <button
          type="button"
          onClick={() => onPick('')}
          style={{
            width: '100%', textAlign: 'left',
            padding: '11px 16px',
            background: (!value || value === allLabel) ? 'var(--paper-warm)' : 'transparent',
            border: 'none', borderBottom: '1px solid var(--line)',
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 13, color: 'var(--ink)', fontWeight: 600,
          }}
        >
          <Icon.pin size={14}/>
          <span style={{ flex: 1 }}>{allLabel}</span>
          {(!value || value === allLabel) && <Icon.check size={14}/>}
        </button>
      )}
      <div style={sectionLabelStyle}>Najveći gradovi</div>
      <div style={{ padding: '4px 12px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {PLACES_POPULAR.map(name => (
          <button
            key={name}
            type="button"
            onClick={() => onPick(name)}
            style={{
              padding: '6px 12px', borderRadius: 999,
              border: '1px solid ' + (name === value ? 'var(--ink)' : 'var(--line)'),
              background: name === value ? 'var(--ink)' : '#fff',
              color: name === value ? '#fff' : 'var(--ink)',
              fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div style={{ ...sectionLabelStyle, borderTop: '1px solid var(--line)' }}>
        Sva mjesta · A–Ž
      </div>
      {PLACES.slice(0, 60).map(p => (
        <PlaceRow key={p.key} place={p} selected={p.name === value} onPick={onPick}/>
      ))}
      <div style={{ padding: '12px 16px', textAlign: 'center', fontSize: 11, color: 'var(--muted)' }}>
        Pretraži za ostalih {PLACES.length - 60} mjesta…
      </div>
    </>
  );
}

Object.assign(window, { PlacePicker });
