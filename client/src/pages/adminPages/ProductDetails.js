// ============================================
// FILE: AdminProductDetail.js
// Path: src/pages/adminPages/AdminProductDetail.js
// ============================================
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-modal';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-input-text';
import '@esri/calcite-components/components/calcite-input-number';
import '@esri/calcite-components/components/calcite-text-area';
export default function AdminProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    'Safety Helmets', 'Gum Boots', 'Safety Hand Gloves', 'Safety Jacket',
    'Safety Goggles', 'Ear Muff', 'First Aid Boxes', 'Eye Protection',
    'Dust Mask', 'Welders Hand Gloves', 'Safty Belt', 'Protection pants',
    'CPR Mask', 'Face shield', 'Safty sing bords'
  ];

  const workerTypes = [
    'Engineer', 'Construction Worker', 'Electrician', 'Supervisor',
    'Visitor', 'Factory Worker', 'Welder', 'Safety Officer', 'All Workers'
  ];

  const colors = [
    'White', 'Yellow', 'Blue', 'Red', 'Green', 'Black',
    'Orange', 'Brown', 'Gray', 'Clear', 'Multi'
  ];

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/products/${id}`);
      setProduct(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    const productToEdit = {
      ...product,
      features: Array.isArray(product.features) 
        ? product.features.join(', ') 
        : product.features
    };
    setSelectedProduct(productToEdit);
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/products/${id}`);
      setDeleteModalOpen(false);
      navigate('/admin/product-list');
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

      const response = await API.put(`/products/${id}`, updateData);
      setProduct(response.data.data);
      setEditModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Error updating product:', err);
      alert(`Failed to update product: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedProduct({ ...selectedProduct, category: e.target.value });
  };

  const handleWorkerTypeChange = (e) => {
    setSelectedProduct({ ...selectedProduct, workerType: e.target.value });
  };

  const handleColorChange = (e) => {
    setSelectedProduct({ ...selectedProduct, color: e.target.value });
  };

  if (loading) {
    return (
      <calcite-shell>
        <AdminNavbar />
        <AdminSidebar />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <calcite-loader scale="l"></calcite-loader>
          <p style={{ color: 'var(--calcite-ui-text-3)' }}>Loading product details...</p>
        </div>
      </calcite-shell>
    );
  }

  if (error || !product) {
    return (
      <calcite-shell>
        <AdminNavbar />
        <AdminSidebar />
        <div style={{ padding: '24px' }}>
          <calcite-notice open icon="exclamation-mark-triangle" kind="danger">
            <div slot="title">Error</div>
            <div slot="message">{error || 'Product not found'}</div>
          </calcite-notice>
          <calcite-button 
            icon-start="arrow-left"
            onClick={() => navigate('/admin/product-list')}
            style={{ marginTop: '16px' }}
          >
            Back to Products
          </calcite-button>
        </div>
      </calcite-shell>
    );
  }

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />
      
      <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header with Back Button */}
          <div style={{ marginBottom: '24px' }}>
            <calcite-button 
              icon-start="arrow-left"
              appearance="outline"
              onClick={() => navigate('/admin/product-list')}
              style={{ marginBottom: '16px' }}
            >
              Back to Products
            </calcite-button>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: '600' }}>
                  {product.name}
                </h1>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <calcite-chip appearance="solid">{product.category}</calcite-chip>
                  <calcite-chip appearance="outline">{product.workerType}</calcite-chip>
                  <calcite-chip 
                    appearance="outline" 
                    kind={product.stock > 0 ? 'brand' : 'danger'}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </calcite-chip>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <calcite-button 
                  icon-start="pencil"
                  onClick={handleEdit}
                >
                  Edit Product
                </calcite-button>
                <calcite-button 
                  icon-start="trash"
                  kind="danger"
                  appearance="outline"
                  onClick={handleDelete}
                >
                  Delete
                </calcite-button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '24px',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr'
            }
          }}>
            {/* Left Column - Image */}
            <calcite-card>
              <div slot="heading">Product Image</div>
              <img 
                src={product.image}
                alt={product.name}
                style={{ 
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
            </calcite-card>

            {/* Right Column - Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Pricing Info */}
              <calcite-card>
                <div slot="heading">Pricing & Stock</div>
                <div style={{ padding: '20px' }}>
                  <div style={{ 
                    fontSize: '36px', 
                    fontWeight: '700', 
                    color: '#ff6b00',
                    marginBottom: '16px'
                  }}>
                    LKR {product.price.toLocaleString()}
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginTop: '16px'
                  }}>
                    <div>
                      <p style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '12px', 
                        color: 'var(--calcite-ui-text-3)',
                        textTransform: 'uppercase',
                        fontWeight: '500'
                      }}>
                        Stock Quantity
                      </p>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '20px', 
                        fontWeight: '600'
                      }}>
                        {product.stock}
                      </p>
                    </div>
                    
                    <div>
                      <p style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '12px', 
                        color: 'var(--calcite-ui-text-3)',
                        textTransform: 'uppercase',
                        fontWeight: '500'
                      }}>
                        Color
                      </p>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '20px', 
                        fontWeight: '600'
                      }}>
                        {product.color}
                      </p>
                    </div>
                  </div>
                </div>
              </calcite-card>

              {/* Product Info */}
              <calcite-card>
                <div slot="heading">Product Information</div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <p style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '12px', 
                      color: 'var(--calcite-ui-text-3)',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      Category
                    </p>
                    <p style={{ margin: 0, fontSize: '16px' }}>{product.category}</p>
                  </div>
                  
                  <div>
                    <p style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '12px', 
                      color: 'var(--calcite-ui-text-3)',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      Worker Type
                    </p>
                    <p style={{ margin: 0, fontSize: '16px' }}>{product.workerType}</p>
                  </div>

                  {product.description && (
                    <div>
                      <p style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '12px', 
                        color: 'var(--calcite-ui-text-3)',
                        textTransform: 'uppercase',
                        fontWeight: '500'
                      }}>
                        Description
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                        {product.description}
                      </p>
                    </div>
                  )}
                </div>
              </calcite-card>
            </div>
          </div>

          {/* Features Section - Full Width */}
          <calcite-card style={{ marginTop: '24px' }}>
            <div slot="heading">Features</div>
            <div style={{ padding: '20px' }}>
              {Array.isArray(product.features) && product.features.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.features.map((feature, index) => (
                    <calcite-chip key={index} scale="m" appearance="outline">
                      {feature}
                    </calcite-chip>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, color: 'var(--calcite-ui-text-3)' }}>
                  No features listed
                </p>
              )}
            </div>
          </calcite-card>

          {/* Metadata */}
          <calcite-card style={{ marginTop: '24px' }}>
            <div slot="heading">Metadata</div>
            <div style={{ 
              padding: '20px', 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              <div>
                <p style={{ 
                  margin: '0 0 4px 0', 
                  fontSize: '12px', 
                  color: 'var(--calcite-ui-text-3)',
                  textTransform: 'uppercase',
                  fontWeight: '500'
                }}>
                  Product ID
                </p>
                <p style={{ margin: 0, fontSize: '14px', fontFamily: 'monospace' }}>
                  {product._id}
                </p>
              </div>
              
              <div>
                <p style={{ 
                  margin: '0 0 4px 0', 
                  fontSize: '12px', 
                  color: 'var(--calcite-ui-text-3)',
                  textTransform: 'uppercase',
                  fontWeight: '500'
                }}>
                  Created
                </p>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  {new Date(product.createdAt).toLocaleString()}
                </p>
              </div>
              
              {product.updatedAt && (
                <div>
                  <p style={{ 
                    margin: '0 0 4px 0', 
                    fontSize: '12px', 
                    color: 'var(--calcite-ui-text-3)',
                    textTransform: 'uppercase',
                    fontWeight: '500'
                  }}>
                    Last Updated
                  </p>
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    {new Date(product.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </calcite-card>
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
                    fontWeight: '500'
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
                    fontWeight: '500'
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
                  fontWeight: '500'
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
              This will permanently delete "{product.name}". This action cannot be undone.
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
    </calcite-shell>
  );
}