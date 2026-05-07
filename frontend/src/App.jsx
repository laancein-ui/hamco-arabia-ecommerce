import React, { useState, useEffect } from 'react';

const API = 'https://hamco-arabia-ecommerce.laancein.workers.dev/api/equipment';

const CATEGORIES = ['All', 'Excavators', 'Cranes', 'Loaders', 'Generators', 'Compressors'];

export default function App() {
  const [screen, setScreen] = useState('splash'); // splash | login | home | detail | about | contact
  const [activeTab, setActiveTab] = useState('home');
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [loginForm, setLoginForm] = useState({ email: '', pass: '' });
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState('');

  // Splash → login/home
  useEffect(() => {
    const t = setTimeout(() => setScreen(user ? 'home' : 'login'), 2000);
    return () => clearTimeout(t);
  }, []);

  // Fetch equipment
  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(d => { setEquipment(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!loginForm.email || !loginForm.pass) return showToast('Fill all fields');
    setUser({ name: loginForm.email.split('@')[0], email: loginForm.email });
    setScreen('home');
    showToast('Welcome back!');
  }

  function navigate(tab) {
    setActiveTab(tab);
    setScreen(tab === 'home' ? 'home' : tab === 'detail' ? 'detail' : tab);
    if (tab !== 'detail') setSelected(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openDetail(item) {
    setSelected(item);
    setScreen('detail');
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addToQuote(item) {
    setCartCount(c => c + 1);
    showToast(`${item.name} added to quote!`);
  }

  const filtered = equipment.filter(item => {
    const matchCat = cat === 'All' || item.category?.toLowerCase() === cat.toLowerCase();
    const matchSearch = item.name?.toLowerCase().includes(search.toLowerCase()) ||
                        item.category?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // ── SPLASH ──────────────────────────────────────────────────
  if (screen === 'splash') return (
    <div className="splash">
      <div className="splash-inner">
        <img src="/assets/logo.png" alt="HAMCO" className="splash-logo" />
        <h1 className="splash-title">HAMCO ARABIA</h1>
        <p className="splash-sub">Industrial Excellence Since 1994</p>
        <div className="splash-bar"><div className="splash-fill" /></div>
      </div>
    </div>
  );

  // ── LOGIN ──────────────────────────────────────────────────
  if (screen === 'login') return (
    <div className="login-screen">
      <div className="login-top">
        <img src="/assets/logo.png" alt="HAMCO" className="login-logo" />
        <h2 className="login-brand">HAMCO ARABIA</h2>
        <p className="login-tagline">Your trusted equipment partner</p>
      </div>
      <div className="login-card">
        <h3 className="login-heading">Sign In</h3>
        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <div className="input-wrap">
            <span className="input-icon">✉</span>
            <input type="email" placeholder="you@email.com"
              value={loginForm.email}
              onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <label>Password</label>
          <div className="input-wrap">
            <span className="input-icon">🔒</span>
            <input type="password" placeholder="••••••••"
              value={loginForm.pass}
              onChange={e => setLoginForm(f => ({ ...f, pass: e.target.value }))} />
          </div>
          <button type="submit" className="login-btn">Sign In</button>
        </form>
        <button className="skip-btn" onClick={() => setScreen('home')}>
          Browse as Guest →
        </button>
        <a href={`https://wa.me/966577860694?text=Hello%20HAMCO`}
           className="wa-login-btn" target="_blank" rel="noreferrer">
          <img src="/assets/whatsapp.png" alt="WA" style={{width:20,height:20}} />
          Contact via WhatsApp
        </a>
      </div>
    </div>
  );

  // ── DETAIL VIEW ────────────────────────────────────────────
  if (screen === 'detail' && selected) return (
    <div className="phone-app">
      <header className="app-header">
        <button className="back-btn" onClick={() => { setScreen('home'); setSelected(null); }}>←</button>
        <span className="header-title">Equipment Detail</span>
        <span />
      </header>
      <div className="detail-scroll">
        <img src={selected.image} alt={selected.name} className="detail-img" />
        <div className="detail-body">
          <span className="detail-cat">{selected.category}</span>
          <h2 className="detail-name">{selected.name}</h2>
          <p className="detail-desc">{selected.description}</p>
          <div className="detail-row">
            <span className="detail-price">{selected.price}</span>
            <span className="in-stock">● In Stock</span>
          </div>
          <div className="detail-actions">
            <button className="btn-quote" onClick={() => addToQuote(selected)}>Add to Quote</button>
            <a href={`https://wa.me/966577860694?text=Interested%20in%20${encodeURIComponent(selected.name)}`}
               className="btn-wa" target="_blank" rel="noreferrer">
              <img src="/assets/whatsapp.png" alt="WA" style={{width:20,height:20,marginRight:6}} />
              WhatsApp Inquiry
            </a>
          </div>
          <div className="specs-card">
            <h4>Quick Specs</h4>
            <div className="spec-row"><span>Category</span><span>{selected.category}</span></div>
            <div className="spec-row"><span>Availability</span><span style={{color:'#16a34a'}}>In Stock</span></div>
            <div className="spec-row"><span>Delivery</span><span>7–14 business days</span></div>
            <div className="spec-row"><span>Warranty</span><span>12 months</span></div>
          </div>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );

  // ── ABOUT / CONTACT SCREENS ────────────────────────────────
  if (screen === 'about') return (
    <div className="phone-app">
      <header className="app-header">
        <button className="back-btn" onClick={() => navigate('home')}>←</button>
        <span className="header-title">About Us</span>
        <span />
      </header>
      <div className="info-screen">
        <img src="/assets/logo.png" alt="HAMCO" style={{width:100,borderRadius:20,marginBottom:'1.5rem'}} />
        <h2 style={{color:'var(--primary)',marginBottom:'1rem'}}>HAMCO ARABIA</h2>
        <p style={{color:'#555',textAlign:'center',lineHeight:1.7,marginBottom:'2rem'}}>
          With over 30 years of industrial experience, we provide the most reliable
          heavy machinery and maintenance services in the region. Our fleet is maintained
          to the highest safety standards.
        </p>
        <div className="stat-row">
          <div className="stat"><span className="stat-n">30+</span><span>Years</span></div>
          <div className="stat"><span className="stat-n">500+</span><span>Machines</span></div>
          <div className="stat"><span className="stat-n">50+</span><span>Countries</span></div>
        </div>
      </div>
      <BottomNav active={activeTab} onNav={navigate} cartCount={cartCount} user={user} />
    </div>
  );

  if (screen === 'contact') return (
    <div className="phone-app">
      <header className="app-header">
        <button className="back-btn" onClick={() => navigate('home')}>←</button>
        <span className="header-title">Contact</span>
        <span />
      </header>
      <div className="info-screen">
        <div className="contact-card">
          <span className="contact-icon">📧</span>
          <div><b>Email</b><p>info@hamco-arabia.com</p></div>
        </div>
        <div className="contact-card">
          <span className="contact-icon">📞</span>
          <div><b>Phone</b><p>+966 12 345 6789</p></div>
        </div>
        <div className="contact-card">
          <span className="contact-icon">📍</span>
          <div><b>Address</b><p>Dammam, Saudi Arabia</p></div>
        </div>
        <a href="https://wa.me/966577860694?text=Hello%20HAMCO%20ARABIA"
           className="btn-wa" style={{marginTop:'1.5rem',textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}
           target="_blank" rel="noreferrer">
          <img src="/assets/whatsapp.png" alt="WA" style={{width:22,height:22}} />
          Chat on WhatsApp
        </a>
      </div>
      <BottomNav active={activeTab} onNav={navigate} cartCount={cartCount} user={user} />
    </div>
  );

  // ── HOME ───────────────────────────────────────────────────
  return (
    <div className="phone-app">
      {/* Header */}
      <header className="app-header">
        <div className="header-logo">
          <img src="/assets/logo.png" alt="HAMCO" style={{height:32,borderRadius:6}} />
          <span className="header-brand">HAMCO ARABIA</span>
        </div>
        <div className="header-actions">
          {user && <span className="user-chip">{user.name[0].toUpperCase()}</span>}
          <button className="notif-btn" onClick={() => setScreen('login')}>
            {user ? '👤' : '🔑'}
          </button>
          <button className="cart-btn" onClick={() => showToast('Quote list coming soon!')}>
            🗂 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Search bar */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search equipment, brand, model..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && <button className="clear-btn" onClick={() => setSearch('')}>✕</button>}
      </div>

      <div className="scroll-content">
        {/* Hero Banner */}
        <div className="hero-banner" style={{backgroundImage:"url('/assets/hero.png')"}}>
          <div className="hero-ov" />
          <div className="hero-text">
            <p className="hero-tag">WORLD-CLASS</p>
            <h1 className="hero-h1">Construction<br />Equipment</h1>
            <p className="hero-sub">Premium fleet for the toughest projects</p>
            <a href="#equipment" className="hero-btn">Browse Inventory</a>
          </div>
        </div>

        {/* Category chips */}
        <div className="cat-chips">
          {CATEGORIES.map(c => (
            <button key={c} className={`cat-chip ${cat === c ? 'cat-active' : ''}`}
              onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="section-head" id="equipment">
          <h2 className="sec-title">Our Fleet</h2>
          <span className="sec-count">{filtered.length} machines</span>
        </div>

        {loading ? (
          <div className="loading-box">
            <div className="spinner" />
            <p>Loading fleet...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-box">
            <p>No equipment found</p>
            <button onClick={() => { setSearch(''); setCat('All'); }}>Clear filters</button>
          </div>
        ) : (
          <div className="equip-grid">
            {filtered.map(item => (
              <div key={item.id} className="equip-card" onClick={() => openDetail(item)}>
                <img src={item.image} alt={item.name} className="equip-img" />
                <div className="equip-body">
                  <span className="equip-cat">{item.category}</span>
                  <h3 className="equip-name">{item.name}</h3>
                  <div className="equip-footer">
                    <span className="equip-price">{item.price}</span>
                    <span className="equip-arrow">›</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Why HAMCO */}
        <div className="why-section">
          <h3>Why Choose HAMCO?</h3>
          <div className="why-grid">
            {[['🏆','30+ Years','Industrial experience'],
              ['🔧','500+ Machines','Maintained fleet'],
              ['🌍','50+ Countries','Global reach'],
              ['📞','24/7 Support','Always available']].map(([icon,title,sub]) => (
              <div key={title} className="why-card">
                <span className="why-icon">{icon}</span>
                <b>{title}</b>
                <p>{sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{height:'90px'}} />
      </div>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/966577860694?text=Hello%20HAMCO%20ARABIA"
         className="wa-fab" target="_blank" rel="noreferrer">
        <img src="/assets/whatsapp.png" alt="WhatsApp" style={{width:30,height:30}} />
      </a>

      {toast && <div className="toast">{toast}</div>}
      <BottomNav active={activeTab} onNav={navigate} cartCount={cartCount} user={user} />
    </div>
  );
}

function BottomNav({ active, onNav, cartCount, user }) {
  const tabs = [
    { id: 'home',    icon: '🏠', label: 'Home' },
    { id: 'cat',     icon: '🔧', label: 'Fleet' },
    { id: 'contact', icon: '💬', label: 'Contact' },
    { id: 'about',   icon: 'ℹ️', label: 'About' },
    { id: 'account', icon: user ? '👤' : '🔑', label: user ? 'Me' : 'Login' },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map(t => (
        <button key={t.id}
          className={`bnav-item ${active === t.id ? 'bnav-active' : ''}`}
          onClick={() => {
            if (t.id === 'account') onNav('login');
            else if (t.id === 'cat') onNav('home');
            else onNav(t.id);
          }}>
          <span className="bnav-icon">{t.icon}</span>
          <span className="bnav-label">{t.label}</span>
          {t.id === 'cat' && cartCount > 0 && <span className="bnav-badge">{cartCount}</span>}
        </button>
      ))}
    </nav>
  );
}
