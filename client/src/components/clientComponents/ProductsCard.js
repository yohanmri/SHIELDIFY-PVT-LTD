import React, { useState, useMemo } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/productsCard.css';

export default function ProductsCard({ setPage }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWorkerType, setSelectedWorkerType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 4 columns x 3 rows

  // Product database with worker types and colors
  const products = [
    // Safety Helmets
    { 
      id: 1, 
      name: 'Engineer Safety Helmet', 
      category: 'Safety Helmets', 
      workerType: 'Engineer',
      color: 'White',
      price: 'LKR 2,500',
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400&q=80',
      features: ['ABS Material', 'Adjustable', 'Ventilated']
    },
    { 
      id: 2, 
      name: 'Construction Safety Helmet', 
      category: 'Safety Helmets', 
      workerType: 'Construction Worker',
      color: 'Yellow',
      price: 'LKR 2,200',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
      features: ['High Impact', 'Sweatband', 'Lightweight']
    },
    { 
      id: 3, 
      name: 'Electrical Safety Helmet', 
      category: 'Safety Helmets', 
      workerType: 'Electrician',
      color: 'Blue',
      price: 'LKR 2,800',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80',
      features: ['Dielectric', 'Chin Strap', 'Class E Rated']
    },
    { 
      id: 4, 
      name: 'Supervisor Safety Helmet', 
      category: 'Safety Helmets', 
      workerType: 'Supervisor',
      color: 'Red',
      price: 'LKR 2,600',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80',
      features: ['High Visibility', 'UV Resistant', 'Reflective']
    },
    { 
      id: 5, 
      name: 'Visitor Safety Helmet', 
      category: 'Safety Helmets', 
      workerType: 'Visitor',
      color: 'Green',
      price: 'LKR 1,800',
      image: 'https://images.unsplash.com/photo-1590845947670-c009801ffa74?w=400&q=80',
      features: ['Lightweight', 'One Size', 'Basic Protection']
    },

    // Gum Boots
    { 
      id: 6, 
      name: 'Industrial Gum Boots', 
      category: 'Gum Boots', 
      workerType: 'Construction Worker',
      color: 'Black',
      price: 'LKR 3,500',
      image: 'https://images.unsplash.com/photo-1608613304810-2d4dd52511a2?w=400&q=80',
      features: ['Steel Toe', 'Waterproof', 'Anti-Slip']
    },
    { 
      id: 7, 
      name: 'Chemical Resistant Boots', 
      category: 'Gum Boots', 
      workerType: 'Factory Worker',
      color: 'Yellow',
      price: 'LKR 4,200',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
      features: ['Chemical Proof', 'Steel Toe', 'High Cut']
    },

    // Safety Hand Gloves
    { 
      id: 8, 
      name: 'Leather Work Gloves', 
      category: 'Safety Hand Gloves', 
      workerType: 'Construction Worker',
      color: 'Brown',
      price: 'LKR 800',
      image: 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?w=400&q=80',
      features: ['Genuine Leather', 'Reinforced', 'Breathable']
    },
    { 
      id: 9, 
      name: 'Cut Resistant Gloves', 
      category: 'Safety Hand Gloves', 
      workerType: 'Factory Worker',
      color: 'Gray',
      price: 'LKR 1,200',
      image: 'https://images.unsplash.com/photo-1603010715383-256d5a44f9e8?w=400&q=80',
      features: ['Level 5 Cut', 'Flexible', 'Grip Enhanced']
    },
    { 
      id: 10, 
      name: 'Electrical Insulated Gloves', 
      category: 'Safety Hand Gloves', 
      workerType: 'Electrician',
      color: 'Orange',
      price: 'LKR 2,500',
      image: 'https://images.unsplash.com/photo-1585157670026-1cbc7f6da8d3?w=400&q=80',
      features: ['Voltage Tested', 'Latex Free', 'Insulated']
    },

    // Safety Jackets
    { 
      id: 11, 
      name: 'Hi-Vis Vest - Engineer', 
      category: 'Safety Jacket', 
      workerType: 'Engineer',
      color: 'White',
      price: 'LKR 1,500',
      image: 'https://images.unsplash.com/photo-1507090960745-b32f65d3113a?w=400&q=80',
      features: ['Reflective Strips', 'Breathable', 'Multi-Pocket']
    },
    { 
      id: 12, 
      name: 'Hi-Vis Vest - Construction', 
      category: 'Safety Jacket', 
      workerType: 'Construction Worker',
      color: 'Yellow',
      price: 'LKR 1,400',
      image: 'https://images.unsplash.com/photo-1597045566677-8cf032d6c3c5?w=400&q=80',
      features: ['Class 2 ANSI', '360° Visibility', 'Mesh']
    },
    { 
      id: 13, 
      name: 'Hi-Vis Vest - Supervisor', 
      category: 'Safety Jacket', 
      workerType: 'Supervisor',
      color: 'Red',
      price: 'LKR 1,600',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
      features: ['Premium Quality', 'Extra Reflective', 'Badge Holder']
    },

    // Safety Goggles
    { 
      id: 14, 
      name: 'Clear Safety Goggles', 
      category: 'Safety Goggles', 
      workerType: 'Factory Worker',
      color: 'Clear',
      price: 'LKR 600',
      image: 'https://images.unsplash.com/photo-1574594143321-fd5ec44c0b18?w=400&q=80',
      features: ['Anti-Fog', 'UV Protection', 'Impact Resistant']
    },
    { 
      id: 15, 
      name: 'Welding Safety Goggles', 
      category: 'Safety Goggles', 
      workerType: 'Welder',
      color: 'Green',
      price: 'LKR 1,200',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
      features: ['Shade 5', 'Heat Resistant', 'Side Protection']
    },

    // Ear Muff
    { 
      id: 16, 
      name: 'Noise Reduction Ear Muffs', 
      category: 'Ear Muff', 
      workerType: 'Factory Worker',
      color: 'Yellow',
      price: 'LKR 1,800',
      image: 'https://images.unsplash.com/photo-1606318313732-f6d4b8a52fe0?w=400&q=80',
      features: ['30dB Reduction', 'Adjustable', 'Padded']
    },

    // First Aid Box
    { 
      id: 17, 
      name: 'Portable First Aid Kit', 
      category: 'First Aid Boxes', 
      workerType: 'All Workers',
      color: 'Red',
      price: 'LKR 3,500',
      image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&q=80',
      features: ['50-Piece Kit', 'Compact', 'Wall Mountable']
    },

    // Eye Protection
    { 
      id: 18, 
      name: 'Safety Spectacles', 
      category: 'Eye Protection', 
      workerType: 'Engineer',
      color: 'Clear',
      price: 'LKR 800',
      image: 'https://images.unsplash.com/photo-1574594143321-fd5ec44c0b18?w=400&q=80',
      features: ['Scratch Resistant', 'Lightweight', 'Side Shields']
    },

    // Dust Mask
    { 
      id: 19, 
      name: 'N95 Respirator Mask', 
      category: 'Dust Mask', 
      workerType: 'Factory Worker',
      color: 'White',
      price: 'LKR 350',
      image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&q=80',
      features: ['95% Filtration', 'Comfortable', 'Adjustable']
    },

    // Welders Hand Gloves
    { 
      id: 20, 
      name: 'Welding Gloves - Heavy Duty', 
      category: 'Welders Hand Gloves', 
      workerType: 'Welder',
      color: 'Brown',
      price: 'LKR 1,500',
      image: 'https://images.unsplash.com/photo-1606814893907-c2e42943c91f?w=400&q=80',
      features: ['Heat Resistant', 'Reinforced', 'Long Cuff']
    },

    // Safety Belt
    { 
      id: 21, 
      name: 'Full Body Safety Harness', 
      category: 'Safty Belt', 
      workerType: 'Construction Worker',
      color: 'Yellow',
      price: 'LKR 8,500',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
      features: ['5-Point', 'Adjustable', 'Shock Absorber']
    },

    // Protection Pants
    { 
      id: 22, 
      name: 'Reflective Safety Vest', 
      category: 'Protection pants', 
      workerType: 'All Workers',
      color: 'Orange',
      price: 'LKR 1,200',
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400&q=80',
      features: ['High Visibility', 'Breathable', 'ANSI Compliant']
    },

    // CPR Mask
    { 
      id: 23, 
      name: 'CPR Pocket Mask', 
      category: 'CPR Mask', 
      workerType: 'Safety Officer',
      color: 'Blue',
      price: 'LKR 2,200',
      image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&q=80',
      features: ['One-Way Valve', 'Carrying Case', 'Hygienic']
    },

    // Face Shield
    { 
      id: 24, 
      name: 'Full Face Shield', 
      category: 'Face shield', 
      workerType: 'Factory Worker',
      color: 'Clear',
      price: 'LKR 900',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80',
      features: ['Anti-Fog', 'Splash Protection', 'Adjustable']
    },

    // Safety Sign Boards
    { 
      id: 25, 
      name: 'Warning Sign Board Set', 
      category: 'Safty sing bords', 
      workerType: 'All Workers',
      color: 'Multi',
      price: 'LKR 5,500',
      image: 'https://images.unsplash.com/photo-1588094367259-d32fa7dd33d0?w=400&q=80',
      features: ['Weather Proof', 'Reflective', '10-Piece Set']
    }
  ];

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
  }, [selectedCategory, selectedWorkerType, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedWorkerType, searchQuery]);

  return (
    <div className="shieldify-products-page">
      {/* Hero Section */}
      <div className="shieldify-hero">
        <div className="shieldify-hero-content">
          <img 
            src="assets/images/picture-logo.png" 
            alt="SHIELDIFY Logo" 
            className="shieldify-hero-logo"
          />
          <h1>Safety Products Catalog</h1>
          <p>Your trusted partner for workplace safety equipment in Sri Lanka</p>
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

            {/* Worker Type Filter */}
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

          {/* Products */}
          {currentProducts.length > 0 ? (
            <>
              <div className="shieldify-card-group">
                {currentProducts.map(product => (
                  <calcite-card key={product.id}>
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
                      
                      {/* Feature Tags - Show first 2 */}
                      {/* {product.features.slice(0, 2).map((feature, idx) => (
                        <calcite-chip key={idx} scale="s" appearance="outline">
                          {feature}
                        </calcite-chip>
                      ))} */}
                    </div>

                    <div slot="footer-start" style={{ fontWeight: '600', fontSize: '1.125rem', color: '#ff6b00' }}>
                      {product.price}
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