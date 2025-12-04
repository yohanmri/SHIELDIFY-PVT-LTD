import React, { useState } from 'react';
import API from '../api/axios';
import SuccessNotification from './SuccessNotification';
import '@esri/calcite-components/components/calcite-modal';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-loader';

export default function InquiryModal({ open, onClose, onSuccess, cartItems, totalAmount }) {
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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Name is required';
        }

        if (!formData.customerEmail.trim()) {
            newErrors.customerEmail = 'Email is required';
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.customerEmail)) {
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
                customerName: formData.customerName.trim(),
                customerEmail: formData.customerEmail.trim(),
                customerPhone: formData.customerPhone.trim(),
                notes: formData.notes.trim(),
                items: cartItems.map(item => ({
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

                // Reset form
                setFormData({
                    customerName: '',
                    customerEmail: '',
                    customerPhone: '',
                    notes: ''
                });

                // Call success callback after a short delay
                setTimeout(() => {
                    onSuccess(response.data.data);
                }, 500);
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

    return (
        <>
            <calcite-modal
                open={open}
                onCalciteModalClose={onClose}
                aria-labelledby="inquiry-modal-title"
                scale="m"
                width-scale="s"
            >
                <div slot="header" id="inquiry-modal-title" style={{ fontSize: '20px', fontWeight: '600' }}>
                    Contact Information
                </div>

                <div slot="content">
                    <p style={{
                        margin: '0 0 20px 0',
                        fontSize: '14px',
                        color: 'var(--calcite-ui-text-3)'
                    }}>
                        Please provide your contact details so our team can reach you about your inquiry.
                    </p>

                    {submitError && (
                        <calcite-notice open kind="danger" icon="exclamation-mark-triangle" style={{ marginBottom: '16px' }}>
                            <div slot="message">{submitError}</div>
                        </calcite-notice>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <calcite-input
                                placeholder="Full Name"
                                value={formData.customerName}
                                onCalciteInputInput={(e) => handleChange('customerName', e.target.value)}
                                status={errors.customerName ? 'invalid' : undefined}
                                scale="l"
                                required
                            >
                                <calcite-icon slot="icon" icon="user"></calcite-icon>
                            </calcite-input>
                            {errors.customerName && (
                                <div style={{ color: 'var(--calcite-ui-danger)', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.customerName}
                                </div>
                            )}
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <calcite-input
                                type="email"
                                placeholder="Email Address"
                                value={formData.customerEmail}
                                onCalciteInputInput={(e) => handleChange('customerEmail', e.target.value)}
                                status={errors.customerEmail ? 'invalid' : undefined}
                                scale="l"
                                required
                            >
                                <calcite-icon slot="icon" icon="email-address"></calcite-icon>
                            </calcite-input>
                            {errors.customerEmail && (
                                <div style={{ color: 'var(--calcite-ui-danger)', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.customerEmail}
                                </div>
                            )}
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <calcite-input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.customerPhone}
                                onCalciteInputInput={(e) => handleChange('customerPhone', e.target.value)}
                                status={errors.customerPhone ? 'invalid' : undefined}
                                scale="l"
                                required
                            >
                                <calcite-icon slot="icon" icon="phone"></calcite-icon>
                            </calcite-input>
                            {errors.customerPhone && (
                                <div style={{ color: 'var(--calcite-ui-danger)', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.customerPhone}
                                </div>
                            )}
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <calcite-text-area
                                placeholder="Additional notes (optional)"
                                value={formData.notes}
                                onCalciteTextAreaInput={(e) => handleChange('notes', e.target.value)}
                                scale="l"
                                rows="3"
                            ></calcite-text-area>
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
                                <span style={{ fontSize: '14px', fontWeight: '600' }}>{cartItems.length}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '16px', fontWeight: '600' }}>Total:</span>
                                <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                                    LKR {totalAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </form>
                </div>

                <div slot="footer" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <calcite-button appearance="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </calcite-button>
                    <calcite-button onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <>
                                <calcite-loader inline scale="s"></calcite-loader>
                                <span style={{ marginLeft: '8px' }}>Submitting...</span>
                            </>
                        ) : (
                            'Submit Inquiry'
                        )}
                    </calcite-button>
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
