import React, { useState, useEffect } from 'react';
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';

export default function Header({ 
  cartCount, 
  wishlistCount, 
  onCartClick, 
  onWishlistClick, 
  onAccountClick,
  onSearchSubmit
}) {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchSubmitLocal = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery);
      setSearchOpen(false);
      setSearchQuery('');
      window.location.hash = `#search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navigateToCategory = (cat) => {
    window.location.hash = `#shop?category=${cat}`;
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      {announcementVisible && (
        <div className="announcement-bar animate-fade-in">
          <span>New Arrivals — Free Shipping Over $150 — Use Code WELCOME20 for 20% Off</span>
          <button 
            className="close-btn" 
            onClick={() => setAnnouncementVisible(false)}
            aria-label="Close Announcement"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Main Header */}
      <header className={scrolled ? 'sticky-scrolled' : ''}>
        <div className="container nav-container">
          {/* Hamburger button on Mobile */}
          <button 
            className="btn-icon mobile-only" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            style={{ display: 'none' }} // will override in media queries below
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <a href="#home" className="logo-link">AURA</a>

          {/* Desktop Nav Links */}
          <nav className="desktop-only">
            <ul className="nav-links">
              <li>
                <a href="#shop?category=Women" className="nav-item-link">Women</a>
                {/* Mega Menu Dropdown */}
                <div className="mega-menu">
                  <div className="mega-menu-content">
                    <div>
                      <h4 className="mega-menu-title">Clothing</h4>
                      <ul className="mega-menu-list">
                        <li><a href="#shop?category=Women&sub=Tops">Tops & Shirts</a></li>
                        <li><a href="#shop?category=Women&sub=Dresses">Dresses</a></li>
                        <li><a href="#shop?category=Women&sub=Bottoms">Trousers & Jeans</a></li>
                        <li><a href="#shop?category=Women&sub=Outerwear">Outerwear & Blazers</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mega-menu-title">Shoes</h4>
                      <ul className="mega-menu-list">
                        <li><a href="#shop?category=Accessories&sub=Shoes">Boots</a></li>
                        <li><a href="#shop?category=Accessories&sub=Shoes">Sneakers</a></li>
                        <li><a href="#shop?category=Accessories&sub=Shoes">Loafers</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mega-menu-title">Accessories</h4>
                      <ul className="mega-menu-list">
                        <li><a href="#shop?category=Accessories&sub=Bags">Bags</a></li>
                        <li><a href="#shop?category=Accessories&sub=Bags">Hats</a></li>
                        <li><a href="#shop?category=Accessories&sub=Bags">Scarves</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mega-menu-title">Featured</h4>
                      <ul className="mega-menu-list">
                        <li><a href="#shop?badge=New" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>New Arrivals</a></li>
                        <li><a href="#shop?badge=Sale" style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>The Capsule Sale</a></li>
                        <li><a href="#shop?badge=Bestseller">Best Sellers</a></li>
                      </ul>
                    </div>
                    <div className="mega-menu-featured">
                      <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop" alt="Featured lookbook" />
                      <div className="mega-menu-featured-overlay">
                        <span className="caption-text" style={{ color: '#fff', fontSize: '10px' }}>Lookbook</span>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', margin: '4px 0 8px' }}>Summer Linen '26</h4>
                        <a href="#shop?category=Women" style={{ fontSize: '11px', textDecoration: 'underline', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shop the collection</a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a href="#shop?category=Men" className="nav-item-link">Men</a>
                {/* Mega Menu Men */}
                <div className="mega-menu">
                  <div className="mega-menu-content">
                    <div>
                      <h4 className="mega-menu-title">Clothing</h4>
                      <ul className="mega-menu-list">
                        <li><a href="#shop?category=Men&sub=Tops">Tops & Tees</a></li>
                        <li><a href="#shop?category=Men&sub=Bottoms">Chinos & Trousers</a></li>
                        <li><a href="#shop?category=Men&sub=Outerwear">Jackets & Coats</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mega-menu-title">Shoes & Accs</h4>
                      <ul className="mega-menu-list">
                        <li><a href="#shop?category=Accessories&sub=Shoes">Sneakers</a></li>
                        <li><a href="#shop?category=Accessories&sub=Shoes">Chelsea Boots</a></li>
                        <li><a href="#shop?category=Accessories&sub=Bags">Leather Bags</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mega-menu-title">Collections</h4>
                      <ul className="mega-menu-list">
                        <li><a href="#shop?category=Men&badge=New">New Arrivals</a></li>
                        <li><a href="#shop?category=Men">Contemporary Tailoring</a></li>
                        <li><a href="#shop?category=Men&badge=Bestseller">Essentials</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mega-menu-title">Editorial</h4>
                      <ul className="mega-menu-list">
                        <li><a href="#about">Our Story</a></li>
                        <li><a href="#about#values">Sustainability Focus</a></li>
                      </ul>
                    </div>
                    <div className="mega-menu-featured">
                      <img src="https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?q=80&w=400&auto=format&fit=crop" alt="Featured Men" />
                      <div className="mega-menu-featured-overlay">
                        <span className="caption-text" style={{ color: '#fff', fontSize: '10px' }}>New Drop</span>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', margin: '4px 0 8px' }}>Japanese Selvedge Denim</h4>
                        <a href="#shop?category=Men" style={{ fontSize: '11px', textDecoration: 'underline', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shop Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li><a href="#shop?category=Accessories" className="nav-item-link">Accessories</a></li>
              <li><a href="#shop?badge=Sale" className="nav-item-link" style={{ color: 'var(--accent-gold)' }}>Sale</a></li>
              <li><a href="#about" className="nav-item-link">About</a></li>
              <li><a href="#contact" className="nav-item-link">Contact</a></li>
            </ul>
          </nav>

          {/* Right Action Icons */}
          <div className="nav-icons">
            <button className="btn-icon" onClick={handleSearchClick} aria-label="Search">
              <Search size={18} />
            </button>
            <button className="btn-icon icon-badge-container" onClick={onWishlistClick} aria-label="Wishlist">
              <Heart size={18} />
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </button>
            <button className="btn-icon" onClick={onAccountClick} aria-label="Account">
              <User size={18} />
            </button>
            <button className="btn-icon icon-badge-container" onClick={onCartClick} aria-label="Shopping bag">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Slide-down Search Bar */}
        {searchOpen && (
          <div 
            style={{
              borderTop: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-white)',
              padding: '16px 0',
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              zIndex: 98,
              boxShadow: '0 10px 15px rgba(0,0,0,0.02)'
            }}
            className="animate-fade-in"
          >
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
              <form onSubmit={handleSearchSubmitLocal} style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search AURA (e.g. linen blazer, boots, silk)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    borderBottom: '1.5px solid var(--text-primary)',
                    padding: '8px 40px 8px 8px',
                    fontSize: '15px'
                  }}
                  autoFocus
                />
                <button type="submit" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} aria-label="Search submit">
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile navigation sliding drawer */}
      <div 
        className={`modal-overlay ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
        style={{ zIndex: 998 }}
      />
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <button 
          onClick={() => setMobileMenuOpen(false)} 
          className="btn-icon" 
          style={{ position: 'absolute', top: '24px', left: '32px' }}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <ul className="mobile-nav-links">
          <li><a href="#shop?category=Women" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Women</a></li>
          <li><a href="#shop?category=Men" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Men</a></li>
          <li><a href="#shop?category=Accessories" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Accessories</a></li>
          <li><a href="#shop?badge=Sale" className="mobile-nav-link" style={{ color: 'var(--accent-gold)' }} onClick={() => setMobileMenuOpen(false)}>Capsule Sale</a></li>
          <li><a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About Us</a></li>
          <li><a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact Boutique</a></li>
        </ul>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <a href="#account" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <User size={16} />
            My Account Dashboard
          </a>
        </div>
      </div>

      {/* Custom responsive media query helpers embedded for header */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
      `}</style>
    </>
  );
}
