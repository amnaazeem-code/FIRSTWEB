import React, { useState, useEffect, useRef } from 'react';
import { Heart, ShoppingBag, Plus, Minus, ChevronRight, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function PDP({ productId, products, onAddToCart, onToggleWishlist, wishlist, onOpenSizeGuide }) {
  // Find product by ID
  const product = products.find(p => p.id === productId) || products[0];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState('description');
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  
  // Review form states
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [localReviews, setLocalReviews] = useState(product.reviews);

  // Zoom reference
  const zoomRef = useRef(null);
  const [zoomStyle, setZoomStyle] = useState({ transform: 'scale(1)', transformOrigin: 'center' });

  // Reset page parameters on product change
  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedSize('');
    setQuantity(1);
    setActiveImageIndex(0);
    setLocalReviews(product.reviews);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId, product]);

  // Monitor scroll for mobile sticky bar
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past buy button (roughly 550px)
      if (window.scrollY > 550 && window.innerWidth <= 768) {
        setStickyBarVisible(true);
      } else {
        setStickyBarVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageZoom = (e) => {
    if (!zoomRef.current) return;
    const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: 'scale(1.8)',
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleZoomLeave = () => {
    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center' });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    onAddToCart({
      product,
      color: selectedColor.name,
      size: selectedSize,
      quantity
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewName.trim() && reviewContent.trim()) {
      const newReview = {
        id: localReviews.length + 1,
        author: reviewName,
        rating: Number(reviewRating),
        date: new Date().toISOString().split('T')[0],
        title: reviewTitle || "Verified Selection",
        content: reviewContent
      };
      setLocalReviews([newReview, ...localReviews]);
      setReviewName('');
      setReviewTitle('');
      setReviewContent('');
      alert("Thank you. Your review has been added.");
    }
  };

  const isLowStock = selectedSize && product.stock[selectedSize] > 0 && product.stock[selectedSize] <= 3;
  const isSizeOutOfStock = (size) => product.stock[size] === 0;

  // Recommendations: products from same category or subCategory
  const recommendations = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  // Complete the Look items (e.g. Shoes + Bags + Accessories)
  const completeLookItems = products
    .filter(p => p.category === 'Accessories' && p.id !== product.id)
    .slice(0, 3);

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '40px' }}>
      
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="#home">Home</a>
        <ChevronRight size={10} />
        <a href={`#shop?category=${product.category}`}>{product.category}</a>
        <ChevronRight size={10} />
        <a href={`#shop?category=${product.category}&sub=${product.subCategory}`}>{product.subCategory}</a>
        <ChevronRight size={10} />
        <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
      </nav>

      {/* Main PDP Content */}
      <div 
        style={{
          display: 'flex',
          gap: '64px',
          marginBottom: '80px',
          alignItems: 'flex-start'
        }}
        className="pdp-main-layout"
      >
        
        {/* Left Column: Image Gallery */}
        <div 
          style={{
            flex: '1.2',
            display: 'flex',
            gap: '24px'
          }}
          className="pdp-gallery-container"
        >
          {/* Vertical Thumbnails (Desktop) */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              width: '80px',
              flexShrink: 0
            }}
            className="pdp-thumbnails"
          >
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  border: activeImageIndex === idx ? '1px solid var(--text-primary)' : '1px solid var(--border-color)',
                  padding: 0,
                  width: '80px',
                  height: '106px',
                  background: '#F0ECE6',
                  overflow: 'hidden'
                }}
                aria-label={`View product image ${idx + 1}`}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>

          {/* Large Main Zoomable Image */}
          <div 
            ref={zoomRef}
            onMouseMove={handleImageZoom}
            onMouseLeave={handleZoomLeave}
            className="zoom-container"
            style={{
              flex: 1,
              aspectRatio: '3/4',
              backgroundColor: '#FAF8F5',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.name} 
              className="zoom-image"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                ...zoomStyle
              }} 
            />
          </div>
        </div>

        {/* Right Column: Purchasing Controls */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }} className="pdp-options-container">
          
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '24px', marginBottom: '24px' }}>
            <span className="caption-text">AURA Studio</span>
            <h1 className="h1" style={{ fontFamily: 'var(--font-serif)', marginTop: '4px', fontSize: '38px', fontWeight: 400 }}>
              {product.name}
            </h1>
            <div className="product-price-row" style={{ marginTop: '16px', fontSize: '22px' }}>
              <span style={{ fontWeight: '600' }}>${product.price}</span>
              {product.originalPrice && (
                <span className="price-original" style={{ fontSize: '18px' }}>${product.originalPrice}</span>
              )}
            </div>
          </div>

          {/* Color swatches */}
          <div style={{ marginBottom: '24px' }}>
            <span className="caption-text" style={{ fontSize: '11px', marginBottom: '8px', display: 'block' }}>
              Color: <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedColor.name}</span>
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`color-dot ${selectedColor.name === color.name ? 'active' : ''}`}
                  style={{ backgroundColor: color.code, width: '22px', height: '22px' }}
                  aria-label={`Select color ${color.name}`}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="caption-text" style={{ fontSize: '11px' }}>
                Size: <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedSize || 'Select Sizing'}</span>
              </span>
              <button 
                onClick={onOpenSizeGuide}
                style={{ fontSize: '12px', textDecoration: 'underline', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                Size Guide
              </button>
            </div>
            
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
                      padding: '12px 20px',
                      fontSize: '13px',
                      fontWeight: 500,
                      minWidth: '55px',
                      textAlign: 'center',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      opacity: disabled ? 0.35 : 1,
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

          {/* Low Stock Warning */}
          {isLowStock && (
            <div 
              className="animate-fade-in"
              style={{
                backgroundColor: '#FFF2F2',
                color: '#8A1F1F',
                borderLeft: '2px solid #8A1F1F',
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: 500,
                marginBottom: '24px'
              }}
            >
              This silhouette is selling fast — only {product.stock[selectedSize]} left in size {selectedSize}.
            </div>
          )}

          {/* Quantity selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <span className="caption-text" style={{ fontSize: '11px' }}>Quantity</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-white)' }}>
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ padding: '8px 16px' }}
                aria-label="Decrease quantity"
              >
                <Minus size={12} />
              </button>
              <span style={{ fontSize: '14px', width: '32px', textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                style={{ padding: '8px 16px' }}
                aria-label="Increase quantity"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
            <button 
              className="btn-primary" 
              onClick={handleAddToCart}
              style={{ flex: 1, padding: '18px', display: 'flex', gap: '8px', justifyContent: 'center' }}
            >
              <ShoppingBag size={16} />
              Add to Bag
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onToggleWishlist(product.id)}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              style={{ padding: '18px' }}
            >
              <Heart size={16} fill={isWishlisted ? "var(--accent-gold)" : "none"} stroke={isWishlisted ? "var(--accent-gold)" : "currentColor"} />
            </button>
          </div>

          {/* Accordion Block */}
          <div className="accordion">
            
            {/* 1. Description */}
            <div className={`accordion-item ${activeAccordion === 'description' ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 'description' ? '' : 'description')}>
                <span>Description & Fit</span>
                <span>{activeAccordion === 'description' ? '−' : '+'}</span>
              </button>
              <div className="accordion-content">
                <p style={{ marginBottom: '12px' }}>{product.description}</p>
                <ul style={{ paddingLeft: '20px' }}>
                  {product.details.map((detail, idx) => <li key={idx} style={{ marginBottom: '4px' }}>{detail}</li>)}
                </ul>
              </div>
            </div>

            {/* 2. Fabric & Care */}
            <div className={`accordion-item ${activeAccordion === 'fabric' ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? '' : 'fabric')}>
                <span>Fabric & Care</span>
                <span>{activeAccordion === 'fabric' ? '−' : '+'}</span>
              </button>
              <div className="accordion-content">
                <p>{product.fabric}</p>
              </div>
            </div>

            {/* 3. Shipping & Returns */}
            <div className={`accordion-item ${activeAccordion === 'shipping' ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}>
                <span>Shipping & Free Returns</span>
                <span>{activeAccordion === 'shipping' ? '−' : '+'}</span>
              </button>
              <div className="accordion-content">
                <p>{product.shipping}</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Complete the Look Carousel */}
      <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '64px', marginBottom: '80px' }}>
        <h3 className="h3" style={{ fontFamily: 'var(--font-serif)', marginBottom: '32px', textAlign: 'center' }}>Complete the Look</h3>
        <div className="grid-cols-3">
          {completeLookItems.map(item => (
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

      {/* You May Also Like */}
      <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '64px', marginBottom: '80px' }}>
        <h3 className="h3" style={{ fontFamily: 'var(--font-serif)', marginBottom: '32px', textAlign: 'center' }}>You May Also Like</h3>
        <div className="grid-cols-4">
          {recommendations.map(item => (
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

      {/* Customer Reviews Section */}
      <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '64px', marginBottom: '64px' }} id="reviews">
        <h3 className="h3" style={{ fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>Customer Reviews</h3>

        <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }} className="reviews-layout">
          
          {/* Reviews Summary Stats */}
          <div style={{ width: '250px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold' }}>{product.rating}</span>
              <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ 5.0</span>
            </div>
            <div style={{ display: 'flex', gap: '4px', margin: '8px 0', color: 'var(--accent-gold)' }}>
              {[1,2,3,4,5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Based on {localReviews.length} reviews</span>
          </div>

          {/* Individual Reviews Cards & Form */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Write a Review Toggle */}
            <div style={{ border: '1px solid var(--border-color)', padding: '24px', backgroundColor: 'var(--bg-white)' }}>
              <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', fontWeight: 600 }}>Write a Review</h4>
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px' }} className="review-form-row">
                  <div style={{ flex: 1 }}>
                    <label className="form-label" style={{ fontSize: '10px' }}>Your Name</label>
                    <input type="text" required value={reviewName} onChange={e => setReviewName(e.target.value)} className="form-input" style={{ padding: '8px' }} />
                  </div>
                  <div style={{ width: '150px' }}>
                    <label className="form-label" style={{ fontSize: '10px' }}>Rating</label>
                    <select value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))} className="form-input" style={{ padding: '8px', appearance: 'auto' }} aria-label="Review rating selection">
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '10px' }}>Review Title</label>
                  <input type="text" required placeholder="e.g. Beautiful fabric drapery" value={reviewTitle} onChange={e => setReviewTitle(e.target.value)} className="form-input" style={{ padding: '8px' }} />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '10px' }}>Comments</label>
                  <textarea required rows={4} value={reviewContent} onChange={e => setReviewContent(e.target.value)} className="form-input" style={{ padding: '8px', resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 24px', fontSize: '11px' }}>
                  Submit Review
                </button>
              </form>
            </div>

            {/* List of Reviews */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {localReviews.map((rev) => (
                <div key={rev.id} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '15px', fontWeight: 600 }}>{rev.title}</h5>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{rev.date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '2px', color: 'var(--accent-gold)', marginBottom: '8px' }}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{rev.content}</p>
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 500 }}>
                    — By {rev.author} (Verified Buyer)
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Mobile Sticky Add to Bag Bar */}
      {stickyBarVisible && (
        <div className="sticky-pdp-bar animate-fade-in">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
              {product.name}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-gold)' }}>${product.price}</span>
          </div>
          <button 
            className="btn-primary btn-gold" 
            onClick={handleAddToCart}
            style={{ padding: '8px 16px', fontSize: '11px', color: '#FFF' }}
          >
            {selectedSize ? `Add Size ${selectedSize}` : 'Select Size'}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .pdp-main-layout { flex-direction: column !important; gap: 32px !important; }
          .pdp-gallery-container { flex-direction: column-reverse !important; width: 100% !important; gap: 16px !important; }
          .pdp-thumbnails { display: flex !important; flexDirection: row !important; width: 100% !important; height: auto !important; overflow-x: auto !important; }
          .pdp-thumbnails button { width: 60px !important; height: 80px !important; }
          .reviews-layout { flex-direction: column !important; gap: 32px !important; }
          .review-form-row { flex-direction: column !important; gap: 16px !important; }
          .review-form-row div { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
