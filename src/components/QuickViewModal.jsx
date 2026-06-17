import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Eye } from 'lucide-react';

export default function QuickViewModal({ productId, products, isOpen, onClose, onAddToCart, onToggleWishlist, isWishlisted }) {
  const product = products.find(p => p.id === productId);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Set default color when product loads
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize('');
      setActiveImageIndex(0);
    }
  }, [product, productId]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    onAddToCart({
      product,
      color: selectedColor.name,
      size: selectedSize,
      quantity: 1
    });
    onClose();
  };

  const isLowStock = selectedSize && product.stock[selectedSize] > 0 && product.stock[selectedSize] <= 3;
  const isSizeOutOfStock = (size) => product.stock[size] === 0;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', padding: '0', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Left Side: Images */}
        <div style={{ flex: '1.2', position: 'relative', background: '#f5f5f5' }}>
          <img 
            src={product.images[activeImageIndex]} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '450px' }} 
          />
          {product.images.length > 1 && (
            <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: activeImageIndex === idx ? 'var(--text-primary)' : 'rgba(26, 26, 26, 0.3)',
                    border: 'none',
                    padding: 0
                  }}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Options */}
        <div style={{ flex: '1', padding: '32px', display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: '550px' }}>
          <div style={{ marginBottom: '8px' }}>
            <span className="caption-text">AURA Studio</span>
            <h2 className="h2" style={{ fontFamily: 'var(--font-serif)', marginTop: '4px' }}>{product.name}</h2>
          </div>

          <div className="product-price-row" style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '20px', fontWeight: '600' }}>${product.price}</span>
            {product.originalPrice && (
              <span className="price-original" style={{ fontSize: '16px' }}>${product.originalPrice}</span>
            )}
          </div>

          {/* Color swatches */}
          <div style={{ marginBottom: '20px' }}>
            <span className="caption-text" style={{ fontSize: '11px', marginBottom: '8px', display: 'block' }}>
              Color: {selectedColor?.name}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`color-dot ${selectedColor?.name === color.name ? 'active' : ''}`}
                  style={{ backgroundColor: color.code, width: '20px', height: '20px' }}
                  aria-label={`Color ${color.name}`}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div style={{ marginBottom: '24px' }}>
            <span className="caption-text" style={{ fontSize: '11px', marginBottom: '8px', display: 'block' }}>
              Size: {selectedSize || 'Select Size'}
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.sizes.map((size) => {
                const disabled = isSizeOutOfStock(size);
                return (
                  <button
                    key={size}
                    onClick={() => !disabled && setSelectedSize(size)}
                    disabled={disabled}
                    style={{
                      border: '1px solid var(--border-color)',
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: 500,
                      minWidth: '45px',
                      textAlign: 'center',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      opacity: disabled ? 0.3 : 1,
                      backgroundColor: selectedSize === size ? 'var(--text-primary)' : 'transparent',
                      color: selectedSize === size ? 'var(--bg-primary)' : 'var(--text-primary)',
                      textDecoration: disabled ? 'line-through' : 'none',
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Low stock warning */}
          {isLowStock && (
            <div style={{ marginBottom: '16px', color: '#721C24', backgroundColor: '#F8D7DA', padding: '8px 12px', fontSize: '13px', borderLeft: '3px solid #D9534F' }}>
              Low stock: Only {product.stock[selectedSize]} left in this size
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
            <button 
              className="btn-primary" 
              onClick={handleAddToCart}
              style={{ flex: 1, padding: '12px var(--space-24)', gap: '8px', display: 'flex' }}
            >
              <ShoppingBag size={16} />
              Add to Bag
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onToggleWishlist(product.id)}
              aria-label="Add to Wishlist"
              style={{ padding: '12px' }}
            >
              <Heart size={16} fill={isWishlisted ? "var(--accent-gold)" : "none"} stroke={isWishlisted ? "var(--accent-gold)" : "currentColor"} />
            </button>
          </div>

          <button 
            onClick={() => {
              window.location.hash = `#product/${product.id}`;
              onClose();
            }}
            style={{
              marginTop: '16px',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600,
              textDecoration: 'underline',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <Eye size={12} />
            View Full Editorial Details
          </button>
        </div>
      </div>
    </div>
  );
}
