import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SizeGuideModal from './components/SizeGuideModal';

import Home from './pages/Home';
import PLP from './pages/PLP';
import PDP from './pages/PDP';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Search from './pages/Search';
import Account from './pages/Account';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import { products } from './data/products';

// Safe localStorage helpers to prevent Sandboxed iframe or cookie block exceptions
const safeGetItem = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
};

const safeSetItem = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    // Ignore storage quota or security errors
  }
};

const safeGetCookieConsent = () => {
  try {
    return localStorage.getItem('aura_cookie_consent') === 'true';
  } catch (e) {
    return false;
  }
};

export default function App() {
  // Navigation / Hash Routing State
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');

  // E-commerce state (backed by localStorage)
  const [cart, setCart] = useState(() => safeGetItem('aura_cart', []));
  const [wishlist, setWishlist] = useState(() => safeGetItem('aura_wishlist', []));

  // UI States
  const [toasts, setToasts] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState(null); // ID of product, null if closed
  const [cookieConsent, setCookieConsent] = useState(() => safeGetCookieConsent());

  // Persist cart
  useEffect(() => {
    safeSetItem('aura_cart', cart);
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    safeSetItem('aura_wishlist', wishlist);
  }, [wishlist]);

  // Monitor URL Hash Changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
      window.scrollTo(0, 0); // Scroll to top on navigation
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Toast utilities
  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add to Bag handler
  const handleAddToCart = ({ product, color, size, quantity }) => {
    setCart((prev) => {
      // Find matching item in cart
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.color === color &&
          item.size === size
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, color, size, quantity }];
      }
    });

    addToast(`Added ${quantity} × ${product.name} (${size}) to your bag.`);
    setCartDrawerOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId, color, size, qty) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId, color, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.color === color && item.size === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  // Remove from Cart
  const handleRemoveFromCart = (productId, color, size) => {
    const item = cart.find(
      (item) => item.product.id === productId && item.color === color && item.size === size
    );
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.color === color && item.size === size)
      )
    );
    if (item) {
      addToast(`Removed ${item.product.name} from your bag.`);
    }
  };

  // Clear Cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (id) => {
    const product = products.find((p) => p.id === id);
    setWishlist((prev) => {
      if (prev.includes(id)) {
        addToast(`Removed ${product?.name} from your wishlist.`);
        return prev.filter((item) => item !== id);
      } else {
        addToast(`Saved ${product?.name} to your wishlist.`);
        return [...prev, id];
      }
    });
  };

  // Accept Cookie banner
  const handleAcceptCookies = () => {
    try {
      localStorage.setItem('aura_cookie_consent', 'true');
    } catch (e) {
      // Ignore
    }
    setCookieConsent(true);
  };

  // Parse path part of current hash
  const cleanHash = currentHash.replace(/^#/, '');
  const pathPart = cleanHash.split('?')[0];

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Render correct page based on Router mapping
  const renderPage = () => {
    if (!pathPart || pathPart === 'home') {
      return (
        <Home
          products={products}
          onQuickAdd={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />
      );
    }
    if (pathPart === 'shop') {
      return (
        <PLP
          products={products}
          onQuickAdd={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />
      );
    }
    if (pathPart.startsWith('product/')) {
      const idStr = pathPart.split('/')[1];
      const id = parseInt(idStr, 10);
      return (
        <PDP
          productId={id}
          products={products}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          onOpenSizeGuide={() => setSizeGuideOpen(true)}
        />
      );
    }
    if (pathPart === 'cart') {
      return (
        <Cart
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={handleClearCart}
          products={products}
          onQuickAdd={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />
      );
    }
    if (pathPart === 'wishlist') {
      return (
        <Wishlist
          wishlist={wishlist}
          products={products}
          onQuickAdd={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          addToast={addToast}
        />
      );
    }
    if (pathPart === 'search') {
      return (
        <Search
          products={products}
          onQuickAdd={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />
      );
    }
    if (pathPart === 'account') {
      return <Account wishlistCount={wishlist.length} cart={cart} />;
    }
    if (pathPart === 'about') {
      return <About />;
    }
    if (pathPart === 'contact') {
      return <Contact />;
    }
    return <NotFound />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Navigation Header */}
      <Header
        cartCount={cartItemsCount}
        wishlistCount={wishlist.length}
        onCartClick={() => setCartDrawerOpen(true)}
        onWishlistClick={() => (window.location.hash = '#wishlist')}
        onAccountClick={() => (window.location.hash = '#account')}
        onSearchSubmit={(q) => (window.location.hash = `#search?q=${encodeURIComponent(q)}`)}
      />

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>{renderPage()}</main>

      {/* Footer */}
      <Footer onOpenSizeGuide={() => setSizeGuideOpen(true)} />

      {/* Drawers & Modals overlays */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
      />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      <QuickViewModal
        productId={quickViewId}
        products={products}
        isOpen={quickViewId !== null}
        onClose={() => setQuickViewId(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={wishlist.includes(quickViewId || 0)}
      />

      {/* Toast Overlay Banner */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Cookie Consent Banner */}
      {!cookieConsent && (
        <div 
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            right: '24px',
            maxWidth: '450px',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            padding: '20px 24px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '13px', lineHeight: '1.5', letterSpacing: '0.02em' }}>
            We use cookies to tailor your browsing lookbooks and measure site interactions. By accepting, you consent to standard analytical cookies.
          </span>
          <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-end' }}>
            <button 
              onClick={handleAcceptCookies} 
              style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1.5px solid var(--bg-primary)' }}
            >
              Accept Cookies
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
