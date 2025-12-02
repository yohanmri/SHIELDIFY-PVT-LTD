import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import { adminAPI } from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-notice';

// Custom Doughnut Chart Component
const DoughnutChart = ({ data, size = 200 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;
  
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (currentAngle * Math.PI) / 180;
    
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    return {
      path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: item.color,
      label: item.label,
      value: item.value,
      percentage: percentage.toFixed(1)
    };
  });
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.path}
            fill={slice.color}
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
        <circle cx="50" cy="50" r="25" fill="white" />
        <text x="50" y="50" textAnchor="middle" dy="0.3em" fontSize="10" fontWeight="700" fill="#2b2b2b">
          {total}
        </text>
        <text x="50" y="58" textAnchor="middle" fontSize="4" fill="#6b6b6b">
          Total
        </text>
      </svg>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        {slices.map((slice, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', background: slice.color, borderRadius: '2px' }}></div>
              <span style={{ fontSize: '14px' }}>{slice.label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: '700', color: slice.color }}>
                {slice.value.toLocaleString()}
              </span>
              <span style={{ fontSize: '12px', color: '#6b6b6b' }}>
                ({slice.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Horizontal Bar Chart Component
const HorizontalBarChart = ({ data, maxValue }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;
        return (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: item.color }}>
                {item.value.toLocaleString()}
              </span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '10px', 
              background: '#f0f0f0', 
              borderRadius: '5px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${percentage}%`, 
                height: '100%', 
                background: item.color,
                transition: 'width 0.6s ease',
                borderRadius: '5px'
              }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function DevicesLocations() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7days');

  const [deviceStats, setDeviceStats] = useState({
    totalDevices: 0,
    desktopUsers: 0,
    mobileUsers: 0,
    tabletUsers: 0
  });

  const [deviceData, setDeviceData] = useState([
    { label: 'Desktop', value: 0, color: '#0079c1', percentage: 0 },
    { label: 'Mobile', value: 0, color: '#00a884', percentage: 0 },
    { label: 'Tablet', value: 0, color: '#9333ea', percentage: 0 }
  ]);

  const [browserData, setBrowserData] = useState([
    { label: 'Chrome', value: 0, color: '#0079c1' },
    { label: 'Safari', value: 0, color: '#00a884' },
    { label: 'Firefox', value: 0, color: '#ffa500' },
    { label: 'Edge', value: 0, color: '#9333ea' },
    { label: 'Other', value: 0, color: '#6b6b6b' }
  ]);

  const [osData, setOsData] = useState([
    { label: 'Windows', value: 0, color: '#0079c1' },
    { label: 'Android', value: 0, color: '#00a884' },
    { label: 'iOS', value: 0, color: '#6b6b6b' },
    { label: 'macOS', value: 0, color: '#ffa500' },
    { label: 'Linux', value: 0, color: '#9333ea' }
  ]);

  const [locationData, setLocationData] = useState([
    { city: 'Colombo', district: 'Colombo', visitors: 12840, percentage: 39.6, icon: 'map-pin' },
    { city: 'Kandy', district: 'Kandy', visitors: 5670, percentage: 17.5, icon: 'map-pin' },
    { city: 'Galle', district: 'Galle', visitors: 3890, percentage: 12.0, icon: 'map-pin' },
    { city: 'Jaffna', district: 'Jaffna', visitors: 2340, percentage: 7.2, icon: 'map-pin' },
    { city: 'Negombo', district: 'Gampaha', visitors: 1920, percentage: 5.9, icon: 'map-pin' },
    { city: 'Matara', district: 'Matara', visitors: 1560, percentage: 4.8, icon: 'map-pin' },
    { city: 'Kurunegala', district: 'Kurunegala', visitors: 1230, percentage: 3.8, icon: 'map-pin' },
    { city: 'Anuradhapura', district: 'Anuradhapura', visitors: 890, percentage: 2.7, icon: 'map-pin' },
    { city: 'Trincomalee', district: 'Trincomalee', visitors: 670, percentage: 2.1, icon: 'map-pin' },
    { city: 'Other Cities', district: 'Various', visitors: 1440, percentage: 4.4, icon: 'map-pin' }
  ]);

  const [screenResolutions, setScreenResolutions] = useState([
    { resolution: '1920x1080', count: 0, percentage: 0 },
    { resolution: '1366x768', count: 0, percentage: 0 },
    { resolution: '375x667 (Mobile)', count: 0, percentage: 0 },
    { resolution: '414x896 (Mobile)', count: 0, percentage: 0 },
    { resolution: '768x1024 (Tablet)', count: 0, percentage:0 },
    { resolution: 'Other', count: 0, percentage: 0 }
  ]);
useEffect(() => {
  fetchDeviceLocationData();
}, [timeRange]);

  const fetchDeviceLocationData = async () => {
  try {
    setLoading(true);
    const response = await adminAPI.get(`/analytics/devices-locations?range=${timeRange}`);
    
    if (response.data.success) {
      const { data } = response.data;
      
      setDeviceStats({
        totalDevices: data.totalDevices,
        desktopUsers: data.desktopUsers,
        mobileUsers: data.mobileUsers,
        tabletUsers: data.tabletUsers
      });
      
      setDeviceData(data.devices);
      setBrowserData(data.browsers);
      setOsData(data.os);
      setLocationData(data.locations);
      setScreenResolutions(data.screens);
    }
  } catch (err) {
    console.error('Error fetching device/location data:', err);
  } finally {
    setLoading(false);
  }
};

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />
      
      <div style={{ padding: '24px', height: '100%', overflow: 'auto', background: 'var(--calcite-ui-background)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
                Devices & Locations
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Visitor device types and geographic distribution
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <calcite-select
                value={timeRange}
                onCalciteSelectChange={(e) => setTimeRange(e.target.value)}
                style={{ width: '150px' }}
              >
                <calcite-option value="24hours">Last 24 Hours</calcite-option>
                <calcite-option value="7days">Last 7 Days</calcite-option>
                <calcite-option value="30days">Last 30 Days</calcite-option>
                <calcite-option value="90days">Last 90 Days</calcite-option>
              </calcite-select>
              <calcite-button
                appearance="outline"
                icon-start="arrow-left"
                onClick={() => navigate('/admin/dashboard')}
              >
                Back
              </calcite-button>
            </div>
          </div>

          {/* Device Stats Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <calcite-icon icon="devices" scale="s" style={{ color: 'var(--calcite-ui-text-3)' }}></calcite-icon>
                  <span style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>Total Devices</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                  {formatNumber(deviceStats.totalDevices)}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <calcite-icon icon="monitor" scale="s" style={{ color: '#0079c1' }}></calcite-icon>
                  <span style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>Desktop Users</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#0079c1' }}>
                  {formatNumber(deviceStats.desktopUsers)}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <calcite-icon icon="mobile" scale="s" style={{ color: '#00a884' }}></calcite-icon>
                  <span style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>Mobile Users</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#00a884' }}>
                  {formatNumber(deviceStats.mobileUsers)}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <calcite-icon icon="tablet" scale="s" style={{ color: '#9333ea' }}></calcite-icon>
                  <span style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>Tablet Users</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#9333ea' }}>
                  {formatNumber(deviceStats.tabletUsers)}
                </div>
              </div>
            </calcite-card>
          </div>

          {/* Device Breakdown Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Device Types */}
            <calcite-card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <calcite-icon icon="devices" scale="s"></calcite-icon>
                  Device Types
                </h2>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <calcite-loader scale="l"></calcite-loader>
                  </div>
                ) : (
                  <DoughnutChart data={deviceData} size={240} />
                )}
              </div>
            </calcite-card>

            {/* Browsers */}
            <calcite-card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <calcite-icon icon="browser" scale="s"></calcite-icon>
                  Browsers
                </h2>
                <HorizontalBarChart 
                  data={browserData} 
                  maxValue={Math.max(...browserData.map(d => d.value))} 
                />
              </div>
            </calcite-card>

            {/* Operating Systems */}
            <calcite-card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <calcite-icon icon="gear" scale="s"></calcite-icon>
                  Operating Systems
                </h2>
                <HorizontalBarChart 
                  data={osData} 
                  maxValue={Math.max(...osData.map(d => d.value))} 
                />
              </div>
            </calcite-card>
          </div>

          {/* Geographic Distribution */}
          <calcite-card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '24px' }}>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <calcite-icon icon="map" scale="s"></calcite-icon>
                Top Locations in Sri Lanka
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {locationData.map((location, index) => (
                  <div key={index} style={{ 
                    padding: '16px',
                    background: 'var(--calcite-ui-foreground-2)',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: index < 3 ? '#0079c1' : '#6b6b6b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: 'white'
                      }}>
                        {index + 1}
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '2px' }}>
                          {location.city}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)' }}>
                          {location.district} District
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: index < 3 ? '#0079c1' : '#6b6b6b' }}>
                        {formatNumber(location.visitors)}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)' }}>
                        {location.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </calcite-card>

          {/* Screen Resolutions */}
          <calcite-card>
            <div style={{ padding: '24px' }}>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <calcite-icon icon="camera-plus" scale="s"></calcite-icon>
                Screen Resolutions
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {screenResolutions.map((res, index) => (
                  <div key={index} style={{ 
                    padding: '16px',
                    background: 'var(--calcite-ui-foreground-2)',
                    borderRadius: '6px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{res.resolution}</span>
                      <span style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                        {formatNumber(res.count)} ({res.percentage}%)
                      </span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      background: 'var(--calcite-ui-foreground-3)', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${res.percentage}%`, 
                        height: '100%', 
                        background: index === 0 ? '#0079c1' : '#6b6b6b',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </calcite-card>
        </div>
      </div>
    </calcite-shell>
  );
}