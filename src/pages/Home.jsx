import React from 'react';
import ProductCard from '../components/ProductCard';

export default function Home({ products, onQuickAdd, onToggleWishlist, wishlist }) {
  // Take first 4 products as New Arrivals
  const newArrivals = products.slice(0, 4);

  const handleShopNow = (category) => {
    window.location.hash = `#shop?category=${category}`;
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
      
      {/* 1. Hero Section */}
      <section 
        style={{
          height: 'calc(100vh - 120px)',
          minHeight: '600px',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1600&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#FFFFFF',
          padding: '0 var(--space-24)'
        }}
      >
        <span 
          className="caption-text" 
          style={{ color: '#F8F6F2', letterSpacing: '0.25em', marginBottom: '16px', fontSize: '13px' }}
        >
          Summer Collection 2026
        </span>
        <h1 
          className="display-text" 
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px, 6vw, 76px)', marginBottom: '32px', textShadow: '0 2px 10px rgba(0,0,0,0.15)' }}
        >
          Lightness of Being
        </h1>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            onClick={() => handleShopNow('Women')}
            className="btn-primary btn-gold"
            style={{ minWidth: '180px', color: '#fff' }}
          >
            Shop Women
          </button>
          <button 
            onClick={() => handleShopNow('Men')}
            className="btn-primary"
            style={{ minWidth: '180px', backgroundColor: 'transparent', color: '#FFF', borderColor: '#FFF' }}
          >
            Shop Men
          </button>
        </div>
      </section>

      {/* 2. Scrolling Marquee Ticker */}
      <section 
        style={{
          width: '100%',
          overflow: 'hidden',
          borderY: '1px solid var(--border-color)',
          padding: '16px 0',
          backgroundColor: 'var(--bg-white)',
          display: 'flex',
          whiteSpace: 'nowrap'
        }}
      >
        <div 
          style={{
            display: 'inline-block',
            animation: 'marquee 25s linear infinite',
            fontSize: '11px',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.15em'
          }}
        >
          <span>✦ NEW ARRIVALS DROP EVERY TUESDAY </span>
          <span style={{ margin: '0 60px' }}>✦ FREE WORLDWIDE SHIPPING OVER $150 </span>
          <span style={{ margin: '0 60px' }}>✦ MEMBERS RECEIVE 20% OFF FIRST PURCHASE WITH CODE WELCOME20 </span>
          <span style={{ margin: '0 60px' }}>✦ ZERO-PLASTIC PACKAGING </span>
          <span>✦ NEW ARRIVALS DROP EVERY TUESDAY </span>
          <span style={{ margin: '0 60px' }}>✦ FREE WORLDWIDE SHIPPING OVER $150 </span>
        </div>
        
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* 3. Featured Categories Grid */}
      <section className="container">
        <h2 className="h2" style={{ textAlign: 'center', marginBottom: '40px', fontFamily: 'var(--font-serif)' }}>Categorical Curations</h2>
        
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}
        >
          {/* Women Category */}
          <div 
            onClick={() => handleShopNow('Women')}
            style={{ position: 'relative', height: '480px', overflow: 'hidden', cursor: 'pointer' }}
            className="category-block"
          >
            <img 
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop" 
              alt="Women Category"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-slow)' }}
            />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px', color: '#fff' }}>
              <h3 className="h3" style={{ color: '#fff', fontSize: '28px', marginBottom: '8px' }}>Women</h3>
              <span style={{ fontSize: '12px', textDecoration: 'underline', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore Collection</span>
            </div>
          </div>

          {/* Men Category */}
          <div 
            onClick={() => handleShopNow('Men')}
            style={{ position: 'relative', height: '480px', overflow: 'hidden', cursor: 'pointer' }}
            className="category-block"
          >
            <img 
              src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop" 
              alt="Men Category"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-slow)' }}
            />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px', color: '#fff' }}>
              <h3 className="h3" style={{ color: '#fff', fontSize: '28px', marginBottom: '8px' }}>Men</h3>
              <span style={{ fontSize: '12px', textDecoration: 'underline', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore Collection</span>
            </div>
          </div>

          {/* Accessories Category */}
          <div 
            onClick={() => handleShopNow('Accessories')}
            style={{ position: 'relative', height: '480px', overflow: 'hidden', cursor: 'pointer' }}
            className="category-block"
          >
            <img 
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop" 
              alt="Accessories Category"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-slow)' }}
            />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px', color: '#fff' }}>
              <h3 className="h3" style={{ color: '#fff', fontSize: '28px', marginBottom: '8px' }}>Accessories</h3>
              <span style={{ fontSize: '12px', textDecoration: 'underline', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore Details</span>
            </div>
          </div>
        </div>

        <style>{`
          .category-block:hover img {
            transform: scale(1.05);
          }
        `}</style>
      </section>

      {/* 4. New Arrivals Product Carousel */}
      <section className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <span className="caption-text">Season's Finest</span>
            <h2 className="h2" style={{ fontFamily: 'var(--font-serif)', marginTop: '4px' }}>The New Vanguard</h2>
          </div>
          <a href="#shop" style={{ fontSize: '13px', fontWeight: '500', textDecoration: 'underline', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            View Catalog
          </a>
        </div>

        <div className="grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickAdd={onQuickAdd}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* 5. Editorial Lookbook Section */}
      <section 
        style={{
          position: 'relative',
          height: '600px',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.25)), url("https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1600&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          display: 'flex',
          alignItems: 'center',
          color: '#FFFFFF'
        }}
      >
        <div className="container" style={{ width: '100%' }}>
          <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="caption-text" style={{ color: '#F8F6F2' }}>Lookbook — Vol. 04</span>
            <h2 className="display-text" style={{ fontSize: '48px', fontFamily: 'var(--font-serif)', color: '#FFF' }}>Pure Textures, Quiet Elegance.</h2>
            <p className="body-text" style={{ color: '#EBEBEB', fontSize: '16px', lineHeight: '1.7' }}>
              Exploring the tactile interplay of Mulberry silks and raw Belgian flax. Built for relaxed architectural ease.
            </p>
            <button 
              onClick={() => handleShopNow('Women')}
              className="btn-primary" 
              style={{ alignSelf: 'flex-start', border: '1px solid #FFF', color: '#FFF', backgroundColor: 'transparent', marginTop: '8px' }}
            >
              Shop the Editorial
            </button>
          </div>
        </div>
      </section>

      {/* 6. As Seen In Logo Bar */}
      <section 
        style={{
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          padding: '40px 0',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontStyle: 'italic', fontWeight: 600, opacity: 0.6, letterSpacing: '0.05em' }}>VOGUE</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 'bold', opacity: 0.6, letterSpacing: '0.1em' }}>ELLE</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 900, opacity: 0.6, letterSpacing: '0.15em' }}>GQ</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontStyle: 'italic', opacity: 0.6 }}>Harper's BAZAAR</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '21px', fontWeight: 600, opacity: 0.6, letterSpacing: '0.02em' }}>VANITY FAIR</span>
        </div>
      </section>

      {/* 7. Instagram UGC Grid */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="caption-text">Follow Our Journey</span>
          <h2 className="h2" style={{ fontFamily: 'var(--font-serif)', marginTop: '4px' }}>Curated Coordinates</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>Tag @AURA.Studio to share your luxury silhouettes.</p>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '16px'
          }}
          className="ugc-grid"
        >
          {[
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop"
          ].map((url, idx) => (
            <div key={idx} style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', cursor: 'pointer' }} className="ugc-card">
              <img 
                src={url} 
                alt={`UGC styling ${idx + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'var(--transition-fast)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '13px', fontWeight: 500 }} className="ugc-overlay">
                @aura.studio
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .ugc-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 500px) {
            .ugc-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          .ugc-card:hover img { transform: scale(1.05); }
          .ugc-card:hover .ugc-overlay { opacity: 1; }
        `}</style>
      </section>

      {/* 8. Bottom Newsletter Signup */}
      <section 
        style={{
          borderTop: '1px solid var(--border-color)',
          padding: '80px 0',
          textAlign: 'center',
          backgroundColor: 'var(--bg-white)'
        }}
      >
        <div className="container" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <span className="caption-text">Join The Registry</span>
          <h2 className="h2" style={{ fontFamily: 'var(--font-serif)' }}>AURA Dispatch</h2>
          <p className="body-text" style={{ fontSize: '15px' }}>
            Receive exclusive updates, private seasonal collection previews, and design notes directly from our creative studio.
          </p>
          <div style={{ width: '100%', maxWidth: '450px', marginTop: '12px' }}>
            <form 
              onSubmit={(e) => { e.preventDefault(); alert("Welcome to AURA Registry."); }}
              style={{ display: 'flex', borderBottom: '1.5px solid var(--text-primary)', paddingBottom: '8px' }}
            >
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required 
                style={{ flex: 1, padding: '8px', fontSize: '14px', backgroundColor: 'transparent' }}
                aria-label="Newsletter email input"
              />
              <button type="submit" className="btn-primary" style={{ padding: '8px var(--space-16)', fontSize: '11px' }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
