import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';

export default function PLP({ products, onQuickAdd, onToggleWishlist, wishlist }) {
  // Parse query parameters from URL Hash (e.g. #shop?category=Women&sub=Tops)
  const getParams = () => {
    const hash = window.location.hash;
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    const params = new URLSearchParams(queryString);
    return {
      category: params.get('category') || '',
      subCategory: params.get('sub') || '',
      badge: params.get('badge') || ''
    };
  };

  const [routeParams, setRouteParams] = useState(getParams());

  // Listen to hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setRouteParams(getParams());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Filter and Sorting States
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(400);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Newest');
  const [visibleCount, setVisibleCount] = useState(8);

  // Clear all filters when route changes (category changes)
  useEffect(() => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(400);
    setInStockOnly(false);
    setVisibleCount(8);
  }, [routeParams.category, routeParams.subCategory, routeParams.badge]);

  // Derived filter options based on available products
  const uniqueColors = useMemo(() => {
    const colorsMap = {};
    products.forEach(p => {
      p.colors.forEach(c => {
        colorsMap[c.name] = c.code;
      });
    });
    return Object.entries(colorsMap).map(([name, code]) => ({ name, code }));
  }, [products]);

  const uniqueSizes = useMemo(() => {
    const sizes = new Set();
    products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes).sort();
  }, [products]);

  // Toggle Filters handlers
  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (colorName) => {
    setSelectedColors(prev => 
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Category filter
      if (routeParams.category && product.category.toLowerCase() !== routeParams.category.toLowerCase()) {
        if (routeParams.category === 'Accessories' && product.category === 'Accessories') {
          // keep
        } else {
          return false;
        }
      }

      // 2. Subcategory filter
      if (routeParams.subCategory && product.subCategory?.toLowerCase() !== routeParams.subCategory.toLowerCase()) {
        return false;
      }

      // 3. Badge filter (e.g. Sale, New)
      if (routeParams.badge) {
        if (routeParams.badge === 'Sale') {
          if (!product.originalPrice) return false;
        } else if (routeParams.badge === 'New') {
          if (!product.badges.includes('New')) return false;
        } else if (routeParams.badge === 'Bestseller') {
          if (!product.badges.includes('Bestseller')) return false;
        }
      }

      // 4. Size filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = product.sizes.some(size => selectedSizes.includes(size));
        if (!hasMatchingSize) return false;
      }

      // 5. Color filter
      if (selectedColors.length > 0) {
        const hasMatchingColor = product.colors.some(color => selectedColors.includes(color.name));
        if (!hasMatchingColor) return false;
      }

      // 6. Price filter
      if (product.price > maxPrice) return false;

      // 7. In stock filter
      if (inStockOnly) {
        const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);
        if (totalStock === 0) return false;
      }

      return true;
    });
  }, [products, routeParams, selectedSizes, selectedColors, maxPrice, inStockOnly]);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];
    if (sortBy === 'Price: Low–High') {
      return items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High–Low') {
      return items.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Best Selling') {
      return items.sort((a, b) => (b.badges.includes('Bestseller') ? 1 : 0) - (a.badges.includes('Bestseller') ? 1 : 0));
    }
    // Default 'Newest' (uses product ID as proxy for release order)
    return items.sort((a, b) => b.id - a.id);
  }, [filteredProducts, sortBy]);

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(400);
    setInStockOnly(false);
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0 || maxPrice < 400 || inStockOnly;

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '40px' }}>
      
      {/* Page Header */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '24px', marginBottom: '32px' }}>
        <div className="breadcrumbs">
          <a href="#home">Home</a>
          <span>/</span>
          <a href="#shop">Shop</a>
          {routeParams.category && (
            <>
              <span>/</span>
              <span>{routeParams.category}</span>
            </>
          )}
          {routeParams.subCategory && (
            <>
              <span>/</span>
              <span style={{ color: 'var(--text-primary)' }}>{routeParams.subCategory}</span>
            </>
          )}
        </div>
        
        <h1 className="h1" style={{ textTransform: 'capitalize', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
          {routeParams.badge ? `${routeParams.badge} Items` : routeParams.subCategory || routeParams.category || 'All Collections'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
          Showing {sortedProducts.length} results of premium craftsmanship.
        </p>
      </div>

      {/* Filters & Grid Container */}
      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }} className="plp-main-layout">
        
        {/* Left Sidebar Filter (Desktop) */}
        <aside className="plp-sidebar" style={{ width: '250px', flexShrink: 0, position: 'sticky', top: '120px' }}>
          
          {/* Sizing Filter */}
          <div style={{ marginBottom: '32px', borderBottom: '1px solid var(--border-light)', paddingBottom: '24px' }}>
            <h4 className="caption-text" style={{ color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 600 }}>Size</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {uniqueSizes.map(size => {
                const isActive = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    style={{
                      border: isActive ? '1px solid var(--text-primary)' : '1px solid var(--border-color)',
                      backgroundColor: isActive ? 'var(--text-primary)' : 'transparent',
                      color: isActive ? 'var(--bg-primary)' : 'var(--text-primary)',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: 500,
                      minWidth: '40px',
                      textAlign: 'center'
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Swatch Filter */}
          <div style={{ marginBottom: '32px', borderBottom: '1px solid var(--border-light)', paddingBottom: '24px' }}>
            <h4 className="caption-text" style={{ color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 600 }}>Color</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {uniqueColors.map(color => {
                const isActive = selectedColors.includes(color.name);
                return (
                  <button
                    key={color.name}
                    onClick={() => handleColorToggle(color.name)}
                    className={`color-dot ${isActive ? 'active' : ''}`}
                    style={{
                      backgroundColor: color.code,
                      width: '20px',
                      height: '20px',
                      border: '1px solid rgba(0,0,0,0.1)'
                    }}
                    title={color.name}
                    aria-label={`Filter by color ${color.name}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div style={{ marginBottom: '32px', borderBottom: '1px solid var(--border-light)', paddingBottom: '24px' }}>
            <h4 className="caption-text" style={{ color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 600 }}>
              Max Price: ${maxPrice}
            </h4>
            <input 
              type="range" 
              min="40" 
              max="400" 
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--text-primary)',
                cursor: 'pointer'
              }}
              aria-label="Filter by price range"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
              <span>$40</span>
              <span>$400</span>
            </div>
          </div>

          {/* Stock Toggle */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <input 
                type="checkbox" 
                checked={inStockOnly} 
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={{ accentColor: 'var(--text-primary)', cursor: 'pointer' }}
              />
              In-Stock Only
            </label>
          </div>

        </aside>

        {/* Right Product Grid Column */}
        <div style={{ flex: 1 }}>
          
          {/* Top Sort & Summary Bar */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-light)',
              marginBottom: '24px',
              fontSize: '14px'
            }}
          >
            <span>{filteredProducts.length} items</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ fontWeight: 500, cursor: 'pointer', outline: 'none' }}
                aria-label="Sort products by"
              >
                <option value="Newest">Newest Drop</option>
                <option value="Price: Low–High">Price: Low to High</option>
                <option value="Price: High–Low">Price: High to Low</option>
                <option value="Best Selling">Best Sellers</option>
              </select>
            </div>
          </div>

          {/* Active Chips Row */}
          {hasActiveFilters && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
              {selectedSizes.map(size => (
                <span key={size} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', fontSize: '12px' }}>
                  Size: {size}
                  <button onClick={() => handleSizeToggle(size)} style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '4px' }}>×</button>
                </span>
              ))}
              {selectedColors.map(color => (
                <span key={color} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', fontSize: '12px' }}>
                  Color: {color}
                  <button onClick={() => handleColorToggle(color)} style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '4px' }}>×</button>
                </span>
              ))}
              {maxPrice < 400 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', fontSize: '12px' }}>
                  Max: ${maxPrice}
                  <button onClick={() => setMaxPrice(400)} style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '4px' }}>×</button>
                </span>
              )}
              {inStockOnly && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', fontSize: '12px' }}>
                  In Stock
                  <button onClick={() => setInStockOnly(false)} style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '4px' }}>×</button>
                </span>
              )}
              <button 
                onClick={clearAllFilters}
                style={{ fontSize: '12px', fontWeight: 600, textDecoration: 'underline', color: 'var(--text-primary)', marginLeft: '8px' }}
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {sortedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed var(--border-color)' }}>
              <h3 className="h3" style={{ fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>No Silhouettes Found</h3>
              <p className="body-text" style={{ fontSize: '14px', marginBottom: '24px', color: 'var(--text-muted)' }}>
                No items match your active filters. Try loosening your selection or clearing all.
              </p>
              <button onClick={clearAllFilters} className="btn-primary">
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid-cols-3">
                {sortedProducts.slice(0, visibleCount).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickAdd={onQuickAdd}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < sortedProducts.length && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 6)}
                    className="btn-secondary"
                    style={{ minWidth: '200px' }}
                  >
                    Load More Silhouettes
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .plp-main-layout { flex-direction: column !important; }
          .plp-sidebar { width: 100% !important; position: static !important; margin-bottom: 32px; }
          .grid-cols-3 { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
      `}</style>
    </div>
  );
}
