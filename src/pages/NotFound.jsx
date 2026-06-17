import React, { useState } from 'react';
import { Search, HelpCircle } from 'lucide-react';

export default function NotFound() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.hash = `#search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '100px 0', textAlign: 'center' }}>
      
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        
        <HelpCircle size={48} style={{ color: 'var(--accent-gold)' }} />
        
        <h1 className="display-text" style={{ fontFamily: 'var(--font-serif)', fontSize: '56px' }}>
          404 — Page Not Found
        </h1>
        
        <p className="body-text" style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>
          The editorial coordinate or piece you are searching for does not exist or has been archived. Explore our archives using the search tool or direct collection catalog links below.
        </p>

        {/* Inline Search */}
        <form onSubmit={handleSearch} style={{ display: 'flex', borderBottom: '1px solid var(--text-primary)', width: '100%', maxWidth: '400px', paddingBottom: '6px', margin: '24px 0' }}>
          <input 
            type="text" 
            placeholder="Search our catalog..." 
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ flex: 1, fontSize: '14px', backgroundColor: 'transparent' }}
            aria-label="Search redirect from 404"
          />
          <button type="submit" aria-label="Submit search">
            <Search size={16} />
          </button>
        </form>

        {/* Quick Links */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <a href="#shop?category=Women" style={{ textDecoration: 'underline' }}>Women's Collection</a>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <a href="#shop?category=Men" style={{ textDecoration: 'underline' }}>Men's Collection</a>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <a href="#shop?category=Accessories" style={{ textDecoration: 'underline' }}>Accessories</a>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <a href="#shop?badge=Sale" style={{ textDecoration: 'underline', color: 'var(--accent-gold)' }}>Capsule Sale</a>
        </div>

      </div>

    </div>
  );
}
