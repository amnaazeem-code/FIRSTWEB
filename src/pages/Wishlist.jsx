import React from 'react';
import { Trash2, ShoppingBag, Share2 } from 'lucide-react';

export default function Wishlist({ wishlist, products, onQuickAdd, onToggleWishlist, addToast }) {
  const wishlistedItems = products.filter(p => wishlist.includes(p.id));

  const handleMoveToBag = (product) => {
    // Default size: first available size that is in stock
    const availableSize = product.sizes.find(size => product.stock[size] > 0);
    if (!availableSize) {
      addToast("This item is completely sold out.");
      return;
    }
    
    onQuickAdd({
      product,
      color: product.colors[0].name,
      size: availableSize,
      quantity: 1
    });
    // Remove from wishlist
    onToggleWishlist(product.id);
    addToast(`${product.name} moved to your Shopping Bag.`);
  };

  const handleShareWishlist = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast("Wishlist link copied to clipboard. Share with others!");
  };

  if (wishlistedItems.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2 className="h1" style={{ fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>Your Wishlist is Empty</h2>
        <p className="body-text" style={{ maxWidth: '450px', margin: '0 auto 32px', color: 'var(--text-muted)' }}>
          Keep track of items you love by clicking the heart icon on cards.
        </p>
        <button 
          onClick={() => window.location.hash = '#shop'}
          className="btn-primary"
        >
          Browse Collections
        </button>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '40px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px', marginBottom: '40px' }}>
        <div>
          <h1 className="h1" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, margin: 0 }}>My Wishlist</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
            {wishlistedItems.length} curated pieces saved.
          </p>
        </div>
        <button 
          onClick={handleShareWishlist}
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '13px' }}
        >
          <Share2 size={14} />
          Share Wishlist
        </button>
      </div>

      {/* Grid of saved items */}
      <div className="grid-cols-4">
        {wishlistedItems.map((product) => {
          const isOutOfStock = Object.values(product.stock).every(qty => qty === 0);
          return (
            <div key={product.id} style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
              
              {/* Remove button overlay */}
              <button 
                onClick={() => onToggleWishlist(product.id)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(248, 246, 242, 0.8)',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
                aria-label="Remove item from wishlist"
                className="btn-icon"
              >
                <Trash2 size={13} style={{ color: 'var(--text-primary)' }} />
              </button>

              <div 
                onClick={() => window.location.hash = `#product/${product.id}`}
                style={{ cursor: 'pointer', flex: 1 }}
              >
                <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                <div style={{ padding: '16px' }}>
                  <span className="product-brand" style={{ fontSize: '10px' }}>AURA Studio</span>
                  <h3 style={{ fontSize: '14px', fontWeight: 500, margin: '4px 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.name}
                  </h3>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>${product.price}</span>
                </div>
              </div>

              {/* Action buttons at bottom */}
              <div style={{ padding: '16px', paddingTop: 0, marginTop: 'auto' }}>
                <button
                  onClick={() => handleMoveToBag(product)}
                  className="btn-primary"
                  disabled={isOutOfStock}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '11px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '6px',
                    opacity: isOutOfStock ? 0.5 : 1,
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ShoppingBag size={12} />
                  {isOutOfStock ? 'Sold Out' : 'Move to Bag'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
