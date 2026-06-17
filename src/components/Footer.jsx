import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Footer({ onOpenSizeGuide }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currency, setCurrency] = useState('USD');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', marginTop: '80px', paddingTop: '64px', paddingBottom: '32px' }}>
      <div className="container">
        
        {/* 4 Column Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '64px'
          }}
        >
          {/* Col 1: Shop */}
          <div>
            <h4 className="caption-text" style={{ marginBottom: '20px', color: 'var(--text-primary)', fontWeight: 600 }}>Shop</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li><a href="#shop?category=Women">Women's Collection</a></li>
              <li><a href="#shop?category=Men">Men's Collection</a></li>
              <li><a href="#shop?category=Accessories">Accessories</a></li>
              <li><a href="#shop?badge=Sale" style={{ color: 'var(--accent-gold)' }}>The Capsule Sale</a></li>
              <li><a href="#shop?badge=New">New Arrivals</a></li>
            </ul>
          </div>

          {/* Col 2: Help */}
          <div>
            <h4 className="caption-text" style={{ marginBottom: '20px', color: 'var(--text-primary)', fontWeight: 600 }}>Help Desk</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li><a href="#contact">Contact Boutique</a></li>
              <li><a href="#about">Shipping & Delivery</a></li>
              <li><a href="#about">Returns & Exchanges</a></li>
              <li>
                <button 
                  onClick={onOpenSizeGuide}
                  style={{ textDecoration: 'underline', textAlign: 'left', fontSize: '14px', color: 'var(--text-secondary)' }}
                >
                  Size Guide Chart
                </button>
              </li>
              <li><a href="#contact">Store Locator</a></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="caption-text" style={{ marginBottom: '20px', color: 'var(--text-primary)', fontWeight: 600 }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li><a href="#about">Our Story</a></li>
              <li><a href="#about#values">Craftsmanship & Values</a></li>
              <li><a href="#about#timeline">Milestones & Press</a></li>
              <li><a href="#about">Sustainability Pledge</a></li>
              <li><a href="#about">Careers</a></li>
            </ul>
          </div>

          {/* Col 4: Connect & Newsletter */}
          <div>
            <h4 className="caption-text" style={{ marginBottom: '20px', color: 'var(--text-primary)', fontWeight: 600 }}>Connect</h4>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
              Subscribe to receive early access to new collections, lookbooks, and private sales.
            </p>
            
            <form onSubmit={handleSubscribe} style={{ position: 'relative', width: '100%', borderBottom: '1px solid var(--text-primary)', paddingBottom: '6px' }}>
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: 'calc(100% - 30px)',
                  fontSize: '13px',
                  backgroundColor: 'transparent'
                }}
                aria-label="Newsletter email address"
              />
              <button 
                type="submit" 
                style={{ position: 'absolute', right: '0', top: '0', color: 'var(--text-primary)' }}
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
            {subscribed && (
              <span style={{ fontSize: '12px', color: 'var(--accent-gold)', display: 'block', marginTop: '8px' }}>
                Thank you for subscribing.
              </span>
            )}

            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <a href="https://instagram.com" className="btn-icon" style={{ padding: 0 }} aria-label="Aura Studio Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" className="btn-icon" style={{ padding: 0 }} aria-label="Aura Studio Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://twitter.com" className="btn-icon" style={{ padding: 0 }} aria-label="Aura Studio Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div style={{ height: '1px', backgroundColor: 'var(--border-color)', marginBottom: '32px' }} />

        {/* Bottom Bar */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            fontSize: '12px',
            color: 'var(--text-muted)'
          }}
        >
          {/* Region / Currency */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Country/Region:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                backgroundColor: 'transparent',
                fontWeight: 600,
                color: 'var(--text-primary)',
                borderBottom: '1px solid transparent',
                cursor: 'pointer'
              }}
              aria-label="Select region currency"
            >
              <option value="USD">United States (USD $)</option>
              <option value="EUR">European Union (EUR €)</option>
              <option value="GBP">United Kingdom (GBP £)</option>
              <option value="AUD">Australia (AUD $)</option>
            </select>
          </div>

          {/* Legal Links */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span>© 2026 AURA Studio.</span>
            <a href="#about" style={{ textDecoration: 'underline' }}>Privacy Policy</a>
            <a href="#about" style={{ textDecoration: 'underline' }}>Terms & Conditions</a>
            <a href="#about" style={{ textDecoration: 'underline' }}>Accessibility Statement</a>
          </div>

          {/* Payment Badges */}
          <div style={{ display: 'flex', gap: '8px', opacity: 0.7 }}>
            {/* Minimal card shapes representing payments */}
            <div style={{ border: '1px solid var(--border-color)', padding: '2px 6px', fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.05em' }}>VISA</div>
            <div style={{ border: '1px solid var(--border-color)', padding: '2px 6px', fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.05em' }}>MC</div>
            <div style={{ border: '1px solid var(--border-color)', padding: '2px 6px', fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.05em' }}>PP</div>
            <div style={{ border: '1px solid var(--border-color)', padding: '2px 6px', fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.05em' }}>APPLE</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
