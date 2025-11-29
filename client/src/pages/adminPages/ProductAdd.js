import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-input-text';
import '@esri/calcite-components/components/calcite-input-number';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-modal';
import '@esri/calcite-components/components/calcite-chip';

export default function AdminProductAdd() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Safety Helmets',
    workerType: 'Engineer',
    color: '',
    price: '',
    stock: '',
    features: '',
    image: null,
    imagePreview: null
  });

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [cropData, setCropData] = useState({ zoom: 1, x: 0, y: 0 });
  const [errors, setErrors] = useState({});
  const [successNotice, setSuccessNotice] = useState(false);

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

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'Please select a valid image file' });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempImage(event.target.result);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyCrop = () => {
    setFormData({ 
      ...formData, 
      image: tempImage,
      imagePreview: tempImage 
    });
    setCropModalOpen(false);
    setTempImage(null);
    setCropData({ zoom: 1, x: 0, y: 0 });
    if (errors.image) {
      setErrors({ ...errors, image: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.color) newErrors.color = 'Color is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock quantity is required';
    if (!formData.image) newErrors.image = 'Product image is required';
    if (!formData.features.trim()) newErrors.features = 'At least one feature is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send data to your backend
      console.log('Product Data:', {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f)
      });
      
      setSuccessNotice(true);
      setTimeout(() => {
        navigate('/admin/product-list');
      }, 2000);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/admin/product-list');
    }
  };

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />
      
      <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
              Add New Product
            </h1>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
              Fill in the product details below
            </p>
          </div>

          {/* Success Notice */}
          {successNotice && (
            <div style={{ marginBottom: '20px' }}>
              <calcite-notice open icon="check-circle" kind="success">
                <div slot="title">Product Added Successfully!</div>
                <div slot="message">Redirecting to product list...</div>
              </calcite-notice>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '24px' }}>
              {/* Image Upload Section */}
              <calcite-card>
                <div slot="heading">Product Image</div>
                <div slot="description">Upload and adjust your product image (Ratio: 16:9)</div>
                
                <div style={{ padding: '20px' }}>
                  {formData.imagePreview ? (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        width: '100%',
                        maxWidth: '400px',
                        margin: '0 auto 16px',
                        border: '2px solid var(--calcite-ui-border-2)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <img 
                          src={formData.imagePreview}
                          alt="Product preview"
                          style={{ 
                            width: '100%',
                            height: '225px',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <calcite-button
                        icon-start="image"
                        appearance="outline"
                        onClick={() => fileInputRef.current.click()}
                      >
                        Change Image
                      </calcite-button>
                    </div>
                  ) : (
                    <div 
                      style={{ 
                        border: '2px dashed var(--calcite-ui-border-2)',
                        borderRadius: '8px',
                        padding: '40px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: 'var(--calcite-ui-foreground-2)'
                      }}
                      onClick={() => fileInputRef.current.click()}
                    >
                      <calcite-icon icon="image-plus" scale="l" style={{ marginBottom: '12px' }}></calcite-icon>
                      <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>
                        Click to upload product image
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                  />
                  
                  {errors.image && (
                    <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginTop: '12px' }}>
                      <div slot="message">{errors.image}</div>
                    </calcite-notice>
                  )}
                </div>
              </calcite-card>

              {/* Basic Information */}
              <calcite-card>
                <div slot="heading">Basic Information</div>
                
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <calcite-label status={errors.name ? 'invalid' : 'idle'}>
                    Product Name *
                    <calcite-input-text
                      placeholder="e.g., Engineer Safety Helmet"
                      value={formData.name}
                      onCalciteInputTextChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    {errors.name && (
                      <span style={{ color: 'var(--calcite-ui-danger)', fontSize: '12px' }}>
                        {errors.name}
                      </span>
                    )}
                  </calcite-label>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <calcite-label>
                      Category *
                      <calcite-select
                        value={formData.category}
                        onCalciteSelectChange={(e) => handleInputChange('category', e.target.value)}
                      >
                        {categories.map(cat => (
                          <calcite-option key={cat} value={cat}>{cat}</calcite-option>
                        ))}
                      </calcite-select>
                    </calcite-label>

                    <calcite-label>
                      Worker Type *
                      <calcite-select
                        value={formData.workerType}
                        onCalciteSelectChange={(e) => handleInputChange('workerType', e.target.value)}
                      >
                        {workerTypes.map(type => (
                          <calcite-option key={type} value={type}>{type}</calcite-option>
                        ))}
                      </calcite-select>
                    </calcite-label>
                  </div>

                  <calcite-label status={errors.color ? 'invalid' : 'idle'}>
                    Color *
                    <calcite-select
                      value={formData.color}
                      onCalciteSelectChange={(e) => handleInputChange('color', e.target.value)}
                    >
                      <calcite-option value="">Select Color</calcite-option>
                      {colors.map(color => (
                        <calcite-option key={color} value={color}>{color}</calcite-option>
                      ))}
                    </calcite-select>
                    {errors.color && (
                      <span style={{ color: 'var(--calcite-ui-danger)', fontSize: '12px' }}>
                        {errors.color}
                      </span>
                    )}
                  </calcite-label>
                </div>
              </calcite-card>

              {/* Pricing & Stock */}
              <calcite-card>
                <div slot="heading">Pricing & Inventory</div>
                
                <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <calcite-label status={errors.price ? 'invalid' : 'idle'}>
                    Price (LKR) *
                    <calcite-input-number
                      placeholder="2500"
                      value={formData.price}
                      min="0"
                      onCalciteInputNumberChange={(e) => handleInputChange('price', e.target.value)}
                    />
                    {errors.price && (
                      <span style={{ color: 'var(--calcite-ui-danger)', fontSize: '12px' }}>
                        {errors.price}
                      </span>
                    )}
                  </calcite-label>

                  <calcite-label status={errors.stock ? 'invalid' : 'idle'}>
                    Stock Quantity *
                    <calcite-input-number
                      placeholder="100"
                      value={formData.stock}
                      min="0"
                      onCalciteInputNumberChange={(e) => handleInputChange('stock', e.target.value)}
                    />
                    {errors.stock && (
                      <span style={{ color: 'var(--calcite-ui-danger)', fontSize: '12px' }}>
                        {errors.stock}
                      </span>
                    )}
                  </calcite-label>
                </div>
              </calcite-card>

              {/* Features */}
              <calcite-card>
                <div slot="heading">Product Features</div>
                <div slot="description">Enter features separated by commas</div>
                
                <div style={{ padding: '20px' }}>
                  <calcite-label status={errors.features ? 'invalid' : 'idle'}>
                    Features *
                    <calcite-text-area
                      placeholder="e.g., ABS Material, Adjustable, Ventilated, UV Protection"
                      value={formData.features}
                      rows="4"
                      onCalciteTextAreaChange={(e) => handleInputChange('features', e.target.value)}
                    />
                    {errors.features && (
                      <span style={{ color: 'var(--calcite-ui-danger)', fontSize: '12px' }}>
                        {errors.features}
                      </span>
                    )}
                  </calcite-label>
                  
                  {formData.features && (
                    <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {formData.features.split(',').map((feature, idx) => 
                        feature.trim() && (
                          <calcite-chip key={idx} scale="s" appearance="outline">
                            {feature.trim()}
                          </calcite-chip>
                        )
                      )}
                    </div>
                  )}
                </div>
              </calcite-card>

              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                justifyContent: 'flex-end',
                paddingTop: '8px'
              }}>
                <calcite-button 
                  appearance="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </calcite-button>
                <calcite-button 
                  type="submit"
                  icon-start="save"
                >
                  Add Product
                </calcite-button>
              </div>
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
          {tempImage && (
            <div>
              <calcite-notice open icon="information" kind="info" style={{ marginBottom: '16px' }}>
                <div slot="message">
                  Adjust the zoom level to fit your image. The image will be cropped to 16:9 ratio (same as product cards).
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
                    src={tempImage}
                    alt="Crop preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      transform: `scale(${cropData.zoom}) translate(${cropData.x}px, ${cropData.y}px)`,
                      transition: 'transform 0.1s ease'
                    }}
                  />
                </div>

                {/* 16:9 Crop Guide Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  paddingBottom: '45%', // 16:9 ratio
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
                  style={{ 
                    width: '100%',
                    marginTop: '8px'
                  }}
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