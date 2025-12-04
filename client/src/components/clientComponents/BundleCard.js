import React, { useState, useMemo, useEffect } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/productsCard.css';
import { getPublicBundles } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';

export default function BundleCard({ setPage }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('discount'); // discount, price-low, price-high
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('card');
  const [quantities, setQuantities] = useState({}); // Track quantity for each bundle
  const itemsPerPage = 12;
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBundles();
  }, []);

  const fetchBundles = async () => {
    try {
      setLoading(true);
      const response = await getPublicBundles();
      // Only show active bundles
      const activeBundles = response.data.data.filter(bundle => bundle.isActive);
      setBundles(activeBundles);
      setError(null);
    } catch (err) {
      console.error('Error fetching bundles:', err);
      setError('Failed to load bundles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(bundles.map(b => b.category))];

  const calculateDiscount = (original, discount) => {
    if (!original || !discount) return 0;
    return Math.round(((original - discount) / original) * 100);
  };

  const calculateSavings = (original, discount) => {
    return (original || 0) - (discount || 0);
  };

  const filteredBundles = useMemo(() => {
    let filtered = bundles.filter(bundle => {
      const matchesCategory = selectedCategory === 'all' || bundle.category === selectedCategory;

      // Enhanced search - matches name, category, description
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        bundle.name.toLowerCase().includes(searchLower) ||
        bundle.category.toLowerCase().includes(searchLower) ||
        (bundle.description && bundle.description.toLowerCase().includes(searchLower));

      return matchesCategory && matchesSearch;
    });

    // Sort bundles
    if (sortBy === 'discount') {
      filtered.sort((a, b) =>
        calculateDiscount(b.originalPrice, b.discountPrice) -
        calculateDiscount(a.originalPrice, a.discountPrice)
      );
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.discountPrice - a.discountPrice);
    }

    return filtered;
  }, [selectedCategory, sortBy, searchQuery, bundles]);

  const totalPages = Math.ceil(filteredBundles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBundles = filteredBundles.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, searchQuery]);

  const getQuantity = (bundleId) => quantities[bundleId] || 1;

  const updateQuantity = (bundleId, change) => {
    setQuantities(prev => ({
      ...prev,
      [bundleId]: Math.max(1, (prev[bundleId] || 1) + change)
    }));
  };

  const handleAddToCart = (bundle, e) => {
    e.stopPropagation();
    const quantity = getQuantity(bundle._id);
    addToCart({ ...bundle, itemType: 'bundle' }, quantity);
    // Reset quantity after adding
    setQuantities(prev => ({ ...prev, [bundle._id]: 1 }));
  };


  return (
    <div id="bundles-top" className="shieldify-products-page">
      <div className="shieldify-hero" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '200px'
      }}>
        <div className="shieldify-hero-content">
          <h1 style={{
            fontSize: '3rem',
            color: 'white',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            paddingTop: '3%',
            marginTop: '-0.1%',
          }}>
            🎁 Bundle Deals & Promotions
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'white',
            textAlign: 'center',
            opacity: 0.95
          }}>
            Save big with our specially curated safety equipment bundles
          </p>
        </div>
      </div>

      <div className="shieldify-container">
        <aside className="shieldify-sidebar">
          <calcite-panel heading="Filter Bundles">
            <calcite-block heading="Search" open>
              <calcite-input
                type="text"
                placeholder="Search bundles..."
                value={searchQuery}
                onCalciteInputInput={(e) => setSearchQuery(e.target.value)}
                icon="search"
                clearable
              />
            </calcite-block>

            <calcite-block heading="Category" collapsible open>
              <calcite-label layout="inline-space-between">
                <calcite-select
                  label="Select Category"
                  value={selectedCategory}
                  onCalciteSelectChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <calcite-option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </calcite-option>
                  ))}
                </calcite-select>
              </calcite-label>
            </calcite-block>

            <calcite-block heading="Sort By" collapsible open>
              <calcite-label layout="inline-space-between">
                <calcite-select
                  label="Sort Options"
                  value={sortBy}
                  onCalciteSelectChange={(e) => setSortBy(e.target.value)}
                >
                  <calcite-option value="discount">Highest Discount</calcite-option>
                  <calcite-option value="price-low">Price: Low to High</calcite-option>
                  <calcite-option value="price-high">Price: High to Low</calcite-option>
                </calcite-select>
              </calcite-label>
            </calcite-block>

            <calcite-block heading="Bundle Stats" open>
              <div style={{ padding: '0.5rem 0', fontSize: '0.875rem', color: '#4a4a4a' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>{filteredBundles.length}</strong> bundles available
                </p>
                {filteredBundles.length > 0 && (
                  <div style={{
                    padding: '12px',
                    background: 'linear-gradient(135deg, #667eea22 0%, #764ba222 100%)',
                    borderRadius: '8px',
                    marginTop: '8px'
                  }}>
                    <p style={{ fontSize: '0.75rem', color: '#6a6a6a', margin: '0 0 4px 0' }}>
                      Average Savings
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#667eea', margin: 0 }}>
                      {Math.round(
                        filteredBundles.reduce((sum, b) =>
                          sum + calculateDiscount(b.originalPrice, b.discountPrice), 0
                        ) / filteredBundles.length
                      )}% OFF
                    </p>
                  </div>
                )}
                {(selectedCategory !== 'all' || searchQuery) && (
                  <p style={{ fontSize: '0.8125rem', color: '#6a6a6a', marginTop: '8px' }}>
                    {selectedCategory !== 'all' && <span>Category: {selectedCategory}<br /></span>}
                    {searchQuery && <span>Search: "{searchQuery}"</span>}
                  </p>
                )}
              </div>
            </calcite-block>

            <div style={{ padding: '0.75rem' }}>
              <calcite-button
                width="full"
                appearance="outline"
                onClick={() => {
                  setSelectedCategory('all');
                  setSortBy('discount');
                  setSearchQuery('');
                }}
                icon-start="refresh"
              >
                Reset Filters
              </calcite-button>
            </div>

            <calcite-block heading="Need Custom Bundle?" open>
              <div style={{ padding: '0.5rem 0' }}>
                <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem', color: '#4a4a4a' }}>
                  Contact us for customized bulk orders
                </p>
                <calcite-button
                  width="full"
                  appearance="solid"
                  onClick={() => window.open('https://wa.me/94774716901', '_blank')}
                  icon-start="phone"
                >
                  Contact Us
                </calcite-button>
              </div>
            </calcite-block>
          </calcite-panel>
        </aside>

        <div className="shieldify-main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div className="shieldify-header">
              <h2>{selectedCategory === 'all' ? 'All Bundles' : selectedCategory}</h2>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <calcite-chip>{filteredBundles.length} bundles</calcite-chip>
                <calcite-chip kind="brand" icon="tag">
                  Special Offers
                </calcite-chip>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <calcite-action
                text="Card View"
                icon="apps"
                active={viewMode === 'card'}
                onClick={() => setViewMode('card')}
              ></calcite-action>
              <calcite-action
                text="List View"
                icon="list"
                active={viewMode === 'list'}
                onClick={() => setViewMode('list')}
              ></calcite-action>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                Loading bundles...
              </p>
            </div>
          ) : error ? (
            <calcite-notice open icon="exclamation-mark-triangle" kind="danger">
              <div slot="title">Error</div>
              <div slot="message">{error}</div>
            </calcite-notice>
          ) : currentBundles.length > 0 ? (
            <>
              {/* Card View */}
              {viewMode === 'card' && (
                <div className="shieldify-card-group">
                  {currentBundles.map(bundle => (
                    <calcite-card
                      key={bundle._id}
                      onClick={() => navigate(`/bundle/${bundle._id}`)}
                      style={{
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'visible'
                      }}
                    >
                      {/* Discount Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '10px',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontWeight: '700',
                        fontSize: '0.875rem',
                        boxShadow: '0 4px 12px rgba(245, 87, 108, 0.4)',
                        zIndex: 10
                      }}>
                        {calculateDiscount(bundle.originalPrice, bundle.discountPrice)}% OFF
                      </div>

                      <img
                        slot="thumbnail"
                        src={bundle.image}
                        alt={bundle.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />

                      <calcite-chip slot="header-start" scale="s" appearance="solid" kind="inverse">
                        {bundle.category}
                      </calcite-chip>

                      <span slot="heading">{bundle.name}</span>
                      <span slot="description">
                        <calcite-icon icon="collection" scale="s"></calcite-icon>
                        {bundle.quantity} items included
                      </span>

                      <div style={{ margin: '12px 0' }}>
                        {bundle.description && (
                          <p style={{
                            fontSize: '0.875rem',
                            color: 'var(--calcite-ui-text-2)',
                            margin: 0,
                            lineHeight: '1.4',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {bundle.description}
                          </p>
                        )}
                      </div>

                      {/* Price and View Deal Section */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginBottom: '12px'
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <div style={{
                            fontSize: '13px',
                            color: '#999',
                            textDecoration: 'line-through'
                          }}>
                            LKR {bundle.originalPrice.toLocaleString()}
                          </div>
                          <div style={{
                            fontWeight: '700',
                            fontSize: '1.25rem',
                            color: '#dc3545',
                            lineHeight: 1
                          }}>
                            LKR {bundle.discountPrice.toLocaleString()}
                          </div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#28a745',
                            fontWeight: '600'
                          }}>
                            Save LKR {calculateSavings(bundle.originalPrice, bundle.discountPrice).toLocaleString()}
                          </div>
                        </div>

                        <calcite-button
                          appearance="transparent"
                          kind="brand"
                          icon-end="arrow-right"
                          scale="s"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/bundle/${bundle._id}`);
                          }}
                        >
                          View Deal
                        </calcite-button>
                      </div>

                      {/* Cart Controls in Footer */}
                      <div slot="footer-start" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(bundle._id, -1);
                            }}
                            style={{
                              background: '#f5f5f5',
                              border: 'none',
                              padding: '4px 10px',
                              cursor: 'pointer',
                              fontSize: '16px',
                              fontWeight: 'bold'
                            }}
                          >
                            −
                          </button>
                          <span style={{
                            padding: '4px 12px',
                            minWidth: '40px',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}>
                            {getQuantity(bundle._id)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(bundle._id, 1);
                            }}
                            style={{
                              background: '#f5f5f5',
                              border: 'none',
                              padding: '4px 10px',
                              cursor: 'pointer',
                              fontSize: '16px',
                              fontWeight: 'bold'
                            }}
                          >
                            +
                          </button>
                        </div>

                        <calcite-button
                          appearance="solid"
                          scale="s"
                          icon-start="shopping-cart"
                          onClick={(e) => handleAddToCart(bundle, e)}
                          style={{ flex: 1 }}
                        >
                          Add
                        </calcite-button>
                      </div>
                    </calcite-card>
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <calcite-list style={{ borderRadius: '8px' }}>
                    {currentBundles.map((bundle, index) => (
                      <calcite-list-item
                        key={bundle._id}
                        label={bundle.name}
                        description={`${bundle.category} • ${bundle.quantity} items • ${calculateDiscount(bundle.originalPrice, bundle.discountPrice)}% OFF`}
                        value={bundle._id}
                        style={{
                          cursor: 'pointer',
                          borderBottom: index !== currentBundles.length - 1 ? '1px solid #f1f5f9' : 'none',
                          transition: 'all 0.2s ease',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8fafc';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={() => navigate(`/bundle/${bundle._id}`)}
                      >
                        <div
                          slot="content-start"
                          style={{ position: 'relative', marginRight: '12px' }}
                        >
                          <img
                            src={bundle.image}
                            alt={bundle.name}
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '2px solid #e2e8f0'
                            }}
                          />
                          <div style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            boxShadow: '0 2px 8px rgba(245, 87, 108, 0.4)'
                          }}>
                            {calculateDiscount(bundle.originalPrice, bundle.discountPrice)}%
                          </div>
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                            marginBottom: '4px'
                          }}>
                            <calcite-chip scale="s" appearance="solid" kind="brand">
                              {bundle.quantity} Items
                            </calcite-chip>
                            <calcite-chip scale="s" appearance="outline">
                              Active Deal
                            </calcite-chip>
                          </div>
                          {bundle.description && (
                            <p style={{
                              margin: '4px 0 0 0',
                              fontSize: '0.875rem',
                              color: '#6b7280',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {bundle.description}
                            </p>
                          )}
                        </div>

                        <div slot="content-end" style={{
                          display: 'flex',
                          gap: '16px',
                          alignItems: 'center',
                          marginLeft: '16px'
                        }}>
                          <div style={{
                            textAlign: 'right',
                            minWidth: '160px'
                          }}>
                            <div style={{
                              fontSize: '12px',
                              color: '#999',
                              textDecoration: 'line-through',
                              marginBottom: '2px'
                            }}>
                              LKR {bundle.originalPrice.toLocaleString()}
                            </div>
                            <div style={{
                              fontWeight: '700',
                              fontSize: '20px',
                              color: '#dc3545',
                              marginBottom: '2px'
                            }}>
                              LKR {bundle.discountPrice.toLocaleString()}
                            </div>
                            <div style={{
                              fontSize: '11px',
                              color: '#28a745',
                              fontWeight: '600'
                            }}>
                              Save LKR {calculateSavings(bundle.originalPrice, bundle.discountPrice).toLocaleString()}
                            </div>
                          </div>

                          <calcite-button
                            appearance="solid"
                            kind="brand"
                            icon-end="arrow-right"
                            scale="s"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/bundle/${bundle._id}`);
                            }}
                          >
                            View Deal
                          </calcite-button>
                        </div>
                      </calcite-list-item>
                    ))}
                  </calcite-list>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="shieldify-pagination">
                  <calcite-pagination
                    start-item={startIndex + 1}
                    total-items={filteredBundles.length}
                    page-size={itemsPerPage}
                    onCalcitePaginationChange={(e) => setCurrentPage(e.detail)}
                  />
                </div>
              )}
            </>
          ) : (
            <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
              <div slot="title">No bundles found</div>
              <div slot="message">Try adjusting your filters or search terms</div>
            </calcite-notice>
          )}
        </div>
      </div>

      <div className="shieldify-cta" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <img
          src="assets/images/picture-logo.png"
          alt="SHIELDIFY"
          className="shieldify-cta-logo"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <h2 style={{ color: 'white' }}>Need a Custom Bundle?</h2>
        <p style={{ color: 'rgba(255,255,255,0.9)' }}>
          We can create customized safety equipment packages tailored to your team's specific requirements.
          Get in touch for volume discounts and enterprise solutions.
        </p>
        <div className="shieldify-cta-buttons">
          <calcite-button
            appearance="solid"
            scale="l"
            icon-end="phone"
            onClick={() => window.open('https://wa.me/94774716901', '_blank')}
            style={{
              '--calcite-ui-brand': 'white',
              '--calcite-ui-text-1': '#667eea'
            }}
          >
            Request Custom Bundle
          </calcite-button>
          <calcite-button
            appearance="outline"
            scale="l"
            icon-end="download"
            style={{
              '--calcite-ui-border-1': 'white',
              '--calcite-ui-text-1': 'white'
            }}
          >
            Download Catalog
          </calcite-button>
        </div>
      </div>
    </div>
  );
}