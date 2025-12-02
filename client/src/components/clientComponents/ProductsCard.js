import React, { useState, useMemo, useEffect } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/productsCard.css';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';

export default function ProductsCard({ setPage }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWorkerType, setSelectedWorkerType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('card');
  const itemsPerPage = 12;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get('/products');
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const workerTypes = ['all', ...new Set(products.map(p => p.workerType))];

  const getColorClass = (color) => {
    return 'color-' + color.toLowerCase().replace(/[\/\s]/g, '-');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesWorkerType = selectedWorkerType === 'all' || product.workerType === selectedWorkerType;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesWorkerType && matchesSearch;
    });
  }, [selectedCategory, selectedWorkerType, searchQuery, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedWorkerType, searchQuery]);

  return (
    <div id="products-top" className="shieldify-products-page">
      <div className="shieldify-hero">
        <div className="shieldify-hero-content">
        </div>
      </div>

      <div className="shieldify-container">
        <aside className="shieldify-sidebar">
          <calcite-panel heading="Filter Products">
            <calcite-block heading="Search" open>
              <calcite-input
                type="text"
                placeholder="Search products..."
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

            <calcite-block heading="Worker Type" collapsible open>
              <calcite-label layout="inline-space-between">
                <calcite-select
                  label="Select Worker Type"
                  value={selectedWorkerType}
                  onCalciteSelectChange={(e) => setSelectedWorkerType(e.target.value)}
                >
                  {workerTypes.map(type => (
                    <calcite-option key={type} value={type}>
                      {type === 'all' ? 'All Workers' : type}
                    </calcite-option>
                  ))}
                </calcite-select>
              </calcite-label>
            </calcite-block>

            <calcite-block heading="Active Filters" open>
              <div style={{ padding: '0.5rem 0', fontSize: '0.875rem', color: '#4a4a4a' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>{filteredProducts.length}</strong> products found
                </p>
                {(selectedCategory !== 'all' || selectedWorkerType !== 'all' || searchQuery) && (
                  <p style={{ fontSize: '0.8125rem', color: '#6a6a6a' }}>
                    {selectedCategory !== 'all' && <span>Category: {selectedCategory}<br /></span>}
                    {selectedWorkerType !== 'all' && <span>Worker: {selectedWorkerType}<br /></span>}
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
                  setSelectedWorkerType('all');
                  setSearchQuery('');
                }}
                icon-start="refresh"
              >
                Reset Filters
              </calcite-button>
            </div>

            <calcite-block heading="Need Help?" open>
              <div style={{ padding: '0.5rem 0' }}>
                <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem', color: '#4a4a4a' }}>
                  Our safety experts are ready to assist you
                </p>
                <calcite-button
                  width="full"
                  appearance="solid"
                  onClick={() => setPage && setPage('contact')}
                  icon-start="phone"
                >
                  Contact Us
                </calcite-button>
              </div>
            </calcite-block>
          </calcite-panel>
        </aside>

        <div className="shieldify-main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div className="shieldify-header">
              <h2>{selectedCategory === 'all' ? 'All Products' : selectedCategory}</h2>
              <calcite-chip>{filteredProducts.length} products</calcite-chip>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <calcite-action
                text="Card View"
                icon="apps"
                active={viewMode === 'card'}
                onClick={() => setViewMode('card')}
              ></calcite-action>
              <calcite-action
                text="Table View"
                icon="list"
                active={viewMode === 'table'}
                onClick={() => setViewMode('table')}
              ></calcite-action>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                Loading products...
              </p>
            </div>
          ) : error ? (
            <calcite-notice open icon="exclamation-mark-triangle" kind="danger">
              <div slot="title">Error</div>
              <div slot="message">{error}</div>
            </calcite-notice>
          ) : currentProducts.length > 0 ? (
            <>
              {/* Card View */}
              {viewMode === 'card' && (
                <div className="shieldify-card-group">
                  {currentProducts.map(product => (
                    <calcite-card 
                      key={product._id}
                      onClick={() => navigate(`/product/${product._id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img 
                        slot="thumbnail" 
                        src={product.image} 
                        alt={product.name}
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                      
                      <calcite-chip slot="header-start" scale="s" appearance="solid">
                        {product.workerType}
                      </calcite-chip>

                      <span slot="heading">{product.name}</span>
                      <span slot="description">{product.category}</span>

                      <div className="product-features">
                        <div className="color-indicator-chip">
                          <span className={`color-circle ${getColorClass(product.color)}`}></span>
                          <span>{product.color}</span>
                        </div>
                      </div>

                      <div slot="footer-start" style={{ fontWeight: '600', fontSize: '1.125rem', color: '#ff6b00' }}>
                        LKR {product.price.toLocaleString()}
                      </div>

                      <calcite-button 
                        slot="footer-end" 
                        appearance="outline" 
                        icon-end="arrow-right" 
                        scale="s"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product._id}`);
                        }}
                      >
                        View
                      </calcite-button>
                    </calcite-card>
                  ))}
                </div>
              )}

              {/* Table View */}
              {viewMode === 'table' && (
                <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <calcite-list style={{ borderRadius: '8px' }}>
                    {currentProducts.map((product, index) => (
                      <calcite-list-item
                        key={product._id}
                        label={product.name}
                        description={`${product.category} • ${product.workerType}`}
                        value={product._id}
                        style={{ 
                          cursor: 'pointer',
                          borderBottom: index !== currentProducts.length - 1 ? '1px solid #f1f5f9' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8fafc';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        <img 
                          slot="content-start"
                          src={product.image}
                          alt={product.name}
                          style={{ 
                            width: '70px', 
                            height: '70px', 
                            objectFit: 'cover',
                            borderRadius: '6px',
                            border: '2px solid #e2e8f0',
                            marginRight: '12px'
                          }}
                        />
                        
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                            marginBottom: '4px'
                          }}>
                            <calcite-chip scale="s" appearance="solid">
                              {product.stock > 0 ? '✓ In Stock' : '✗ Out'}
                            </calcite-chip>
                            <span style={{
                              fontSize: '12px',
                              color: '#6b7280',
                              fontWeight: '500'
                            }}>
                              Stock: {product.stock}
                            </span>
                            <span style={{
                              fontSize: '12px',
                              color: '#6b7280',
                              fontWeight: '500'
                            }}>
                              • Color: {product.color}
                            </span>
                          </div>
                        </div>

                        <div slot="content-end" style={{ 
                          display: 'flex', 
                          gap: '16px',
                          alignItems: 'center',
                          marginLeft: '16px'
                        }}>
                          <div style={{
                            textAlign: 'right',
                            minWidth: '140px'
                          }}>
                            <div style={{
                              fontSize: '12px',
                              color: '#9ca3af',
                              marginBottom: '4px'
                            }}>
                              Price
                            </div>
                            <div style={{ 
                              fontWeight: '700', 
                              fontSize: '18px',
                              color: '#ff6b00'
                            }}>
                              LKR {product.price.toLocaleString()}
                            </div>
                          </div>

                          <calcite-button 
                            appearance="outline"
                            icon-end="arrow-right"
                            scale="s"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/product/${product._id}`);
                            }}
                          >
                            View
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
                    total-items={filteredProducts.length}
                    page-size={itemsPerPage}
                    onCalcitePaginationChange={(e) => setCurrentPage(e.detail)}
                  />
                </div>
              )}
            </>
          ) : (
            <calcite-notice open icon="exclamation-mark-triangle">
              <div slot="title">No products found</div>
              <div slot="message">Try adjusting your filters or search terms</div>
            </calcite-notice>
          )}
        </div>
      </div>

      <div className="shieldify-cta">
        <img 
          src="assets/images/picture-logo.png"  
          alt="SHIELDIFY" 
          className="shieldify-cta-logo"
        />
        <h2>Can't Find What You're Looking For?</h2>
        <p>
          Our team can help you find the perfect safety equipment for your specific needs. 
          Contact us for custom solutions and bulk orders.
        </p>
        <div className="shieldify-cta-buttons">
          <calcite-button
            appearance="solid"
            scale="l"
            icon-end="phone"
            onClick={() => setPage && setPage('contact')}
          >
            Contact Sales
          </calcite-button>
          <calcite-button
            appearance="outline"
            scale="l"
            icon-end="download"
          >
            Download Catalog
          </calcite-button>
        </div>
      </div>
    </div>
  );
}