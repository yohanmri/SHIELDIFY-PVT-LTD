// ============================================
// FILE: AdminProductList.js 
// Path: src/pages/adminPages/AdminProductList.js
// ============================================
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-modal';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-input-text';
import '@esri/calcite-components/components/calcite-input-number';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-action';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';
import '@esri/calcite-components/components/calcite-loader';
import '../../styles/clientStyles/productsCard.css';


export default function AdminProductList() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [cropData, setCropData] = useState({ zoom: 1, x: 0, y: 0 });
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dropdown options
  const categories = [
    'Safety Helmets',
    'Gum Boots',
    'Safety Hand Gloves',
    'Safety Jacket',
    'Safety Goggles',
    'Ear Muff',
    'First Aid Boxes',
    'Eye Protection',
    'Dust Mask',
    'Welders Hand Gloves',
    'Safty Belt',
    'Protection pants',
    'CPR Mask',
    'Face shield',
    'Safty sing bords'
  ];

  const workerTypes = [
    'Engineer',
    'Construction Worker',
    'Electrician',
    'Supervisor',
    'Visitor',
    'Factory Worker',
    'Welder',
    'Safety Officer',
    'All Workers'
  ];

  const colors = [
    'White',
    'Yellow',
    'Blue',
    'Red',
    'Green',
    'Black',
    'Orange',
    'Brown',
    'Gray',
    'Clear',
    'Multi'
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get('/admin/products');
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterCategories = ['all', ...categories];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  const handleEdit = (product) => {
    const productToEdit = {
      ...product,
      features: Array.isArray(product.features) 
        ? product.features.join(', ') 
        : product.features
    };
    setSelectedProduct(productToEdit);
    setEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/admin/products/${selectedProduct._id}`);
      setProducts(products.filter(p => p._id !== selectedProduct._id));
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updateData = {
        name: selectedProduct.name,
        category: selectedProduct.category,
        workerType: selectedProduct.workerType,
        color: selectedProduct.color,
        price: parseFloat(selectedProduct.price),
        stock: parseInt(selectedProduct.stock),
        features: selectedProduct.features,
        description: selectedProduct.description,
        image: selectedProduct.image
      };

      const response = await API.put(`/admin/products/${selectedProduct._id}`, updateData);
      
      setProducts(products.map(p => p._id === selectedProduct._id ? response.data.data : p));
      setEditModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Error updating product:', err);
      alert(`Failed to update product: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageToCrop(event.target.result);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyCrop = () => {
    setSelectedProduct({ ...selectedProduct, image: imageToCrop });
    setCropModalOpen(false);
    setImageToCrop(null);
    setCropData({ zoom: 1, x: 0, y: 0 });
  };

  const handleViewProduct = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  const handleCategoryChange = (e) => {
    const newValue = e.target.value;
    setSelectedProduct(prev => ({ ...prev, category: newValue }));
  };

  const handleWorkerTypeChange = (e) => {
    const newValue = e.target.value;
    setSelectedProduct(prev => ({ ...prev, workerType: newValue }));
  };

  const handleColorChange = (e) => {
    const newValue = e.target.value;
    setSelectedProduct(prev => ({ ...prev, color: newValue }));
  };

  const getColorClass = (color) => {
    return 'color-' + color.toLowerCase().replace(/[\/\s]/g, '-');
  };

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />
      
      <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
                All Products
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Manage your product catalog
              </p>
            </div>
            <calcite-button 
              icon-start="plus-circle"
              onClick={() => navigate('/admin/product-add')}
            >
              Add New Product
            </calcite-button>
          </div>

          {error && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '20px' }}>
              <div slot="title">Error</div>
              <div slot="message">{error}</div>
            </calcite-notice>
          )}

          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            marginBottom: '24px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <calcite-input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onCalciteInputInput={(e) => setSearchQuery(e.target.value)}
              icon="search"
              clearable
              style={{ flex: '1', minWidth: '250px' }}
            />
            
            <calcite-select
              value={selectedCategory}
              onCalciteSelectChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '200px' }}
            >
              {filterCategories.map(category => (
                <calcite-option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </calcite-option>
              ))}
            </calcite-select>

            <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
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

          <div style={{ marginBottom: '16px' }}>
            <calcite-chip>{filteredProducts.length} products</calcite-chip>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                Loading products...
              </p>
            </div>
          )}

          {/* Card View */}
          {!loading && viewMode === 'card' && (
            <div className="shieldify-card-group">
              {filteredProducts.map(product => (
                <calcite-card 
                  key={product._id}
                  onClick={() => handleViewProduct(product._id)}
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

                  <div slot="footer-end" style={{ display: 'flex', gap: '8px' }}>
                    <calcite-button 
                      appearance="outline"
                      icon-start="pencil"
                      scale="s"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(product);
                      }}
                      style={{
                        color: '#2563eb',
                        borderColor: '#2563eb'
                      }}
                      onMouseEnter={(el) => {
                        el.currentTarget.style.backgroundColor = '#2563eb';
                        el.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(el) => {
                        el.currentTarget.style.backgroundColor = '';
                        el.currentTarget.style.color = '#2563eb';
                      }}
                    >
                      Edit
                    </calcite-button>
                    <calcite-button 
                      appearance="outline"
                      kind="danger"
                      icon-start="trash"
                      scale="s"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product);
                      }}
                      style={{
                        color: '#dc2626',
                        borderColor: '#dc2626'
                      }}
                      onMouseEnter={(el) => {
                        el.currentTarget.style.backgroundColor = '#dc2626';
                        el.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(el) => {
                        el.currentTarget.style.backgroundColor = '';
                        el.currentTarget.style.color = '#dc2626';
                      }}
                    >
                      Delete
                    </calcite-button>
                  </div>
                </calcite-card>
              ))}
            </div>
          )}

          {/* Table View - Using calcite-list */}
          {!loading && viewMode === 'table' && (
            <div style={{
              background: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}>
              <calcite-list style={{ borderRadius: '8px' }}>
                {filteredProducts.map((product, index) => (
                  <calcite-list-item
                    key={product._id}
                    label={product.name}
                    description={`${product.category} • ${product.workerType}`}
                    value={product._id}
                    style={{ 
                      cursor: 'pointer',
                      borderBottom: index !== filteredProducts.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => handleViewProduct(product._id)}
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
                        icon-start="pencil"
                        scale="s"
                        style={{
                          color: '#2563eb',
                          borderColor: '#2563eb'
                        }}
                        onMouseEnter={(el) => {
                          el.currentTarget.style.backgroundColor = '#2563eb';
                          el.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(el) => {
                          el.currentTarget.style.backgroundColor = '';
                          el.currentTarget.style.color = '#2563eb';
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(product);
                        }}
                      >
                        Edit
                      </calcite-button>
                      <calcite-button 
                        appearance="outline" 
                        kind="danger"
                        icon-start="trash"
                        scale="s"
                        style={{
                          color: '#dc2626',
                          borderColor: '#dc2626'
                        }}
                        onMouseEnter={(el) => {
                          el.currentTarget.style.backgroundColor = '#dc2626';
                          el.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(el) => {
                          el.currentTarget.style.backgroundColor = '';
                          el.currentTarget.style.color = '#dc2626';
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(product);
                        }}
                      >
                        Delete
                      </calcite-button>
                    </div>
                  </calcite-list-item>
                ))}
              </calcite-list>
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
              <div slot="title">No products found</div>
              <div slot="message">Try adjusting your filters or search terms</div>
            </calcite-notice>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <calcite-modal 
        open={editModalOpen}
        onCalciteModalClose={() => setEditModalOpen(false)}
        width-scale="l"
      >
        <div slot="header">Edit Product</div>
        <div slot="content" style={{ padding: '20px' }}>
          {selectedProduct && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <calcite-label>Product Image</calcite-label>
                <div style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  alignItems: 'center',
                  marginTop: '8px'
                }}>
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{ 
                      width: '180px', 
                      height: '180px', 
                      objectFit: 'cover',
                      borderRadius: '4px',
                      border: '1px solid var(--calcite-ui-border-2)'
                    }}
                  />
                  <div>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      id="image-upload"
                    />
                    <calcite-button
                      icon-start="image"
                      onClick={() => document.getElementById('image-upload').click()}
                    >
                      Change Image
                    </calcite-button>
                  </div>
                </div>
              </div>

              <calcite-label>
                Product Name
                <calcite-input-text
                  value={selectedProduct.name}
                  onInput={(e) => 
                    setSelectedProduct({ ...selectedProduct, name: e.target.value })
                  }
                />
              </calcite-label>

              <calcite-label>
                Description
                <calcite-text-area
                  value={selectedProduct.description || ''}
                  rows="3"
                  onInput={(e) => 
                    setSelectedProduct({ ...selectedProduct, description: e.target.value })
                  }
                />
              </calcite-label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ 
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--calcite-ui-text-1)'
                  }}>
                    Category
                  </label>
                  <select
                    value={selectedProduct.category}
                    onChange={handleCategoryChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: '1px solid var(--calcite-ui-border-2)',
                      borderRadius: '4px',
                      backgroundColor: 'var(--calcite-ui-background)',
                      color: 'var(--calcite-ui-text-1)',
                      cursor: 'pointer'
                    }}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ 
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--calcite-ui-text-1)'
                  }}>
                    Worker Type
                  </label>
                  <select
                    value={selectedProduct.workerType}
                    onChange={handleWorkerTypeChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: '1px solid var(--calcite-ui-border-2)',
                      borderRadius: '4px',
                      backgroundColor: 'var(--calcite-ui-background)',
                      color: 'var(--calcite-ui-text-1)',
                      cursor: 'pointer'
                    }}
                  >
                    {workerTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--calcite-ui-text-1)'
                }}>
                  Color
                </label>
                <select
                  value={selectedProduct.color}
                  onChange={handleColorChange}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '14px',
                    border: '1px solid var(--calcite-ui-border-2)',
                    borderRadius: '4px',
                    backgroundColor: 'var(--calcite-ui-background)',
                    color: 'var(--calcite-ui-text-1)',
                    cursor: 'pointer'
                  }}
                >
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <calcite-label>
                  Price (LKR)
                  <calcite-input-number
                    value={selectedProduct.price.toString()}
                    onInput={(e) => 
                      setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) || 0 })
                    }
                  />
                </calcite-label>

                <calcite-label>
                  Stock
                  <calcite-input-number
                    value={selectedProduct.stock.toString()}
                    onInput={(e) => 
                      setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) || 0 })
                    }
                  />
                </calcite-label>
              </div>

              <calcite-label>
                Features (comma-separated)
                <calcite-text-area
                  value={selectedProduct.features}
                  rows="3"
                  onInput={(e) => 
                    setSelectedProduct({ ...selectedProduct, features: e.target.value })
                  }
                />
              </calcite-label>
            </div>
          )}
        </div>
        <calcite-button slot="primary" onClick={handleSaveEdit}>
          Save Changes
        </calcite-button>
        <calcite-button slot="secondary" appearance="outline" onClick={() => setEditModalOpen(false)}>
          Cancel
        </calcite-button>
      </calcite-modal>

      {/* Delete Confirmation Modal */}
      <calcite-modal 
        open={deleteModalOpen}
        onCalciteModalClose={() => setDeleteModalOpen(false)}
        width-scale="s"
      >
        <div slot="header">Delete Product</div>
        <div slot="content" style={{ padding: '20px' }}>
          <calcite-notice open icon="exclamation-mark-triangle" kind="danger">
            <div slot="title">Are you sure?</div>
            <div slot="message">
              This will permanently delete "{selectedProduct?.name}". This action cannot be undone.
            </div>
          </calcite-notice>
        </div>
        <calcite-button slot="primary" kind="danger" onClick={confirmDelete}>
          Delete Product
        </calcite-button>
        <calcite-button slot="secondary" appearance="outline" onClick={() => setDeleteModalOpen(false)}>
          Cancel
        </calcite-button>
      </calcite-modal>

      {/* Image Crop Modal */}
      <calcite-modal 
        open={cropModalOpen}
        onCalciteModalClose={() => setCropModalOpen(false)}
        width-scale="m"
      >
        <div slot="header">Crop & Adjust Image</div>
        <div slot="content" style={{ padding: '20px' }}>
          {imageToCrop && (
            <div>
              <div style={{ 
                width: '100%',
                height: '400px',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginBottom: '20px'
              }}>
                <img 
                  src={imageToCrop}
                  alt="Crop preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transform: `scale(${cropData.zoom}) translate(${cropData.x}px, ${cropData.y}px)`
                  }}
                />
              </div>

              <calcite-label>
                Zoom
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={cropData.zoom}
                  onChange={(e) => setCropData({ ...cropData, zoom: parseFloat(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </calcite-label>
            </div>
          )}
        </div>
        <calcite-button slot="primary" onClick={applyCrop}>
          Apply
        </calcite-button>
        <calcite-button slot="secondary" appearance="outline" onClick={() => setCropModalOpen(false)}>
          Cancel
        </calcite-button>
      </calcite-modal>
    </calcite-shell>
  );
}