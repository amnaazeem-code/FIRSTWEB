import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveFromCart }) {
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handleCheckoutClick = () => {
    window.location.hash = '#cart';
    onClose();
  };

  return (
    <>
      {/* Overlay backdrop */}
      <div 
        className={`modal-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
        style={{ zIndex: 1000 }}
      />
      
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3 className="h3" style={{ fontFamily: 'var(--font-serif)', fontSize: '20px' }}>
            Shopping Bag ({cartItemsCount})
          </h3>
          <button onClick={onClose} className="btn-icon" aria-label="Close cart drawer">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px' }}>
              <p className="body-text" style={{ color: 'var(--text-muted)' }}>Your bag is currently empty.</p>
              <button 
                onClick={() => { window.location.hash = '#shop'; onClose(); }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Browse Collections
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cart.map((item, index) => (
                <div key={`${item.product.id}-${item.color}-${item.size}-${index}`} style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    style={{ width: '70px', height: '90px', objectFit: 'cover', background: '#f5f5f5' }} 
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 500, margin: 0, paddingRight: '12px' }}>
                        {item.product.name}
                      </h4>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Color: {item.color} | Size: {item.size}
                    </span>
                    
                    {/* Stepper & Trash row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)' }}>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.color, item.size, item.quantity - 1)}
                          style={{ padding: '4px 8px', fontSize: '10px' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={10} />
                        </button>
                        <span style={{ fontSize: '12px', padding: '0 8px', fontWeight: 500 }}>{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.color, item.size, item.quantity + 1)}
                          style={{ padding: '4px 8px', fontSize: '10px' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => onRemoveFromCart(item.product.id, item.color, item.size)}
                        style={{ color: 'var(--text-muted)' }}
                        aria-label="Remove item"
                        className="btn-icon"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px' }}>
              <span style={{ fontWeight: 500 }}>Subtotal</span>
              <span style={{ fontWeight: 600, fontSize: '16px' }}>${subtotal}</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Shipping and taxes calculated at checkout.
            </p>
            <button 
              className="btn-primary" 
              onClick={handleCheckoutClick}
              style={{ width: '100%', gap: '8px', display: 'flex', padding: '14px' }}
            >
              Secure Checkout
              <ArrowRight size={14} />
            </button>
            <button 
              onClick={onClose}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                marginTop: '12px',
                fontSize: '12px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textDecoration: 'underline'
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
