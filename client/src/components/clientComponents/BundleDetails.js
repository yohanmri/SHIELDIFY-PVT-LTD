// ============================================
// FILE: BundleDetails.js (CLIENT SIDE)
// Path: src/components/clientComponents/BundleDetails.js
// ============================================
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getPublicBundleById, getPublicBundles } from '../../api/axios';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/productDetails.css';
import '../../styles/clientStyles/bundleDetails.css';

export default function BundleDetails({ setPage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBundles, setRelatedBundles] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [allBundles, setAllBundles] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchBundle();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchBundle = async () => {
    try {
      setLoading(true);
      const response = await getPublicBundleById(id);
      const bundleData = response.data.data;
      setBundle(bundleData);

      const allBundlesResponse = await getPublicBundles();
      const allBndls = allBundlesResponse.data.data;
      setAllBundles(allBndls);

      const related = allBndls
        .filter(b => b.category === bundleData.category && b._id !== id && b.isActive)
        .slice(0, 3);
      setRelatedBundles(related);

      setError(null);
    } catch (err) {
      console.error('Error fetching bundle:', err);
      setError('Failed to load bundle details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscount = (original, discount) => {
    if (!original || !discount) return 0;
    return Math.round(((original - discount) / original) * 100);
  };

  const calculateSavings = (original, discount) => {
    return (original || 0) - (discount || 0);
  };

  const calculateTotalSavings = () => {
    return calculateSavings(bundle.originalPrice, bundle.discountPrice) * quantity;
  };

  const calculateTotalPrice = () => {
    return bundle.discountPrice * quantity;
  };

  const handleAddToCart = () => {
    if (!bundle) return;

    const cartItem = {
      _id: bundle._id,
      name: bundle.name,
      price: bundle.discountPrice,
      image: bundle.image,
      itemType: 'bundle'
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

  const handleRelatedBundleClick = (bundleId) => {
    navigate(`/bundle/${bundleId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <calcite-loader scale="l"></calcite-loader>
        <p className="loading-text">Loading bundle details...</p>
      </div>
    );
  }

  if (error || !bundle) {
    return (
      <div className="error-container">
        <calcite-notice open icon="exclamation-mark-triangle" kind="danger">
          <div slot="title">Error</div>
          <div slot="message">{error || 'Bundle not found'}</div>
        </calcite-notice>
        <calcite-button
          appearance="solid"
          icon-start="arrow-left"
          onClick={() => navigate(-1)}
          className="back-button"
        >
          Go Back
        </calcite-button>
      </div>
    );
  }

  return (
    <div className="bundle-details-container">
      <div className="bundle-details-wrapper">

        {/* Main Content Grid - Sidebar + Content */}
        <div className="bundle-main-grid">

          {/* Left Sidebar */}
          <aside>
            <calcite-panel heading="Bundle Details">
              {/* Back Button */}
              <calcite-button
                icon-start="arrow-left"
                appearance="outline"
                onClick={() => navigate(-1)}

                style={{ margin: '12px' }}
              >
                Back to Bundles
              </calcite-button>

              {/* Bundle Stats */}
              <calcite-block heading="Bundle Stats" open>
                <div className="stats-content">
                  <div className="stats-gradient-box">
                    <div className="stats-discount-section">
                      <p className="stats-label">Your Discount</p>
                      <p className="stats-discount-value">
                        {calculateDiscount(bundle.originalPrice, bundle.discountPrice)}% OFF
                      </p>
                    </div>
                    <div>
                      <p className="stats-label">You Save</p>
                      <p className="stats-savings-value">
                        LKR {calculateSavings(bundle.originalPrice, bundle.discountPrice).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="stats-info-box">
                    <div className="stats-info-row">
                      <span className="stats-info-label">Items Included</span>
                      <span className="stats-info-value">{bundle.quantity}</span>
                    </div>
                    <div className="stats-info-row">
                      <span className="stats-info-label">Category</span>
                      <span className="stats-info-value">{bundle.category}</span>
                    </div>
                  </div>
                </div>
              </calcite-block>

              {/* Why This Bundle */}
              <calcite-block heading="Why Choose This?" open>
                <div className="stats-content">
                  <ul className="benefits-list">
                    <li>Best value for money</li>
                    <li>Complete safety solution</li>
                    <li>Ready-to-use package</li>
                    <li>Bulk discount applied</li>
                    <li>Fast delivery available</li>
                  </ul>
                </div>
              </calcite-block>

              {/* Help Section */}
              <calcite-block heading="Need Help?" open>
                <div className="stats-content">
                  <p className="help-text">
                    Questions about this bundle? Our experts can help!
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

              {/* Trust Badges */}
              <calcite-block heading="Why Trust Us?" open>
                <div className="trust-badges">
                  <div className="trust-badge-item">
                    <calcite-icon icon="check-circle" scale="s"></calcite-icon>
                    <span className="trust-badge-text">Authentic Products</span>
                  </div>
                  <div className="trust-badge-item">
                    <calcite-icon icon="check-circle" scale="s"></calcite-icon>
                    <span className="trust-badge-text">Fast Delivery</span>
                  </div>
                  <div className="trust-badge-item">
                    <calcite-icon icon="check-circle" scale="s"></calcite-icon>
                    <span className="trust-badge-text">Expert Support</span>
                  </div>
                  <div className="trust-badge-item">
                    <calcite-icon icon="check-circle" scale="s"></calcite-icon>
                    <span className="trust-badge-text">Best Prices</span>
                  </div>
                </div>
              </calcite-block>
            </calcite-panel>
          </aside>

          {/* Right Column - Main Content */}
          <div className="bundle-content-column">

            {/* Header Section */}
            <div className="bundle-header">
              <div className="bundle-header-content">
                <div className="bundle-chips">
                  <div className="bundle-tag">
                    <calcite-icon icon="apps" scale="s"></calcite-icon>
                    <span>{bundle.category}</span>
                  </div>
                  <div className="bundle-tag">
                    <calcite-icon icon="collection" scale="s"></calcite-icon>
                    <span>{bundle.quantity} Items</span>
                  </div>
                  <div className="bundle-tag bundle-tag-discount">
                    <calcite-icon icon="tag" scale="s"></calcite-icon>
                    <span>{calculateDiscount(bundle.originalPrice, bundle.discountPrice)}% OFF</span>
                  </div>
                </div>
                <h1 className="bundle-title">{bundle.name}</h1>
                {bundle.description && (
                  <p className="bundle-description">{bundle.description}</p>
                )}
              </div>
            </div>

            {/* Main Grid - Image + Pricing */}
            <div className="image-pricing-grid">

              {/* Left Column - Image and Why Choose */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Image Card */}
                <calcite-card>
                  <div slot="heading">Bundle Contents</div>
                  <div className="bundle-image-wrapper">
                    <img
                      src={bundle.image}
                      alt={bundle.name}
                      className="bundle-image"
                    />
                    <div className="bundle-image-badge">
                      <p className="badge-label">Complete Package</p>
                      <p className="badge-value">{bundle.quantity} Items</p>
                    </div>
                  </div>
                </calcite-card>

                {/* Why Choose Card */}
                <calcite-card>
                  <div slot="heading">Why Choose This Bundle?</div>
                  <div className="why-choose-section">
                    <ul className="why-choose-list">
                      <li className="why-choose-item">
                        <calcite-icon icon="dollar" scale="s" className="why-choose-icon"></calcite-icon>
                        <div className="why-choose-content">
                          <h4 className="why-choose-title">Best Value</h4>
                          <p className="why-choose-text">
                            Save {calculateDiscount(bundle.originalPrice, bundle.discountPrice)}% compared to individual purchase
                          </p>
                        </div>
                      </li>
                      <li className="why-choose-item">
                        <calcite-icon icon="layer" scale="s" className="why-choose-icon"></calcite-icon>
                        <div className="why-choose-content">
                          <h4 className="why-choose-title">Complete Solution</h4>
                          <p className="why-choose-text">
                            Everything you need in one convenient package
                          </p>
                        </div>
                      </li>
                      <li className="why-choose-item">
                        <calcite-icon icon="clock" scale="s" className="why-choose-icon"></calcite-icon>
                        <div className="why-choose-content">
                          <h4 className="why-choose-title">Time Saving</h4>
                          <p className="why-choose-text">
                            No need to shop for items separately
                          </p>
                        </div>
                      </li>
                      <li className="why-choose-item">
                        <calcite-icon icon="bookmark" scale="s" className="why-choose-icon"></calcite-icon>
                        <div className="why-choose-content">
                          <h4 className="why-choose-title">Quality Assured</h4>
                          <p className="why-choose-text">
                            All items meet safety standards
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </calcite-card>
              </div>

              {/* Right - Pricing & Order */}
              <div className="pricing-column">

                {/* Pricing Card */}
                <calcite-card>
                  <div slot="heading">Bundle Pricing</div>
                  <div className="pricing-content">
                    <div className="pricing-showcase">
                      <p className="original-price">
                        Original Price: LKR {bundle.originalPrice.toLocaleString()}
                      </p>
                      <p className="discount-price">
                        LKR {bundle.discountPrice.toLocaleString()}
                      </p>
                      <div className="savings-badge">
                        Save LKR {calculateSavings(bundle.originalPrice, bundle.discountPrice).toLocaleString()}
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="price-breakdown">
                      <div className="breakdown-row">
                        <span className="breakdown-label">Price per bundle</span>
                        <span className="breakdown-value">
                          LKR {bundle.discountPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="breakdown-row">
                        <span className="breakdown-label">Items per bundle</span>
                        <span className="breakdown-value">{bundle.quantity} items</span>
                      </div>
                    </div>
                  </div>
                </calcite-card>

                {/* Order Card */}
                <calcite-card>
                  <div slot="heading">Request Your Quote</div>
                  <div className="order-content">

                    {/* Quantity Selector */}
                    <div>
                      <label className="quantity-label">Number of Bundles</label>
                      <div className="quantity-selector">
                        <calcite-button
                          appearance="outline"
                          icon-only
                          scale="l"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <calcite-icon icon="minus"></calcite-icon>
                        </calcite-button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="quantity-input"
                        />
                        <calcite-button
                          appearance="outline"
                          icon-only
                          scale="l"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <calcite-icon icon="plus"></calcite-icon>
                        </calcite-button>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                      <div className="summary-row">
                        <span className="summary-label">Total Items:</span>
                        <span className="summary-value primary">
                          {quantity * bundle.quantity} items
                        </span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Total Price:</span>
                        <span className="summary-value danger">
                          LKR {calculateTotalPrice().toLocaleString()}
                        </span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Total Savings:</span>
                        <span className="summary-value success">
                          LKR {calculateTotalSavings().toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <calcite-button
                      appearance="solid"
                      width="full"
                      scale="l"
                      icon-end="shopping-cart"
                      onClick={handleAddToCart}
                    >
                      Add to Cart ({quantity} Bundle{quantity !== 1 ? 's' : ''})
                    </calcite-button>

                    {showSuccessMessage && (
                      <div style={{
                        padding: '12px',
                        background: '#00a884',
                        color: 'white',
                        borderRadius: '4px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginTop: '12px'
                      }}>
                        ✓ Added to cart successfully!
                      </div>
                    )}

                    <div className="info-box">
                      <calcite-icon icon="information" scale="s"></calcite-icon>
                      <p className="info-text">
                        View cart to submit your inquiry
                      </p>
                    </div>
                  </div>
                </calcite-card>
              </div>
            </div>

            {/* Related Bundles Section */}
            {relatedBundles.length > 0 && (
              <calcite-card>
                <div slot="heading">Other Bundles You Might Like</div>
                <div style={{ padding: '20px' }}>
                  <div className="related-grid">
                    {relatedBundles.map(relatedBundle => (
                      <div
                        key={relatedBundle._id}
                        onClick={() => handleRelatedBundleClick(relatedBundle._id)}
                        className="related-bundle-card"
                      >
                        <div className="related-discount-badge">
                          {calculateDiscount(relatedBundle.originalPrice, relatedBundle.discountPrice)}% OFF
                        </div>
                        <img
                          src={relatedBundle.image}
                          alt={relatedBundle.name}
                          className="related-image"
                        />
                        <div className="related-content">
                          <p className="related-category">{relatedBundle.category}</p>
                          <p className="related-name">{relatedBundle.name}</p>
                          <div className="related-items">
                            <calcite-icon icon="collection" scale="s"></calcite-icon>
                            <span className="related-items-text">{relatedBundle.quantity} items</span>
                          </div>
                          <div className="related-pricing">
                            <div>
                              <p className="related-original-price">
                                LKR {relatedBundle.originalPrice.toLocaleString()}
                              </p>
                              <p className="related-discount-price">
                                LKR {relatedBundle.discountPrice.toLocaleString()}
                              </p>
                            </div>
                            <calcite-button
                              appearance="outline"
                              scale="s"
                              icon-end="arrow-right"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRelatedBundleClick(relatedBundle._id);
                              }}
                            >
                              View
                            </calcite-button>
                          </div>
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