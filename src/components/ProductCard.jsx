import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export default function ProductCard({ product, onQuickAdd, onToggleWishlist, isWishlisted, onSelectProduct }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  // Check if low stock exists (any size has stock > 0 but <= 3)
  const isLowStock = Object.values(product.stock).some(qty => qty > 0 && qty <= 3);
  const isOutOfStock = Object.values(product.stock).every(qty => qty === 0);

  const handleSizeClick = (e, size) => {
    e.stopPropagation();
    if (product.stock[size] === 0) return;
    onQuickAdd({
      product,
      color: selectedColor.name,
      size,
      quantity: 1
    });
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product.id);
    } else {
      window.location.hash = `#product/${product.id}`;
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="product-image-container">
        {/* Badges */}
        {product.originalPrice && (
          <span className="product-badge sale">Sale</span>
        )}
        {product.badges && product.badges.includes('New') && (
          <span className="product-badge new">New</span>
        )}
        {isLowStock && !isOutOfStock && !product.originalPrice && (
          <span className="product-badge low-stock">Low Stock</span>
        )}
        {isOutOfStock && (
          <span className="product-badge low-stock" style={{ backgroundColor: '#ccc', color: '#333' }}>Sold Out</span>
        )}

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistClick}
          className="product-card-wishlist-btn"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={isWishlisted ? "var(--accent-gold)" : "none"} stroke={isWishlisted ? "var(--accent-gold)" : "currentColor"} />
        </button>

        {/* Image Swap */}
        <img 
          src={product.images[0]} 
          alt={`${product.name} Front`} 
          className="product-image"
          loading="lazy"
        />
        {product.images[1] && (
          <img 
            src={product.images[1]} 
            alt={`${product.name} Back`} 
            className="product-image product-image-back" 
            loading="lazy"
          />
        )}

        {/* Quick Add Overlay */}
        {!isOutOfStock && (
          <div className="quick-add-overlay">
            <span className="caption-text" style={{ display: 'block', textAlign: 'center', fontSize: '10px' }}>Quick Add</span>
            <div className="quick-add-sizes">
              {product.sizes.map((size) => {
                const outOfStock = product.stock[size] === 0;
                return (
                  <button
                    key={size}
                    onClick={(e) => handleSizeClick(e, size)}
                    className={`size-pill-mini ${outOfStock ? 'disabled' : ''}`}
                    disabled={outOfStock}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="product-info">
        <span className="product-brand">AURA Studio</span>
        <h3 className="product-name" title={product.name}>{product.name}</h3>
        <div className="product-price-row">
          <span className="price-current">${product.price}</span>
          {product.originalPrice && (
            <span className="price-original">${product.originalPrice}</span>
          )}
        </div>

        {/* Color Dots */}
        <div className="product-colors" onClick={(e) => e.stopPropagation()}>
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={`color-dot ${selectedColor.name === color.name ? 'active' : ''}`}
              style={{ backgroundColor: color.code }}
              title={color.name}
              aria-label={`Select color ${color.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
