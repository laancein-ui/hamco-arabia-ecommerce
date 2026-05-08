import React, { useState, useEffect } from 'react';
import ProductCheck from './ProductCheck';

const categories = [
  { name: 'Head Protection', image: '/assets/red-helmet.png' },
  { name: 'Respiratory Protection', image: '/assets/safety-mask.png' },
  { name: 'Fire Safety Gear', image: '/assets/fire-safety-gear.png' },
  { name: 'Site Apparel', image: '/assets/site-apparel.png' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [skuInput, setSkuInput] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (page = 'home') => {
    setMenuOpen(false);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleVerify = () => {
    if (!skuInput.trim()) return;
    setVerifying(true);
    setTimeout(() => {
      if (skuInput.trim().toUpperCase() === 'HS-0012') {
        setVerifyResult({ success: true, message: 'Product verified! Genuine HAMCO product.' });
        setCurrentPage('product-check');
        window.scrollTo(0, 0);
      } else {
        setVerifyResult({ success: false, message: 'SKU not found. Please check and try again.' });
      }
      setVerifying(false);
    }, 800);
  };

  return (
    <div className="app">
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="nav-accent-bar" />
        <div className="nav-inner">
          <a href="/" className="logo" onClick={e => { e.preventDefault(); handleNavClick('home'); }}>
            <img src="/assets/logo.png" alt="HAMCO Arabia" />
          </a>

          <ul className="nav-links">
            <li><a href="#" onClick={e => { e.preventDefault(); handleNavClick('home'); }} className={currentPage === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#categories" onClick={() => handleNavClick('home')}>Personal Protective Equipment</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); handleNavClick('home'); }}>Fire Protection</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); handleNavClick('home'); }}>Training & Support</a></li>
            <li>
              <button className="nav-verify-btn" onClick={() => handleNavClick('product-check')}>
                Verify Product SKU
              </button>
            </li>
          </ul>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <a href="#" onClick={e => { e.preventDefault(); handleNavClick('home'); }}>Home</a>
        <a href="#" onClick={e => { e.preventDefault(); handleNavClick('home'); }}>Personal Protective Equipment</a>
        <a href="#" onClick={e => { e.preventDefault(); handleNavClick('home'); }}>Fire Protection</a>
        <a href="#" onClick={e => { e.preventDefault(); handleNavClick('home'); }}>Training & Support</a>
        <div className="divider" />
        <button onClick={() => handleNavClick('product-check')}>🔍 Verify Product SKU</button>
      </div>

      {/* ===== PAGES ===== */}
      {currentPage === 'product-check' ? (
        <ProductCheck onBack={() => handleNavClick('home')} />
      ) : (
        <main className="home-page">
          {/* HERO BANNER */}
          <section className="hero-banner">
            <div className="hero-banner-inner">
              <div className="hero-text-side">
                <h1 className="hero-headline">
                  Your Partner in Certified<br />
                  <span>Safety & Protection.</span>
                </h1>
                <button className="hero-cta-btn" onClick={() => {
                  document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Explore Solutions
                </button>
              </div>
              <div className="hero-image-side">
                <img src="/assets/hero-workers.png" alt="Safety professionals at work" />
              </div>
            </div>
          </section>

          {/* SEARCH BAR - visible on mobile */}
          <div className="mobile-search-wrap">
            <input
              type="text"
              className="mobile-search-input"
              placeholder="Search ..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="mobile-search-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          {/* CATEGORIES */}
          <section id="categories" className="categories-section">
            <div className="container">
              <div className="categories-grid">
                {categories.map(cat => (
                  <div key={cat.name} className="category-card">
                    <div className="category-img-wrap">
                      <img src={cat.image} alt={cat.name} />
                    </div>
                    <p className="category-label">{cat.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>


        </main>
      )}

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>HAMCO ARABIA</h3>
              <p>Industrial Excellence Since 1994</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">PPE</a></li>
                <li><a href="#">Fire Protection</a></li>
                <li><a href="#">Training</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Categories</h4>
              <ul>
                <li><a href="#">Head Protection</a></li>
                <li><a href="#">Respiratory</a></li>
                <li><a href="#">Fire Safety</a></li>
                <li><a href="#">Site Apparel</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <p>📧 info@hamco-arabia.com</p>
              <p>📞 +966 12 345 6789</p>
              <p>📍 Dammam, Saudi Arabia</p>
            </div>
          </div>
          <div className="footer-bottom">
            © 2026 HAMCO ARABIA. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/966577860694?text=Hello%20HAMCO%20ARABIA"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <img src="/assets/whatsapp.png" alt="WhatsApp" />
      </a>
    </div>
  );
}

export default App;
