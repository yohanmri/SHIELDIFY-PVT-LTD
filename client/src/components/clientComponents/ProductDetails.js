// ============================================
// FILE: ProductDetails.js (CLIENT SIDE)
// Path: src/components/clientComponents/ProductDetails.js
// ============================================
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import API from '../../api/axios';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/productDetails.css';

export default function ProductDetails({ setPage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const getColorClass = (color) => {
    return 'color-' + color.toLowerCase().replace(/[\/\s]/g, '-');
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/products/${id}`);
      const productData = response.data.data;
      setProduct(productData);

      const allProductsResponse = await API.get('/products');
      const allProds = allProductsResponse.data.data;
      setAllProducts(allProds);

      const related = allProds
        .filter(p => p.category === productData.category && p._id !== id)
        .slice(0, 4);
      setRelatedProducts(related);

      setError(null);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      itemType: 'product'
    };

    addToCart(cartItem, quantity);
    setShowSuccessMessage(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    // Reset quantity
    setQuantity(1);
  };

  const handleRelatedProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <calcite-loader scale="l"></calcite-loader>
        <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '24px' }}>
        <calcite-notice open icon="exclamation-mark-triangle" kind="danger">
          <div slot="title">Error</div>
          <div slot="message">{error || 'Product not found'}</div>
        </calcite-notice>
        <calcite-button
          appearance="solid"
          icon-start="arrow-left"
          onClick={() => navigate(-1)}
          style={{ marginTop: '16px' }}
        >
          Go Back
        </calcite-button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>



        {/* Main Content Grid - Sidebar + Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '24px'
        }}>

          {/* Left Sidebar - Filters (Like ProductsCard) */}
          <aside>
            <calcite-panel heading="Product Details">
              {/* Back Button */}
              <calcite-button
                icon-start="arrow-left"
                appearance="outline"
                onClick={() => navigate(-1)}
                style={{ marginBottom: '24px' }}
              >
                Back to Products
              </calcite-button>
              {/* Search */}
              {/* <calcite-block heading="Search" open>
                <calcite-input
                  type="text"
                  placeholder="Search products..."
                  icon="search"
                  clearable
                />
              </calcite-block> */}

              {/* Category Filter */}
              {/* <calcite-block heading="Category" collapsible open>
                <calcite-label layout="inline-space-between">
                  <calcite-select label="Select Category">
                    <calcite-option value="all">All Categories</calcite-option>
                    {[...new Set(allProducts.map(p => p.category))].map(cat => (
                      <calcite-option key={cat} value={cat}>{cat}</calcite-option>
                    ))}
                  </calcite-select>
                </calcite-label>
              </calcite-block> */}

              {/* Worker Type Filter */}
              {/* <calcite-block heading="Worker Type" collapsible open>
                <calcite-label layout="inline-space-between">
                  <calcite-select label="Select Worker Type">
                    <calcite-option value="all">All Workers</calcite-option>
                    {[...new Set(allProducts.map(p => p.workerType))].map(type => (
                      <calcite-option key={type} value={type}>{type}</calcite-option>
                    ))}
                  </calcite-select>
                </calcite-label>
              </calcite-block> */}

              {/* Active Filters */}
              {/* <calcite-block heading="Active Filters" open>
                <div style={{ padding: '0.5rem 0', fontSize: '0.875rem', color: '#4a4a4a' }}>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>{relatedProducts.length}</strong> products found
                  </p>
                </div>
              </calcite-block> */}

              {/* Reset Button */}
              {/* <div style={{ padding: '0.75rem' }}>
                <calcite-button
                  width="full"
                  appearance="outline"
                  icon-start="refresh"
                >
                  Reset Filters
                </calcite-button>
              </div> */}

              {/* Help Section */}
              <calcite-block heading="Need Help?" open>
                <div style={{ padding: '0.5rem 0' }}>
                  <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--calcite-ui-text-2)' }}>
                    Contact our safety experts
                  </p>
                  <calcite-button
                    width="full"
                    appearance="solid"
                    onClick={() => setPage && setPage('contact')}
                    icon-start="phone"
                    scale="s"
                  >
                    Contact Us
                  </calcite-button>
                </div>
              </calcite-block>
            </calcite-panel>
          </aside>

          {/* Right Column - Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Header Section */}
            <div>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: '700', color: 'var(--calcite-ui-text-1)' }}>
                {product.name}
              </h1>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <calcite-chip appearance="solid" scale="s">{product.category}</calcite-chip>
                <calcite-chip appearance="outline" scale="s">{product.workerType}</calcite-chip>
                <calcite-chip
                  appearance="outline"
                  kind={product.stock > 0 ? 'brand' : 'danger'}
                  scale="s"
                >
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </calcite-chip>
              </div>
            </div>

            {/* Main Grid - Image + Details */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
            }}>

              {/* Left - Image */}
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

              {/* Right - Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Price */}
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

                {/* Inquiry Section */}
                <calcite-card>
                  <div slot="heading">Request Quote</div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--calcite-ui-text-1)'
                      }}>
                        Quantity
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: 'fit-content' }}>
                        <calcite-button
                          appearance="outline"
                          icon-only
                          scale="s"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <calcite-icon icon="minus"></calcite-icon>
                        </calcite-button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          style={{
                            width: '60px',
                            textAlign: 'center',
                            border: '1px solid var(--calcite-ui-border-2)',
                            borderRadius: '4px',
                            padding: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            outline: 'none'
                          }}
                        />
                        <calcite-button
                          appearance="outline"
                          icon-only
                          scale="s"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <calcite-icon icon="plus"></calcite-icon>
                        </calcite-button>
                      </div>
                    </div>

                    <calcite-button
                      appearance="solid"
                      width="full"
                      icon-end="shopping-cart"
                      onClick={handleAddToCart}
                    >
                      Add to Cart ({quantity} Unit{quantity !== 1 ? 's' : ''})
                    </calcite-button>

                    {showSuccessMessage && (
                      <div style={{
                        padding: '12px',
                        background: '#00a884',
                        color: 'white',
                        borderRadius: '4px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        ✓ Added to cart successfully!
                      </div>
                    )}

                    <p style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      color: 'var(--calcite-ui-text-3)',
                      textAlign: 'center'
                    }}>
                      View cart to submit your inquiry
                    </p>
                  </div>
                </calcite-card>
              </div>
            </div>

            {/* Description Section */}
            {product.description && (
              <calcite-card>
                <div slot="heading">About This Product</div>
                <div style={{ padding: '20px' }}>
                  <p style={{ margin: 0, lineHeight: '1.6', color: 'var(--calcite-ui-text-1)' }}>
                    {product.description}
                  </p>
                </div>
              </calcite-card>
            )}

            {/* Features Section */}
            {product.features && product.features.length > 0 && (
              <calcite-card>
                <div slot="heading">Features</div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {Array.isArray(product.features) ? (
                      product.features.map((feature, index) => (
                        <calcite-chip key={index} scale="m" appearance="outline">
                          {feature}
                        </calcite-chip>
                      ))
                    ) : (
                      <p style={{ margin: 0, color: 'var(--calcite-ui-text-3)' }}>
                        No features listed
                      </p>
                    )}
                  </div>
                </div>
              </calcite-card>
            )}

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <calcite-card>
                <div slot="heading">Related Products</div>
                <div style={{ padding: '20px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '16px'
                  }}>
                    {relatedProducts.map(relatedProduct => (
                      <div
                        key={relatedProduct._id}
                        onClick={() => handleRelatedProductClick(relatedProduct._id)}
                        style={{
                          border: '1px solid var(--calcite-ui-border-2)',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#0284c7';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(2, 132, 199, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--calcite-ui-border-2)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '12px' }}>
                          <p style={{ margin: '0 0 4px 0', fontSize: '0.875rem', fontWeight: '600', color: 'var(--calcite-ui-text-1)' }}>
                            {relatedProduct.name}
                          </p>
                          <p style={{ margin: '0 0 8px 0', fontSize: '0.75rem', color: 'var(--calcite-ui-text-3)' }}>
                            {relatedProduct.category}
                          </p>
                          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#ff6b00' }}>
                            LKR {relatedProduct.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </calcite-card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}