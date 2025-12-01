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
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

setAssetPath('https://cdn.jsdelivr.net/npm/@esri/calcite-components/dist/calcite/assets');

export default function ShieldifyLogin() {
  const navigate = useNavigate();
  
  // State management
  const [step, setStep] = useState('email'); // 'email' or 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Request OTP
  const handleRequestOTP = async () => {
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await API.post('/auth/request-otp', { email: trimmedEmail });
      
      if (response.data.success) {
        setSuccess(response.data.message);
        setStep('login');
      }
    } catch (err) {
      console.error('Request OTP Error:', err);
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Login with email, password, and OTP
  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedOtp = otp.trim();
    
    if (!trimmedEmail || !trimmedPassword || !trimmedOtp) {
      setError('Please provide email, password, and OTP');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await API.post('/auth/login', {
        email: trimmedEmail,
        password: trimmedPassword,
        otp: trimmedOtp
      });

      if (response.data.success) {
        // Store token and admin data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));

        setSuccess('Login successful!');

        // Redirect based on password type
        setTimeout(() => {
          if (response.data.admin.isTemporaryPassword) {
            navigate('/admin/change-password');
          } else {
            navigate('/admin/dashboard');
          }
        }, 1500);
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (step === 'email') {
        handleRequestOTP();
      } else {
        handleLogin();
      }
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setPassword('');
    setOtp('');
    setError('');
    setSuccess('');
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
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div style="font-size: 80px; color: #1e3a8a">🛡️</div>';
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
                {step === 'email' ? 'Admin Login' : 'Enter Credentials'}
              </h2>
              <p style={{
                margin: 0,
                color: '#64748b',
                fontSize: '15px'
              }}>
                {step === 'email' 
                  ? 'Enter your email to receive OTP'
                  : 'Enter password and OTP to login'
                }
              </p>
            </div>

            {/* Error Notice */}
            {error && (
              <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '20px' }}>
                <div slot="message">{error}</div>
              </calcite-notice>
            )}

            {/* Success Notice */}
            {success && (
              <calcite-notice open icon="check-circle" kind="success" style={{ marginBottom: '20px' }}>
                <div slot="message">{success}</div>
              </calcite-notice>
            )}

            {/* Step 1: Email Input */}
            {step === 'email' && (
              <div>
                <calcite-label style={{ marginBottom: '20px' }}>
                  Email Address
                  <calcite-input
                    type="email"
                    placeholder="admin@shieldify.com"
                    value={email}
                    onInput={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                    icon="envelope"
                    clearable
                  />
                </calcite-label>

                <calcite-button
                  onClick={handleRequestOTP}
                  width="full"
                  loading={loading}
                  disabled={loading}
                  icon-start="mail"
                  style={{ 
                    marginBottom: '20px',
                    '--calcite-button-background': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
                  }}
                >
                  {loading ? 'Sending OTP...' : 'Request OTP'}
                </calcite-button>
              </div>
            )}

            {/* Step 2: Password & OTP */}
            {step === 'login' && (
              <div>
                <calcite-label style={{ marginBottom: '16px' }}>
                  Email Address
                  <calcite-input
                    type="email"
                    value={email}
                    disabled
                    icon="envelope"
                  />
                </calcite-label>

                <calcite-label style={{ marginBottom: '16px' }}>
                  Password
                  <calcite-input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                    icon="lock"
                    clearable
                  />
                </calcite-label>

                <calcite-label style={{ marginBottom: '20px' }}>
                  OTP Code
                  <calcite-input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onInput={(e) => setOtp(e.target.value)}
                    onKeyDown={handleKeyPress}
                    icon="key"
                    maxLength="6"
                    clearable
                  />
                </calcite-label>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <calcite-button
                    appearance="outline"
                    onClick={handleBackToEmail}
                    icon-start="chevron-left"
                    width="full"
                  >
                    Back
                  </calcite-button>
                  <calcite-button
                    onClick={handleLogin}
                    width="full"
                    loading={loading}
                    disabled={loading}
                    icon-start="sign-in"
                    style={{ 
                      '--calcite-button-background': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
                    }}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </calcite-button>
                </div>
              </div>
            )}

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

      {/* Mobile Responsive */}
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