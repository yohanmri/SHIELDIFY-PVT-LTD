import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import SuccessNotification from './SuccessNotification';
import API from '../api/axios';
import '@esri/calcite-components/components/calcite-modal';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-action';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-loader';

export default function CartModal({ open, onClose }) {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        notes: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successData, setSuccessData] = useState(null);

    const handleQuantityChange = (itemId, itemType, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(itemId, itemType);
        } else {
            updateQuantity(itemId, itemType, newQuantity);
        }
    };

    const handleSendInquiryClick = () => {
        if (cart.length === 0) return;
        setShowInquiryForm(true);
    };

    const validateForm = () => {
        const newErrors = {};

        // Name is optional now
        // if (!formData.customerName.trim()) {
        //     newErrors.customerName = 'Name is required';
        // }

        // Email is optional now
        if (formData.customerEmail.trim() && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.customerEmail)) {
            newErrors.customerEmail = 'Please enter a valid email';
        }

        if (!formData.customerPhone.trim()) {
            newErrors.customerPhone = 'Phone number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const orderData = {
                customerName: formData.customerName.trim() || 'Guest', // Default to Guest if empty
                customerEmail: formData.customerEmail.trim() || 'No Email', // Default if empty
                customerPhone: formData.customerPhone.trim(),
                notes: formData.notes.trim(),
                items: cart.map(item => ({
                    itemType: item.itemType,
                    itemId: item.itemId,
                    quantity: item.quantity
                }))
            };

            const response = await API.post('/orders', orderData);

            if (response.data.success) {
                // Store success data
                setSuccessData({
                    orderReference: response.data.data.orderReference,
                    customerEmail: response.data.data.customerEmail,
                    customerPhone: response.data.data.customerPhone
                });

                // Show success notification
                setShowSuccess(true);

                // Reset form and cart
                setFormData({
                    customerName: '',
                    customerEmail: '',
                    customerPhone: '',
                    notes: ''
                });

                clearCart();
                setShowInquiryForm(false);

                // Close modal after showing success
                setTimeout(() => {
                    onClose();
                }, 3000);
            }
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            setSubmitError(error.response?.data?.message || 'Failed to submit inquiry. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error for this field
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleBackToCart = () => {
        setShowInquiryForm(false);
        setErrors({});
        setSubmitError('');
    };

    return (
        <>
            <calcite-modal
                open={open}
                onCalciteModalClose={onClose}
                aria-labelledby="cart-modal-title"
                scale="l"
                width-scale="m"
            >
                <div slot="header" id="cart-modal-title" style={{ fontSize: '20px', fontWeight: '600' }}>
                    {showInquiryForm ? 'Contact Information' : `Your Cart (${cart.length} ${cart.length === 1 ? 'item' : 'items'})`}
                </div>

                <div slot="content" style={{ padding: showInquiryForm ? '20px' : '0' }}>
                    {!showInquiryForm ? (
                        // CART VIEW
                        cart.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '60px 20px',
                                color: 'var(--calcite-ui-text-3)'
                            }}>
                                <calcite-icon icon="shopping-cart" scale="l" style={{ marginBottom: '16px' }}></calcite-icon>
                                <p style={{ fontSize: '16px', margin: '0' }}>Your cart is empty</p>
                                <p style={{ fontSize: '14px', margin: '8px 0 0 0' }}>Add products or bundles to get started</p>
                            </div>
                        ) : (
                            <div>
                                {cart.map((item) => (
                                    <div
                                        key={`${item.itemType}-${item.itemId}`}
                                        style={{
                                            display: 'flex',
                                            gap: '16px',
                                            padding: '16px',
                                            borderBottom: '1px solid var(--calcite-ui-border-3)',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {/* Item Image */}
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.itemName}
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px',
                                                    flexShrink: 0
                                                }}
                                            />
                                        )}

                                        {/* Item Details */}
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>
                                                {item.itemName}
                                            </div>
                                            <div style={{ fontSize: '13px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                                                {item.itemType === 'product' ? 'Product' : 'Bundle'}
                                            </div>
                                            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                                                LKR {(item.price || 0).toLocaleString()}
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <calcite-button
                                                appearance="outline"
                                                icon-start="minus"
                                                scale="s"
                                                onClick={() => handleQuantityChange(item.itemId, item.itemType, item.quantity - 1)}
                                            ></calcite-button>
                                            <span style={{
                                                minWidth: '40px',
                                                textAlign: 'center',
                                                fontSize: '16px',
                                                fontWeight: '600'
                                            }}>
                                                {item.quantity}
                                            </span>
                                            <calcite-button
                                                appearance="outline"
                                                icon-start="plus"
                                                scale="s"
                                                onClick={() => handleQuantityChange(item.itemId, item.itemType, item.quantity + 1)}
                                            ></calcite-button>
                                        </div>

                                        {/* Remove Button */}
                                        <calcite-action
                                            icon="trash"
                                            text="Remove"
                                            onClick={() => removeFromCart(item.itemId, item.itemType)}
                                            scale="s"
                                        ></calcite-action>
                                    </div>
                                ))}

                                {/* Total */}
                                <div style={{
                                    padding: '20px',
                                    background: 'var(--calcite-ui-foreground-2)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ fontSize: '18px', fontWeight: '600' }}>Total:</span>
                                    <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                                        LKR {(getCartTotal() || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )
                    ) : (
                        // INQUIRY FORM VIEW
                        <div>
                            <p style={{
                                margin: '0 0 20px 0',
                                fontSize: '14px',
                                color: 'var(--calcite-ui-text-3)'
                            }}>
                                Please provide your contact details so our team can reach you about your inquiry.
                            </p>

                            {submitError && (
                                <div style={{
                                    background: '#fee2e2',
                                    border: '1px solid #ef4444',
                                    borderRadius: '4px',
                                    padding: '12px',
                                    marginBottom: '16px',
                                    color: '#991b1b',
                                    fontSize: '14px'
                                }}>
                                    {submitError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '16px' }}>
                                    <input
                                        type="text"
                                        placeholder="Name / Organization (Optional)"
                                        value={formData.customerName}
                                        onChange={(e) => handleChange('customerName', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            fontSize: '14px',
                                            border: errors.customerName ? '2px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '4px',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#0079c1'}
                                        onBlur={(e) => e.target.style.borderColor = errors.customerName ? '#ef4444' : '#d1d5db'}
                                    />
                                    {errors.customerName && (
                                        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                                            {errors.customerName}
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <input
                                        type="tel"
                                        placeholder="Contact Number (Required)"
                                        value={formData.customerPhone}
                                        onChange={(e) => handleChange('customerPhone', e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            fontSize: '14px',
                                            border: errors.customerPhone ? '2px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '4px',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#0079c1'}
                                        onBlur={(e) => e.target.style.borderColor = errors.customerPhone ? '#ef4444' : '#d1d5db'}
                                    />
                                    {errors.customerPhone && (
                                        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                                            {errors.customerPhone}
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <input
                                        type="email"
                                        placeholder="Email Address (Optional)"
                                        value={formData.customerEmail}
                                        onChange={(e) => handleChange('customerEmail', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            fontSize: '14px',
                                            border: errors.customerEmail ? '2px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '4px',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#0079c1'}
                                        onBlur={(e) => e.target.style.borderColor = errors.customerEmail ? '#ef4444' : '#d1d5db'}
                                    />
                                    {errors.customerEmail && (
                                        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                                            {errors.customerEmail}
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <textarea
                                        placeholder="Additional notes (optional)"
                                        value={formData.notes}
                                        onChange={(e) => handleChange('notes', e.target.value)}
                                        rows="3"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            fontSize: '14px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '4px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            fontFamily: 'inherit',
                                            resize: 'vertical'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#0079c1'}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    ></textarea>
                                </div>

                                <div style={{
                                    padding: '16px',
                                    background: 'var(--calcite-ui-foreground-2)',
                                    borderRadius: '4px',
                                    marginBottom: '16px'
                                }}>
                                    <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                                        Order Summary
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '14px' }}>Items:</span>
                                        <span style={{ fontSize: '14px', fontWeight: '600' }}>{cart.length}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '600' }}>Total:</span>
                                        <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                                            LKR {(getCartTotal() || 0).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                    {/* Footer Actions - Moved inside content for visibility */}
                    <div style={{
                        marginTop: '20px',
                        paddingTop: '20px',
                        borderTop: '1px solid var(--calcite-ui-border-3)',
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'flex-end'
                    }}>
                        {!showInquiryForm ? (
                            <>
                                <button
                                    onClick={onClose}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        background: 'white',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#333',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <calcite-icon icon="shopping-bag" scale="s"></calcite-icon>
                                    Continue Shopping
                                </button>
                                {cart.length > 0 && (
                                    <button
                                        onClick={handleSendInquiryClick}
                                        style={{
                                            padding: '10px 20px',
                                            borderRadius: '4px',
                                            border: 'none',
                                            background: '#0079c1',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <calcite-icon icon="send" scale="s"></calcite-icon>
                                        Send Inquiry
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleBackToCart}
                                    disabled={loading}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        background: 'white',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#333',
                                        opacity: loading ? 0.7 : 1
                                    }}
                                >
                                    Back to Cart
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '4px',
                                        border: 'none',
                                        background: '#0079c1',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: 'white',
                                        opacity: loading ? 0.7 : 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    {loading ? 'Sending...' : 'Send'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </calcite-modal>

            <SuccessNotification
                show={showSuccess}
                onClose={() => setShowSuccess(false)}
                orderReference={successData?.orderReference}
                customerEmail={successData?.customerEmail}
                customerPhone={successData?.customerPhone}
            />
        </>
    );
}
