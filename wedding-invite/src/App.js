import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { PALETTES, FONT_PAIRINGS, buildTheme } from './theme';

const COUPLE = { bride: 'Sarah', groom: 'James' };
const WEDDING_DATE = new Date('2026-09-12T14:00:00');

// ─── Hooks ────────────────────────────────────────────────────
function useCountdown(target) {
  const [time, setTime] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = target - Date.now();
      if (diff <= 0) return setTime({ days:0, hours:0, minutes:0, seconds:0 });
      setTime({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, options);
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Section({ children, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.07 });
  return (
    <section ref={ref} className={`section ${inView ? 'visible' : ''} ${className}`}>
      {children}
    </section>
  );
}

// ─── SVGs ─────────────────────────────────────────────────────
const WheelDeco = ({ size = 80, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="40" cy="40" r="5"  stroke="currentColor" strokeWidth="2"/>
    {Array.from({length:12},(_,i) => {
      const a = (i*30)*Math.PI/180;
      return <line key={i}
        x1={40+5*Math.cos(a)} y1={40+5*Math.sin(a)}
        x2={40+36*Math.cos(a)} y2={40+36*Math.sin(a)}
        stroke="currentColor" strokeWidth="0.8" opacity="0.7"/>;
    })}
    <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 4"/>
  </svg>
);

const ContourBg = () => (
  <svg className="contour-bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    {[80,130,180,230,280].map((r,i) => (
      <ellipse key={i} cx="400" cy="250" rx={r*2.2} ry={r}
        fill="none" stroke="currentColor" strokeWidth="0.8" opacity={0.055 - i*0.007}/>
    ))}
    {[60,110,160,210].map((r,i) => (
      <ellipse key={i} cx="150" cy="420" rx={r*1.8} ry={r*0.7}
        fill="none" stroke="currentColor" strokeWidth="0.8" opacity={0.04}/>
    ))}
  </svg>
);

const AvonLine = () => (
  <svg className="avon-line" viewBox="0 0 600 36" preserveAspectRatio="none">
    <path d="M0,18 C50,6 80,30 130,18 C180,6 210,28 260,18 C310,8 340,26 390,18 C440,10 470,24 520,18 C550,14 575,20 600,18"
      stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.55"/>
    <path d="M0,24 C60,14 90,32 140,22 C190,12 220,30 270,22 C320,14 350,28 400,22 C450,16 480,26 530,22 C560,19 580,24 600,22"
      stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

const RiverDivider = ({ flip = false }) => (
  <div className={`river-divider ${flip ? 'flip' : ''}`}>
    <svg viewBox="0 0 1440 55" preserveAspectRatio="none">
      <path className="wave1" d="M0,28 C240,52 480,4 720,28 C960,52 1200,4 1440,28 L1440,55 L0,55 Z"/>
      <path className="wave2" d="M0,36 C200,16 400,48 600,33 C800,18 1000,46 1200,31 C1320,24 1380,38 1440,34 L1440,55 L0,55 Z"/>
    </svg>
  </div>
);

// Sprig for nature sections
const Sprig = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 120 200" fill="none">
    <path d="M60 195 Q60 100 60 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M60 150 Q35 130 20 110" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <ellipse cx="14" cy="106" rx="12" ry="8" transform="rotate(-30 14 106)" fill="currentColor" opacity="0.5"/>
    <path d="M60 130 Q85 110 100 90" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <ellipse cx="106" cy="86" rx="12" ry="8" transform="rotate(30 106 86)" fill="currentColor" opacity="0.5"/>
    <path d="M60 105 Q38 88 26 68" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <ellipse cx="21" cy="64" rx="11" ry="7" transform="rotate(-40 21 64)" fill="currentColor" opacity="0.4"/>
    <path d="M60 88 Q82 70 94 50" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <ellipse cx="99" cy="46" rx="11" ry="7" transform="rotate(40 99 46)" fill="currentColor" opacity="0.4"/>
    <path d="M60 62 Q48 46 44 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <ellipse cx="42" cy="23" rx="9" ry="6" transform="rotate(-20 42 23)" fill="currentColor" opacity="0.35"/>
    <path d="M60 52 Q72 36 76 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <ellipse cx="78" cy="13" rx="9" ry="6" transform="rotate(20 78 13)" fill="currentColor" opacity="0.35"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────
const SCHEDULE = [
  { time: '2:00 PM', label: 'Guests Arrive',          note: 'Welcome drinks on the riverside terrace', km: '0.0' },
  { time: '2:30 PM', label: 'Ceremony Begins',         note: 'Please be seated by 2:20 PM',            km: '0.8' },
  { time: '3:15 PM', label: 'Drinks Reception',        note: 'Lawn games & canapés by the water',      km: '3.2' },
  { time: '5:00 PM', label: 'Wedding Breakfast',       note: 'Seated dinner in the main hall',         km: '6.1' },
  { time: '7:30 PM', label: 'Speeches & Cake',         note: 'Toast with Bristol cider',               km: '9.4' },
  { time: '8:00 PM', label: 'Evening Celebrations',    note: 'Live music & dancing',                   km: '11.0' },
  { time: '12:00 AM', label: 'Carriages',              note: 'Safe travels home',                      km: '12.0' },
];

const DIETARY_OPTIONS = [
  'No requirements','Vegetarian','Vegan','Gluten-free',
  'Dairy-free','Nut allergy','Halal','Kosher','Other (please specify)',
];

// ─── Theme Editor Panel ───────────────────────────────────────
function ThemeEditor({ palette, fontPairing, onPalette, onFont, onClose }) {
  return (
    <div className="editor-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="editor-panel">
        <div className="editor-header">
          <span className="editor-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
            </svg>
            Style Editor
          </span>
          <button className="editor-close" onClick={onClose}>✕</button>
        </div>

        <div className="editor-body">
          {/* Palette section */}
          <div className="editor-section">
            <h3 className="editor-section-label">Colour Palette</h3>
            <div className="palette-grid">
              {PALETTES.map(p => (
                <button
                  key={p.id}
                  className={`palette-swatch ${palette.id === p.id ? 'active' : ''}`}
                  onClick={() => onPalette(p)}
                  title={p.name}
                >
                  <div className="swatch-chips">
                    {p.colors.map((c, i) => (
                      <div key={i} className="swatch-chip" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="swatch-name">{p.name}</span>
                  {palette.id === p.id && <span className="swatch-check">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Font section */}
          <div className="editor-section">
            <h3 className="editor-section-label">Font Pairing</h3>
            <div className="font-list">
              {FONT_PAIRINGS.map(f => (
                <button
                  key={f.id}
                  className={`font-option ${fontPairing.id === f.id ? 'active' : ''}`}
                  onClick={() => onFont(f)}
                >
                  <div className="font-preview">
                    <span className="font-display-preview" style={{ fontFamily: `'${f.display}', serif` }}>
                      Aa
                    </span>
                    <div className="font-names">
                      <span className="font-pair-name">{f.name}</span>
                      <span className="font-pair-detail">{f.display} · {f.body}</span>
                    </div>
                  </div>
                  {fontPairing.id === f.id && <span className="font-check">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Live colour swatches */}
          <div className="editor-section">
            <h3 className="editor-section-label">Current Theme</h3>
            <div className="current-swatches">
              {[
                { label: 'Primary', key: '--primary' },
                { label: 'Accent',  key: '--accent' },
                { label: 'Paper',   key: '--bg' },
                { label: 'Surface', key: '--surface' },
              ].map(({ label, key }, i) => (
                <div key={key} className="current-swatch">
                  <div className="cur-chip" style={{ background: palette.colors[i] }} />
                  <div>
                    <span className="cur-label">{label}</span>
                    <span className="cur-hex">{palette.colors[i]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Font loader ──────────────────────────────────────────────
function loadGoogleFont(googleFonts) {
  const id = `gf-${googleFonts.replace(/[^a-z0-9]/gi,'_')}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${googleFonts}&display=swap`;
  document.head.appendChild(link);
}

// ─── App ──────────────────────────────────────────────────────
export default function App() {
  const [palette,     setPalette]     = useState(PALETTES[0]);
  const [fontPairing, setFontPairing] = useState(FONT_PAIRINGS[0]);
  const [editorOpen,  setEditorOpen]  = useState(false);
  const [form,        setForm]        = useState({ name:'', guests:'1', dietary:'', other:'', attending:null, message:'' });
  const [submitted,   setSubmitted]   = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [navOpen,     setNavOpen]     = useState(false);
  const countdown = useCountdown(WEDDING_DATE);

  // Apply theme to :root
  useEffect(() => {
    const vars = buildTheme(palette, fontPairing);
    Object.entries(vars).forEach(([k,v]) => document.documentElement.style.setProperty(k, v));
  }, [palette, fontPairing]);

  // Pre-load all fonts
  useEffect(() => {
    FONT_PAIRINGS.forEach(f => loadGoogleFont(f.googleFonts));
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setNavOpen(false); };
  const pad = n => String(n ?? 0).padStart(2,'0');

  return (
    <div className="app">

      {/* ── Nav ── */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <span className="nav-brand" onClick={() => scrollTo('home')}>
          {/*<WheelDeco size={20} className="nav-wheel" />*/}
          S &amp; J
        </span>
        <div className={`nav-links ${navOpen ? 'open' : ''}`}>
          {['details','schedule','rsvp'].map(id => (
            <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase()+id.slice(1)}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <button className="style-btn" onClick={() => setEditorOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            Style
          </button>
          <button className="burger" onClick={() => setNavOpen(o=>!o)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ── HERO (Bristol) ── */}
      <div id="home" className="hero">
        <ContourBg />
        <div className="hero-grid" />
        {/*<WheelDeco size={340} className="hero-wheel-bg hero-wheel-l" />*/}
        {/*<WheelDeco size={230} className="hero-wheel-bg hero-wheel-r" />*/}

        <div className="hero-content">
          <div className="hero-tag">
            <span className="tag-city">Bristol</span>
            <span className="tag-sep">·</span>
            <span>Avon Valley</span>
          </div>

          <h1 className="hero-names">
            <span>{COUPLE.bride}</span>
            <span className="hero-amp">&amp;</span>
            <span>{COUPLE.groom}</span>
          </h1>

          <p className="hero-sub">are getting married</p>
          <AvonLine />

          <div className="hero-meta">
            {[
              { label: 'DATE',     val: '12 September 2026' },
              { label: 'LOCATION', val: 'Bristol, UK' },
              { label: 'DISTANCE', val: '12 km of joy' },
            ].map((m,i) => [
              <div key={m.label} className="meta-item">
                <span className="meta-label">{m.label}</span>
                <span className="meta-val">{m.val}</span>
              </div>,
              i < 2 && <div key={`d${i}`} className="meta-div" />
            ])}
          </div>

          <div className="countdown">
            {[['days','Days'],['hours','Hrs'],['minutes','Min'],['seconds','Sec']].map(([k,l]) => (
              <div key={k} className="cu">
                <span className="cu-num">{pad(countdown[k])}</span>
                <span className="cu-label">{l}</span>
              </div>
            ))}
          </div>

          <button className="cta" onClick={() => scrollTo('rsvp')}>RSVP</button>
        </div>

        <div className="elev-bar">
          <svg viewBox="0 0 600 60" preserveAspectRatio="none">
            <path d="M0,55 L30,50 L80,38 L140,28 L200,22 L260,30 L320,18 L380,25 L430,32 L480,24 L540,15 L600,20 L600,60 L0,60 Z"
              fill="currentColor" opacity="0.1"/>
            <path d="M0,55 L30,50 L80,38 L140,28 L200,22 L260,30 L320,18 L380,25 L430,32 L480,24 L540,15 L600,20"
              stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.35"/>
          </svg>
          <span className="elev-label">Elevation — Avon Gorge to City Centre</span>
        </div>
      </div>

      <RiverDivider />

      {/* ── DETAILS (Bristol route strip) ── */}
      <div id="details" className="details-wrapper">
        <Section className="details-section">
          <p className="eyebrow">Route Information</p>
          <h2 className="section-title">The Details</h2>

          <div className="detail-rows">
            {[
              {
                pin: 'A', head: 'Date & Time',
                body: <>Saturday, <strong>12 September 2026</strong> — doors open at <strong>2:00 PM</strong></>,
                note: 'Ceremony begins promptly at 2:30 PM',
              },
              {
                pin: 'B', head: 'Location',
                body: <>The Watershed, 1 Canons Rd, <strong>Bristol BS1 5TX</strong></>,
                note: 'Perched on Bristol Harbourside with views across the Floating Harbour',
                link: { href: 'https://maps.google.com/?q=Watershed+Bristol', text: 'Open in Maps →' },
              },
              {
                pin: 'C', head: 'Dress Code',
                body: <><em>Smart casual — cycling chic meets riverside picnic</em></>,
                note: 'Bright colours encouraged. Comfortable shoes advised — cobbles ahead. Please avoid white.',
              },
              {
                pin: 'D', head: 'Getting There',
                body: <>15 min walk from <strong>Bristol Temple Meads</strong>, or arrive by bike or Harbour Ferry</>,
                note: 'Cycle parking on-site. Car park: Trenchard St NCP. Taxis from Temple Meads run frequently.',
              },
            ].map(row => (
              <div key={row.pin} className="detail-row">
                <div className="dr-marker">
                  <span className="dr-pin">{row.pin}</span>
                </div>
                <div className="dr-body">
                  <h3>{row.head}</h3>
                  <p>{row.body}</p>
                  {row.note && <p className="dr-note">{row.note}</p>}
                  {row.link && <a className="dr-link" href={row.link.href} target="_blank" rel="noopener noreferrer">{row.link.text}</a>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <RiverDivider flip />

      {/* ── SCHEDULE (Nature/botanical) ── */}
      <div id="schedule" className="schedule-wrapper">
        {/*<div className="sched-sprig-l"><Sprig className="sprig" /></div>*/}
        {/*<div className="sched-sprig-r"><Sprig className="sprig sprig-flip" /></div>*/}
        <Section className="schedule-section">
          <p className="eyebrow eyebrow-light">Ride Schedule</p>
          <h2 className="section-title section-title-light">Order of the Day</h2>
          <div className="timeline">
            {SCHEDULE.map((item, i) => (
              <div key={i} className="tl-item">
                <div className="tl-km">

                </div>
                <div className="tl-spine">
                  <div className="tl-pip" />
                  {i < SCHEDULE.length - 1 && <div className="tl-line" />}
                </div>
                <div className="tl-body">
                  <div className="tl-top">
                    <p className="tl-label">{item.label}</p>
                    <span className="tl-time">{item.time}</span>
                  </div>
                  {item.note && <p className="tl-note">{item.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <RiverDivider />

      {/* ── RSVP (Nature) ── */}
      <div id="rsvp" className="rsvp-wrapper">
        <Section className="rsvp-section">
          <p className="eyebrow">Sign the Guest Book</p>
          <h2 className="section-title">RSVP</h2>
          <p className="section-sub">Please respond by <strong>1st August 2026</strong></p>

          {submitted ? (
            <div className="success">
              {/*<WheelDeco size={56} className="success-wheel" />*/}
              <h3>Thanks, {form.name}!</h3>
              <p>{form.attending === 'yes'
                ? "You're on the list — see you on the waterfront!"
                : "We'll miss you — thanks for letting us know."}</p>
            </div>
          ) : (
            <form className="form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
              <div className="fg">
                <label>Full name *</label>
                <input type="text" required placeholder="e.g. Alex Morgan"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="fg">
                <label>Will you be joining the ride? *</label>
                <div className="toggle-row">
                  {[['yes',"Absolutely, I'm in!"],['no',"Can't make it this time"]].map(([v,l]) => (
                    <button key={v} type="button"
                      className={`toggle ${form.attending === v ? 'on' : ''}`}
                      onClick={() => setForm({...form, attending: v})}>{l}</button>
                  ))}
                </div>
              </div>
              {form.attending === 'yes' && (<>
                <div className="fg">
                  <label>Number of guests (including yourself)</label>
                  <select value={form.guests} onChange={e => setForm({...form, guests: e.target.value})}>
                    {[1,2,3,4].map(n => <option key={n} value={n}>{n} {n===1?'guest':'guests'}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label>Dietary requirements</label>
                  <select value={form.dietary} onChange={e => setForm({...form, dietary: e.target.value})}>
                    <option value="">Please select…</option>
                    {DIETARY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {form.dietary === 'Other (please specify)' && (
                  <div className="fg">
                    <label>Please give details</label>
                    <input type="text" placeholder="Tell us about your needs…"
                      value={form.other} onChange={e => setForm({...form, other: e.target.value})} />
                  </div>
                )}
              </>)}
              <div className="fg">
                <label>Message to Sarah &amp; James</label>
                <textarea rows={4} placeholder="Share your well wishes…"
                  value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>
              <button type="submit" className="submit" disabled={!form.name || !form.attending}>
                Send RSVP
              </button>
            </form>
          )}
        </Section>
      </div>

      {/* ── Footer (Nature) ── */}
      <footer className="footer">
        <div className="footer-river">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C180,15 360,65 540,40 C720,15 900,65 1080,40 C1260,15 1380,55 1440,40 L1440,80 L0,80 Z"
              fill="currentColor" opacity="0.08"/>
          </svg>
        </div>
        {/*<Sprig className="footer-sprig footer-sprig-l" />*/}
        <div className="footer-inner">
          {/*<WheelDeco size={44} className="footer-wheel" />*/}
          <p className="footer-names">{COUPLE.bride} &amp; {COUPLE.groom}</p>
          <p className="footer-loc">Bristol · Avon Valley · 12.09.2026</p>
          <p className="footer-note">Ride on with love</p>
        </div>
        {/*<Sprig className="footer-sprig footer-sprig-r" />*/}
      </footer>

      {/* ── Editor ── */}
      {editorOpen && (
        <ThemeEditor
          palette={palette}
          fontPairing={fontPairing}
          onPalette={p => setPalette(p)}
          onFont={f => setFontPairing(f)}
          onClose={() => setEditorOpen(false)}
        />
      )}
    </div>
  );
}
