import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShieldCheck, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function Cart({ cart, onUpdateQuantity, onRemoveFromCart, onClearCart, products, onQuickAdd, onToggleWishlist, wishlist }) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0 to 1 representing discount percentage (e.g. 0.20 for 20%)
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const discountAmount = subtotal * appliedDiscount;
  const discountedSubtotal = subtotal - discountAmount;
  
  // Shipping: free over 150
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 10;
  // Tax: 8.875% of discounted subtotal
  const tax = discountedSubtotal * 0.08875;
  const total = discountedSubtotal + shipping + tax;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    
    if (promoCode.trim().toUpperCase() === 'WELCOME20') {
      setAppliedDiscount(0.20);
      setPromoSuccess('Promo code WELCOME20 applied! 20% discount has been subtracted.');
    } else if (promoCode.trim()) {
      setPromoError('Invalid promo code. Try WELCOME20');
    }
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      window.location.hash = '#account'; // take to orders history
    }, 4000);
  };

  // Recommendations for upsells
  const upsells = products.slice(4, 8);

  if (checkoutComplete) {
    return (
      <div className="container animate-fade-in" style={{ padding: '80px 0', textAlign: 'center' }}>
        <ShieldCheck size={64} style={{ color: 'var(--accent-gold)', marginBottom: '24px' }} />
        <h2 className="h1" style={{ fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>Order Processing</h2>
        <p className="body-text" style={{ maxWidth: '500px', margin: '0 auto 32px' }}>
          Thank you for choosing AURA. Your secure transaction is complete and your luxury apparel is being prepared in our studio.
        </p>
        <div className="skeleton" style={{ width: '100px', height: '4px', margin: '0 auto' }} />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2 className="h1" style={{ fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>Your Shopping Bag is Empty</h2>
        <p className="body-text" style={{ maxWidth: '450px', margin: '0 auto 32px', color: 'var(--text-muted)' }}>
          Browse our new arrivals or category catalogs to find your signature silhouettes.
        </p>
        <button 
          onClick={() => window.location.hash = '#shop'}
          className="btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '40px' }}>
      <h1 className="h1" style={{ fontFamily: 'var(--font-serif)', marginBottom: '40px', fontWeight: 400 }}>Shopping Bag</h1>

      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }} className="cart-layout">
        
        {/* Left: Item List */}
        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {cart.map((item, index) => (
            <div 
              key={`${item.product.id}-${item.color}-${item.size}-${index}`} 
              style={{
                display: 'flex',
                gap: '24px',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '24px',
                alignItems: 'flex-start'
              }}
              className="cart-item-row"
            >
              <img 
                src={item.product.images[0]} 
                alt={item.product.name} 
                style={{ width: '100px', height: '133px', objectFit: 'cover', backgroundColor: '#FAF8F5' }} 
              />
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="caption-text" style={{ fontSize: '10px' }}>AURA Studio</span>
                    <h3 style={{ fontSize: '16px', fontWeight: 500, margin: '4px 0 2px' }}>{item.product.name}</h3>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      Color: {item.color} | Size: {item.size}
                    </span>
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>
                    ${item.product.price * item.quantity}
                  </span>
                </div>

                {/* Stepper + Delete Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-white)' }}>
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, item.color, item.size, item.quantity - 1)}
                      style={{ padding: '6px 12px' }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '14px', padding: '0 12px', fontWeight: 600 }}>{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, item.color, item.size, item.quantity + 1)}
                      style={{ padding: '6px 12px' }}
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button 
                    onClick={() => onRemoveFromCart(item.product.id, item.color, item.size)}
                    style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                    className="btn-icon"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary Panel */}
        <div style={{ flex: 1, width: '100%', border: '1px solid var(--border-color)', padding: '32px', backgroundColor: 'var(--bg-secondary)' }} className="cart-summary-panel">
          <h3 className="h3" style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 500 }}>${subtotal}</span>
            </div>
            
            {appliedDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-gold)' }}>
                <span>Promo Discount (20%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Estimated Tax (8.875%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Promo code form */}
          <form onSubmit={handleApplyPromo} style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ fontSize: '10px' }}>Promo Code</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="e.g. WELCOME20" 
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="form-input"
                style={{ padding: '8px', flex: 1, backgroundColor: 'var(--bg-white)' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                Apply
              </button>
            </div>
            {promoError && <span style={{ color: '#D9534F', fontSize: '11px', display: 'block', marginTop: '6px' }}>{promoError}</span>}
            {promoSuccess && <span style={{ color: 'var(--accent-gold)', fontSize: '11px', display: 'block', marginTop: '6px' }}>{promoSuccess}</span>}
          </form>

          {/* Checkout CTA */}
          <button 
            className="btn-primary btn-gold" 
            onClick={handleCheckout}
            style={{ width: '100%', padding: '16px', display: 'flex', justifyContent: 'center', gap: '8px', color: '#FFF' }}
          >
            Proceed to Checkout
            <ArrowRight size={16} />
          </button>

          {/* Payment Badges */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
              Secure Payments Accepted
            </span>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', opacity: 0.8 }}>
              <div style={{ border: '1px solid var(--border-color)', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold' }}>VISA</div>
              <div style={{ border: '1px solid var(--border-color)', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold' }}>MASTERCARD</div>
              <div style={{ border: '1px solid var(--border-color)', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold' }}>PAYPAL</div>
              <div style={{ border: '1px solid var(--border-color)', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold' }}>APPLE PAY</div>
            </div>
          </div>

        </div>
      </div>

      {/* Upsell carousel */}
      <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '64px', marginTop: '80px', marginBottom: '40px' }}>
        <h3 className="h3" style={{ fontFamily: 'var(--font-serif)', marginBottom: '32px', textAlign: 'center' }}>You Might Also Like</h3>
        <div className="grid-cols-4">
          {upsells.map(item => (
            <ProductCard 
              key={item.id} 
              product={item} 
              onQuickAdd={onQuickAdd}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(item.id)}
            />
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .cart-layout { flex-direction: column !important; gap: 32px !important; }
          .cart-summary-panel { width: 100% !important; }
        }
        @media (max-width: 480px) {
          .cart-item-row { flex-direction: column !important; align-items: stretch !important; gap: 16px !important; }
          .cart-item-row img { width: 100% !important; height: 160px !important; object-fit: cover !important; }
        }
      `}</style>
    </div>
  );
}
