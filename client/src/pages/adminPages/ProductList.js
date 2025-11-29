import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
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
import '@esri/calcite-components/components/calcite-tooltip';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';

export default function AdminProductList() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [cropData, setCropData] = useState({ zoom: 1, x: 0, y: 0 });

  // Sample products data (in real app, this would come from API/database)
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Engineer Safety Helmet', 
      category: 'Safety Helmets', 
      workerType: 'Engineer',
      color: 'White',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400&q=80',
      features: ['ABS Material', 'Adjustable', 'Ventilated'],
      stock: 150
    },
    { 
      id: 2, 
      name: 'Construction Safety Helmet', 
      category: 'Safety Helmets', 
      workerType: 'Construction Worker',
      color: 'Yellow',
      price: 2200,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
      features: ['High Impact', 'Sweatband', 'Lightweight'],
      stock: 200
    },
    { 
      id: 3, 
      name: 'Industrial Gum Boots', 
      category: 'Gum Boots', 
      workerType: 'Construction Worker',
      color: 'Black',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1608613304810-2d4dd52511a2?w=400&q=80',
      features: ['Steel Toe', 'Waterproof', 'Anti-Slip'],
      stock: 80
    }
  ]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  const handleEdit = (product) => {
    setSelectedProduct({ ...product });
    setEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter(p => p.id !== selectedProduct.id));
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveEdit = () => {
    setProducts(products.map(p => p.id === selectedProduct.id ? selectedProduct : p));
    setEditModalOpen(false);
    setSelectedProduct(null);
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

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />
      
      <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
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
                Product Management
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Manage your product catalog
              </p>
            </div>
            <calcite-button 
              icon-start="plus"
              onClick={() => navigate('/admin/product-add')}
            >
              Add New Product
            </calcite-button>
          </div>

          {/* Filters & View Toggle */}
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
              {categories.map(category => (
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
                text="List View"
                icon="list"
                active={viewMode === 'list'}
                onClick={() => setViewMode('list')}
              ></calcite-action>
            </div>
          </div>

          {/* Results Count */}
          <div style={{ marginBottom: '16px' }}>
            <calcite-chip>{filteredProducts.length} products</calcite-chip>
          </div>

          {/* Card View */}
          {viewMode === 'card' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {filteredProducts.map(product => (
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

                  <div style={{ 
                    display: 'flex', 
                    gap: '8px',
                    flexWrap: 'wrap',
                    margin: '12px 0'
                  }}>
                    <calcite-chip scale="s" appearance="outline">
                      {product.color}
                    </calcite-chip>
                    <calcite-chip scale="s" appearance="outline">
                      Stock: {product.stock}
                    </calcite-chip>
                  </div>

                  <div slot="footer-start" style={{ 
                    fontWeight: '600', 
                    fontSize: '1.125rem', 
                    color: '#ff6b00' 
                  }}>
                    LKR {product.price.toLocaleString()}
                  </div>

                  <div slot="footer-end" style={{ display: 'flex', gap: '4px' }}>
                    <calcite-button 
                      appearance="outline" 
                      icon-start="pencil"
                      scale="s"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </calcite-button>
                    <calcite-button 
                      appearance="outline" 
                      kind="danger"
                      icon-start="trash"
                      scale="s"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </calcite-button>
                  </div>
                </calcite-card>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <calcite-list>
              {filteredProducts.map(product => (
                <calcite-list-item
                  key={product.id}
                  label={product.name}
                  description={`${product.category} • ${product.workerType} • Stock: ${product.stock}`}
                  value={product.id.toString()}
                >
                  <img 
                    slot="content-start"
                    src={product.image}
                    alt={product.name}
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                  <div slot="content-end" style={{ 
                    display: 'flex', 
                    gap: '8px',
                    alignItems: 'center'
                  }}>
                    <span style={{ 
                      fontWeight: '600', 
                      fontSize: '16px',
                      color: '#ff6b00',
                      minWidth: '100px',
                      textAlign: 'right'
                    }}>
                      LKR {product.price.toLocaleString()}
                    </span>
                    <calcite-button 
                      appearance="outline" 
                      icon-start="pencil"
                      scale="s"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </calcite-button>
                    <calcite-button 
                      appearance="outline" 
                      kind="danger"
                      icon-start="trash"
                      scale="s"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </calcite-button>
                  </div>
                </calcite-list-item>
              ))}
            </calcite-list>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
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
              {/* Product Image */}
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
                  onCalciteInputTextChange={(e) => 
                    setSelectedProduct({ ...selectedProduct, name: e.target.value })
                  }
                />
              </calcite-label>

              <calcite-label>
                Category
                <calcite-input-text
                  value={selectedProduct.category}
                  onCalciteInputTextChange={(e) => 
                    setSelectedProduct({ ...selectedProduct, category: e.target.value })
                  }
                />
              </calcite-label>

              <calcite-label>
                Worker Type
                <calcite-input-text
                  value={selectedProduct.workerType}
                  onCalciteInputTextChange={(e) => 
                    setSelectedProduct({ ...selectedProduct, workerType: e.target.value })
                  }
                />
              </calcite-label>

              <calcite-label>
                Color
                <calcite-input-text
                  value={selectedProduct.color}
                  onCalciteInputTextChange={(e) => 
                    setSelectedProduct({ ...selectedProduct, color: e.target.value })
                  }
                />
              </calcite-label>

              <calcite-label>
                Price (LKR)
          <calcite-input-number
  value={selectedProduct.price.toString()}  // Add .toString()
  onCalciteInputNumberChange={(e) => 
    setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })
  }
/>
              </calcite-label>

              <calcite-label>
                Stock
            <calcite-input-number
  value={selectedProduct.stock.toString()}  // Add .toString()
  onCalciteInputNumberChange={(e) => 
    setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) })
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