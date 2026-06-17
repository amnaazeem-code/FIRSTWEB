import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';

export default function Search({ products, onQuickAdd, onToggleWishlist, wishlist }) {
  // Read query from hash (e.g. #search?q=blazer)
  const getQuery = () => {
    const hash = window.location.hash;
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    const params = new URLSearchParams(queryString);
    return params.get('q') || '';
  };

  const [searchQuery, setSearchQuery] = useState(getQuery());
  const [typedQuery, setTypedQuery] = useState(getQuery());

  // Listen to hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const q = getQuery();
      setSearchQuery(q);
      setTypedQuery(q);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (typedQuery.trim()) {
      window.location.hash = `#search?q=${encodeURIComponent(typedQuery)}`;
    }
  };

  // Match search terms
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const terms = searchQuery.toLowerCase().split(' ').filter(Boolean);
    return products.filter(product => {
      const textToSearch = [
        product.name,
        product.category,
        product.subCategory || '',
        product.description,
        product.fabric || ''
      ].join(' ').toLowerCase();

      return terms.every(term => textToSearch.includes(term));
    });
  }, [products, searchQuery]);

  // Near miss suggestions
  const didYouMean = useMemo(() => {
    if (searchResults.length > 0) return null;
    const queryLower = searchQuery.toLowerCase();
    
    if (queryLower.includes('blaz') || queryLower.includes('suit') || queryLower.includes('coat')) {
      return 'Blazer';
    }
    if (queryLower.includes('dress') || queryLower.includes('slip') || queryLower.includes('silk')) {
      return 'Silk Slip Midi Dress';
    }
    if (queryLower.includes('boot') || queryLower.includes('shoe') || queryLower.includes('sneaker')) {
      return 'Sneakers';
    }
    if (queryLower.includes('jean') || queryLower.includes('pant') || queryLower.includes('trouser')) {
      return 'Trousers';
    }
    return null;
  }, [searchResults, searchQuery]);

  // Trending recommendations for zero results
  const trendingProducts = useMemo(() => {
    return products.filter(p => p.badges.includes('Bestseller')).slice(0, 4);
  }, [products]);

  const handleSuggestionClick = (term) => {
    window.location.hash = `#search?q=${encodeURIComponent(term)}`;
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '40px' }}>
      
      {/* Search Input Bar */}
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
        <h1 className="h2" style={{ fontFamily: 'var(--font-serif)', marginBottom: '24px' }}>Search Collection</h1>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', borderBottom: '2px solid var(--text-primary)', paddingBottom: '8px' }}>
          <input
            type="text"
            placeholder="Type search queries..."
            value={typedQuery}
            onChange={e => setTypedQuery(e.target.value)}
            style={{ flex: 1, fontSize: '18px', padding: '4px' }}
            aria-label="Search term input field"
          />
          <button type="submit" className="btn-primary" style={{ padding: '8px 24px', fontSize: '12px' }}>
            Search
          </button>
        </form>

        {/* Suggestion */}
        {didYouMean && (
          <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Did you mean:{' '}
            <button 
              onClick={() => handleSuggestionClick(didYouMean)}
              style={{ fontWeight: 600, textDecoration: 'underline', color: 'var(--accent-gold)' }}
            >
              {didYouMean}
            </button>
            ?
          </p>
        )}
      </div>

      {/* Results Header */}
      {searchQuery && (
        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '32px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Showing {searchResults.length} results for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Results grid or Empty state */}
      {searchResults.length > 0 ? (
        <div className="grid-cols-4">
          {searchResults.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickAdd={onQuickAdd}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        searchQuery && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <h3 className="h3" style={{ fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>No Results Found</h3>
            <p className="body-text" style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '48px' }}>
              We couldn't find matches for "{searchQuery}". Try searching for common items like "Linen", "Silk", "Blazer", or "Boots".
            </p>

            {/* Trending Items Grid */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '48px' }}>
              <h4 className="caption-text" style={{ marginBottom: '32px', color: 'var(--text-primary)', fontWeight: 600 }}>Trending Silhouettes</h4>
              <div className="grid-cols-4">
                {trendingProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickAdd={onQuickAdd}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      )}

      {/* Landing state when search query is empty */}
      {!searchQuery && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p className="body-text" style={{ color: 'var(--text-muted)' }}>Enter a search term above to explore the AURA archive.</p>
        </div>
      )}

    </div>
  );
}
