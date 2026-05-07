import React, { useState, useEffect } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8787/api/equipment') // Hono local dev port
      .then(res => res.json())
      .then(data => {
        setEquipmentData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  const filteredEquipment = (equipmentData || []).filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <a href="/" className="logo">
            <img src="/assets/logo.png" alt="HAMCO Logo" />
            <span>HAMCO ARABIA</span>
          </a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#equipment">Equipment</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="btn btn-primary">Login</button>
        </div>
      </nav>

      {!selectedEquipment ? (
        <>
          <section id="home" className="hero" style={{ backgroundImage: `url('/assets/hero.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1>World-Class Construction Equipment</h1>
              <p>Premium Construction Equipment for the World's Toughest Projects.</p>
              <div className="search-container">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search by equipment type, brand, or model..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <a href="#equipment" className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse Inventory</a>
            </div>
          </section>

          <section id="equipment" className="container" style={{ marginTop: '6rem' }}>
            <h2 className="section-title">Our Equipment Fleet</h2>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem' }}>
                <div style={{ width: '50px', height: '50px', border: '5px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                <p style={{ marginTop: '1rem', color: '#666' }}>Loading world-class fleet...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : (
              <div className="equipment-grid">
                {filteredEquipment.map(item => (
                  <div key={item.id} className="card">
                    <img src={item.image} alt={item.name} className="card-img" />
                    <div className="card-body">
                      <span style={{ color: 'var(--secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>{item.category}</span>
                      <h3 className="card-title">{item.name}</h3>
                      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>{item.description}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="card-price">{item.price}</span>
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                          onClick={() => setSelectedEquipment(item)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="container" style={{ marginTop: '6rem', padding: '4rem', background: 'white', borderRadius: '2rem', boxShadow: 'var(--shadow)' }}>
          <button 
            className="btn" 
            style={{ marginBottom: '2rem', background: '#eee', color: '#333' }}
            onClick={() => setSelectedEquipment(null)}
          >
            &larr; Back to Fleet
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <img src={selectedEquipment.image} alt={selectedEquipment.name} style={{ width: '100%', borderRadius: '1.5rem', boxShadow: 'var(--shadow)' }} />
            <div>
              <span style={{ color: 'var(--secondary)', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase' }}>{selectedEquipment.category}</span>
              <h1 style={{ fontSize: '3rem', color: 'var(--primary)', margin: '1rem 0' }}>{selectedEquipment.name}</h1>
              <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: '2rem' }}>{selectedEquipment.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)' }}>{selectedEquipment.price}</span>
                <span style={{ color: '#28a745', fontWeight: '600' }}>● In Stock</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-primary" style={{ flex: 1, padding: '1.2rem' }}>Add to Quote</button>
                <a 
                  href={`https://wa.me/966577860694?text=I'm%20interested%20in%20the%20${selectedEquipment.name}`} 
                  className="btn" 
                  style={{ flex: 1, padding: '1.2rem', background: '#25d366', color: 'white', textAlign: 'center', textDecoration: 'none' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inquiry via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="about" className="container" style={{ marginTop: '8rem', textAlign: 'center' }}>
        <div style={{ padding: '4rem', background: 'var(--primary)', color: 'white', borderRadius: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why Choose HAMCO ARABIA?</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', opacity: '0.9' }}>
            With over 30 years of industrial experience, we provide the most reliable heavy machinery and maintenance services in the region. Our fleet is maintained to the highest safety standards to ensure your projects never stop.
          </p>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-col">
              <h3>HAMCO ARABIA</h3>
              <p>Industrial Excellence Since 1994</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Inventory</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Categories</h4>
              <ul>
                <li><a href="#">Excavators</a></li>
                <li><a href="#">Cranes</a></li>
                <li><a href="#">Loaders</a></li>
                <li><a href="#">Generators</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <p>Email: info@hamco-arabia.com</p>
              <p>Phone: +966 12 345 6789</p>
              <p>Dammam, Saudi Arabia</p>
            </div>
          </div>
          <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.9rem', opacity: '0.7' }}>
            &copy; 2026 HAMCO ARABIA. All rights reserved.
          </div>
        </div>
      </footer>
      <a 
        href="https://wa.me/966577860694?text=Hello%20HAMCO%20ARABIA,%20I'm%20interested%20in%20your%20equipment." 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img src="/assets/whatsapp.png" alt="WhatsApp" />
      </a>
    </div>
  );
}

export default App;
