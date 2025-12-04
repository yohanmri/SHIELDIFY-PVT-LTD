import React, { useEffect } from 'react';

export default function SuccessNotification({ show, onClose, orderReference, customerEmail, customerPhone }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 8000); // Auto-close after 8 seconds

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10000,
            maxWidth: '400px',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            animation: 'slideIn 0.3s ease-out',
            fontFamily: 'sans-serif'
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <div style={{
                    background: '#22c55e',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#fff' }}>
                        Request Sent Successfully!
                    </h3>
                    <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.5', color: '#e5e5e5' }}>
                        Your inquiry sent we will contact you within an hour
                    </p>

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '12px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        marginBottom: '12px'
                    }}>
                        <div style={{ marginBottom: '4px', color: '#e5e5e5' }}>📧 {customerEmail}</div>
                        <div style={{ color: '#e5e5e5' }}>📱 {customerPhone}</div>
                    </div>

                    <p style={{ margin: '0', fontSize: '13px', color: '#a3a3a3' }}>
                        For immediate assistance:<br />
                        <a href="tel:0774716901" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: '600' }}>0774716901</a>
                    </p>

                    {orderReference && (
                        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#737373' }}>
                            Ref: {orderReference}
                        </p>
                    )}
                </div>

                <button
                    onClick={onClose}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#737373',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
