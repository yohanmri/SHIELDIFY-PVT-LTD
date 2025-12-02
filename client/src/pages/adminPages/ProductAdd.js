import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-panel';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-input-text';
import '@esri/calcite-components/components/calcite-input-number';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-modal';

export default function AdminProductAdd() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [cropData, setCropData] = useState({ zoom: 1, x: 0, y: 0 });

  const [formData, setFormData] = useState({
    name: '',
    category: 'Safety Helmets',
    workerType: 'Engineer',
    color: 'White',
    price: '',
    stock: '',
    features: '',
    description: '',
    image: ''
  });

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

  const handleChange = (field, value) => {
    console.log('Changing field:', field, 'Value:', value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setError('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageToCrop(event.target.result);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyCrop = () => {
    setFormData(prev => ({ ...prev, image: imageToCrop }));
    setCropModalOpen(false);
    setImageToCrop(null);
    setCropData({ zoom: 1, x: 0, y: 0 });
  };

  const validateForm = () => {
    console.log('Validating form data:', formData);
    
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (!formData.category) {
      setError('Please select a category');
      return false;
    }
    if (!formData.workerType) {
      setError('Please select a worker type');
      return false;
    }
    if (!formData.color) {
      setError('Please select a color');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Price must be greater than 0');
      return false;
    }
    if (formData.stock === '' || parseInt(formData.stock) < 0) {
      setError('Stock quantity must be 0 or greater');
      return false;
    }
    if (!formData.features.trim()) {
      setError('At least one feature is required');
      return false;
    }
    if (!formData.image) {
      setError('Please upload a product image');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const productData = {
        name: formData.name.trim(),
        category: formData.category,
        workerType: formData.workerType,
        color: formData.color,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        features: formData.features.trim(),
        description: formData.description.trim(),
        image: formData.image
      };

      console.log('Submitting product data:', productData);

      await API.post('/admin/products', productData);

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/product-list');
      }, 1500);

    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.response?.data?.message || 'Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      category: 'Safety Helmets',
      workerType: 'Engineer',
      color: 'White',
      price: '',
      stock: '',
      features: '',
      description: '',
      image: ''
    });
    setError(null);
    setSuccess(false);
  };

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />
      
      <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <calcite-button
              appearance="outline"
              icon-start="arrow-left"
              onClick={() => navigate('/admin/product-list')}
              style={{ marginBottom: '16px' }}
            >
              Back to Products
            </calcite-button>
            
            <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
              Add New Product
            </h1>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
              Create a new product with details and features
            </p>
            <calcite-button 
              appearance="outline" 
              scale="s"
              onClick={() => console.log('Current form data:', formData)}
              style={{ marginTop: '8px' }}
            >
              Debug: Show Form Data
            </calcite-button>
          </div>

          {error && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '20px' }}>
              <div slot="title">Error</div>
              <div slot="message">{error}</div>
            </calcite-notice>
          )}

          {success && (
            <calcite-notice open icon="check-circle" kind="success" style={{ marginBottom: '20px' }}>
              <div slot="title">Success!</div>
              <div slot="message">Product created successfully. Redirecting...</div>
            </calcite-notice>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Left Column - Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <calcite-label>
                  Product Name *
                  <calcite-input-text
                    value={formData.name}
                    onInput={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g., Engineer Safety Helmet"
                    required
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
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
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
                    Worker Type *
                  </label>
                  <select
                    value={formData.workerType}
                    onChange={(e) => handleChange('workerType', e.target.value)}
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

                <div>
                  <label style={{ 
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--calcite-ui-text-1)'
                  }}>
                    Color *
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => handleChange('color', e.target.value)}
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
                    Price (LKR) *
                    <calcite-input-number
                      value={formData.price}
                      onInput={(e) => handleChange('price', e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </calcite-label>

                  <calcite-label>
                    Stock Quantity *
                    <calcite-input-number
                      value={formData.stock}
                      onInput={(e) => handleChange('stock', e.target.value)}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </calcite-label>
                </div>

                <calcite-label>
                  Features *
                  <calcite-text-area
                    value={formData.features}
                    onInput={(e) => handleChange('features', e.target.value)}
                    placeholder="e.g., ABS Material, Adjustable, Ventilated, UV Protection"
                    rows="3"
                  />
                </calcite-label>

                <calcite-label>
                  Description
                  <calcite-text-area
                    value={formData.description}
                    onInput={(e) => handleChange('description', e.target.value)}
                    placeholder="Brief description of the product..."
                    rows="4"
                  />
                </calcite-label>
              </div>

              {/* Right Column - Image Upload & Preview */}
              <div>
                <calcite-label>Product Image *</calcite-label>
                <div style={{ marginTop: '8px' }}>
                  {!formData.image ? (
                    <div style={{
                      border: '2px dashed var(--calcite-ui-border-2)',
                      borderRadius: '4px',
                      padding: '40px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      height: '400px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'var(--calcite-ui-foreground-2)'
                    }}
                    onClick={() => fileInputRef.current.click()}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--calcite-ui-brand)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--calcite-ui-border-2)'}
                    >
                      <calcite-icon icon="image-plus" scale="l" style={{ marginBottom: '16px' }}></calcite-icon>
                      <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>
                        Click to upload product image
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  ) : (
                    <calcite-card>
                      <img 
                        slot="thumbnail"
                        src={formData.image}
                        alt="Product preview"
                        style={{ height: '300px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                        <calcite-button
                          appearance="outline"
                          icon-start="image"
                          onClick={() => fileInputRef.current.click()}
                          style={{ flex: 1 }}
                        >
                          Change Image
                        </calcite-button>
                        <calcite-button
                          appearance="outline"
                          kind="danger"
                          icon-start="trash"
                          onClick={() => handleChange('image', '')}
                        >
                          Remove
                        </calcite-button>
                      </div>
                    </calcite-card>
                  )}
                  
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>

                {formData.image && (
                  <calcite-notice open icon="lightbulb" kind="brand" style={{ marginTop: '16px' }}>
                    <div slot="message">
                      Image uploaded successfully. You can change it anytime before saving.
                    </div>
                  </calcite-notice>
                )}
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid var(--calcite-ui-border-2)'
            }}>
              <calcite-button 
                type="submit"
                icon-start="save"
                loading={loading}
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? 'Creating Product...' : 'Create Product'}
              </calcite-button>
              <calcite-button 
                appearance="outline"
                onClick={handleReset}
                disabled={loading}
              >
                Reset Form
              </calcite-button>
              <calcite-button 
                appearance="outline"
                kind="neutral"
                onClick={() => navigate('/admin/product-list')}
                disabled={loading}
              >
                Cancel
              </calcite-button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Crop Modal */}
      <calcite-modal 
        open={cropModalOpen}
        onCalciteModalClose={() => setCropModalOpen(false)}
        width-scale="l"
      >
        <div slot="header">Crop & Adjust Image</div>
        <div slot="content" style={{ padding: '20px' }}>
          {imageToCrop && (
            <div>
              <calcite-notice open icon="information" kind="info" style={{ marginBottom: '16px' }}>
                <div slot="message">
                  Adjust the zoom level to fit your image. The image will be cropped to 16:9 ratio.
                </div>
              </calcite-notice>

              <div style={{ 
                width: '100%',
                height: '450px',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px'
                }}>
                  <img 
                    src={imageToCrop}
                    alt="Crop preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      transform: `scale(${cropData.zoom})`,
                      transition: 'transform 0.1s ease'
                    }}
                  />
                </div>

                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  paddingBottom: '45%',
                  border: '2px dashed #ff6b00',
                  pointerEvents: 'none',
                  borderRadius: '4px'
                }}></div>
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

              <p style={{ 
                fontSize: '13px', 
                color: 'var(--calcite-ui-text-3)',
                marginTop: '12px',
                textAlign: 'center'
              }}>
                💡 Tip: Use the zoom slider to adjust the image size within the orange guide box
              </p>
            </div>
          )}
        </div>
        <calcite-button slot="primary" icon-start="check" onClick={applyCrop}>
          Apply & Continue
        </calcite-button>
        <calcite-button slot="secondary" appearance="outline" onClick={() => setCropModalOpen(false)}>
          Cancel
        </calcite-button>
      </calcite-modal>
    </calcite-shell>
  );
}