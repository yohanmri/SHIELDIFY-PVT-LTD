// ============================================
// FILE: AdminBundleDetail.js
// Path: src/pages/adminPages/AdminBundleDetail.js
// ============================================
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import { adminAPI as API } from '../../api/axios';
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
import '@esri/calcite-components/components/calcite-switch';

export default function AdminBundleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(null);

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
    fetchBundle();
  }, [id]);

  const fetchBundle = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/admin/bundles/${id}`);
      setBundle(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bundle:', err);
      setError('Failed to load bundle details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setSelectedBundle({ ...bundle });
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/admin/bundles/${id}`);
      setDeleteModalOpen(false);
      navigate('/admin/bundle-list');
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

      const response = await API.put(`/admin/bundles/${id}`, updateData);
      setBundle(response.data.data);
      setEditModalOpen(false);
      setSelectedBundle(null);
    } catch (err) {
      console.error('Error updating bundle:', err);
      alert(`Failed to update bundle: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedBundle({ ...selectedBundle, category: e.target.value });
  };

  const calculateDiscount = (original, discount) => {
    if (!original || !discount) return 0;
    return Math.round(((original - discount) / original) * 100);
  };

  const calculateSavings = (original, discount) => {
    return (original || 0) - (discount || 0);
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
          <p style={{ color: 'var(--calcite-ui-text-3)' }}>Loading bundle details...</p>
        </div>
      </calcite-shell>
    );
  }

  if (error || !bundle) {
    return (
      <calcite-shell>
        <AdminNavbar />
        <AdminSidebar />
        <div style={{ padding: '24px' }}>
          <calcite-notice open icon="exclamation-mark-triangle" kind="danger">
            <div slot="title">Error</div>
            <div slot="message">{error || 'Bundle not found'}</div>
          </calcite-notice>
          <calcite-button 
            icon-start="arrow-left"
            onClick={() => navigate('/admin/bundle-list')}
            style={{ marginTop: '16px' }}
          >
            Back to Bundles
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
              onClick={() => navigate('/admin/bundle-list')}
              style={{ marginBottom: '16px' }}
            >
              Back to Bundles
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
                  {bundle.name}
                </h1>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <calcite-chip appearance="solid">{bundle.category}</calcite-chip>
                  <calcite-chip appearance="solid" kind="danger">
                    {calculateDiscount(bundle.originalPrice, bundle.discountPrice)}% OFF
                  </calcite-chip>
                  <calcite-chip appearance="outline" icon="collection">
                    {bundle.quantity} items
                  </calcite-chip>
                  <calcite-chip 
                    appearance="outline" 
                    kind={bundle.isActive ? 'brand' : 'neutral'}
                  >
                    {bundle.isActive ? 'Active' : 'Inactive'}
                  </calcite-chip>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <calcite-button 
                  icon-start="pencil"
                  onClick={handleEdit}
                >
                  Edit Bundle
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
            gap: '24px'
          }}>
            {/* Left Column - Image */}
            <calcite-card>
              <div slot="heading">Bundle Image</div>
              <img 
                src={bundle.image}
                alt={bundle.name}
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
                <div slot="heading">Pricing & Discount</div>
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '14px', 
                      color: '#6b6b6b',
                      textDecoration: 'line-through'
                    }}>
                      Original: LKR {bundle.originalPrice.toLocaleString()}
                    </p>
                    <div style={{ 
                      fontSize: '36px', 
                      fontWeight: '700', 
                      color: '#dc3545'
                    }}>
                      LKR {bundle.discountPrice.toLocaleString()}
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '16px',
                    background: 'var(--calcite-ui-foreground-2)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <p style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '12px', 
                        color: 'var(--calcite-ui-text-3)',
                        textTransform: 'uppercase',
                        fontWeight: '500'
                      }}>
                        Discount
                      </p>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '24px', 
                        fontWeight: '700',
                        color: '#dc3545'
                      }}>
                        {calculateDiscount(bundle.originalPrice, bundle.discountPrice)}% OFF
                      </p>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '12px', 
                        color: 'var(--calcite-ui-text-3)',
                        textTransform: 'uppercase',
                        fontWeight: '500'
                      }}>
                        You Save
                      </p>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '24px', 
                        fontWeight: '700',
                        color: '#28a745'
                      }}>
                        LKR {calculateSavings(bundle.originalPrice, bundle.discountPrice).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </calcite-card>

              {/* Bundle Info */}
              <calcite-card>
                <div slot="heading">Bundle Information</div>
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
                    <p style={{ margin: 0, fontSize: '16px' }}>{bundle.category}</p>
                  </div>
                  
                  <div>
                    <p style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '12px', 
                      color: 'var(--calcite-ui-text-3)',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      Quantity
                    </p>
                    <p style={{ margin: 0, fontSize: '16px' }}>{bundle.quantity} items in bundle</p>
                  </div>

                  <div>
                    <p style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '12px', 
                      color: 'var(--calcite-ui-text-3)',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      Status
                    </p>
                    <p style={{ margin: 0, fontSize: '16px' }}>
                      {bundle.isActive ? '✓ Active & Available' : '✗ Inactive'}
                    </p>
                  </div>

                  {bundle.description && (
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
                        {bundle.description}
                      </p>
                    </div>
                  )}
                </div>
              </calcite-card>
            </div>
          </div>

          {/* Metadata */}
          <calcite-card style={{ marginTop: '24px' }}>
            <div slot="heading">Metadata</div>
            <div style={{ 
              padding: '20px', 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 1fr',
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
                  Bundle ID
                </p>
                <p style={{ margin: 0, fontSize: '14px', fontFamily: 'monospace' }}>
                  {bundle._id}
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
                  {new Date(bundle.createdAt).toLocaleString()}
                </p>
              </div>
              
              {bundle.updatedAt && (
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
                    {new Date(bundle.updatedAt).toLocaleString()}
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
        <div slot="header">Edit Bundle</div>
        <div slot="content" style={{ padding: '20px' }}>
          {selectedBundle && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <calcite-label>
                Bundle Name *
                <calcite-input-text
                  value={selectedBundle.name}
                  onInput={(e) => 
                    setSelectedBundle({ ...selectedBundle, name: e.target.value })
                  }
                />
              </calcite-label>

              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--calcite-ui-text-1)'
                }}>
                  Category *
                </label>
                <select
                  value={selectedBundle.category}
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

              <calcite-label>
                Quantity *
                <calcite-input-number
                  value={selectedBundle.quantity.toString()}
                  onInput={(e) => 
                    setSelectedBundle({ ...selectedBundle, quantity: parseInt(e.target.value) || 0 })
                  }
                  min="1"
                />
              </calcite-label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <calcite-label>
                  Original Price (LKR) *
                  <calcite-input-number
                    value={selectedBundle.originalPrice.toString()}
                    onInput={(e) => 
                      setSelectedBundle({ ...selectedBundle, originalPrice: parseFloat(e.target.value) || 0 })
                    }
                    min="0"
                  />
                </calcite-label>

                <calcite-label>
                  Discount Price (LKR) *
                  <calcite-input-number
                    value={selectedBundle.discountPrice.toString()}
                    onInput={(e) => 
                      setSelectedBundle({ ...selectedBundle, discountPrice: parseFloat(e.target.value) || 0 })
                    }
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
                  Save: LKR {calculateSavings(selectedBundle.originalPrice, selectedBundle.discountPrice).toLocaleString()}
                </span>
              </div>

              <calcite-label>
                Description
                <calcite-text-area
                  value={selectedBundle.description || ''}
                  rows="3"
                  onInput={(e) => 
                    setSelectedBundle({ ...selectedBundle, description: e.target.value })
                  }
                  placeholder="Brief description of the bundle..."
                />
              </calcite-label>

              <calcite-label layout="inline">
                <span>Active Status</span>
                <calcite-switch
                  checked={selectedBundle.isActive}
                  onCalciteSwitchChange={(e) => 
                    setSelectedBundle({ ...selectedBundle, isActive: e.target.checked })
                  }
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
              This will permanently delete "{bundle.name}". This action cannot be undone.
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
    </calcite-shell>
  );
}