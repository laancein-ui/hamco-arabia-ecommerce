import React, { useState } from 'react';

const similarProducts = [
  { id: 1, name: 'Fire Blanket', image: '/assets/fire-blanket.png', sku: 'FB-2001' },
  { id: 2, name: 'Mask', image: '/assets/safety-mask.png', sku: 'MK-3010' },
  { id: 3, name: 'Fire Blanket', image: '/assets/fire-blanket.png', sku: 'FB-2002' },
  { id: 4, name: 'Safety Jacket', image: '/assets/safety-jacket.png', sku: 'SJ-4001' },
  { id: 5, name: 'Safety Jacket', image: '/assets/safety-jacket.png', sku: 'SJ-4002' },
];

const productData = {
  name: 'HAMCO PRO-GUARD Safety Helmet',
  sku: 'HS-0012',
  model: 'HG-400-R',
  weight: '450g',
  material: 'ABS',
  certification: 'EN 397:2012+A1:2012',
  image: '/assets/red-helmet.png',
};

function ProductCheck({ onBack }) {
  const [skuInput, setSkuInput] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    if (!skuInput.trim()) return;
    setVerifying(true);
    setTimeout(() => {
      if (skuInput.trim().toUpperCase() === productData.sku) {
        setVerifyResult({ success: true, message: 'Product verified! This is a genuine HAMCO product.' });
      } else {
        setVerifyResult({ success: false, message: 'SKU not found. Please check and try again.' });
      }
      setVerifying(false);
    }, 800);
  };

  return (
    <div className="product-check-page">
      {/* Page Title */}
      <div className="pc-header">
        <button className="pc-back-btn" onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <h1 className="pc-page-title">Safety Helmet and Jacket Details Check</h1>
      </div>

      <div className="pc-main-layout">
        {/* Left: Product Info */}
        <div className="pc-product-section">
          <div className="pc-product-card">
            <div className="pc-product-image-wrap">
              <img src={productData.image} alt={productData.name} className="pc-product-image" />
            </div>
            <div className="pc-product-info">
              <h2 className="pc-product-name">{productData.name}</h2>
              <div className="pc-specs">
                <div className="pc-spec-row">
                  <span className="pc-spec-label">Model:</span>
                  <span className="pc-spec-value">{productData.model}</span>
                </div>
                <div className="pc-spec-row">
                  <span className="pc-spec-label">SKU:</span>
                  <span className="pc-spec-value">{productData.sku}</span>
                </div>
                <div className="pc-spec-row">
                  <span className="pc-spec-label">Weight:</span>
                  <span className="pc-spec-value">{productData.weight}</span>
                </div>
                <div className="pc-spec-row">
                  <span className="pc-spec-label">Material:</span>
                  <span className="pc-spec-value">{productData.material}</span>
                </div>
                <div className="pc-spec-row">
                  <span className="pc-spec-label">Certification:</span>
                  <span className="pc-spec-value">{productData.certification}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Verify + Related */}
        <div className="pc-sidebar">
          {/* SKU Verify Box */}
          <div className="pc-verify-box">
            <h3 className="pc-verify-title">Verify SKU</h3>
            <p className="pc-verify-subtitle">Enter Product SKU for Verification</p>
            <div className="pc-verify-input-wrap">
              <input
                type="text"
                className="pc-verify-input"
                placeholder="Enter Product SKU for Verification"
                value={skuInput}
                onChange={e => setSkuInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleVerify()}
              />
            </div>
            <button
              className="pc-verify-btn"
              onClick={handleVerify}
              disabled={verifying}
            >
              {verifying ? (
                <span className="pc-verify-spinner" />
              ) : (
                'Verify Now'
              )}
            </button>
            {verifyResult && (
              <div className={`pc-verify-result ${verifyResult.success ? 'success' : 'error'}`}>
                <span className="pc-verify-icon">{verifyResult.success ? '✅' : '❌'}</span>
                <span>{verifyResult.message}</span>
              </div>
            )}
          </div>

          {/* Related Product Card */}
          <div className="pc-related-card">
            <div className="pc-related-img-wrap">
              <img src="/assets/safety-jacket.png" alt="Safety Jacket" className="pc-related-img" />
            </div>
            <div className="pc-related-info">
              <h4 className="pc-related-name">Safety Jacket</h4>
              <p className="pc-related-sku">HS-0012</p>
              <a href="#" className="pc-related-link">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="pc-similar-section">
        <h2 className="pc-similar-title">Similar Products</h2>
        <div className="pc-similar-grid">
          {similarProducts.map(product => (
            <div key={product.id} className="pc-similar-card">
              <div className="pc-similar-img-wrap">
                <img src={product.image} alt={product.name} className="pc-similar-img" />
              </div>
              <p className="pc-similar-name">{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCheck;
