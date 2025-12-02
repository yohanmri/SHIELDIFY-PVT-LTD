import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import { adminAPI as API } from '../../api/axios';
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
import '@esri/calcite-components/components/calcite-switch';

export default function AdminBundleList() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [cropData, setCropData] = useState({ zoom: 1, x: 0, y: 0 });
  
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    'Safety Helmets',
    'Gum Boots',
    'Safety Hand Gloves',
    'Safety Jacket',
    'Safety Goggles',
    'Mixed Bundle',
    'Starter Kit',
    'Premium Package'
  ];


  
  useEffect(() => {
    // TEMPORARY: Comment out API call until CRUD is ready
    // fetchBundles();
  }, []);

  const fetchBundles = async () => {
    try {
      setLoading(true);
      const response = await API.get('/bundles');
      setBundles(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bundles:', err);
      setError('Failed to load bundles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterCategories = ['all', ...categories];

  const filteredBundles = useMemo(() => {
    return bundles.filter(bundle => {
      const matchesCategory = selectedCategory === 'all' || bundle.category === selectedCategory;
      const matchesSearch = bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           bundle.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, bundles]);

  const handleEdit = (bundle) => {
    setSelectedBundle(bundle);
    setEditModalOpen(true);
  };

  const handleDelete = (bundle) => {
    setSelectedBundle(bundle);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // TEMPORARY: Local delete until API is ready
      // await API.delete(`/bundles/${selectedBundle._id}`);
      setBundles(bundles.filter(b => b._id !== selectedBundle._id));
      setDeleteModalOpen(false);
      setSelectedBundle(null);
    } catch (err) {
      console.error('Error deleting bundle:', err);
      alert('Failed to delete bundle. Please try again.');
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updateData = {
        name: selectedBundle.name,
        category: selectedBundle.category,
        quantity: parseInt(selectedBundle.quantity),
        originalPrice: parseFloat(selectedBundle.originalPrice),
        discountPrice: parseFloat(selectedBundle.discountPrice),
        description: selectedBundle.description,
        isActive: selectedBundle.isActive,
        image: selectedBundle.image
      };

      // TEMPORARY: Local update until API is ready
      // const response = await API.put(`/bundles/${selectedBundle._id}`, updateData);
      setBundles(bundles.map(b => b._id === selectedBundle._id ? { ...selectedBundle, ...updateData } : b));
      setEditModalOpen(false);
      setSelectedBundle(null);
    } catch (err) {
      console.error('Error updating bundle:', err);
      alert(`Failed to update bundle: ${err.response?.data?.message || err.message}`);
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
    setSelectedBundle({ ...selectedBundle, image: imageToCrop });
    setCropModalOpen(false);
    setImageToCrop(null);
    setCropData({ zoom: 1, x: 0, y: 0 });
  };

  const calculateDiscount = (original, discount) => {
    if (!original || !discount) return 0;
    return Math.round(((original - discount) / original) * 100);
  };

  const handleBundleChange = (field, value) => {
    setSelectedBundle(prev => ({
      ...prev,
      [field]: value
    }));
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
                Bundle Promotions
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Manage bundle deals and bulk promotions
              </p>
            </div>
            <calcite-button 
              icon-start="plus-circle"
              onClick={() => navigate('/admin/bundle-add')}
            >
              Add New Bundle
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
              placeholder="Search bundles..."
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
                text="List View"
                icon="list"
                active={viewMode === 'list'}
                onClick={() => setViewMode('list')}
              ></calcite-action>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <calcite-chip>{filteredBundles.length} bundles</calcite-chip>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                Loading bundles...
              </p>
            </div>
          )}

          {/* Card View */}
          {!loading && viewMode === 'card' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {filteredBundles.map(bundle => (
                <calcite-card key={bundle._id}>
                  <img 
                    slot="thumbnail" 
                    src={bundle.image} 
                    alt={bundle.name}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  
                  <div slot="header-start" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    <calcite-chip scale="s" appearance="solid" kind="danger">
                      {calculateDiscount(bundle.originalPrice, bundle.discountPrice)}% OFF
                    </calcite-chip>
                    {!bundle.isActive && (
                      <calcite-chip scale="s" appearance="outline" kind="neutral">
                        Inactive
                      </calcite-chip>
                    )}
                  </div>

                  <span slot="heading">{bundle.name}</span>
                  <span slot="description">{bundle.category}</span>

                  <div style={{ margin: '12px 0' }}>
                    <calcite-chip scale="s" appearance="outline" icon="collection">
                      Qty: {bundle.quantity} items
                    </calcite-chip>
                  </div>

                  <div slot="footer-start" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ 
                      fontSize: '14px',
                      color: '#6b6b6b',
                      textDecoration: 'line-through'
                    }}>
                      LKR {bundle.originalPrice.toLocaleString()}
                    </div>
                    <div style={{ 
                      fontWeight: '600', 
                      fontSize: '1.25rem', 
                      color: '#dc3545' 
                    }}>
                      LKR {bundle.discountPrice.toLocaleString()}
                    </div>
                  </div>

                  <div slot="footer-end" style={{ display: 'flex', gap: '4px' }}>
                    <calcite-button 
                      appearance="outline" 
                      icon-start="pencil"
                      scale="s"
                      onClick={() => handleEdit(bundle)}
                    >
                      Edit
                    </calcite-button>
                    <calcite-button 
                      appearance="outline" 
                      kind="danger"
                      icon-start="trash"
                      scale="s"
                      onClick={() => handleDelete(bundle)}
                    >
                      Delete
                    </calcite-button>
                  </div>
                </calcite-card>
              ))}
            </div>
          )}

          {/* List View */}
          {!loading && viewMode === 'list' && (
            <calcite-list>
              {filteredBundles.map(bundle => (
                <calcite-list-item
                  key={bundle._id}
                  label={bundle.name}
                  description={`${bundle.category} • ${bundle.quantity} items • ${calculateDiscount(bundle.originalPrice, bundle.discountPrice)}% OFF`}
                  value={bundle._id}
                >
                  <img 
                    slot="content-start"
                    src={bundle.image}
                    alt={bundle.name}
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
                    <div style={{ textAlign: 'right', marginRight: '12px' }}>
                      <div style={{ fontSize: '12px', color: '#6b6b6b', textDecoration: 'line-through' }}>
                        LKR {bundle.originalPrice.toLocaleString()}
                      </div>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: '#dc3545' }}>
                        LKR {bundle.discountPrice.toLocaleString()}
                      </div>
                    </div>
                    <calcite-button 
                      appearance="outline" 
                      icon-start="pencil"
                      scale="s"
                      onClick={() => handleEdit(bundle)}
                    >
                      Edit
                    </calcite-button>
                    <calcite-button 
                      appearance="outline" 
                      kind="danger"
                      icon-start="trash"
                      scale="s"
                      onClick={() => handleDelete(bundle)}
                    >
                      Delete
                    </calcite-button>
                  </div>
                </calcite-list-item>
              ))}
            </calcite-list>
          )}

          {!loading && filteredBundles.length === 0 && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
              <div slot="title">No bundles found</div>
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
        <div slot="header">Edit Bundle</div>
        <div slot="content" style={{ padding: '20px' }}>
          {selectedBundle && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <calcite-label>Bundle Image</calcite-label>
                <div style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  alignItems: 'center',
                  marginTop: '8px'
                }}>
                  <img 
                    src={selectedBundle.image}
                    alt={selectedBundle.name}
                    style={{ 
                      width: '280px', 
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
                Bundle Name *
                <calcite-input-text
                  value={selectedBundle.name}
                  onCalciteInputInput={(e) => handleBundleChange('name', e.target.value)}
                />
              </calcite-label>

              <calcite-label>
                Category *
                <calcite-select
                  value={selectedBundle.category}
                  onCalciteSelectChange={(e) => handleBundleChange('category', e.target.value)}
                >
                  {categories.map(cat => (
                    <calcite-option key={cat} value={cat}>{cat}</calcite-option>
                  ))}
                </calcite-select>
              </calcite-label>

              <calcite-label>
                Quantity *
                <calcite-input-number
                  value={selectedBundle.quantity.toString()}
                  onCalciteInputNumberInput={(e) => handleBundleChange('quantity', e.target.value)}
                  min="1"
                />
              </calcite-label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <calcite-label>
                  Original Price (LKR) *
                  <calcite-input-number
                    value={selectedBundle.originalPrice.toString()}
                    onCalciteInputNumberInput={(e) => handleBundleChange('originalPrice', e.target.value)}
                    min="0"
                  />
                </calcite-label>

                <calcite-label>
                  Discount Price (LKR) *
                  <calcite-input-number
                    value={selectedBundle.discountPrice.toString()}
                    onCalciteInputNumberInput={(e) => handleBundleChange('discountPrice', e.target.value)}
                    min="0"
                  />
                </calcite-label>
              </div>

              <div style={{
                padding: '12px',
                background: 'var(--calcite-ui-foreground-2)',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: '600' }}>
                  Discount: {calculateDiscount(selectedBundle.originalPrice, selectedBundle.discountPrice)}% OFF
                </span>
                <span style={{ color: '#28a745', fontWeight: '600' }}>
                  Save: LKR {(selectedBundle.originalPrice - selectedBundle.discountPrice).toLocaleString()}
                </span>
              </div>

              <calcite-label>
                Description
                <calcite-text-area
                  value={selectedBundle.description || ''}
                  rows="3"
                  onCalciteTextAreaInput={(e) => handleBundleChange('description', e.target.value)}
                  placeholder="Brief description of the bundle..."
                />
              </calcite-label>

              <calcite-label layout="inline">
                <span>Active Status</span>
                <calcite-switch
                  checked={selectedBundle.isActive}
                  onCalciteSwitchChange={(e) => handleBundleChange('isActive', e.target.checked)}
                ></calcite-switch>
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
        <div slot="header">Delete Bundle</div>
        <div slot="content" style={{ padding: '20px' }}>
          <calcite-notice open icon="exclamation-mark-triangle" kind="danger">
            <div slot="title">Are you sure?</div>
            <div slot="message">
              This will permanently delete "{selectedBundle?.name}". This action cannot be undone.
            </div>
          </calcite-notice>
        </div>
        <calcite-button slot="primary" kind="danger" onClick={confirmDelete}>
          Delete Bundle
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
                height: '0',
                paddingBottom: '56.25%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginBottom: '20px'
              }}>
                <img 
                  src={imageToCrop}
                  alt="Crop preview"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: `translate(-50%, -50%) scale(${cropData.zoom})`,
                    transition: 'transform 0.1s ease'
                  }}
                />
              </div>

              <calcite-label>
                Zoom Level: {cropData.zoom.toFixed(1)}x
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={cropData.zoom}
                  onChange={(e) => setCropData({ ...cropData, zoom: parseFloat(e.target.value) })}
                  style={{ width: '100%', marginTop: '8px' }}
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