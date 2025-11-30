import React, { useState, useMemo, useEffect } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/productsCard.css';
import API from '../../api/axios';

export default function ProductsCard({ setPage }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWorkerType, setSelectedWorkerType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 4 columns x 3 rows

  // API state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
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

  // Get unique categories and worker types
  const categories = ['all', ...new Set(products.map(p => p.category))];
  const workerTypes = ['all', ...new Set(products.map(p => p.workerType))];

  // Helper function to get color class
  const getColorClass = (color) => {
    return 'color-' + color.toLowerCase().replace(/[\/\s]/g, '-');
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesWorkerType = selectedWorkerType === 'all' || product.workerType === selectedWorkerType;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesWorkerType && matchesSearch;
    });
  }, [selectedCategory, selectedWorkerType, searchQuery, products]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedWorkerType, searchQuery]);

  return (
    <div className="shieldify-products-page">
      {/* Hero Section */}
      <div className="shieldify-hero">
        <div className="shieldify-hero-content">
          {/* <img 
            src="assets/images/picture-logo.png" 
            alt="SHIELDIFY Logo" 
            className="shieldify-hero-logo"
          /> */}
          {/* <h1>Safety Products Catalog</h1> */}
          {/* <p>Your trusted partner for workplace safety equipment in Sri Lanka</p> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="shieldify-container">
        {/* Sidebar Filters */}
        <aside className="shieldify-sidebar">
          <calcite-panel heading="Filter Products">
            {/* Search */}
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

            {/* Category Filter */}
            <calcite-block heading="Category" collapsible open>
              <calcite-label layout="inline-space-between">
                <calcite-select
                  label="Select Category"
                  value={selectedCategory}
onCalciteSelectChange={(e) => setSelectedCategory(e.target.selectedOption.value)}                >
                  {categories.map(category => (
                    <calcite-option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </calcite-option>
                  ))}
                </calcite-select>
              </calcite-label>
            </calcite-block>

            {/* Worker Type Filter */}
            <calcite-block heading="Worker Type" collapsible open>
              <calcite-label layout="inline-space-between">
                <calcite-select
                  label="Select Worker Type"
                  value={selectedWorkerType}
onCalciteSelectChange={(e) => setSelectedWorkerType(e.target.selectedOption.value)}                >
                  {workerTypes.map(type => (
                    <calcite-option key={type} value={type}>
                      {type === 'all' ? 'All Workers' : type}
                    </calcite-option>
                  ))}
                </calcite-select>
              </calcite-label>
            </calcite-block>

            {/* Filter Summary */}
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

            {/* Reset */}
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

            {/* Contact */}
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

        {/* Products Grid */}
        <div className="shieldify-main">
          <div className="shieldify-header">
            <h2>{selectedCategory === 'all' ? 'All Products' : selectedCategory}</h2>
            <calcite-chip>{filteredProducts.length} products</calcite-chip>
          </div>

          {/* Loading State */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                Loading products...
              </p>
            </div>
          ) : error ? (
            /* Error State */
            <calcite-notice open icon="exclamation-mark-triangle" kind="danger">
              <div slot="title">Error</div>
              <div slot="message">{error}</div>
            </calcite-notice>
          ) : currentProducts.length > 0 ? (
            /* Products Display */
            <>
              <div className="shieldify-card-group">
                {currentProducts.map(product => (
                  <calcite-card key={product._id}>
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
                      {/* Color Indicator */}
                      <div className="color-indicator-chip">
                        <span className={`color-circle ${getColorClass(product.color)}`}></span>
                        <span>{product.color}</span>
                      </div>
                    </div>

                    <div slot="footer-start" style={{ fontWeight: '600', fontSize: '1.125rem', color: '#ff6b00' }}>
                      LKR {product.price.toLocaleString()}
                    </div>

                    <calcite-button slot="footer-end" appearance="outline" icon-end="shopping-cart" scale="s">
                      Inquire
                    </calcite-button>
                  </calcite-card>
                ))}
              </div>

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
            /* No Results */
            <calcite-notice open icon="exclamation-mark-triangle">
              <div slot="title">No products found</div>
              <div slot="message">Try adjusting your filters or search terms</div>
            </calcite-notice>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
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