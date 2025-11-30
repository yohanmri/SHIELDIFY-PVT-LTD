import React, { useState } from 'react';
import '@esri/calcite-components/dist/components/calcite-shell';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-button';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-input';
import '@esri/calcite-components/dist/components/calcite-link';
import '@esri/calcite-components/dist/components/calcite-notice';
import '@esri/calcite-components/dist/components/calcite-card';
import { setAssetPath } from '@esri/calcite-components/dist/components';

setAssetPath('https://cdn.jsdelivr.net/npm/@esri/calcite-components/dist/calcite/assets');

export default function ShieldifyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setShowError(true);
      setShowSuccess(false);
      return;
    }
    
    setLoading(true);
    setShowError(false);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        // Redirect to admin dashboard
        console.log('Redirecting to admin dashboard...');
      }, 1500);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #94a3b8 100%)',
      fontFamily: 'var(--calcite-sans-family)'
    }}>
      {/* Left Side - Branding */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255,255,255,.1) 35px,
            rgba(255,255,255,.1) 70px
          )`
        }}></div>

        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(148,163,184,0.3)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '500px' }}>
          {/* Logo */}
          <div style={{
            width: '180px',
            height: '180px',
            margin: '0 auto 30px',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            padding: '20px',
            border: '4px solid rgba(148,163,184,0.3)'
          }}>
            <img 
              src="/assets/images/picture-logo.png"
              alt="SHIELDIFY Logo" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>

          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            margin: '0 0 20px 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            letterSpacing: '2px'
          }}>
            SHIELDIFY
          </h1>
          
          <p style={{
            fontSize: '20px',
            margin: '0 0 30px 0',
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Your trusted partner for workplace safety equipment in Sri Lanka
          </p>

          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '40px'
          }}>
            {/* <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>500+</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Products</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>1000+</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Happy Clients</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>15+</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Categories</div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Right Side - Admin Login Form */}
      <div style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)'
      }}>
        <calcite-card style={{
          width: '100%',
          maxWidth: '450px',
          '--calcite-card-background': 'white',
          boxShadow: '0 20px 60px rgba(30, 58, 138, 0.15)'
        }}>
          <div style={{ padding: '40px' }}>
            {/* Header */}
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(30, 58, 138, 0.3)'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              
              <h2 style={{
                margin: '0 0 10px 0',
                fontSize: '28px',
                fontWeight: '600',
                color: '#1e3a8a'
              }}>
                Login
              </h2>
              <p style={{
                margin: 0,
                color: '#64748b',
                fontSize: '15px'
              }}>
                Sign in to access admin dashboard
              </p>
            </div>

            {/* Error Notice */}
            {showError && (
              <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '20px' }}>
                <div slot="message">Please enter both email and password</div>
              </calcite-notice>
            )}

            {/* Success Notice */}
            {showSuccess && (
              <calcite-notice open icon="check-circle" kind="success" style={{ marginBottom: '20px' }}>
                <div slot="message">Login successful! Redirecting to dashboard...</div>
              </calcite-notice>
            )}

            {/* Login Form */}
            <div>
              <calcite-label style={{ marginBottom: '16px' }}>
                Email Address
                <calcite-input
                  type="email"
                  placeholder="admin@shieldify.com"
                  value={email}
                  onCalciteInputInput={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  icon="envelope"
                  clearable
                />
              </calcite-label>

              <calcite-label style={{ marginBottom: '20px' }}>
                Password
                <calcite-input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onCalciteInputInput={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  icon="lock"
                  clearable
                />
              </calcite-label>

              {/* Remember Me & Forgot Password */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                fontSize: '14px'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" />
                  <span style={{ color: '#475569' }}>Remember me</span>
                </label>
                <calcite-link href="#" style={{ fontSize: '14px' }}>
                  Forgot password?
                </calcite-link>
              </div>

              {/* Login Button */}
              <calcite-button
                onClick={handleLogin}
                width="full"
                loading={loading}
                disabled={loading}
                icon-start="sign-in"
                style={{ 
                  marginBottom: '20px',
                  '--calcite-button-background': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </calcite-button>
            </div>

            {/* Help Section */}
            <div style={{
              textAlign: 'center',
              padding: '20px',
              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
              borderRadius: '8px',
              marginTop: '20px',
              border: '1px solid #cbd5e1'
            }}>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '10px' }}>
                Need help accessing your account?
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <calcite-button
                  appearance="outline"
                  scale="s"
                  icon-start="envelope"
                  onClick={() => alert('Email: support@shieldify.com')}
                >
                  Email
                </calcite-button>
                <calcite-button
                  appearance="outline"
                  scale="s"
                  icon-start="mobile"
                  onClick={() => alert('WhatsApp: +94 77 123 4567')}
                >
                  WhatsApp
                </calcite-button>
              </div>
            </div>
          </div>
        </calcite-card>
      </div>

      {/* Mobile Responsive - Stack Vertically */}
      <style>{`
        @media (max-width: 968px) {
          div[style*="minHeight: 100vh"] {
            flex-direction: column !important;
          }
          div[style*="minHeight: 100vh"] > div:first-child {
            min-height: 350px;
            flex: 0 !important;
          }
          div[style*="minHeight: 100vh"] > div:last-child {
            flex: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}